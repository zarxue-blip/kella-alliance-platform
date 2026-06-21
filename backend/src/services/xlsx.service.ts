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

function numberFromCell(value: string) {
  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function findHeaderIndex(headers: string[], candidates: string[]) {
  const normalized = headers.map(headerKey);
  return normalized.findIndex((header) => candidates.includes(header));
}

export function parseTopnWorkbook(buffer: Buffer): ImportedTopnMember[] {
  const rows = readFirstWorksheetRows(buffer).filter((row) => row.some(Boolean));
  const headerRowIndex = rows.findIndex((row) => {
    const keys = row.map(headerKey);
    return (
      keys.some((key) => ["characterid", "uid", "roleid", "playerid"].includes(key)) &&
      keys.some((key) => ["charactername", "ign", "rolename", "playername"].includes(key)) &&
      keys.some((key) => ["currentpower", "power", "might"].includes(key))
    );
  });

  if (headerRowIndex < 0) {
    throw new Error("Could not find Rank, Character ID, Character Name, and Current Power columns.");
  }

  const headers = rows[headerRowIndex] ?? [];
  const rankIndex = findHeaderIndex(headers, ["rank", "ranking"]);
  const uidIndex = findHeaderIndex(headers, ["characterid", "uid", "roleid", "playerid"]);
  const ignIndex = findHeaderIndex(headers, ["charactername", "ign", "rolename", "playername", "name"]);
  const powerIndex = findHeaderIndex(headers, ["currentpower", "power", "might"]);

  if (uidIndex < 0 || ignIndex < 0 || powerIndex < 0) {
    throw new Error("Excel file is missing Character ID, Character Name, or Current Power.");
  }

  const members: ImportedTopnMember[] = [];
  for (const row of rows.slice(headerRowIndex + 1)) {
    const uid = String(row[uidIndex] ?? "").trim();
    const ign = String(row[ignIndex] ?? "").trim();
    const power = numberFromCell(row[powerIndex] ?? "");
    if (!uid || !ign || !power) continue;
    members.push({
      uid,
      ign,
      power,
      rank: rankIndex >= 0 ? String(row[rankIndex] ?? "").trim() : undefined
    });
  }

  if (!members.length) throw new Error("No member rows were found in the Excel file.");
  return members;
}
