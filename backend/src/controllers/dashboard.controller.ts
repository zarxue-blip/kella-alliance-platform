import { Types } from "mongoose";
import { z } from "zod";
import { env } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { MemberModel } from "../models/member.model.js";
import { UserModel } from "../models/user.model.js";
import { WikiPageModel, wikiAlignments, wikiBlockTypes, wikiFontFamilies, wikiFontSizes, wikiStatuses } from "../models/wikiPage.model.js";
import { listDiscordGuildMembers, sendAttackAlert, sendDiscordDm, sendDiscordEmbed, sendDiscordMessage, sendEventAttendanceEmbed, sendRootsRegistration } from "../services/discord.service.js";
import { cleanImportedPlayerName, parseTopnCsv, parseTopnJson, parseTopnWorkbook, type ImportedTopnMember } from "../services/xlsx.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const rootsSlots = ["14UTC", "20UTC"] as const;
const rootsStatuses = ["Available", "Absent", "Not Sure"] as const;
type DashboardAction = {
  _id: { toString(): string };
  type?: string;
  actorDiscordId?: string;
  actorName?: string;
  targetDiscordId?: string;
  targetName?: string;
  reportId?: string;
  eventType?: string;
  slot?: string;
  status?: string;
  payload?: Record<string, any>;
  sentAt?: Date;
};

type DashboardMember = {
  _id: { toString(): string };
  mainMemberId?: { toString(): string } | string;
  discordId?: string;
  discordUsername?: string;
  discordDisplayName?: string;
  discordAvatarUrl?: string;
  profilePhotoUrl?: string;
  ign?: string;
  uid?: string;
  rank?: string;
  role?: string;
  timezone?: string;
  country?: string;
  attendanceScore?: number;
  notes?: string;
  alliance?: string;
  power?: number;
  powerHistory?: Array<{ date?: Date | string; power?: number; source?: string; filename?: string }>;
  statHistory?: Array<{ date?: Date | string; metrics?: Record<string, unknown>; source?: string; filename?: string }>;
};

const dashboardSettingsSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  tag: z.string().min(1).max(12).optional(),
  timezone: z.string().max(80).optional(),
  settings: z
    .object({
      announcementChannel: z.string().max(120).optional(),
      attendanceChannel: z.string().max(120).optional(),
      alertChannel: z.string().max(120).optional(),
      officerRoles: z.array(z.string().min(1).max(80)).max(20).optional(),
      moduleStates: z.record(z.boolean()).optional()
    })
    .optional()
});

const shieldToolSchema = z.object({
  memberId: z.string().optional(),
  discordId: z.string().optional(),
  message: z.string().max(1800).optional()
});

const attackToolSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  roleMentionId: z.string().optional(),
  message: z.string().min(1).max(1800).default("🚨 ATTACK ALERT\n\nCome online now. There is a fight.")
});

const dmAlertToolSchema = z.object({
  title: z.string().min(1).max(120).default("Kella Alliance Alert"),
  message: z.string().min(1, "Alert message is required").max(1700)
});

const chatToolSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  message: z.string().min(1, "Message is required").max(1800),
  roleMentionId: z.string().optional()
});

const rootsReportSendSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  roleMentionId: z.string().optional()
});

const rootsCreateSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  roleMentionId: z.string().optional()
});

const eventCreateSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  title: z.string().min(1, "Event title is required").max(120),
  description: z.string().min(1, "Event description is required").max(1800),
  startsAt: z.coerce.date(),
  roleMentionId: z.string().optional()
});

const complaintStatusSchema = z.object({
  status: z.enum(["Pending", "Resolved"]).optional(),
  adminNote: z.string().max(1000).optional(),
  assignedTo: z.string().max(120).optional()
});

const complaintReplySchema = z.object({
  message: z.string().min(1, "Reply message is required").max(1700),
  resolve: z.boolean().optional()
});

const complaintCreateSchema = z.object({
  kind: z.enum(["Complaint", "Suggestion"]).default("Complaint"),
  title: z.string().min(1, "Title is required").max(140),
  description: z.string().min(1, "Description is required").max(1800),
  imageDataUrl: z
    .preprocess((value) => {
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed || undefined;
    }, z.string().max(4_200_000, "Image is too large. Please use a smaller picture.").regex(/^data:image\/(png|jpe?g|webp);base64,/i, "Image must be PNG, JPG, or WEBP.").optional())
    .optional()
});

const wikiImageSchema = z
  .preprocess((value) => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed || undefined;
  }, z.string().max(4_200_000, "Wiki image is too large. Please use a smaller picture.").refine((value) => {
    const isUploadedImage = /^data:image\/(png|jpe?g|webp);base64,/i.test(value);
    const isKellaAsset = /^\/assets\/wiki-(misc|heroes|markers|artifacts)\/[a-z0-9._/-]+\.(png|jpe?g|webp)$/i.test(value);
    return isUploadedImage || isKellaAsset;
  }, "Wiki image must be PNG, JPG, WEBP, or a Kella wiki asset.").optional())
  .optional();

const wikiBlockSchema = z.object({
  id: z.string().min(1).max(80),
  type: z.enum(wikiBlockTypes),
  text: z.string().max(6000).optional().default(""),
  imageDataUrl: wikiImageSchema,
  x: z.coerce.number().min(0).max(760).default(90),
  y: z.coerce.number().min(0).max(1300).default(90),
  width: z.coerce.number().min(60).max(760).default(320),
  height: z.coerce.number().min(36).max(1300).default(180),
  fontFamily: z.enum(wikiFontFamilies).default("serif"),
  fontSize: z.enum(wikiFontSizes).default("medium"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#3f2a13"),
  align: z.enum(wikiAlignments).default("center")
});

const wikiPageCreateSchema = z.object({
  title: z.string().min(1, "Wiki title is required").max(120),
  body: z.string().min(1, "Wiki text is required").max(6000),
  imageDataUrl: wikiImageSchema,
  fontFamily: z.enum(wikiFontFamilies).default("serif"),
  fontSize: z.enum(wikiFontSizes).default("medium"),
  blocks: z.array(wikiBlockSchema).max(60).optional(),
  status: z.enum(wikiStatuses).default("Published")
});

const wikiPageUpdateSchema = wikiPageCreateSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "Nothing to update"
});

const memberRosterImportSchema = z.object({
  filename: z.string().max(180).optional(),
  snapshotDate: z.preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.date().optional()),
  fileBase64: z.string().min(1, "Roster file is required")
});

const rosterUploadUpdateSchema = z.object({
  filename: z.string().min(1).max(180).optional(),
  snapshotDate: z.preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.date().optional())
});

const profilePhotoSchema = z.string().max(1_200_000).optional();
const discordUserIdSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed || undefined;
  },
  z.string().regex(/^\d{15,25}$/, "Discord User ID must be the numeric Discord user ID.").optional()
);
const mainMemberIdSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value),
  z.union([z.string().max(80), z.null()]).optional()
);

const profileUpdateSchema = z.object({
  ign: z.string().min(1).max(80).optional(),
  timezone: z.string().max(80).optional(),
  country: z.string().max(80).optional(),
  profilePhotoUrl: profilePhotoSchema
});

const dashboardMemberUpdateSchema = z.object({
  ign: z.string().min(1).max(80).optional(),
  uid: z.string().min(1).max(80).optional(),
  mainMemberId: mainMemberIdSchema,
  discordId: discordUserIdSchema,
  power: z.coerce.number().min(0).optional(),
  alliance: z.string().min(1).max(80).optional(),
  rank: z.string().max(80).optional(),
  role: z.enum(["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"]).optional(),
  timezone: z.string().max(80).optional(),
  country: z.string().max(80).optional(),
  profilePhotoUrl: profilePhotoSchema,
  discordAvatarUrl: z.string().max(500).optional(),
  notes: z.string().max(2000).optional()
});

const dashboardMemberCreateSchema = z.object({
  ign: z.string().min(1, "IGN is required").max(80),
  uid: z.string().min(1, "Lord ID is required").max(80),
  mainMemberId: mainMemberIdSchema,
  discordId: discordUserIdSchema,
  discordUsername: z.string().max(80).optional(),
  discordDisplayName: z.string().max(80).optional(),
  discordAvatarUrl: z.string().max(500).optional(),
  profilePhotoUrl: profilePhotoSchema,
  power: z.coerce.number().min(0).default(0),
  alliance: z.string().min(1).max(80).optional(),
  rank: z.string().max(80).optional(),
  role: z.enum(["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"]).default("Member"),
  timezone: z.string().max(80).optional(),
  country: z.string().max(80).optional(),
  notes: z.string().max(2000).optional(),
  stats: z.record(z.coerce.number().min(0)).optional()
});

type MergeCandidate = Pick<
  DashboardMember,
  "_id" | "ign" | "discordId" | "discordUsername" | "discordDisplayName" | "uid" | "power" | "powerHistory" | "statHistory" | "rank" | "alliance"
>;

async function resolveAlliance(): Promise<any> {
  const alliance =
    (env.DISCORD_GUILD_ID ? await AllianceModel.findOne({ discordGuildId: env.DISCORD_GUILD_ID }).lean() : undefined) ??
    (await AllianceModel.findOne().sort({ createdAt: 1 }).lean());
  if (alliance) return alliance;

  return AllianceModel.create({
    name: "Dragon Command Alliance",
    tag: "DCA",
    discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured",
    timezone: "UTC"
  });
}

async function resolveAllianceId() {
  const alliance = await resolveAlliance();
  return alliance?._id?.toString();
}

function allianceFilter(allianceId?: string) {
  return allianceId ? { allianceId } : {};
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function slotLabel(slot: string) {
  return slot === "14UTC" ? "14:00 UTC" : "20:00 UTC";
}

function reportId(sessionId: string, slot: string) {
  return `${sessionId}_${slot}`;
}

function parseReportId(id: string) {
  const [sessionId, slot] = id.split("_");
  if (!sessionId || !slot || !rootsSlots.includes(slot as (typeof rootsSlots)[number])) {
    throw new HttpError(400, "Invalid Roots report id");
  }
  return { sessionId, slot };
}

function displayName(action: any) {
  return action.actorName || action.targetName || action.actorDiscordId || action.targetDiscordId || "Unknown Player";
}

function slugifyWikiTitle(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || `wiki-${Date.now()}`;
}

async function uniqueWikiSlug(allianceId: string, title: string, ignoreId?: string) {
  const base = slugifyWikiTitle(title);
  for (let index = 0; index < 50; index += 1) {
    const slug = index ? `${base}-${index + 1}` : base;
    const existing = await WikiPageModel.findOne({
      allianceId,
      slug,
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {})
    })
      .select("_id")
      .lean();
    if (!existing) return slug;
  }
  return `${base}-${Date.now()}`;
}

function dashboardActor(req: unknown) {
  const user = (req as Partial<AuthenticatedRequest>)?.user;
  return user?.discordId || "Dashboard";
}

