import { inflateRawSync } from "node:zlib";

type ZipEntry = {
  name: string;
  compressionMethod: number;
  compressedSize: number;
  localHeaderOffset: number;
};

export type ImportedTopnMember = {
  rank?: string;
  uid: string;
  ign: string;
  power: number;
  alliance?: string;
  stats: Record<string, number>;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_match, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function getAttribute(attrs: string, name: string) {
  const match = attrs.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? decodeXml(match[1] ?? "") : "";
}

function columnIndex(cellRef: string, fallback: number) {
  const letters = (cellRef.match(/[A-Z]+/i)?.[0] ?? "").toUpperCase();
  if (!letters) return fallback;
  let index = 0;
  for (const char of letters) index = index * 26 + (char.charCodeAt(0) - 64);
  return index - 1;
}

function findEndOfCentralDirectory(buffer: Buffer) {
  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) return index;
  }
  throw new Error("Invalid Excel file: ZIP directory not found.");
}

function readZipEntries(buffer: Buffer) {
  const endOffset = findEndOfCentralDirectory(buffer);
  const totalEntries = buffer.readUInt16LE(endOffset + 10);
  const centralDirectoryOffset = buffer.readUInt32LE(endOffset + 16);
  const entries = new Map<string, ZipEntry>();
  let cursor = centralDirectoryOffset;

  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(cursor) !== 0x02014b50) throw new Error("Invalid Excel file: broken ZIP directory.");
    const compressionMethod = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const fileNameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localHeaderOffset = buffer.readUInt32LE(cursor + 42);
    const name = buffer.subarray(cursor + 46, cursor + 46 + fileNameLength).toString("utf8");

    entries.set(name, { name, compressionMethod, compressedSize, localHeaderOffset });
    cursor += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function readZipText(buffer: Buffer, entries: Map<string, ZipEntry>, name: string) {
  const entry = entries.get(name);
  if (!entry) return "";
  const localOffset = entry.localHeaderOffset;
  if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`Invalid Excel file: ${name} header missing.`);
  const fileNameLength = buffer.readUInt16LE(localOffset + 26);
  const extraLength = buffer.readUInt16LE(localOffset + 28);
  const dataStart = localOffset + 30 + fileNameLength + extraLength;
  const compressed = buffer.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.compressionMethod === 0) return compressed.toString("utf8");
  if (entry.compressionMethod === 8) return inflateRawSync(compressed).toString("utf8");
  throw new Error(`Unsupported Excel compression method ${entry.compressionMethod}.`);
}

function parseSharedStrings(xml: string) {
  if (!xml) return [];
  return Array.from(xml.matchAll(/<si[\s\S]*?<\/si>/g)).map(([item]) => {
    const text = Array.from(item.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g))
      .map((match) => decodeXml(match[1] ?? ""))
      .join("");
    return text.trim();
  });
}

function cellValue(cellXml: string, attrs: string, sharedStrings: string[]) {
  const type = getAttribute(attrs, "t");
  if (type === "inlineStr") {
    const inlineText = Array.from(cellXml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g))
      .map((match) => decodeXml(match[1] ?? ""))
      .join("");
    return inlineText.trim();
  }

  const rawValue = cellXml.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? "";
  const decoded = decodeXml(rawValue).trim();
  if (type === "s") return sharedStrings[Number(decoded)] ?? "";
  return decoded;
}

export function readFirstWorksheetRows(buffer: Buffer) {
  const entries = readZipEntries(buffer);
  const sheetName = entries.has("xl/worksheets/sheet1.xml")
    ? "xl/worksheets/sheet1.xml"
    : Array.from(entries.keys()).find((name) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(name));
  if (!sheetName) throw new Error("No worksheet found in Excel file.");

  const sharedStrings = parseSharedStrings(readZipText(buffer, entries, "xl/sharedStrings.xml"));
  const sheetXml = readZipText(buffer, entries, sheetName);
  const rows: string[][] = [];

  for (const rowMatch of sheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const rowXml = rowMatch[1] ?? "";
    const row: string[] = [];
    let fallbackColumn = 0;

    for (const cellMatch of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cellMatch[1] ?? "";
      const cellXml = cellMatch[2] ?? "";
      const ref = getAttribute(attrs, "r");
      const index = columnIndex(ref, fallbackColumn);
      row[index] = cellValue(cellXml, attrs, sharedStrings);
      fallbackColumn = index + 1;
    }

    rows.push(row.map((value) => String(value ?? "").trim()));
  }

  return rows;
}

function headerKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const decorativeNameTokenPattern = "[\\u02B0-\\u02FF\\u1D2C-\\u1DBF\\u2070-\\u209F]+";

export function cleanImportedPlayerName(value: unknown) {
  const original = String(value || "");
  return original
    .replace(new RegExp(`^\\s*${decorativeNameTokenPattern}\\s+`, "u"), "")
    .replace(new RegExp(`\\s+${decorativeNameTokenPattern}\\s*$`, "u"), "")
    .replace(/^\s*\[[^\]]{1,16}\]\s+/, "")
    .replace(/^\s*(?:kog|lwl|mf|aga|row|cod)\s+(?=\S{2,})/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function numberFromCell(value: unknown) {
  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function findHeaderIndex(headers: string[], candidates: string[]) {
  const normalized = headers.map(headerKey);
  return normalized.findIndex((header) => candidates.includes(header));
}

const metricHeaderAliases: Record<string, string> = {
  currentpower: "power",
  powercurrent: "power",
  power: "power",
  might: "power",
  historicalhighestpower: "topPower",
  highestpower: "topPower",
  toppower: "topPower",
  meritscurrent: "merits",
  merits: "merits",
  totalmerits: "merits",
  pvppoint: "merits",
  othermerits: "otherMerits",
  topmerits: "topMerits",
  maxpvppoint: "topMerits",
  unitshealedcurrent: "unitsHealed",
  unitshealed: "unitsHealed",
  healedcurrent: "unitsHealed",
  healingt4t5: "unitsHealed",
  numberofheal: "unitsHealed",
  maxunitshealed: "maxUnitsHealed",
  maxrsshealcnt: "maxUnitsHealed",
  unitsdeadcurrent: "unitsDead",
  unitsdead: "unitsDead",
  deathscurrent: "unitsDead",
  deathst4t5: "unitsDead",
  numberofdeath: "unitsDead",
  unitskilledcurrent: "unitsKilled",
  unitskilled: "unitsKilled",
  killedcurrent: "unitsKilled",
  unitkill: "unitsKilled",
  resourcesgatheredcurrent: "resourcesGathered",
  resourcesgathered: "resourcesGathered",
  resourcescurrent: "resourcesGathered",
  gathering: "resourcesGathered",
  collectedvolume: "resourcesGathered",
  woodgatheredcurrent: "woodGathered",
  woodgathered: "woodGathered",
  woodcurrent: "woodGathered",
  gatherres2: "woodGathered",
  goldgatheredcurrent: "goldGathered",
  goldgathered: "goldGathered",
  goldcurrent: "goldGathered",
  gatherres1: "goldGathered",
  oregatheredcurrent: "oreGathered",
  oregathered: "oreGathered",
  orecurrent: "oreGathered",
  stonegathered: "oreGathered",
  stonegatheredcurrent: "oreGathered",
  gatherres3: "oreGathered",
  managatheredcurrent: "manaGathered",
  managathered: "manaGathered",
  manacurrent: "manaGathered",
  gatherres4: "manaGathered",
  gemsgatheredcurrent: "gemsGathered",
  gemsgathered: "gemsGathered",
  gemscurrent: "gemsGathered",
  gathergem: "gemsGathered",
  timesscoutedcurrent: "timesScouted",
  timesscouted: "timesScouted",
  scoutedcurrent: "timesScouted",
  scouttimes: "timesScouted",
  resourcesgivenamountcurrent: "resourcesGivenAmount",
  resourcesgivenamount: "resourcesGivenAmount",
  resourceassistance: "resourcesGivenAmount",
  alliancedonations: "allianceDonations",
  volumeoftrade: "resourcesGivenAmount",
  resourcesgiventimescurrent: "resourcesGivenTimes",
  resourcesgiventimes: "resourcesGivenTimes",
  countoftrade: "resourcesGivenTimes",
  helpgivencurrent: "helpGiven",
  helpgiven: "helpGiven",
  helpscurrent: "helpGiven",
  alliancehelp: "helpGiven",
  helptimes: "helpGiven",
  infantryonly: "infantryMerits",
  cavalryonly: "cavalryMerits",
  marksmanonly: "marksmanMerits",
  magiconly: "magicMerits",
  t1killscurrent: "t1Kills",
  t1kills: "t1Kills",
  t2killscurrent: "t2Kills",
  t2kills: "t2Kills",
  t3killscurrent: "t3Kills",
  t3kills: "t3Kills",
  t4killscurrent: "t4Kills",
  t4kills: "t4Kills",
  t5killscurrent: "t5Kills",
  t5kills: "t5Kills",
  kvkjoincountcurrent: "kvkJoinCount",
  kvkjoincount: "kvkJoinCount",
  kvkjoincnt: "kvkJoinCount",
  kvkwincountcurrent: "kvkWinCount",
  kvkwincount: "kvkWinCount",
  kvkwincnt: "kvkWinCount",
  trooppowercurrent: "troopPower",
  trooppower: "troopPower",
  buildingpowercurrent: "buildingPower",
  buildingpower: "buildingPower",
  techpowercurrent: "techPower",
  techpower: "techPower",
  heropowercurrent: "heroPower",
  heropower: "heroPower",
  policypowercurrent: "policyPower",
  policypower: "policyPower",
  manausedcurrent: "manaUsed",
  manaused: "manaUsed",
  serverrank: "serverRank",
  honourkillscurrent: "honourKills",
  honourkills: "honourKills",
  honourkill: "honourKills",
  honorkillscurrent: "honourKills",
  honorkills: "honourKills",
  honorkill: "honourKills",
  castlelevelcurrent: "castleLevel",
  castlelevel: "castleLevel",
  buildtimecurrent: "buildTime",
  buildtime: "buildTime",
  destroytimecurrent: "destroyTime",
  destroytime: "destroyTime",
  behemothraidwins: "behemothRaidWins",
  mpratio: "mpRatio",
  migrant: "migrant"
};

export function metricKeyForHeader(header: string) {
  const key = headerKey(header);
  if (!key || key.endsWith("previous") || key.endsWith("change")) return undefined;
  return metricHeaderAliases[key];
}

export function metricsFromRecord(record: Record<string, unknown>) {
  const stats: Record<string, number> = {};
  for (const [header, raw] of Object.entries(record)) {
    const key = metricKeyForHeader(header);
    if (!key) continue;
    const value = numberFromCell(raw);
    if (Number.isFinite(value)) stats[key] = value;
  }
  return stats;
}

function topnJsonMetricValue(value: unknown, mode: "current" | "previous") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if (record[mode] !== undefined) return numberFromCell(record[mode]);
    if (mode === "current" && record.value !== undefined) return numberFromCell(record.value);
    return undefined;
  }

  if (mode === "current") return numberFromCell(value);
  return undefined;
}

