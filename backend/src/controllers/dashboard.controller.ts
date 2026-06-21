import { Types } from "mongoose";
import { z } from "zod";
import { env } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { MemberModel } from "../models/member.model.js";
import { listDiscordGuildMembers, sendAttackAlert, sendDiscordDm, sendDiscordEmbed } from "../services/discord.service.js";
import { parseTopnWorkbook } from "../services/xlsx.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

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
  discordId?: string;
  discordUsername?: string;
  discordDisplayName?: string;
  discordAvatarUrl?: string;
  ign?: string;
  uid?: string;
  rank?: string;
  role?: string;
  attendanceScore?: number;
  notes?: string;
  alliance?: string;
  power?: number;
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

const rootsReportSendSchema = z.object({
  channelId: z.string().min(1, "Target channel is required"),
  roleMentionId: z.string().optional()
});

const memberXlsxImportSchema = z.object({
  filename: z.string().max(180).optional(),
  fileBase64: z.string().min(1, "Excel file is required")
});

type MergeCandidate = Pick<DashboardMember, "_id" | "ign" | "discordId" | "discordUsername" | "discordDisplayName" | "uid">;

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
  if (!buffer.length) throw new HttpError(400, "Uploaded Excel file is empty.");
  if (buffer.length > 8 * 1024 * 1024) throw new HttpError(413, "Excel file is too large. Please upload a file under 8 MB.");
  return buffer;
}

function collapseRepeatedLetters(value: string) {
  return value.replace(/([a-z0-9])\1+/g, "$1");
}

function rosterTokens(value: string) {
  const noise = new Set(["ckr", "kog", "cod", "row", "aga", "alliance", "guild"]);
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !noise.has(token));
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

async function findMemberForGameRow(allianceId: string, uid: string, ign: string) {
  const exact = ((await MemberModel.findOne({ allianceId, uid }).select("_id ign discordId discordUsername discordDisplayName uid").lean()) ??
    (await MemberModel.findOne({ allianceId, ign }).select("_id ign discordId discordUsername discordDisplayName uid").lean())) as MergeCandidate | null;

  const candidates = (await MemberModel.find({
    allianceId,
    $or: [
      { discordAvatarUrl: { $ne: "" } },
      { discordUsername: { $ne: "" } },
      { discordDisplayName: { $ne: "" } },
      { discordId: { $not: /^(xlsx|topn):/ } }
    ]
  })
    .select("_id ign discordId discordUsername discordDisplayName uid")
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
  const exact = (await MemberModel.findOne({ allianceId, discordId }).select("_id ign discordId discordUsername discordDisplayName uid").lean()) as MergeCandidate | null;
  if (exact) return exact;

  const candidates = (await MemberModel.find({
    allianceId,
    discordId: /^(xlsx|topn):/
  })
    .select("_id ign discordId discordUsername discordDisplayName uid")
    .limit(1200)
    .lean()) as MergeCandidate[];

  return candidates.find((candidate) => discordMemberMatchesRoster(candidate, displayName, username)) ?? null;
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
      KellaActionModel.countDocuments({ ...filter, type: "attack_alert", sentAt: { $gte: recentWindow } }),
      KellaActionModel.countDocuments({ ...filter, type: "shield_alert", sentAt: { $gte: recentWindow } }),
      KellaActionModel.countDocuments({ ...filter, type: "application", status: "Pending" }),
      KellaActionModel.findOne({ ...filter, type: "roots_registration" }).sort({ sentAt: -1 }).lean(),
      KellaActionModel.find({ ...filter, type: "roots_response" }).sort({ sentAt: -1 }).limit(8).lean(),
      KellaActionModel.find({ ...filter, type: "shield_alert" }).sort({ sentAt: -1 }).limit(5).lean(),
      KellaActionModel.find({ ...filter, type: { $in: ["shield_alert", "attack_alert", "event_reminder", "embed_sent", "roots_report_sent", "discord_member_sync", "member_xlsx_import"] } })
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
    .limit(500)
    .select("discordId discordUsername discordDisplayName discordAvatarUrl ign uid rank role attendanceScore notes alliance power")
    .lean()) as DashboardMember[];

  res.json({
    members: members.map((member: any) => ({
      id: member._id.toString(),
      discordId: member.discordId,
      discordName: member.discordDisplayName || member.ign || member.discordId,
      discordUsername: member.discordUsername || member.discordId,
      discordDisplayName: member.discordDisplayName || member.ign || member.discordUsername || member.discordId,
      discordAvatarUrl: member.discordAvatarUrl || "",
      ign: member.ign,
      uid: member.uid,
      rank: member.rank,
      role: member.role,
      attendance: member.attendanceScore,
      notes: member.notes,
      alliance: member.alliance,
      power: member.power
    }))
  });
});