function wikiTextFromBlocks(blocks?: any[]) {
  const text = (blocks || [])
    .filter((block) => block?.type === "text")
    .map((block) => String(block.text || "").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
  return text;
}

function wikiImageFromBlocks(blocks?: any[]) {
  return (blocks || []).find((block) => block?.type === "image" && block.imageDataUrl)?.imageDataUrl || "";
}

function wikiBlocksDto(page: any) {
  const blocks = Array.isArray(page.blocks) ? page.blocks : [];
  if (blocks.length) {
    return blocks.map((block: any) => ({
      id: block.id || new Types.ObjectId().toString(),
      type: block.type === "image" ? "image" : "text",
      text: block.text || "",
      imageDataUrl: block.imageDataUrl || "",
      x: Number.isFinite(block.x) ? block.x : 90,
      y: Number.isFinite(block.y) ? block.y : 90,
      width: Number.isFinite(block.width) ? block.width : 320,
      height: Number.isFinite(block.height) ? block.height : 180,
      fontFamily: wikiFontFamilies.includes(block.fontFamily) ? block.fontFamily : page.fontFamily || "serif",
      fontSize: wikiFontSizes.includes(block.fontSize) ? block.fontSize : page.fontSize || "medium",
      color: /^#[0-9a-fA-F]{6}$/.test(block.color || "") ? block.color : "#3f2a13",
      align: wikiAlignments.includes(block.align) ? block.align : "center"
    }));
  }

  const legacyBlocks: any[] = [];
  if (page.imageDataUrl) {
    legacyBlocks.push({
      id: `legacy-image-${page._id}`,
      type: "image",
      imageDataUrl: page.imageDataUrl,
      x: 150,
      y: 90,
      width: 460,
      height: 260,
      fontFamily: page.fontFamily || "serif",
      fontSize: page.fontSize || "medium",
      color: "#3f2a13",
      align: "center"
    });
  }
  if (page.body) {
    legacyBlocks.push({
      id: `legacy-text-${page._id}`,
      type: "text",
      text: page.body,
      imageDataUrl: "",
      x: 90,
      y: page.imageDataUrl ? 385 : 120,
      width: 580,
      height: page.imageDataUrl ? 360 : 420,
      fontFamily: page.fontFamily || "serif",
      fontSize: page.fontSize || "medium",
      color: "#3f2a13",
      align: "left"
    });
  }
  return legacyBlocks;
}

function wikiPageDto(page: any) {
  const blocks = wikiBlocksDto(page);
  return {
    id: page._id.toString(),
    title: page.title || "Untitled Wiki",
    slug: page.slug || "",
    body: page.body || "",
    imageDataUrl: page.imageDataUrl || "",
    fontFamily: page.fontFamily || "serif",
    fontSize: page.fontSize || "medium",
    blocks,
    status: page.status || "Published",
    createdBy: page.createdBy || "Dashboard",
    updatedBy: page.updatedBy || page.createdBy || "Dashboard",
    createdAt: page.createdAt,
    updatedAt: page.updatedAt
  };
}

function discordMessageLink(message?: any) {
  return env.DISCORD_GUILD_ID && message?.channel_id && message?.id
    ? `https://discord.com/channels/${env.DISCORD_GUILD_ID}/${message.channel_id}/${message.id}`
    : undefined;
}

function formatUtcDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(value)
    .replace(",", "");
}

function normalizeModuleStates(value: unknown) {
  if (value instanceof Map) return Object.fromEntries(value);
  if (value && typeof value === "object") return value;
  return {};
}

function numeric(value: unknown) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function decodeUploadedBase64(value: string) {
  const base64 = value.includes(",") ? value.split(",").pop() || "" : value;
  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length) throw new HttpError(400, "Uploaded roster file is empty.");
  if (buffer.length > 12 * 1024 * 1024) throw new HttpError(413, "Roster file is too large. Please upload a file under 12 MB.");
  return buffer;
}

const monthNames: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11
};

function startOfUtcDay(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

function validDate(value?: Date | null) {
  return value instanceof Date && Number.isFinite(value.getTime());
}

function dateFromUploadFilename(filename?: string) {
  const source = String(filename || "").toLowerCase();
  const iso = source.match(/(20\d{2})[-_ ](\d{1,2})[-_ ](\d{1,2})/);
  if (iso) {
    return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  }

  const named = source.match(/\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec)[-_ ]+(\d{1,2})[-_ ,]+(20\d{2})/);
  if (named) {
    return new Date(Date.UTC(Number(named[3]), monthNames[named[1]] ?? 0, Number(named[2])));
  }

  return undefined;
}

function resolvePowerSnapshotDate(inputDate?: Date, filename?: string) {
  const candidate = validDate(inputDate) ? inputDate : dateFromUploadFilename(filename);
  return startOfUtcDay(candidate ?? new Date());
}

function previousUtcDay(value: Date) {
  return new Date(startOfUtcDay(value).getTime() - 24 * 60 * 60 * 1000);
}

function uploadFileType(filename?: string) {
  const lower = String(filename || "").toLowerCase();
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".csv")) return "csv";
  return "xlsx";
}

function uploadSourceForType(fileType: string) {
  if (fileType === "json") return "TopN JSON";
  if (fileType === "csv") return "TopN CSV";
  return "TopN Excel";
}

function mergePowerHistory(
  history: Array<{ date?: Date | string; power?: number; source?: string; filename?: string }> | undefined,
  snapshotDate: Date,
  power: number,
  source: string,
  filename?: string
) {
  const day = startOfUtcDay(snapshotDate);
  const dayKey = day.toISOString().slice(0, 10);
  const merged = (history || [])
    .map((entry) => ({
      date: validDate(new Date(entry.date || "")) ? startOfUtcDay(new Date(entry.date || "")) : undefined,
      power: numeric(entry.power),
      source: entry.source || "TopN Excel",
      filename: entry.filename || ""
    }))
    .filter((entry) => entry.date && entry.power > 0)
    .filter((entry) => entry.date!.toISOString().slice(0, 10) !== dayKey);

  merged.push({ date: day, power, source, filename: filename || "" });
  return merged
    .sort((left, right) => left.date!.getTime() - right.date!.getTime())
    .slice(-90)
    .map((entry) => ({ date: entry.date, power: entry.power, source: entry.source, filename: entry.filename }));
}

function sanitizeMetricMap(value: unknown) {
  const metrics: Record<string, number> = {};
  if (!value || typeof value !== "object") return metrics;
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(key)) continue;
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) metrics[key] = parsed;
  }
  return metrics;
}

function metricCount(metrics: Record<string, number>) {
  return Object.keys(metrics).length;
}

const uploadedRosterSourcePattern = /^(TopN Excel|TopN JSON|TopN CSV|DragonStats)$/i;
const uploadedRosterRankPattern = /^(TopN Excel|TopN JSON|TopN CSV|DragonStats)(?:\s+#.*)?$/i;
const rosterResetSourcePattern = /^(TopN Excel|TopN JSON|TopN CSV|DragonStats|Dashboard Edit)$/i;

function isUploadedRosterSource(source?: string) {
  return uploadedRosterSourcePattern.test(String(source || ""));
}

function isRosterResetSource(source?: string) {
  return rosterResetSourcePattern.test(String(source || ""));
}

function isUploadedRosterRank(rank?: string) {
  return uploadedRosterRankPattern.test(String(rank || ""));
}

function hasUploadedRosterHistory(member: {
  powerHistory?: Array<{ source?: string }>;
  statHistory?: Array<{ source?: string }>;
}) {
  return (
    (member.powerHistory || []).some((entry) => isUploadedRosterSource(entry.source)) ||
    (member.statHistory || []).some((entry) => isUploadedRosterSource(entry.source))
  );
}

function hasResettableRosterHistory(member: {
  powerHistory?: Array<{ source?: string }>;
  statHistory?: Array<{ source?: string }>;
}) {
  return (
    (member.powerHistory || []).some((entry) => isRosterResetSource(entry.source)) ||
    (member.statHistory || []).some((entry) => isRosterResetSource(entry.source))
  );
}

function latestPowerFromHistory(history: Array<{ date?: Date | string; power?: number }> | undefined) {
  const latest = (history || [])
    .map((entry) => ({
      date: validDate(new Date(entry.date || "")) ? startOfUtcDay(new Date(entry.date || "")) : undefined,
      power: numeric(entry.power)
    }))
    .filter((entry) => entry.date && entry.power > 0)
    .sort((left, right) => left.date!.getTime() - right.date!.getTime())
    .pop();
  return latest?.power || 0;
}

function latestPowerHistoryDate(history: Array<{ date?: Date | string; power?: number }> | undefined) {
  return (history || [])
    .map((entry) => ({
      date: validDate(new Date(entry.date || "")) ? startOfUtcDay(new Date(entry.date || "")) : undefined,
      power: numeric(entry.power)
    }))
    .filter((entry) => entry.date && entry.power > 0)
    .sort((left, right) => left.date!.getTime() - right.date!.getTime())
    .pop()?.date;
}

function mergeStatHistory(
  history: Array<{ date?: Date | string; metrics?: Record<string, unknown>; source?: string; filename?: string }> | undefined,
  snapshotDate: Date,
  metrics: Record<string, number>,
  source: string,
  filename?: string
) {
  const cleanMetrics = sanitizeMetricMap(metrics);
  if (!metricCount(cleanMetrics)) return history || [];

  const day = startOfUtcDay(snapshotDate);
  const dayKey = day.toISOString().slice(0, 10);
  let sameDayMetrics: Record<string, number> = {};
  const merged = (history || [])
    .map((entry) => ({
      date: validDate(new Date(entry.date || "")) ? startOfUtcDay(new Date(entry.date || "")) : undefined,
      metrics: sanitizeMetricMap(entry.metrics),
      source: entry.source || "TopN Excel",
      filename: entry.filename || ""
    }))
    .filter((entry) => entry.date && metricCount(entry.metrics))
    .filter((entry) => {
      const isSameDay = entry.date!.toISOString().slice(0, 10) === dayKey;
      if (isSameDay) sameDayMetrics = { ...sameDayMetrics, ...entry.metrics };
      return !isSameDay;
    });

  merged.push({ date: day, metrics: { ...sameDayMetrics, ...cleanMetrics }, source, filename: filename || "" });
  return merged
    .sort((left, right) => left.date!.getTime() - right.date!.getTime())
    .slice(-90)
    .map((entry) => ({ date: entry.date, metrics: entry.metrics, source: entry.source, filename: entry.filename }));
}

function collapseRepeatedLetters(value: string) {
  return value.replace(/([a-z0-9])\1+/g, "$1");
}

function rosterTokens(value: string) {
  const noise = new Set(["ckr", "kog", "cod", "row", "aga", "alliance", "guild"]);
  return cleanImportedPlayerName(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !noise.has(token) && !/^\d+$/.test(token));
}

function rosterVariants(value: string) {
  const tokens = rosterTokens(value);
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

function namesLookRelated(left?: string, right?: string) {
  const leftVariants = rosterVariants(left || "");
  const rightVariants = rosterVariants(right || "");
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

function memberMatchesName(member: MergeCandidate, name: string) {
  return [member.ign, member.discordDisplayName, member.discordUsername]
    .filter(Boolean)
    .some((value) => namesLookRelated(String(value), name));
}

function discordMemberMatchesRoster(member: MergeCandidate, displayName: string, username: string) {
  return [displayName, username].some((value) => memberMatchesName(member, value));
}

function memberId(value: MergeCandidate) {
  return value._id.toString();
}

function isUploadedOnlyMember(member?: MergeCandidate | null) {
  const discordId = String(member?.discordId || "");
  return discordId.startsWith("xlsx:") || discordId.startsWith("topn:");
}

function isRealDiscordUserId(value?: string) {
  return /^\d{15,25}$/.test(String(value || ""));
}

function isGameUid(value?: string) {
  return /^\d{5,12}$/.test(String(value || ""));
}

function isDiscordOnlyProfile(member?: DashboardMember | null) {
  if (!member) return false;
  const discordId = String(member.discordId || "");
  const uid = String(member.uid || "");
  const hasStatHistory = Boolean((member.powerHistory || []).length || (member.statHistory || []).length);
  return uid === discordId || uid === `discord-${discordId}` || (!isGameUid(uid) && numeric(member.power) === 0 && !hasStatHistory);
}

async function absorbDiscordProfileIntoMember(
  allianceId: string,
  target: DashboardMember,
  duplicate: DashboardMember,
  updateBody: Record<string, unknown>
) {
  if (memberId(target as MergeCandidate) === memberId(duplicate as MergeCandidate)) return;
  if (!isDiscordOnlyProfile(duplicate)) {
    throw new HttpError(
      409,
      "That Discord User ID is already linked to another player with game stats. Remove it from the other profile first."
    );
  }

  if (!updateBody.discordUsername && duplicate.discordUsername) updateBody.discordUsername = duplicate.discordUsername;
  if (!updateBody.discordDisplayName && duplicate.discordDisplayName) updateBody.discordDisplayName = duplicate.discordDisplayName;
  if (!updateBody.discordAvatarUrl && duplicate.discordAvatarUrl) updateBody.discordAvatarUrl = duplicate.discordAvatarUrl;
  if (!updateBody.profilePhotoUrl && !target.profilePhotoUrl && duplicate.profilePhotoUrl) updateBody.profilePhotoUrl = duplicate.profilePhotoUrl;

  await UserModel.updateMany({ memberId: duplicate._id }, { $set: { memberId: target._id } });
  await MemberModel.deleteOne({ _id: duplicate._id, allianceId });
}

function shouldDeleteImportedRosterMember(member: {
  discordId?: string;
  rank?: string;
  powerHistory?: Array<{ source?: string }>;
  statHistory?: Array<{ source?: string }>;
}) {
  if (isUploadedOnlyMember(member as MergeCandidate)) return true;
  if (isRealDiscordUserId(member.discordId)) return false;
  return isUploadedRosterRank(member.rank) || hasUploadedRosterHistory(member);
}

function topnAllianceTag(value?: string) {
  const raw = String(value || "").trim();
  const bracketed = raw.match(/\[([^\]]+)\]/)?.[1] || raw;
  return bracketed.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function isAllowedTopnAlliance(value?: string) {
  const tag = topnAllianceTag(value);
  return !tag || ["kog", "lwl", "mf"].includes(tag);
}

function allowedTopnRows(rows: ImportedTopnMember[]) {
  const allowed: ImportedTopnMember[] = [];
  let excluded = 0;
  for (const row of rows) {
    if (!isAllowedTopnAlliance(row.alliance)) {
      excluded += 1;
      continue;
    }
    allowed.push({ ...row, ign: cleanImportedPlayerName(row.ign) });
  }
  return { allowed, excluded };
}

async function removeUploadedMembersOutsideTopnAlliances(allianceId: string) {
  const uploadedMembers = (await MemberModel.find({
    allianceId,
    discordId: /^(xlsx|topn):/
  })
    .select("_id alliance")
    .limit(5000)
    .lean()) as Array<{ _id: Types.ObjectId; alliance?: string }>;

  const ids = uploadedMembers.filter((member) => !isAllowedTopnAlliance(member.alliance)).map((member) => member._id);
  if (!ids.length) return 0;
  const result = await MemberModel.deleteMany({ allianceId, _id: { $in: ids } });
  return result.deletedCount || 0;
}

function dmAlertContent(input: z.infer<typeof dmAlertToolSchema>) {
  return [`**${input.title.trim()}**`, "", input.message.trim(), "", "Sent by Kella"].join("\n");
}

async function runWithConcurrency<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await worker(item);
    }
  });
  await Promise.all(workers);
}

