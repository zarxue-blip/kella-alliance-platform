import { cleanImportedPlayerName } from "./xlsx.service.js";

export type MemberIdentity = {
  uid?: string;
  ign?: string;
  discordId?: string;
  discordUsername?: string;
  discordDisplayName?: string;
  power?: number;
  powerHistory?: Array<unknown>;
  statHistory?: Array<unknown>;
};

function numeric(value: unknown) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function isGameUid(value?: string) {
  return /^\d{5,12}$/.test(String(value || ""));
}

export function isUploadedOnlyIdentity(member?: MemberIdentity | null) {
  const discordId = String(member?.discordId || "");
  return discordId.startsWith("xlsx:") || discordId.startsWith("topn:");
}

export function isDiscordOnlyIdentity(member?: MemberIdentity | null) {
  if (!member || isUploadedOnlyIdentity(member)) return false;
  const discordId = String(member.discordId || "");
  const uid = String(member.uid || "");
  const hasStatHistory = Boolean((member.powerHistory || []).length || (member.statHistory || []).length);
  return uid === discordId || uid === `discord-${discordId}` || (!isGameUid(uid) && numeric(member.power) === 0 && !hasStatHistory);
}

export function canAdoptGameIdentity(member: MemberIdentity | null | undefined, incomingUid: string) {
  if (!member) return false;
  const currentUid = String(member.uid || "").trim();
  return currentUid === incomingUid || !isGameUid(currentUid) || isDiscordOnlyIdentity(member);
}

export function canonicalAllianceTag(value?: string) {
  const raw = String(value || "").trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const bracketed = raw.match(/\[([^\]]+)\]/)?.[1] || raw;
  return bracketed.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

export function canonicalAllianceLabel(value?: string) {
  const tag = canonicalAllianceTag(value);
  if (tag === "kog") return "KoG";
  if (tag === "lwl") return "LWL";
  if (tag === "mf") return "mF";
  return String(value || "").trim();
}

export function normalizeRosterIdentityName(value?: string) {
  return cleanImportedPlayerName(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function collapseRepeatedLetters(value: string) {
  return value.replace(/([a-z0-9])\1+/g, "$1");
}

export function rosterIdentityVariants(value: string) {
  const noise = new Set(["ckr", "kog", "cod", "row", "aga", "alliance", "guild"]);
  const tokens = normalizeRosterIdentityName(value)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !noise.has(token) && !/^\d+$/.test(token));
  const variants = new Set<string>();
  for (const token of tokens) {
    variants.add(token);
    variants.add(collapseRepeatedLetters(token));
  }
  const compact = tokens.join("");
  if (compact) {
    variants.add(compact);
    variants.add(collapseRepeatedLetters(compact));
  }
  return Array.from(variants).filter((variant) => variant.length >= 3);
}

export function rosterNamesLookRelated(left?: string, right?: string) {
  const leftVariants = rosterIdentityVariants(left || "");
  const rightVariants = rosterIdentityVariants(right || "");
  if (!leftVariants.length || !rightVariants.length) return false;

  for (const leftVariant of leftVariants) {
    for (const rightVariant of rightVariants) {
      if (leftVariant === rightVariant) return true;
      const shorter = leftVariant.length <= rightVariant.length ? leftVariant : rightVariant;
      const longer = leftVariant.length <= rightVariant.length ? rightVariant : leftVariant;
      if (shorter.length >= 4 && longer.includes(shorter) && shorter.length / longer.length >= 0.35) return true;
    }
  }
  return false;
}

export function uniqueDiscordRosterMatch<T extends MemberIdentity>(candidates: T[], displayName: string, username: string) {
  const incomingNames = [displayName, username].map(normalizeRosterIdentityName).filter(Boolean);
  const exact = candidates.filter((candidate) => {
    const ign = normalizeRosterIdentityName(candidate.ign);
    return ign && incomingNames.includes(ign);
  });
  if (exact.length === 1) return exact[0];
  if (exact.length > 1) return null;

  const related = candidates.filter((candidate) =>
    [displayName, username].some((name) =>
      [candidate.ign, candidate.discordDisplayName, candidate.discordUsername]
        .filter(Boolean)
        .some((candidateName) => rosterNamesLookRelated(String(candidateName), name))
    )
  );
  return related.length === 1 ? related[0] : null;
}
