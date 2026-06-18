import type { MemberProfile } from "@cod-amp/shared";

const memberColumns: Array<keyof MemberProfile> = [
  "id",
  "discordId",
  "ign",
  "uid",
  "power",
  "alliance",
  "rank",
  "role",
  "timezone",
  "country",
  "joinDate",
  "lastActivity",
  "attendanceScore",
  "warScore",
  "contributionScore",
  "notes"
];

function escapeCsv(value: unknown) {
  const raw = value === null || value === undefined ? "" : String(value);
  return /[",\n\r]/.test(raw) ? `"${raw.replaceAll('"', '""')}"` : raw;
}

export function membersToCsv(rows: MemberProfile[]) {
  return [memberColumns.join(","), ...rows.map((row) => memberColumns.map((column) => escapeCsv(row[column])).join(","))].join("\n");
}