function discordUserAvatarUrl(discordId?: string, avatar?: string) {
  if (!discordId || !avatar) return "";
  if (avatar.startsWith("http")) return avatar;
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=128`;
}

function dashboardMemberDto(member: any) {
  const powerHistory = (member.powerHistory || [])
    .map((entry: any) => ({
      date: entry.date,
      power: numeric(entry.power),
      source: entry.source || "",
      filename: entry.filename || ""
    }))
    .filter((entry: any) => entry.date && entry.power > 0)
    .sort((left: any, right: any) => new Date(left.date).getTime() - new Date(right.date).getTime());
  const statHistory = (member.statHistory || [])
    .map((entry: any) => ({
      date: entry.date,
      metrics: sanitizeMetricMap(entry.metrics),
      source: entry.source || "",
      filename: entry.filename || ""
    }))
    .filter((entry: any) => entry.date && metricCount(entry.metrics))
    .sort((left: any, right: any) => new Date(left.date).getTime() - new Date(right.date).getTime());
  const statDays = new Set(statHistory.map((entry: any) => new Date(entry.date).toISOString().slice(0, 10)));
  for (const entry of powerHistory) {
    const key = new Date(entry.date).toISOString().slice(0, 10);
    if (!statDays.has(key)) {
      statHistory.push({
        date: entry.date,
        metrics: { power: entry.power },
        source: entry.source,
        filename: entry.filename
      });
      statDays.add(key);
    }
  }

  return {
    id: member._id.toString(),
    mainMemberId: member.mainMemberId?.toString?.() || member.mainMemberId || "",
    discordId: member.discordId,
    discordName: member.discordDisplayName || member.ign || member.discordId,
    discordUsername: member.discordUsername || member.discordId,
    discordDisplayName: member.discordDisplayName || member.ign || member.discordUsername || member.discordId,
    discordAvatarUrl: member.discordAvatarUrl || "",
    profilePhotoUrl: member.profilePhotoUrl || "",
    ign: member.ign,
    uid: member.uid,
    rank: member.rank,
    role: member.role,
    attendance: member.attendanceScore,
    notes: member.notes,
    alliance: member.alliance,
    power: member.power,
    powerHistory,
    statHistory: statHistory.sort((left: any, right: any) => new Date(left.date).getTime() - new Date(right.date).getTime()),
    timezone: member.timezone,
    country: member.country
  };
}

async function findMemberForGameRow(allianceId: string, uid: string, ign: string) {
  const exact = ((await MemberModel.findOne({ allianceId, uid }).select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory").lean()) ??
    (await MemberModel.findOne({ allianceId, ign }).select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory").lean())) as MergeCandidate | null;

  const candidates = (await MemberModel.find({
    allianceId,
    $or: [
      { discordAvatarUrl: { $ne: "" } },
      { discordUsername: { $ne: "" } },
      { discordDisplayName: { $ne: "" } },
      { discordId: { $not: /^(xlsx|topn):/ } }
    ]
  })
    .select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory")
    .limit(1200)
    .lean()) as MergeCandidate[];

  const profileMatch = candidates.find((candidate) => memberMatchesName(candidate, ign)) ?? null;
  if (profileMatch && exact && memberId(profileMatch) !== memberId(exact) && isUploadedOnlyMember(exact)) {
    await MemberModel.deleteOne({ _id: exact._id, allianceId });
    return profileMatch;
  }

  return exact ?? profileMatch;
}

async function findMemberForDiscordProfile(allianceId: string, discordId: string, displayName: string, username: string) {
  const exact = (await MemberModel.findOne({ allianceId, discordId }).select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory").lean()) as MergeCandidate | null;
  if (exact) return exact;

  const legacyDiscordOnly = (await MemberModel.findOne({
    allianceId,
    uid: { $in: [discordId, `discord-${discordId}`] }
  })
    .select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory")
    .lean()) as MergeCandidate | null;
  if (legacyDiscordOnly) return legacyDiscordOnly;

  const candidates = (await MemberModel.find({
    allianceId,
    discordId: /^(xlsx|topn):/
  })
    .select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory")
    .limit(1200)
    .lean()) as MergeCandidate[];

  return candidates.find((candidate) => discordMemberMatchesRoster(candidate, displayName, username)) ?? null;
}

type GameStatSnapshot = {
  rows: ImportedTopnMember[];
  snapshotDate: Date;
  source: string;
  filename?: string;
};

function importRank(source: string, rank?: string) {
  const cleanRank = String(rank || "").trim();
  if (cleanRank) return `${source} #${cleanRank}`;
  return source;
}

function memberSearchNames(member: MergeCandidate) {
  return [member.ign, member.discordDisplayName, member.discordUsername].filter(Boolean).map(String);
}

function preferProfileCandidate(current: MergeCandidate | undefined, next: MergeCandidate) {
  if (!current) return next;
  if (isUploadedOnlyMember(current) && !isUploadedOnlyMember(next)) return next;
  return current;
}

function syncErrorMessage(error: unknown) {
  const err = error as { code?: unknown; name?: string; message?: string; keyPattern?: Record<string, unknown> };
  if (Number(err?.code) === 11000) {
    const fields = Object.keys(err.keyPattern || {}).join(", ");
    return fields ? `Duplicate member data for ${fields}.` : "Duplicate member data.";
  }
  if (err?.name === "ValidationError") return err.message || "Member data failed validation.";
  if (err?.name === "CastError") return err.message || "Member data has an invalid database ID.";
  return err?.message || "Unknown member sync error.";
}

async function bulkWriteMemberOps(ops: any[]) {
  for (let index = 0; index < ops.length; index += 400) {
    const chunk = ops.slice(index, index + 400);
    if (chunk.length) await MemberModel.bulkWrite(chunk, { ordered: false });
  }
}

async function resetUploadedRosterData(allianceId: string) {
  const members = (await MemberModel.find({ allianceId })
    .select("_id discordId uid power powerHistory statHistory rank")
    .limit(5000)
    .lean()) as Array<{
      _id: Types.ObjectId;
      discordId?: string;
      uid?: string;
      power?: number;
      rank?: string;
      powerHistory?: Array<{ date?: Date | string; power?: number; source?: string; filename?: string }>;
      statHistory?: Array<{ date?: Date | string; metrics?: Record<string, unknown>; source?: string; filename?: string }>;
    }>;

  const ops: any[] = [];
  let deletedUploadedOnly = 0;
  let resetProfiles = 0;

  for (const member of members) {
    const hadUploadedData = hasUploadedRosterHistory(member) || isUploadedRosterRank(member.rank);
    const hadResettableData = hasResettableRosterHistory(member) || isUploadedRosterRank(member.rank);
    const powerHistory = (member.powerHistory || []).filter((entry) => !isRosterResetSource(entry.source));
    const statHistory = (member.statHistory || []).filter((entry) => !isRosterResetSource(entry.source));
    const preservedPower = latestPowerFromHistory(powerHistory);
    const looksLikeStaleImportedDiscordPower =
      isRealDiscordUserId(member.discordId) &&
      isGameUid(member.uid) &&
      numeric(member.power) > 0 &&
      String(member.rank || "").toLowerCase() === "discord" &&
      !preservedPower;

    if (shouldDeleteImportedRosterMember(member)) {
      deletedUploadedOnly += 1;
      ops.push({ deleteOne: { filter: { _id: member._id, allianceId } } });
      continue;
    }

    if (!hadUploadedData && !hadResettableData && !looksLikeStaleImportedDiscordPower) continue;

    const update: Record<string, unknown> = {
      powerHistory,
      statHistory,
      power: preservedPower
    };
    if (isUploadedRosterRank(member.rank)) update.rank = "Discord";
    resetProfiles += 1;
    ops.push({
      updateOne: {
        filter: { _id: member._id, allianceId },
        update: { $set: update }
      }
    });
  }

  await bulkWriteMemberOps(ops);
  return {
    removedUploadedOnly: deletedUploadedOnly,
    resetProfiles
  };
}

