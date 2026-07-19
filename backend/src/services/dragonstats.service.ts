import { metricsFromRecord, numberFromCell, type ImportedTopnMember } from "./xlsx.service.js";

const convexQueryUrl = "https://zealous-perch-135.convex.cloud/api/query";
const maxPublicScanBytes = 16 * 1024 * 1024;

type DragonStatsUpdate = {
  _id?: string;
  _creationTime?: number;
  external?: boolean;
  externalUrl?: string;
  server?: string;
};

type DragonStatsRow = Record<string, unknown>;

export type DragonStatsSnapshot = {
  id: string;
  sourceUrl: string;
  snapshotDate: Date;
  rows: ImportedTopnMember[];
};

function asArray(value: unknown): any[] {
  return Array.isArray(value) ? value : [];
}

async function convexQuery<T>(path: string, args: Record<string, unknown>) {
  const response = await fetch(convexQueryUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path, args, format: "json" })
  });
  if (!response.ok) throw new Error(`DragonStats query failed with HTTP ${response.status}`);
  const payload = (await response.json()) as { status?: string; value?: T; errorMessage?: string };
  if (payload.status !== "success") throw new Error(payload.errorMessage || "DragonStats query failed.");
  return payload.value as T;
}

async function fetchJsonArray(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`DragonStats scan download failed with HTTP ${response.status}`);
  const length = Number(response.headers.get("content-length") || 0);
  if (length > maxPublicScanBytes) throw new Error("DragonStats scan is too large to import safely.");
  const rows = await response.json();
  return asArray(rows) as DragonStatsRow[];
}

function rowText(row: DragonStatsRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return "";
}

function normalizeAlliance(value: string) {
  const match = value.match(/\[([^\]]+)\]\s*(.+)?/);
  if (!match) return value;
  return match[2]?.trim() || match[1]?.trim() || value;
}

function mapDragonStatsRow(row: DragonStatsRow): ImportedTopnMember | undefined {
  const uid = rowText(row, ["id", "lordId", "roleId", "uid"]);
  const ign = rowText(row, ["name", "lordName", "roleName", "ign"]);
  const stats = metricsFromRecord(row);
  const power = stats.power || numberFromCell(row.power ?? row.Power ?? row.currentPower);
  if (!uid || !ign || !power) return undefined;

  return {
    uid,
    ign,
    power,
    stats: { ...stats, power },
    alliance: normalizeAlliance(rowText(row, ["alliance", "allianceName", "guild"])),
    rank: rowText(row, ["rank", "serverRank"])
  };
}

function snapshotDateFromUpdate(update: DragonStatsUpdate) {
  const created = Number(update._creationTime || 0);
  return new Date(Number.isFinite(created) && created > 0 ? created : Date.now());
}

function onePerUtcDay(updates: DragonStatsUpdate[]) {
  const seen = new Set<string>();
  const result: DragonStatsUpdate[] = [];
  for (const update of updates) {
    const date = snapshotDateFromUpdate(update);
    const key = date.toISOString().slice(0, 10);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(update);
  }
  return result;
}

export async function fetchDragonStatsSnapshots(serverName: string, maxSnapshots = 30) {
  const updates = await convexQuery<DragonStatsUpdate[]>("serverUpdates:getServerUpdatesByServer", { serverName });
  const publicUpdates = onePerUtcDay(
    asArray(updates)
      .filter((update) => update?.externalUrl && String(update.externalUrl).startsWith("https://r2.vaverix.app/scans/"))
      .sort((left, right) => Number(right._creationTime || 0) - Number(left._creationTime || 0))
  ).slice(0, Math.max(1, Math.min(30, maxSnapshots)));

  const snapshots: DragonStatsSnapshot[] = [];
  for (const update of publicUpdates.reverse()) {
    const rows = (await fetchJsonArray(String(update.externalUrl)))
      .map(mapDragonStatsRow)
      .filter((row): row is ImportedTopnMember => Boolean(row));
    if (!rows.length) continue;
    snapshots.push({
      id: String(update._id || update.externalUrl),
      sourceUrl: String(update.externalUrl),
      snapshotDate: snapshotDateFromUpdate(update),
      rows
    });
  }

  return snapshots;
}