function metricsFromTopnJsonRecord(record: Record<string, unknown>, mode: "current" | "previous") {
  const stats: Record<string, number> = {};
  for (const [header, raw] of Object.entries(record)) {
    const key = metricKeyForHeader(header);
    if (!key) continue;
    const value = topnJsonMetricValue(raw, mode);
    if (value === undefined || !Number.isFinite(value)) continue;
    stats[key] = value;
  }
  return stats;
}

function jsonField(record: Record<string, unknown>, candidates: string[]) {
  const normalized = new Map(Object.entries(record).map(([key, value]) => [headerKey(key), value]));
  for (const candidate of candidates) {
    const value = normalized.get(headerKey(candidate));
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

function topnJsonRows(records: Array<Record<string, unknown>>, mode: "current" | "previous") {
  const members: ImportedTopnMember[] = [];
  for (const record of records) {
    const uid = String(jsonField(record, ["Lord ID", "Character ID", "UID", "Role ID", "Player ID"]) ?? "").trim();
    const ign = cleanImportedPlayerName(jsonField(record, ["Name", "Character Name", "IGN", "Role Name", "Player Name"]));
    const stats = metricsFromTopnJsonRecord(record, mode);
    const power = stats.power || topnJsonMetricValue(jsonField(record, ["Power", "Current Power", "Might"]), mode) || 0;
    if (!uid || !ign || !power) continue;
    members.push({
      uid,
      ign,
      power,
      stats: { ...stats, power },
      alliance: String(jsonField(record, ["Alliance", "Guild"]) ?? "").trim() || undefined,
      rank: String(jsonField(record, ["# index", "Rank", "Ranking", "Index"]) ?? "").trim() || undefined
    });
  }
  return members;
}

export function parseTopnJson(buffer: Buffer) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new Error("Invalid JSON file.");
  }

  let records: unknown[] = [];
  if (Array.isArray(parsed)) {
    records = parsed;
  } else if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    if (Array.isArray(record.players)) records = record.players;
    if (Array.isArray(record.data)) records = record.data;
  }

  const cleanRecords = records.filter((record): record is Record<string, unknown> => Boolean(record && typeof record === "object" && !Array.isArray(record)));
  if (!cleanRecords.length) throw new Error("No member rows were found in the JSON file.");

  const current = topnJsonRows(cleanRecords, "current");
  if (!current.length) throw new Error("No current member rows were found in the JSON file.");
  return {
    current,
    previous: topnJsonRows(cleanRecords, "previous")
  };
}