async function importGameStatSnapshots(
  alliance: any,
  snapshots: GameStatSnapshot[],
  fallbackDiscordPrefix: "xlsx" | "topn"
) {
  const allianceId = alliance._id.toString();
  const now = new Date();
  const existingMembers = (await MemberModel.find({ allianceId })
    .select("_id ign discordId discordUsername discordDisplayName uid power powerHistory statHistory rank alliance")
    .limit(5000)
    .lean()) as MergeCandidate[];

  const byUid = new Map<string, MergeCandidate>();
  const byIgn = new Map<string, MergeCandidate>();
  const byVariant = new Map<string, MergeCandidate>();
  const deletedIds = new Set<string>();
  const changed = new Map<string, MergeCandidate>();
  const createdIds = new Set<string>();
  const updatedIds = new Set<string>();
  const mergedIds = new Set<string>();

  const isLive = (member?: MergeCandidate | null) => Boolean(member && !deletedIds.has(memberId(member)));

  const indexCandidate = (member: MergeCandidate) => {
    if (!isLive(member)) return;
    if (member.uid) byUid.set(String(member.uid), member);
    if (member.ign) byIgn.set(String(member.ign).trim().toLowerCase(), member);
    if (isUploadedOnlyMember(member)) return;
    for (const name of memberSearchNames(member)) {
      for (const variant of rosterVariants(name)) {
        byVariant.set(variant, preferProfileCandidate(byVariant.get(variant), member));
      }
    }
  };

  const findCandidate = (uid: string, ign: string) => {
    const exact = [byUid.get(uid), byIgn.get(ign.trim().toLowerCase())].find(isLive) ?? null;
    let profileMatch: MergeCandidate | null = null;
    for (const variant of rosterVariants(ign)) {
      const candidate = byVariant.get(variant);
      if (isLive(candidate)) {
        profileMatch = candidate;
        break;
      }
    }

    if (profileMatch && exact && memberId(profileMatch) !== memberId(exact) && isUploadedOnlyMember(exact)) {
      deletedIds.add(memberId(exact));
      return profileMatch;
    }

    return exact ?? profileMatch;
  };

  existingMembers.forEach(indexCandidate);

  let total = 0;
  let skipped = 0;
  for (const snapshot of snapshots) {
    const source = snapshot.source;
    const filename = snapshot.filename;
    const snapshotDate = resolvePowerSnapshotDate(snapshot.snapshotDate, filename);
    for (const row of snapshot.rows) {
      total += 1;
      const uid = String(row.uid || "").trim();
      const ign = String(row.ign || "").trim();
      const power = numeric(row.power);
      if (!uid || !ign || !power) {
        skipped += 1;
        continue;
      }

      let candidate = findCandidate(uid, ign);
      const stats = sanitizeMetricMap({ ...row.stats, power });
      if (!candidate) {
        candidate = {
          _id: new Types.ObjectId(),
          discordId: `${fallbackDiscordPrefix}:${uid}`,
          ign,
          uid,
          power: 0,
          powerHistory: [],
          statHistory: [],
          alliance: row.alliance || alliance.tag || alliance.name || "Imported",
          rank: importRank(source, row.rank)
        };
        createdIds.add(memberId(candidate));
        indexCandidate(candidate);
      } else {
        updatedIds.add(memberId(candidate));
        if (!isUploadedOnlyMember(candidate)) mergedIds.add(memberId(candidate));
      }

      const previousLatestDate = latestPowerHistoryDate(candidate.powerHistory);
      const isCurrentSnapshot = !previousLatestDate || snapshotDate.getTime() >= previousLatestDate.getTime();
      candidate.uid = uid;
      candidate.ign = ign;
      candidate.powerHistory = mergePowerHistory(candidate.powerHistory, snapshotDate, power, source, filename);
      candidate.statHistory = mergeStatHistory(candidate.statHistory, snapshotDate, stats, source, filename);
      candidate.power = latestPowerFromHistory(candidate.powerHistory);
      if (isCurrentSnapshot) {
        candidate.alliance = row.alliance || candidate.alliance || alliance.tag || alliance.name || "Imported";
        candidate.rank = importRank(source, row.rank);
      }
      changed.set(memberId(candidate), candidate);
      indexCandidate(candidate);
    }
  }

  const ops: any[] = Array.from(deletedIds).map((id) => ({ deleteOne: { filter: { _id: id, allianceId } } }));
  for (const member of changed.values()) {
    if (deletedIds.has(memberId(member))) continue;
    ops.push({
      updateOne: {
        filter: { _id: member._id, allianceId },
        update: {
          $set: {
            uid: member.uid,
            ign: member.ign,
            power: numeric(member.power),
            powerHistory: member.powerHistory || [],
            statHistory: member.statHistory || [],
            alliance: member.alliance || alliance.tag || alliance.name || "Imported",
            rank: member.rank || "Imported",
            lastActivity: now
          },
          $setOnInsert: {
            allianceId,
            discordId: member.discordId || `${fallbackDiscordPrefix}:${member.uid}`,
            role: "Member",
            timezone: alliance.timezone || "UTC",
            country: "Unknown",
            joinDate: now,
            attendanceScore: 0,
            warScore: 0,
            contributionScore: 0,
            notes: ""
          }
        },
        upsert: true
      }
    });
  }

  await bulkWriteMemberOps(ops);

  return {
    total,
    created: createdIds.size,
    updated: updatedIds.size,
    merged: mergedIds.size,
    skipped,
    deletedDuplicates: deletedIds.size
  };
}

function publicSettings(alliance: any) {
  const settings = alliance.settings || {};
  return {
    alliance: {
      id: alliance._id.toString(),
      name: alliance.name,
      tag: alliance.tag,
      timezone: alliance.timezone
    },
    settings: {
      announcementChannel: settings.announcementChannel || "",
      attendanceChannel: settings.attendanceChannel || "",
      alertChannel: settings.alertChannel || "",
      officerRoles: settings.officerRoles || ["Leader", "R4 Officer", "War Marshal", "Event Manager", "Recruiter"],
      moduleStates: normalizeModuleStates(settings.moduleStates)
    }
  };
}

function summarizeRootsResponses(responses: any[], slot: string) {
  const scoped = responses.filter((response) => response.slot === slot);
  return {
    available: scoped.filter((response) => response.status === "Available").length,
    absent: scoped.filter((response) => response.status === "Absent").length,
    unsure: scoped.filter((response) => response.status === "Not Sure").length
  };
}

function summarizeEventResponses(responses: DashboardAction[]) {
  const byStatus = (status: string) => responses.filter((response) => response.status === status).map((response) => displayName(response));
  const attending = byStatus("Attending");
  const absent = byStatus("Absent");
  const unsure = byStatus("Not Sure");
  return {
    attending,
    absent,
    unsure,
    attendingCount: attending.length,
    absentCount: absent.length,
    unsureCount: unsure.length,
    total: attending.length + absent.length + unsure.length
  };
}

export const dashboardSummary = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const today = startOfToday();
  const recentWindow = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    totalMembers,
    todayCheckIns,
    activeAlerts,
    pendingShieldWarnings,
    pendingApplications,
    latestRoots,
    recentRegistrations,
    latestShieldAlerts,
    recentAdminActions
  ] =
    await Promise.all([
      MemberModel.countDocuments(filter),
      KellaActionModel.countDocuments({ ...filter, type: "daily_checkin", sentAt: { $gte: today } }),
      KellaActionModel.countDocuments({ ...filter, type: { $in: ["attack_alert", "dm_alert"] }, sentAt: { $gte: recentWindow } }),
      KellaActionModel.countDocuments({ ...filter, type: "shield_alert", sentAt: { $gte: recentWindow } }),
      KellaActionModel.countDocuments({ ...filter, type: "application", status: "Pending" }),
      KellaActionModel.findOne({ ...filter, type: "roots_registration" }).sort({ sentAt: -1 }).lean(),
      KellaActionModel.find({ ...filter, type: "roots_response" }).sort({ sentAt: -1 }).limit(8).lean(),
      KellaActionModel.find({ ...filter, type: "shield_alert" }).sort({ sentAt: -1 }).limit(5).lean(),
      KellaActionModel.find({ ...filter, type: { $in: ["shield_alert", "attack_alert", "dm_alert", "event_reminder", "embed_sent", "chat_sent", "roots_report_sent", "discord_member_sync", "member_xlsx_import", "member_manual_add", "member_deleted", "event_deleted"] } })
        .sort({ sentAt: -1 })
        .limit(8)
        .lean()
    ]);
  const latestRootsAction = latestRoots as DashboardAction | null;
  const recentRootsRegistrations = recentRegistrations as DashboardAction[];
  const shieldAlerts = latestShieldAlerts as DashboardAction[];
  const adminActions = recentAdminActions as DashboardAction[];

  const latestRootsId = latestRootsAction?._id?.toString();
  const rootsResponses = latestRootsId
    ? ((await KellaActionModel.find({
        ...filter,
        type: "roots_response",
        $or: [{ reportId: latestRootsId }, { reportId: { $exists: false } }, { reportId: "" }]
      }).lean()) as DashboardAction[])
    : [];

  res.json({
    botStatus: env.DISCORD_BOT_TOKEN ? "Configured" : "Missing Discord bot token",
    totalMembers,
    todayCheckIns,
    activeAlerts,
    pendingShieldWarnings,
    pendingApplications,
    upcomingRoots: latestRootsAction
      ? {
          id: latestRootsId,
          date: latestRootsAction.sentAt,
          createdBy: latestRootsAction.actorName || "Unknown Officer",
          slots: rootsSlots.map((slot) => ({ slot, label: slotLabel(slot), ...summarizeRootsResponses(rootsResponses, slot) }))
        }
      : undefined,
    recentRegistrations: recentRootsRegistrations.map((registration) => ({
      id: registration._id.toString(),
      player: displayName(registration),
      slot: registration.slot,
      status: registration.status,
      sentAt: registration.sentAt
    })),
    latestShieldAlerts: shieldAlerts.map((alert) => ({
      id: alert._id.toString(),
      officer: alert.actorName || alert.actorDiscordId || "Dashboard",
      player: displayName(alert),
      sentAt: alert.sentAt
    })),
    recentAdminActions: adminActions.map((action) => ({
      id: action._id.toString(),
      type: action.type,
      officer: action.actorName || action.actorDiscordId || "Dashboard",
      target: action.targetName || action.targetDiscordId || action.status || "",
      sentAt: action.sentAt
    }))
  });
});

export const dashboardMembers = asyncHandler(async (req, res) => {
  const allianceId = await resolveAllianceId();
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const filter: Record<string, unknown> = allianceFilter(allianceId);
  if (q) {
    filter.$or = [
      { ign: { $regex: q, $options: "i" } },
      { uid: { $regex: q, $options: "i" } },
      { discordId: { $regex: q, $options: "i" } },
      { discordUsername: { $regex: q, $options: "i" } },
      { discordDisplayName: { $regex: q, $options: "i" } },
      { role: { $regex: q, $options: "i" } }
    ];
  }

  const members = (await MemberModel.find(filter)
    .sort({ power: -1, attendanceScore: -1, ign: 1 })
    .limit(2000)
    .select("mainMemberId discordId discordUsername discordDisplayName discordAvatarUrl profilePhotoUrl ign uid rank role timezone country attendanceScore notes alliance power powerHistory statHistory")
    .lean()) as DashboardMember[];

  res.json({
    members: members.map(dashboardMemberDto)
  });
});

async function findOrCreateProfileMember(user: { id: string; discordId: string; allianceId: string }) {
  const dbUser = (await UserModel.findById(user.id).lean()) as any;
  const alliance = await AllianceModel.findById(user.allianceId).lean() as any;
  const displayName = dbUser?.username || user.discordId;
  const existing =
    ((await MemberModel.findOne({ allianceId: user.allianceId, discordId: user.discordId }).lean()) as any) ||
    ((await findMemberForDiscordProfile(user.allianceId, user.discordId, displayName, displayName)) as any);

  if (existing) {
    await UserModel.updateOne({ _id: user.id }, { $set: { memberId: existing._id } });
    return MemberModel.findByIdAndUpdate(
      existing._id,
      {
        $set: {
          discordId: user.discordId,
          discordDisplayName: existing.discordDisplayName || displayName,
          discordUsername: existing.discordUsername || displayName,
          discordAvatarUrl: existing.discordAvatarUrl || discordUserAvatarUrl(user.discordId, dbUser?.avatar)
        }
      },
      { new: true }
    ).lean();
  }

  const created = await MemberModel.create({
    allianceId: user.allianceId,
    discordId: user.discordId,
    discordUsername: displayName,
    discordDisplayName: displayName,
    discordAvatarUrl: discordUserAvatarUrl(user.discordId, dbUser?.avatar),
    ign: displayName,
    uid: `discord-${user.discordId}`,
    power: 0,
    alliance: alliance?.tag || alliance?.name || "Kella",
    rank: "R1",
    role: "Member",
    timezone: alliance?.timezone || "UTC",
    country: "Unknown",
    notes: ""
  });
  await UserModel.updateOne({ _id: user.id }, { $set: { memberId: created._id } });
  return created.toObject();
}

