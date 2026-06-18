import { Types } from "mongoose";
import { z } from "zod";
import { env } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { MemberModel } from "../models/member.model.js";
import { sendAttackAlert, sendDiscordDm, sendDiscordEmbed } from "../services/discord.service.js";
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
  ign?: string;
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
      KellaActionModel.find({ ...filter, type: { $in: ["shield_alert", "attack_alert", "event_reminder", "embed_sent", "roots_report_sent"] } })
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
      { discordId: { $regex: q, $options: "i" } },
      { role: { $regex: q, $options: "i" } }
    ];
  }

  const members = (await MemberModel.find(filter)
    .sort({ attendanceScore: -1, power: -1 })
    .limit(500)
    .select("discordId ign role attendanceScore notes alliance power")
    .lean()) as DashboardMember[];

  res.json({
    members: members.map((member: any) => ({
      id: member._id.toString(),
      discordId: member.discordId,
      discordName: member.discordId,
      ign: member.ign,
      role: member.role,
      attendance: member.attendanceScore,
      notes: member.notes,
      alliance: member.alliance,
      power: member.power
    }))
  });
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