export const dashboardMemberXlsxImport = asyncHandler(async (req, res) => {
  const body = memberXlsxImportSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const allianceId = alliance._id.toString();
  const syncedAt = new Date();
  const rows = parseTopnWorkbook(decodeUploadedBase64(body.fileBase64));
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let merged = 0;

  for (const row of rows) {
    const uid = String(row.uid || "").trim();
    const ign = String(row.ign || "").trim();
    if (!uid || !ign) {
      skipped += 1;
      continue;
    }

    const existing = (await findMemberForGameRow(allianceId, uid, ign)) as any;

    const update = {
      $set: {
        uid,
        ign,
        power: numeric(row.power),
        alliance: alliance.tag || alliance.name || "Imported",
        rank: row.rank ? `TopN #${row.rank}` : "TopN",
        lastActivity: syncedAt
      },
      $setOnInsert: {
        discordId: `xlsx:${uid}`,
        role: "Member",
        timezone: alliance.timezone || "UTC",
        country: "Unknown",
        joinDate: syncedAt,
        attendanceScore: 0,
        warScore: 0,
        contributionScore: 0,
        notes: ""
      }
    };

    const result = existing
      ? await MemberModel.updateOne({ _id: existing._id, allianceId }, update)
      : await MemberModel.updateOne({ allianceId, uid }, update, { upsert: true });

    if (result.upsertedCount) created += result.upsertedCount;
    else if (result.modifiedCount || result.matchedCount) {
      updated += 1;
      if (existing?.discordId && !String(existing.discordId).startsWith("xlsx:")) merged += 1;
    }
  }

  await KellaActionModel.create({
    allianceId,
    type: "member_xlsx_import",
    actorName: "Dashboard",
    status: "Completed",
    payload: { filename: body.filename || "members.xlsx", total: rows.length, created, updated, merged, skipped }
  });

  res.json({ total: rows.length, created, updated, merged, skipped, syncedAt });
});

export const dashboardDiscordMemberSync = asyncHandler(async (_req, res) => {
  const alliance = await resolveAlliance();
  const allianceId = alliance._id.toString();
  const syncedAt = new Date();
  const discordMembers = await listDiscordGuildMembers();
  let created = 0;
  let updated = 0;
  let merged = 0;

  for (const member of discordMembers) {
    const existing = (await findMemberForDiscordProfile(
      allianceId,
      member.discordId,
      member.discordDisplayName,
      member.discordUsername
    )) as any;
    const update = {
      $set: {
        discordId: member.discordId,
        discordUsername: member.discordUsername,
        discordDisplayName: member.discordDisplayName,
        discordAvatarUrl: member.discordAvatarUrl,
        lastActivity: syncedAt
      },
      $setOnInsert: {
        ign: member.discordDisplayName || member.discordUsername || member.discordId,
        uid: member.discordId,
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
      ? await MemberModel.updateOne({ _id: existing._id, allianceId }, update)
      : await MemberModel.updateOne({ allianceId, discordId: member.discordId }, update, { upsert: true });

    if (result.upsertedCount) created += result.upsertedCount;
    else if (result.modifiedCount || result.matchedCount) {
      updated += 1;
      if (existing?.discordId && String(existing.discordId).startsWith("xlsx:")) merged += 1;
    }
  }

  await KellaActionModel.create({
    allianceId,
    type: "discord_member_sync",
    actorName: "Dashboard",
    status: "Completed",
    payload: { total: discordMembers.length, created, updated, merged }
  });

  res.json({ total: discordMembers.length, created, updated, merged, syncedAt });
});

export const dashboardAlerts = asyncHandler(async (_req, res) => {
  const allianceId = await resolveAllianceId();
  const filter = allianceFilter(allianceId);
  const alerts = (await KellaActionModel.find({
    ...filter,
    type: { $in: ["shield_alert", "attack_alert", "attack_response"] }
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
      sentAt: alert.sentAt
    }))
  });
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