export const dashboardProfile = asyncHandler(async (req, res) => {
  const user = (req as AuthenticatedRequest).user;
  const member = await findOrCreateProfileMember(user);
  res.json({ member: dashboardMemberDto(member) });
});

export const dashboardProfileUpdate = asyncHandler(async (req, res) => {
  const user = (req as AuthenticatedRequest).user;
  const body = profileUpdateSchema.parse(req.body);
  const member = await findOrCreateProfileMember(user);
  const updated = await MemberModel.findOneAndUpdate(
    { _id: member._id, allianceId: user.allianceId, discordId: user.discordId },
    { $set: body },
    { new: true, runValidators: true }
  ).lean();
  if (!updated) throw new HttpError(404, "Profile not found");
  res.json({ member: dashboardMemberDto(updated) });
});

export const dashboardMemberCreate = asyncHandler(async (req, res) => {
  const body = dashboardMemberCreateSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const allianceId = alliance._id.toString();
  const now = new Date();
  const metrics = sanitizeMetricMap({ ...(body.stats || {}), power: body.power });
  const uid = body.uid.trim();
  const ign = body.ign.trim();
  const requestedMainMemberId = typeof body.mainMemberId === "string" ? body.mainMemberId.trim() : "";

  let existing = (await MemberModel.findOne({ allianceId, uid })
    .select("_id discordId discordUsername discordDisplayName discordAvatarUrl profilePhotoUrl uid power powerHistory statHistory")
    .lean()) as DashboardMember | null;
  const requestedDiscordId = body.discordId?.trim();
  const duplicateDiscordProfile = requestedDiscordId
    ? ((await MemberModel.findOne({
        allianceId,
        discordId: requestedDiscordId,
        ...(existing ? { _id: { $ne: existing._id } } : {})
      })
        .select("_id discordId discordUsername discordDisplayName discordAvatarUrl profilePhotoUrl uid power powerHistory statHistory")
        .lean()) as DashboardMember | null)
    : null;

  if (duplicateDiscordProfile) {
    if (existing) {
      await absorbDiscordProfileIntoMember(allianceId, existing, duplicateDiscordProfile, {});
      existing = {
        ...existing,
        discordUsername: existing.discordUsername || duplicateDiscordProfile.discordUsername,
        discordDisplayName: existing.discordDisplayName || duplicateDiscordProfile.discordDisplayName,
        discordAvatarUrl: existing.discordAvatarUrl || duplicateDiscordProfile.discordAvatarUrl,
        profilePhotoUrl: existing.profilePhotoUrl || duplicateDiscordProfile.profilePhotoUrl
      };
    } else {
      if (!isDiscordOnlyProfile(duplicateDiscordProfile)) {
        throw new HttpError(
          409,
          "That Discord User ID is already linked to another player with game stats. Remove it from the other profile first."
        );
      }
      existing = duplicateDiscordProfile;
    }
  }

  const discordId = requestedDiscordId || existing?.discordId || `manual:${uid}`;
  if (requestedMainMemberId) {
    if (!Types.ObjectId.isValid(requestedMainMemberId)) throw new HttpError(400, "Invalid main account id");
    if (existing && String(requestedMainMemberId) === String(existing._id)) throw new HttpError(400, "A player cannot be their own farm account.");
    const parent = (await MemberModel.findOne({ allianceId, _id: requestedMainMemberId }).select("_id mainMemberId").lean()) as DashboardMember | null;
    if (!parent) throw new HttpError(404, "Main account not found");
    if (existing && parent.mainMemberId && String(parent.mainMemberId) === String(existing._id)) throw new HttpError(400, "This would create a farm loop.");
  }

  const updateBody = {
    discordId,
    ...(requestedMainMemberId ? { mainMemberId: requestedMainMemberId } : {}),
    discordUsername: body.discordUsername?.trim() || existing?.discordUsername || "",
    discordDisplayName: body.discordDisplayName?.trim() || existing?.discordDisplayName || ign,
    discordAvatarUrl: body.discordAvatarUrl?.trim() || existing?.discordAvatarUrl || "",
    profilePhotoUrl: body.profilePhotoUrl?.trim() || existing?.profilePhotoUrl || "",
    ign,
    uid,
    power: numeric(body.power),
    alliance: body.alliance?.trim() || alliance.tag || alliance.name || "Manual",
    rank: body.rank?.trim() || "Manual",
    role: body.role || "Member",
    timezone: body.timezone?.trim() || alliance.timezone || "UTC",
    country: body.country?.trim() || "Unknown",
    lastActivity: now,
    notes: body.notes?.trim() || "",
    powerHistory: body.power > 0 ? mergePowerHistory(existing?.powerHistory, now, numeric(body.power), "Dashboard Manual Add") : existing?.powerHistory || [],
    statHistory: metricCount(metrics) ? mergeStatHistory(existing?.statHistory, now, metrics, "Dashboard Manual Add") : existing?.statHistory || []
  };

  const member = await MemberModel.findOneAndUpdate(
    existing ? { _id: existing._id, allianceId } : { allianceId, uid },
    {
      $set: updateBody,
      $setOnInsert: {
        allianceId,
        joinDate: now,
        attendanceScore: 0,
        warScore: 0,
        contributionScore: 0
      }
    },
    { new: true, upsert: true, runValidators: true }
  ).lean();

  await KellaActionModel.create({
    allianceId,
    type: "member_manual_add",
    actorName: "Dashboard",
    targetDiscordId: discordId,
    targetName: ign,
    status: existing ? "Updated" : "Created",
    payload: { uid, power: numeric(body.power), metrics }
  });

  res.status(existing ? 200 : 201).json({ member: dashboardMemberDto(member), created: !existing });
});

export const dashboardMemberUpdate = asyncHandler(async (req, res) => {
  const body = dashboardMemberUpdateSchema.parse(req.body);
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid member id");
  const allianceId = await resolveAllianceId();
  const existing = (await MemberModel.findOne({ _id: req.params.id, ...allianceFilter(allianceId) })
    .select("_id mainMemberId discordId discordUsername discordDisplayName discordAvatarUrl profilePhotoUrl uid power powerHistory statHistory")
    .lean()) as DashboardMember | null;
  if (!existing) throw new HttpError(404, "Member not found");

  const updateBody: Record<string, unknown> = {};
  const unsetBody: Record<string, string> = {};
  for (const key of ["ign", "uid", "power", "alliance", "rank", "role", "timezone", "country", "profilePhotoUrl", "discordAvatarUrl", "notes"] as const) {
    if (body[key] !== undefined) updateBody[key] = body[key];
  }

  if (body.mainMemberId !== undefined) {
    const requestedMainMemberId = typeof body.mainMemberId === "string" ? body.mainMemberId.trim() : "";
    if (!requestedMainMemberId) {
      unsetBody.mainMemberId = "";
    } else {
      if (!Types.ObjectId.isValid(requestedMainMemberId)) throw new HttpError(400, "Invalid main account id");
      if (String(requestedMainMemberId) === String(existing._id)) throw new HttpError(400, "A player cannot be their own farm account.");
      const parent = (await MemberModel.findOne({ _id: requestedMainMemberId, ...allianceFilter(allianceId) })
        .select("_id mainMemberId ign")
        .lean()) as DashboardMember | null;
      if (!parent) throw new HttpError(404, "Main account not found");
      if (parent.mainMemberId && String(parent.mainMemberId) === String(existing._id)) throw new HttpError(400, "This would create a farm loop.");
      updateBody.mainMemberId = requestedMainMemberId;
    }
  }

  if (body.discordId) {
    const duplicateDiscordProfile = (await MemberModel.findOne({
      allianceId,
      discordId: body.discordId,
      _id: { $ne: existing._id }
    })
      .select("_id discordId discordUsername discordDisplayName discordAvatarUrl profilePhotoUrl uid power powerHistory statHistory")
      .lean()) as DashboardMember | null;
    if (duplicateDiscordProfile) {
      await absorbDiscordProfileIntoMember(allianceId || "", existing, duplicateDiscordProfile, updateBody);
    }
    updateBody.discordId = body.discordId;
  }

  if (body.power !== undefined) {
    updateBody.powerHistory = mergePowerHistory(existing?.powerHistory, new Date(), numeric(body.power), "Dashboard Edit");
    updateBody.statHistory = mergeStatHistory(existing?.statHistory, new Date(), { power: numeric(body.power) }, "Dashboard Edit");
  }
  const updateOperation: Record<string, unknown> = {};
  if (Object.keys(updateBody).length) updateOperation.$set = updateBody;
  if (Object.keys(unsetBody).length) updateOperation.$unset = unsetBody;
  const updated = await MemberModel.findOneAndUpdate(
    { _id: req.params.id, ...allianceFilter(allianceId) },
    updateOperation,
    { new: true, runValidators: true }
  ).lean();
  if (!updated) throw new HttpError(404, "Member not found");
  res.json({ member: dashboardMemberDto(updated) });
});

export const dashboardMemberDelete = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid member id");
  const allianceId = await resolveAllianceId();
  const deleted = (await MemberModel.findOneAndDelete({ _id: req.params.id, ...allianceFilter(allianceId) }).lean()) as DashboardMember | null;
  if (!deleted) throw new HttpError(404, "Member not found");

  await UserModel.updateMany({ memberId: deleted._id }, { $unset: { memberId: "" } });
  await MemberModel.updateMany({ mainMemberId: deleted._id, ...allianceFilter(allianceId) }, { $unset: { mainMemberId: "" } });
  await KellaActionModel.create({
    allianceId,
    type: "member_deleted",
    actorName: "Dashboard",
    targetDiscordId: deleted.discordId,
    targetName: deleted.ign || deleted.discordDisplayName || deleted.discordUsername || "Deleted member",
    status: "Completed",
    payload: { uid: deleted.uid, power: numeric(deleted.power) }
  });

  res.json({ ok: true, deletedMember: { id: deleted._id.toString(), ign: deleted.ign || "" } });
});

export const dashboardMemberXlsxImport = asyncHandler(async (req, res) => {
  const body = memberRosterImportSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const allianceId = alliance._id.toString();
  const syncedAt = new Date();
  const snapshotDate = resolvePowerSnapshotDate(body.snapshotDate, body.filename);
  const filename = body.filename || "members.xlsx";
  const fileType = uploadFileType(filename);
  const source = uploadSourceForType(fileType);
  const buffer = decodeUploadedBase64(body.fileBase64);
  const snapshots: GameStatSnapshot[] = [];
  let excluded = 0;

  if (fileType === "json") {
    const parsed = parseTopnJson(buffer);
    const current = allowedTopnRows(parsed.current);
    const previous = allowedTopnRows(parsed.previous || []);
    excluded = current.excluded;
    if (!current.allowed.length) throw new HttpError(400, "No KoG, LWL, or mF members were found in this JSON file.");
    if (previous.allowed.length) {
      snapshots.push({ rows: previous.allowed, snapshotDate: previousUtcDay(snapshotDate), source, filename });
    }
    snapshots.push({ rows: current.allowed, snapshotDate, source, filename });
  } else {
    const parsedRows = fileType === "csv" ? parseTopnCsv(buffer) : parseTopnWorkbook(buffer);
    const allowed = allowedTopnRows(parsedRows);
    excluded = allowed.excluded;
    if (!allowed.allowed.length) throw new HttpError(400, `No KoG, LWL, or mF members were found in this ${fileType === "csv" ? "CSV" : "Excel"} file.`);
    snapshots.push({ rows: allowed.allowed, snapshotDate, source, filename });
  }

  const result = await importGameStatSnapshots(
    alliance,
    snapshots,
    fileType === "xlsx" ? "xlsx" : "topn"
  );
  const removedOtherAlliances = await removeUploadedMembersOutsideTopnAlliances(allianceId);

  await KellaActionModel.create({
    allianceId,
    type: "member_xlsx_import",
    actorName: "Dashboard",
    status: "Completed",
    payload: {
      filename,
      fileType,
      source,
      snapshotDate,
      previousSnapshotDate: fileType === "json" && snapshots.length > 1 ? snapshots[0]?.snapshotDate : undefined,
      excluded,
      removedOtherAlliances,
      ...result
    }
  });

  res.json({ ...result, excluded, removedOtherAlliances, syncedAt, snapshotDate, fileType });
});