function parseTopnRows(rows: string[][], sourceLabel: string) {
  const headerRowIndex = rows.findIndex((row) => {
    const keys = row.map(headerKey);
    return (
      keys.some((key) => ["characterid", "uid", "roleid", "playerid", "lordid"].includes(key)) &&
      keys.some((key) => ["charactername", "ign", "rolename", "playername", "name"].includes(key)) &&
      keys.some((key) => ["currentpower", "powercurrent", "power", "might"].includes(key))
    );
  });

  if (headerRowIndex < 0) {
    throw new Error(`Could not find Rank, Character ID, Character Name, and Current Power columns in this ${sourceLabel} file.`);
  }

  const headers = rows[headerRowIndex] ?? [];
  const rankIndex = findHeaderIndex(headers, ["rank", "ranking", "index"]);
  const uidIndex = findHeaderIndex(headers, ["characterid", "uid", "roleid", "playerid", "lordid"]);
  const ignIndex = findHeaderIndex(headers, ["charactername", "ign", "rolename", "playername", "name"]);
  const allianceIndex = findHeaderIndex(headers, ["alliance", "guild"]);
  const powerIndex = findHeaderIndex(headers, ["currentpower", "powercurrent", "power", "might"]);
  const metricColumns = headers
    .map((header, index) => ({ index, key: metricKeyForHeader(header) }))
    .filter((item): item is { index: number; key: string } => Boolean(item.key));

  if (uidIndex < 0 || ignIndex < 0 || powerIndex < 0) {
    throw new Error("Excel file is missing Character ID, Character Name, or Current Power.");
  }

  const members: ImportedTopnMember[] = [];
  for (const row of rows.slice(headerRowIndex + 1)) {
    const uid = String(row[uidIndex] ?? "").trim();
    const ign = cleanImportedPlayerName(row[ignIndex] ?? "");
    const stats: Record<string, number> = {};
    for (const column of metricColumns) {
      const value = numberFromCell(row[column.index] ?? "");
      if (Number.isFinite(value)) stats[column.key] = value;
    }
    const power = stats.power || numberFromCell(row[powerIndex] ?? "");
    if (!uid || !ign || !power) continue;
    members.push({
      uid,
      ign,
      power,
      stats: { ...stats, power },
      alliance: allianceIndex >= 0 ? String(row[allianceIndex] ?? "").trim() : undefined,
      rank: rankIndex >= 0 ? String(row[rankIndex] ?? "").trim() : undefined
    });
  }

  if (!members.length) throw new Error(`No member rows were found in the ${sourceLabel} file.`);
  return members;
}

function parseCsvRows(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

export function parseTopnCsv(buffer: Buffer): ImportedTopnMember[] {
  return parseTopnRows(parseCsvRows(buffer.toString("utf8")).filter((row) => row.some(Boolean)), "CSV");
}

export function parseTopnWorkbook(buffer: Buffer): ImportedTopnMember[] {
  return parseTopnRows(readFirstWorksheetRows(buffer).filter((row) => row.some(Boolean)), "Excel");
}