export const dashboardDiscordMemberSync = asyncHandler(async (_req, res) => {
  const alliance = await resolveAlliance();
  const allianceId = alliance._id.toString();
  const syncedAt = new Date();
  const discordMembers = await listDiscordGuildMembers();
  let created = 0;
  let updated = 0;
  let merged = 0;
  let skipped = 0;
  const failures: Array<{ discordId: string; name: string; message: string }> = [];

  for (const member of discordMembers) {
    try {
      const existing = (await findMemberForDiscordProfile(
        allianceId,
        member.discordId,
        member.discordDisplayName,
        member.discordUsername
      )) as any;
      const update: any = {
        $set: {
          discordId: member.discordId,
          discordUsername: member.discordUsername,
          discordDisplayName: member.discordDisplayName,
          discordAvatarUrl: member.discordAvatarUrl,
          lastActivity: syncedAt
        },
        $setOnInsert: {
          allianceId,
          ign: member.discordDisplayName || member.discordUsername || member.discordId,
          uid: `discord-${member.discordId}`,
          power: 0,
          alliance: alliance.tag || alliance.name || "Discord",
          rank: "Discord",
          role: "Member",
          timezone: alliance.timezone || "UTC",
          country: "Unknown",
          joinDate: member.joinedAt ? new Date(member.joinedAt) : syncedAt,
          attendanceScore: 0,
          warScore: 0,
          contributionScore: 0,
          notes: ""
        }
      };
      const result = existing
        ? await MemberModel.updateOne({ _id: existing._id, allianceId }, update, { runValidators: true })
        : await MemberModel.updateOne({ allianceId, discordId: member.discordId }, update, { upsert: true, runValidators: true });

      if (result.upsertedCount) created += result.upsertedCount;
      else if (result.modifiedCount || result.matchedCount) {
        updated += 1;
        if (isUploadedOnlyMember(existing)) merged += 1;
      }
    } catch (error) {
      skipped += 1;
      const failure = {
        discordId: member.discordId,
        name: member.discordDisplayName || member.discordUsername || member.discordId,
        message: syncErrorMessage(error)
      };
      if (failures.length < 10) failures.push(failure);
      console.error("[dashboardDiscordMemberSync] skipped member", failure);
    }
  }

  if (!created && !updated && skipped === discordMembers.length && failures.length) {
    throw new HttpError(500, `Discord sync could not save members. First error: ${failures[0]?.name}: ${failures[0]?.message}`);
  }

  await KellaActionModel.create({
    allianceId,
    type: "discord_member_sync",
    actorName: "Dashboard",
    status: skipped ? "Completed with warnings" : "Completed",
    payload: { total: discordMembers.length, created, updated, merged, skipped, failures }
  });

  res.json({ total: discordMembers.length, created, updated, merged, skipped, failures, syncedAt });
});

export const dashboardAlerts = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const alerts = (await KellaActionModel.find({
    ...filter,
    type: { $in: ["shield_alert", "attack_alert", "dm_alert", "attack_response"] }
  })
    .sort({ sentAt: -1 })
    .limit(100)
    .lean()) as DashboardAction[];

  res.json({
    alerts: alerts.map((alert) => ({
      id: alert._id.toString(),
      type: alert.type,
      officer: alert.actorName || alert.actorDiscordId,
      player: alert.targetName || alert.targetDiscordId,
      status: alert.status,
      sentAt: alert.sentAt,
      payload: alert.payload || {}
    }))
  });
});

export const dashboardEvents = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const events = (await KellaActionModel.find({ ...filter, type: "event_created" })
    .sort({ sentAt: -1 })
    .limit(100)
    .lean()) as DashboardAction[];
  const eventIds = events.map((event) => event._id.toString());
  const responses = eventIds.length
    ? ((await KellaActionModel.find({ ...filter, type: "event_response", reportId: { $in: eventIds } }).sort({ actorName: 1 }).lean()) as DashboardAction[])
    : [];

  res.json({
    events: events.map((event) => {
      const id = event._id.toString();
      const eventResponses = responses.filter((response) => response.reportId === id);
      return {
        id,
        title: event.eventType || event.payload?.title || "Alliance Event",
        description: event.payload?.description || "",
        startsAt: event.payload?.startsAt,
        channelId: event.payload?.channelId || event.targetDiscordId || "",
        messageLink: event.payload?.messageLink,
        status: event.status || "Sent",
        createdBy: event.actorName || "Dashboard",
        sentAt: event.sentAt,
        attendance: summarizeEventResponses(eventResponses)
      };
    })
  });
});

export const dashboardEventSend = asyncHandler(async (req, res) => {
  const body = eventCreateSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const startsAt = new Date(body.startsAt);
  if (Number.isNaN(startsAt.getTime())) throw new HttpError(400, "Event time is invalid");

  const description = body.description.trim();

  const action = await KellaActionModel.create({
    allianceId,
    type: "event_created",
    actorName: "Dashboard",
    targetDiscordId: body.channelId,
    eventType: body.title,
    status: "Sending",
    payload: {
      title: body.title,
      description: body.description,
      startsAt: startsAt.toISOString(),
      channelId: body.channelId,
      roleMentionId: body.roleMentionId
    }
  });

  try {
    const message = await sendEventAttendanceEmbed({
      eventId: action._id.toString(),
      channelId: body.channelId,
      roleMentionId: body.roleMentionId,
      title: body.title,
      description,
      color: "#facc15",
      footer: "Call of Dragons Server Time - UTC",
      startsAt
    });

    const updated = await KellaActionModel.findByIdAndUpdate(
      action._id,
      {
        $set: {
          status: "Sent",
          "payload.messageId": message?.id,
          "payload.messageLink": discordMessageLink(message),
          "payload.discordChannelId": message?.channel_id || body.channelId
        }
      },
      { new: true }
    ).lean();

    res.status(201).json({ event: updated || action, message });
  } catch (error) {
    await KellaActionModel.findByIdAndUpdate(action._id, {
      $set: {
        status: "Failed",
        "payload.error": error instanceof Error ? error.message : String(error)
      }
    });
    throw error;
  }
});

export const dashboardEventDelete = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid event id");
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const deleted = (await KellaActionModel.findOneAndDelete({
    _id: req.params.id,
    ...filter,
    type: "event_created"
  }).lean()) as DashboardAction | null;
  if (!deleted) throw new HttpError(404, "Event not found");

  await KellaActionModel.deleteMany({ ...filter, type: "event_response", reportId: req.params.id });
  await KellaActionModel.create({
    allianceId,
    type: "event_deleted",
    actorName: "Dashboard",
    targetDiscordId: deleted.targetDiscordId,
    targetName: deleted.eventType || deleted.payload?.title || "Alliance Event",
    status: "Completed",
    payload: {
      deletedEventId: deleted._id.toString(),
      title: deleted.eventType || deleted.payload?.title || "Alliance Event",
      startsAt: deleted.payload?.startsAt || "",
      messageLink: deleted.payload?.messageLink || ""
    }
  });

  res.json({ ok: true, deletedEvent: { id: deleted._id.toString(), title: deleted.eventType || deleted.payload?.title || "Alliance Event" } });
});

export const dashboardComplaints = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const complaints = (await KellaActionModel.find({ ...filter, type: "complaint" })
    .sort({ sentAt: -1 })
    .limit(200)
    .lean()) as DashboardAction[];

  res.json({
    complaints: complaints.map((complaint) => ({
      id: complaint._id.toString(),
      kind: complaint.eventType || complaint.payload?.kind || "Complaint",
      title: complaint.payload?.title || complaint.eventType || complaint.payload?.kind || "Complaint",
      player: displayName(complaint),
      discordId: complaint.actorDiscordId,
      message: complaint.payload?.message || "",
      imageDataUrl: complaint.payload?.imageDataUrl || "",
      source: complaint.payload?.source || "discord",
      status: complaint.status || "Pending",
      sentAt: complaint.sentAt,
      resolvedAt: complaint.payload?.resolvedAt,
      adminNote: complaint.payload?.adminNote || "",
      assignedTo: complaint.payload?.assignedTo || "",
      lastReply: complaint.payload?.lastReply || "",
      repliedAt: complaint.payload?.repliedAt || ""
    }))
  });
});

export const dashboardComplaintCreate = asyncHandler(async (req, res) => {
  const user = (req as AuthenticatedRequest).user;
  const body = complaintCreateSchema.parse(req.body);
  const member = await findOrCreateProfileMember(user);
  const actorName = member?.discordDisplayName || member?.ign || user.discordId;
  const action = await KellaActionModel.create({
    allianceId: user.allianceId,
    type: "complaint",
    actorDiscordId: user.discordId,
    actorName,
    eventType: body.kind,
    status: "Pending",
    payload: {
      kind: body.kind,
      title: body.title.trim(),
      message: body.description.trim(),
      imageDataUrl: body.imageDataUrl || "",
      source: "dashboard"
    }
  });

  res.status(201).json({
    complaint: {
      id: action._id.toString(),
      kind: body.kind,
      title: body.title.trim(),
      status: action.status,
      sentAt: action.sentAt
    }
  });
});

export const dashboardComplaintStatusUpdate = asyncHandler(async (req, res) => {
  const body = complaintStatusSchema.parse(req.body);
  if (!body.status && body.adminNote === undefined && body.assignedTo === undefined) {
    throw new HttpError(400, "Nothing to update");
  }
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid complaint id");
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const update: Record<string, unknown> = {};
  if (body.status) {
    update.status = body.status;
    update["payload.resolvedAt"] = body.status === "Resolved" ? new Date().toISOString() : "";
  }
  if (body.adminNote !== undefined) update["payload.adminNote"] = body.adminNote.trim();
  if (body.assignedTo !== undefined) update["payload.assignedTo"] = body.assignedTo.trim();
  const complaint = await KellaActionModel.findOneAndUpdate(
    { ...filter, _id: req.params.id, type: "complaint" },
    { $set: update },
    { new: true }
  ).lean();

  if (!complaint) throw new HttpError(404, "Complaint not found");
  res.json({ complaint });
});

export const dashboardComplaintReply = asyncHandler(async (req, res) => {
  const body = complaintReplySchema.parse(req.body);
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid complaint id");
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const complaint = (await KellaActionModel.findOne({ ...filter, _id: req.params.id, type: "complaint" }).lean()) as DashboardAction | null;
  if (!complaint) throw new HttpError(404, "Complaint not found");
  if (!complaint.actorDiscordId) throw new HttpError(400, "This complaint has no Discord user to reply to");

  await sendDiscordDm(complaint.actorDiscordId, `Kella admin reply:\n\n${body.message}`);
  const update: Record<string, unknown> = {
    "payload.lastReply": body.message,
    "payload.repliedAt": new Date().toISOString()
  };
  if (body.resolve) {
    update.status = "Resolved";
    update["payload.resolvedAt"] = new Date().toISOString();
  }

  const updated = await KellaActionModel.findOneAndUpdate(
    { ...filter, _id: req.params.id, type: "complaint" },
    { $set: update },
    { new: true }
  ).lean();

  res.json({ complaint: updated });
});

export const dashboardRootsCreate = asyncHandler(async (req, res) => {
  const body = rootsCreateSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const session = await KellaActionModel.create({
    allianceId,
    type: "roots_registration",
    actorName: "Dashboard",
    targetDiscordId: body.channelId,
    status: "Open",
    payload: {
      channelId: body.channelId,
      roleMentionId: body.roleMentionId,
      createdFromDashboard: true
    }
  });

  const message = await sendRootsRegistration({
    channelId: body.channelId,
    roleMentionId: body.roleMentionId,
    reportId: session._id.toString()
  });

  const updated = await KellaActionModel.findByIdAndUpdate(
    session._id,
    {
      $set: {
        "payload.messageId": message?.id,
        "payload.messageLink": discordMessageLink(message),
        "payload.discordChannelId": message?.channel_id || body.channelId
      }
    },
    { new: true }
  ).lean();

  res.status(201).json({ session: updated || session, message });
});

export const rootsReportList = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const sessions = (await KellaActionModel.find({ ...filter, type: "roots_registration" }).sort({ sentAt: -1 }).limit(100).lean()) as DashboardAction[];
  const sessionIds = sessions.map((session) => session._id.toString());
  const responses = sessionIds.length
    ? ((await KellaActionModel.find({
        ...filter,
        type: "roots_response",
        $or: [{ reportId: { $in: sessionIds } }, { reportId: { $exists: false } }, { reportId: "" }]
      }).lean()) as DashboardAction[])
    : [];

  const reports = sessions.flatMap((session, index) => {
    const sessionId = session._id.toString();
    const sessionResponses = responses.filter((response) => response.reportId === sessionId || (index === 0 && !response.reportId));
    return rootsSlots.map((slot) => ({
      id: reportId(sessionId, slot),
      date: session.sentAt,
      timeSlot: slotLabel(slot),
      createdBy: session.actorName || "Unknown Officer",
      messageLink: session.payload?.messageLink,
      ...summarizeRootsResponses(sessionResponses, slot)
    }));
  });

  res.json({ reports });
});

export const rootsReportDetails = asyncHandler(async (req, res) => {
  const { sessionId, slot } = parseReportId(req.params.id);
  if (!Types.ObjectId.isValid(sessionId)) throw new HttpError(400, "Invalid Roots report id");

  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const session = (await KellaActionModel.findOne({ ...filter, _id: sessionId, type: "roots_registration" }).lean()) as DashboardAction | null;
  if (!session) throw new HttpError(404, "Roots report not found");

  const latestSession = (await KellaActionModel.findOne({ ...filter, type: "roots_registration" }).sort({ sentAt: -1 }).lean()) as DashboardAction | null;
  const responseFilter =
    latestSession?._id?.toString() === sessionId
      ? { ...filter, type: "roots_response", slot, $or: [{ reportId: sessionId }, { reportId: { $exists: false } }, { reportId: "" }] }
      : { ...filter, type: "roots_response", reportId: sessionId, slot };
  const responses = (await KellaActionModel.find(responseFilter).sort({ actorName: 1 }).lean()) as DashboardAction[];
  const playersByStatus = Object.fromEntries(
    rootsStatuses.map((status) => [
      status,
      responses.filter((response) => response.status === status).map((response) => displayName(response))
    ])
  );

  res.json({
    report: {
      id: reportId(sessionId, slot),
      date: session.sentAt,
      timeSlot: slotLabel(slot),
      slot,
      createdBy: session.actorName || "Unknown Officer",
      messageLink: session.payload?.messageLink,
      available: playersByStatus.Available,
      absent: playersByStatus.Absent,
      unsure: playersByStatus["Not Sure"]
    }
  });
});

async function listWikiPages(includeDrafts: boolean) {
  const allianceId = await resolveAllianceId();
  const filter: Record<string, unknown> = allianceFilter(allianceId);
  if (!includeDrafts) filter.status = "Published";
  const pages = await WikiPageModel.find(filter).sort({ updatedAt: -1, title: 1 }).limit(200).lean();
  return pages.map(wikiPageDto);
}

export const dashboardWikiList = asyncHandler(async (_req, res) => {
  res.json({ pages: await listWikiPages(false) });
});

export const dashboardWikiAdminList = asyncHandler(async (_req, res) => {
  res.json({ pages: await listWikiPages(true) });
});

export const dashboardWikiCreate = asyncHandler(async (req, res) => {
  const body = wikiPageCreateSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const title = body.title.trim();
  const blocks = body.blocks || [];
  const textBody = wikiTextFromBlocks(blocks) || body.body.trim();
  const blockImage = wikiImageFromBlocks(blocks);
  const page = await WikiPageModel.create({
    allianceId,
    title,
    slug: await uniqueWikiSlug(allianceId || "", title),
    body: textBody,
    imageDataUrl: blockImage || body.imageDataUrl || "",
    fontFamily: body.fontFamily,
    fontSize: body.fontSize,
    blocks,
    status: body.status,
    createdBy: dashboardActor(req),
    updatedBy: dashboardActor(req)
  });
  res.status(201).json({ page: wikiPageDto(page) });
});

export const dashboardWikiUpdate = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid wiki page id");
  const body = wikiPageUpdateSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const update: Record<string, unknown> = { updatedBy: dashboardActor(req) };
  if (body.title !== undefined) {
    const title = body.title.trim();
    update.title = title;
    update.slug = await uniqueWikiSlug(allianceId || "", title, req.params.id);
  }
  if (body.body !== undefined) update.body = body.body.trim();
  if (body.imageDataUrl !== undefined) update.imageDataUrl = body.imageDataUrl || "";
  if (body.fontFamily !== undefined) update.fontFamily = body.fontFamily;
  if (body.fontSize !== undefined) update.fontSize = body.fontSize;
  if (body.blocks !== undefined) {
    update.blocks = body.blocks;
    const textBody = wikiTextFromBlocks(body.blocks);
    const blockImage = wikiImageFromBlocks(body.blocks);
    if (textBody) update.body = textBody;
    update.imageDataUrl = blockImage || (typeof update.imageDataUrl === "string" ? update.imageDataUrl : "");
  }
  if (body.status !== undefined) update.status = body.status;

  const page = await WikiPageModel.findOneAndUpdate(
    { _id: req.params.id, ...allianceFilter(allianceId) },
    { $set: update },
    { new: true, runValidators: true }
  ).lean();
  if (!page) throw new HttpError(404, "Wiki page not found");
  res.json({ page: wikiPageDto(page) });
});

export const dashboardWikiDelete = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid wiki page id");
  const allianceId = await resolveAllianceId();
  const page = (await WikiPageModel.findOneAndDelete({ _id: req.params.id, ...allianceFilter(allianceId) }).lean()) as any;
  if (!page) throw new HttpError(404, "Wiki page not found");
  res.json({ ok: true, deletedPage: { id: page._id.toString(), title: page.title || "Wiki page" } });
});

export const dashboardSettings = asyncHandler(async (_req, res) => {
  const alliance = await resolveAlliance();
  res.json(publicSettings(alliance));
});

export const dashboardSettingsUpdate = asyncHandler(async (req, res) => {
  const body = dashboardSettingsSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const currentModuleStates = normalizeModuleStates(alliance.settings?.moduleStates) as Record<string, boolean>;
  const update: Record<string, unknown> = {};

  if (body.name) update.name = body.name;
  if (body.tag) update.tag = body.tag;
  if (body.timezone) update.timezone = body.timezone;

  for (const [key, value] of Object.entries(body.settings || {})) {
    if (value === undefined) continue;
    if (key === "moduleStates") {
      update["settings.moduleStates"] = { ...currentModuleStates, ...(value as Record<string, boolean>) };
    } else {
      update[`settings.${key}`] = value;
    }
  }

  const updated = await AllianceModel.findByIdAndUpdate(alliance._id, { $set: update }, { new: true, runValidators: true });
  if (!updated) throw new HttpError(404, "Dashboard settings not found");
  res.json(publicSettings(updated));
});

function rosterUploadFilename(action: DashboardAction) {
  return String(action.payload?.filename || "Uploaded roster");
}

function rosterUploadSource(action: DashboardAction) {
  return String(action.payload?.source || uploadSourceForType(String(action.payload?.fileType || uploadFileType(rosterUploadFilename(action)))));
}

function rosterUploadDto(action: DashboardAction) {
  return {
    id: action._id.toString(),
    filename: rosterUploadFilename(action),
    fileType: action.payload?.fileType || uploadFileType(rosterUploadFilename(action)),
    source: rosterUploadSource(action),
    snapshotDate: action.payload?.snapshotDate || action.sentAt,
    previousSnapshotDate: action.payload?.previousSnapshotDate || "",
    total: numeric(action.payload?.total),
    created: numeric(action.payload?.created),
    updated: numeric(action.payload?.updated),
    merged: numeric(action.payload?.merged),
    skipped: numeric(action.payload?.skipped),
    excluded: numeric(action.payload?.excluded),
    removedUploadedOnly: numeric(action.payload?.removedUploadedOnly),
    status: action.status || "Completed",
    sentAt: action.sentAt
  };
}

function uploadEntryMatches(entry: { source?: string; filename?: string }, source: string, filename: string) {
  return String(entry.source || "") === source && String(entry.filename || "") === filename;
}

async function removeRosterUploadSnapshots(allianceId: string, action: DashboardAction) {
  const filename = rosterUploadFilename(action);
  const source = rosterUploadSource(action);
  const members = (await MemberModel.find({
    allianceId,
    $or: [{ "powerHistory.filename": filename }, { "statHistory.filename": filename }, { discordId: /^(xlsx|topn):/ }]
  })
    .select("_id discordId powerHistory statHistory")
    .limit(5000)
    .lean()) as Array<{
    _id: Types.ObjectId;
    discordId?: string;
    powerHistory?: Array<{ date?: Date | string; power?: number; source?: string; filename?: string }>;
    statHistory?: Array<{ date?: Date | string; metrics?: Record<string, unknown>; source?: string; filename?: string }>;
  }>;

  const ops: any[] = [];
  let deletedMembers = 0;
  let updatedMembers = 0;
  for (const member of members) {
    const powerHistory = (member.powerHistory || []).filter((entry) => !uploadEntryMatches(entry, source, filename));
    const statHistory = (member.statHistory || []).filter((entry) => !uploadEntryMatches(entry, source, filename));
    if (isUploadedOnlyMember(member as MergeCandidate) && !powerHistory.length && !statHistory.length) {
      deletedMembers += 1;
      ops.push({ deleteOne: { filter: { _id: member._id, allianceId } } });
      continue;
    }
    updatedMembers += 1;
    ops.push({
      updateOne: {
        filter: { _id: member._id, allianceId },
        update: {
          $set: {
            powerHistory,
            statHistory,
            power: latestPowerFromHistory(powerHistory)
          }
        }
      }
    });
  }

  await bulkWriteMemberOps(ops);
  return { deletedMembers, updatedMembers };
}

async function editRosterUploadSnapshots(
  allianceId: string,
  action: DashboardAction,
  body: z.infer<typeof rosterUploadUpdateSchema>
) {
  const oldFilename = rosterUploadFilename(action);
  const source = rosterUploadSource(action);
  const newFilename = body.filename?.trim() || oldFilename;
  const oldDate = resolvePowerSnapshotDate(new Date(action.payload?.snapshotDate || action.sentAt), oldFilename);
  const oldDateKey = oldDate.toISOString().slice(0, 10);
  const newDate = body.snapshotDate ? startOfUtcDay(body.snapshotDate) : undefined;
  const members = (await MemberModel.find({
    allianceId,
    $or: [{ "powerHistory.filename": oldFilename }, { "statHistory.filename": oldFilename }]
  })
    .select("_id powerHistory statHistory")
    .limit(5000)
    .lean()) as Array<{
    _id: Types.ObjectId;
    powerHistory?: Array<{ date?: Date | string; power?: number; source?: string; filename?: string }>;
    statHistory?: Array<{ date?: Date | string; metrics?: Record<string, unknown>; source?: string; filename?: string }>;
  }>;

  const retagEntry = <T extends { date?: Date | string; source?: string; filename?: string }>(entry: T): T => {
    if (!uploadEntryMatches(entry, source, oldFilename)) return entry;
    const currentDate = validDate(new Date(entry.date || "")) ? startOfUtcDay(new Date(entry.date || "")) : undefined;
    return {
      ...entry,
      filename: newFilename,
      date: newDate && currentDate?.toISOString().slice(0, 10) === oldDateKey ? newDate : entry.date
    };
  };

  const ops = members.map((member) => ({
    updateOne: {
      filter: { _id: member._id, allianceId },
      update: {
        $set: {
          powerHistory: (member.powerHistory || []).map(retagEntry),
          statHistory: (member.statHistory || []).map(retagEntry)
        }
      }
    }
  }));

  await bulkWriteMemberOps(ops);
  const payloadUpdate: Record<string, unknown> = { "payload.filename": newFilename };
  if (newDate) payloadUpdate["payload.snapshotDate"] = newDate;
  const updated = (await KellaActionModel.findOneAndUpdate(
    { _id: action._id, allianceId, type: "member_xlsx_import" },
    { $set: payloadUpdate },
    { new: true }
  ).lean()) as DashboardAction | null;
  return { upload: updated ? rosterUploadDto(updated) : rosterUploadDto(action), updatedMembers: ops.length };
}

export const dashboardRosterUploads = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const uploads = (await KellaActionModel.find({ ...allianceFilter(allianceId), type: "member_xlsx_import" })
    .sort({ sentAt: -1 })
    .limit(100)
    .lean()) as DashboardAction[];
  res.json({ uploads: uploads.map(rosterUploadDto) });
});

export const dashboardRosterUploadUpdate = asyncHandler(async (req, res) => {
  const body = rosterUploadUpdateSchema.parse(req.body);
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid upload id");
  const allianceId = await resolveAllianceId();
  const action = (await KellaActionModel.findOne({ ...allianceFilter(allianceId), _id: req.params.id, type: "member_xlsx_import" }).lean()) as DashboardAction | null;
  if (!action) throw new HttpError(404, "Upload not found");
  res.json(await editRosterUploadSnapshots(allianceId || "", action, body));
});

export const dashboardRosterUploadDelete = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid upload id");
  const allianceId = await resolveAllianceId();
  const action = (await KellaActionModel.findOne({ ...allianceFilter(allianceId), _id: req.params.id, type: "member_xlsx_import" }).lean()) as DashboardAction | null;
  if (!action) throw new HttpError(404, "Upload not found");
  const result = await removeRosterUploadSnapshots(allianceId || "", action);
  await KellaActionModel.deleteOne({ _id: action._id, allianceId, type: "member_xlsx_import" });
  const remainingUploads = await KellaActionModel.countDocuments({ ...allianceFilter(allianceId), type: "member_xlsx_import" });
  if (!remainingUploads) {
    const reset = await resetUploadedRosterData(allianceId || "");
    return res.json({
      ok: true,
      upload: rosterUploadDto(action),
      clearedAll: true,
      deletedMembers: result.deletedMembers + reset.removedUploadedOnly,
      updatedMembers: result.updatedMembers + reset.resetProfiles
    });
  }
  res.json({ ok: true, upload: rosterUploadDto(action), ...result });
});

export const dashboardRosterUploadsClear = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const reset = await resetUploadedRosterData(allianceId || "");
  const deletedUploads = await KellaActionModel.deleteMany({ ...allianceFilter(allianceId), type: "member_xlsx_import" });
  res.json({
    ok: true,
    deletedUploads: deletedUploads.deletedCount || 0,
    deletedMembers: reset.removedUploadedOnly,
    updatedMembers: reset.resetProfiles
  });
});

export const dashboardShieldSend = asyncHandler(async (req, res) => {
  const body = shieldToolSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const member = (body.memberId
    ? await MemberModel.findOne({ ...filter, _id: body.memberId }).lean()
    : await MemberModel.findOne({ ...filter, discordId: body.discordId }).lean()) as DashboardMember | null;
  if (!member) throw new HttpError(404, "Member not found");

  const message =
    body.message?.trim() ||
    "🛡 Shield Warning\n\nYou may be at risk. Please check your shield immediately.";
  await sendDiscordDm(member.discordId, message);
  const alert = await KellaActionModel.create({
    allianceId,
    type: "shield_alert",
    actorName: "Dashboard",
    targetDiscordId: member.discordId,
    targetName: member.ign,
    status: "Sent",
    payload: { message }
  });
  res.status(201).json({ alert });
});

export const dashboardAttackSend = asyncHandler(async (req, res) => {
  const body = attackToolSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const alertInput = {
    channelId: body.channelId || "",
    roleMentionId: body.roleMentionId || "",
    message: body.message || "🚨 ATTACK ALERT\n\nCome online now. There is a fight."
  };
  const message = await sendAttackAlert(alertInput);
  const alert = await KellaActionModel.create({
    allianceId,
    type: "attack_alert",
    actorName: "Dashboard",
    targetDiscordId: alertInput.channelId,
    status: "Open",
    payload: { roleMentionId: alertInput.roleMentionId, message: alertInput.message, messageId: message?.id, channelId: message?.channel_id }
  });
  res.status(201).json({ alert, message });
});

export const dashboardChatSend = asyncHandler(async (req, res) => {
  const body = chatToolSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const messageInput = {
    channelId: body.channelId,
    content: body.message,
    roleMentionId: body.roleMentionId || ""
  };
  const message = await sendDiscordMessage(messageInput);
  const action = await KellaActionModel.create({
    allianceId,
    type: "chat_sent",
    actorName: "Dashboard",
    targetDiscordId: messageInput.channelId,
    status: "Sent",
    payload: {
      message: messageInput.content,
      roleMentionId: messageInput.roleMentionId,
      messageId: message?.id,
      channelId: message?.channel_id,
      messageLink: discordMessageLink(message)
    }
  });
  res.status(201).json({ action, message });
});

export const dashboardDmAlertSend = asyncHandler(async (req, res) => {
  const body = dmAlertToolSchema.parse(req.body);
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const members = (await MemberModel.find({
    ...filter,
    discordId: /^\d{15,25}$/
  })
    .select("discordId discordUsername discordDisplayName ign")
    .sort({ ign: 1, discordDisplayName: 1 })
    .limit(5000)
    .lean()) as DashboardMember[];

  const recipients = members.filter((member) => isRealDiscordUserId(member.discordId));
  if (!recipients.length) {
    throw new HttpError(400, "No synced Discord members found. Use Sync Discord on the Members page first.");
  }

  const content = dmAlertContent(body);
  const failures: Array<{ discordId?: string; name?: string; error: string }> = [];
  let sent = 0;

  await runWithConcurrency(recipients, 3, async (member) => {
    try {
      await sendDiscordDm(member.discordId || "", content);
      sent += 1;
    } catch (error) {
      failures.push({
        discordId: member.discordId,
        name: member.ign || member.discordDisplayName || member.discordUsername || member.discordId,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const failed = failures.length;
  const alert = await KellaActionModel.create({
    allianceId,
    type: "dm_alert",
    actorName: "Dashboard",
    targetName: "All synced members",
    status: failed ? `Sent ${sent} / Failed ${failed}` : `Sent ${sent}`,
    payload: {
      title: body.title,
      message: body.message,
      total: recipients.length,
      sent,
      failed,
      failures: failures.slice(0, 50)
    }
  });

  res.status(201).json({ alert, total: recipients.length, sent, failed, failures: failures.slice(0, 50) });
});

export const dashboardDmAlertResendFailed = asyncHandler(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400, "Invalid alert id");
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const original = (await KellaActionModel.findOne({ ...filter, _id: req.params.id, type: "dm_alert" }).lean()) as DashboardAction | null;
  if (!original) throw new HttpError(404, "DM alert not found");

  const failures = Array.isArray(original.payload?.failures) ? (original.payload.failures as Array<{ discordId?: string; name?: string }>) : [];
  const recipients = failures.filter((failure) => isRealDiscordUserId(failure.discordId));
  if (!recipients.length) throw new HttpError(400, "No failed recipients with valid Discord IDs found");

  const content = dmAlertContent({
    title: String(original.payload?.title || "Kella Alliance Alert"),
    message: String(original.payload?.message || "")
  });
  const retryFailures: Array<{ discordId?: string; name?: string; error: string }> = [];
  let sent = 0;

  await runWithConcurrency(recipients, 3, async (member) => {
    try {
      await sendDiscordDm(member.discordId || "", content);
      sent += 1;
    } catch (error) {
      retryFailures.push({
        discordId: member.discordId,
        name: member.name || member.discordId,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const failed = retryFailures.length;
  const alert = await KellaActionModel.create({
    allianceId,
    type: "dm_alert",
    actorName: "Dashboard",
    targetName: `Retry failed recipients from ${original._id.toString()}`,
    status: failed ? `Retry sent ${sent} / Failed ${failed}` : `Retry sent ${sent}`,
    payload: {
      title: original.payload?.title,
      message: original.payload?.message,
      total: recipients.length,
      sent,
      failed,
      failures: retryFailures.slice(0, 50),
      retryOf: original._id.toString()
    }
  });

  res.status(201).json({ alert, total: recipients.length, sent, failed, failures: retryFailures.slice(0, 50) });
});

export const rootsReportSend = asyncHandler(async (req, res) => {
  const body = rootsReportSendSchema.parse(req.body);
  const { sessionId, slot } = parseReportId(req.params.id);
  if (!Types.ObjectId.isValid(sessionId)) throw new HttpError(400, "Invalid Roots report id");

  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const session = (await KellaActionModel.findOne({ ...filter, _id: sessionId, type: "roots_registration" }).lean()) as DashboardAction | null;
  if (!session) throw new HttpError(404, "Roots report not found");

  const latestSession = (await KellaActionModel.findOne({ ...filter, type: "roots_registration" }).sort({ sentAt: -1 }).lean()) as DashboardAction | null;
  const responseFilter =
    latestSession?._id?.toString() === sessionId
      ? { ...filter, type: "roots_response", slot, $or: [{ reportId: sessionId }, { reportId: { $exists: false } }, { reportId: "" }] }
      : { ...filter, type: "roots_response", reportId: sessionId, slot };
  const responses = (await KellaActionModel.find(responseFilter).sort({ actorName: 1 }).lean()) as DashboardAction[];
  const byStatus = (status: string) => responses.filter((response) => response.status === status).map((response) => displayName(response));
  const available = byStatus("Available");
  const absent = byStatus("Absent");
  const unsure = byStatus("Not Sure");
  const lineList = (players: string[]) => (players.length ? players.map((player, index) => `${index + 1}. ${player}`).join("\n") : "None");
  const description = [
    `Date: ${session.sentAt ? new Date(session.sentAt).toISOString().slice(0, 10) : "Unknown"}`,
    `Time Slot: ${slotLabel(slot)}`,
    "",
    "AVAILABLE:",
    lineList(available),
    "",
    "ABSENT:",
    lineList(absent),
    "",
    "NOT SURE:",
    lineList(unsure)
  ].join("\n");

  const message = await sendDiscordEmbed({
    channelId: body.channelId,
    roleMentionId: body.roleMentionId,
    title: "ROOTS OF WAR REPORT",
    description,
    color: "#facc15",
    footer: "Sent by Kella"
  });
  const action = await KellaActionModel.create({
    allianceId,
    type: "roots_report_sent",
    actorName: "Dashboard",
    targetDiscordId: body.channelId,
    status: "Sent",
    reportId: sessionId,
    slot,
    payload: { messageId: message?.id, channelId: message?.channel_id }
  });
  res.status(201).json({ message, action });
});
