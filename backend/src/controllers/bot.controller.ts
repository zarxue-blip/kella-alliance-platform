import { realtimeEvents } from "@cod-amp/shared";
import { Types } from "mongoose";
import { z } from "zod";
import { env } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { MemberModel } from "../models/member.model.js";
import { AttendanceEventModel } from "../models/attendanceEvent.model.js";
import { ShieldModel } from "../models/shield.model.js";
import { TaskModel } from "../models/task.model.js";
import { OperationModel } from "../models/operation.model.js";
import { CallToArmsModel } from "../models/callToArms.model.js";
import { UserModel } from "../models/user.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { PollModel } from "../models/poll.model.js";
import { publishCallToArms } from "../services/alert.service.js";
import { pollDto, pollOptionsWithKeys, recordPollVote } from "../services/poll.service.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

const serviceContextSchema = z.object({ allianceId: z.string().optional() });

async function resolveAllianceId(allianceId?: string) {
  if (allianceId) return allianceId;

  const alliance = await AllianceModel.findOneAndUpdate(
    { discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured" },
    {
      $setOnInsert: {
        name: "Dragon Command Alliance",
        tag: "DCA",
        discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured",
        timezone: "UTC"
      }
    },
    { upsert: true, new: true }
  );

  return alliance._id.toString();
}

async function recordKellaAction(allianceId: string, input: Record<string, unknown>) {
  return KellaActionModel.create({ allianceId, ...input, sentAt: new Date() });
}

export const botRegister = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      ign: z.string(),
      uid: z.string(),
      power: z.coerce.number().min(0),
      alliance: z.string()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOneAndUpdate(
    { allianceId, discordId: body.discordId },
    { $set: { ...body, allianceId, role: "Member", lastActivity: new Date() } },
    { upsert: true, new: true }
  );
  emitAlliance(allianceId, realtimeEvents.memberUpdated, member);
  res.json({ member });
});

export const botProfile = asyncHandler(async (req, res) => {
  const query = serviceContextSchema.extend({ discordId: z.string() }).parse(req.query);
  const allianceId = await resolveAllianceId(query.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: query.discordId }).lean();
  if (!member) throw new HttpError(404, "Member profile not found");
  res.json({ member });
});

export const botAttendance = asyncHandler(async (req, res) => {
  const body = serviceContextSchema.extend({ eventId: z.string(), discordId: z.string() }).parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: body.discordId });
  const event = await AttendanceEventModel.findOne({ _id: body.eventId, allianceId });
  if (!member || !event) throw new HttpError(404, "Member or event not found");
  if (!event.checkIns.some((entry: any) => entry.memberId.toString() === member._id.toString())) {
    event.checkIns.push({ memberId: member._id, discordId: member.discordId, method: "discord", checkedInAt: new Date() });
    await event.save();
    await MemberModel.updateOne({ _id: member._id }, { $inc: { attendanceScore: 1 }, $set: { lastActivity: new Date() } });
  }
  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, { eventId: event._id, memberId: member._id });
  res.json({ event });
});

export const botShield = asyncHandler(async (req, res) => {
  const body = serviceContextSchema.extend({ discordId: z.string(), expiresAt: z.coerce.date() }).parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: body.discordId });
  if (!member) throw new HttpError(404, "Member not found");
  const shield = await ShieldModel.findOneAndUpdate(
    { allianceId, memberId: member._id },
    { $set: { expiresAt: body.expiresAt } },
    { upsert: true, new: true }
  );
  emitAlliance(allianceId, realtimeEvents.shieldExpiring, { shield, updated: true });
  res.json({ shield });
});

export const botSummary = asyncHandler(async (req, res) => {
  const query = serviceContextSchema.parse(req.query);
  const allianceId = await resolveAllianceId(query.allianceId);
  const [operations, tasks] = await Promise.all([
    OperationModel.find({ allianceId, status: { $in: ["Planning", "Active"] } }).sort({ date: 1 }).limit(5).lean(),
    TaskModel.find({ allianceId, status: { $ne: "Completed" } }).sort({ dueDate: 1 }).limit(5).lean()
  ]);
  res.json({ operations, tasks });
});

export const botCommandSettings = asyncHandler(async (req, res) => {
  const query = serviceContextSchema.parse(req.query);
  const allianceId = await resolveAllianceId(query.allianceId);
  const alliance = (await AllianceModel.findById(allianceId).select("settings.disabledCommands").lean()) as any;
  const disabledCommands = Array.isArray(alliance?.settings?.disabledCommands)
    ? alliance.settings.disabledCommands
    : [];
  res.json({ disabledCommands });
});

const pollOptionInputSchema = z.object({
  label: z.string().trim().min(1).max(80),
  roleId: z.string().trim().regex(/^\d{15,25}$/).optional().or(z.literal(""))
});

export const botPollCreate = asyncHandler(async (req, res) => {
  const body = serviceContextSchema.extend({
    kind: z.enum(["poll", "best_online_time"]).default("poll"),
    question: z.string().trim().min(1).max(256),
    description: z.string().trim().max(1000).optional().default(""),
    options: z.array(pollOptionInputSchema).min(2).max(10),
    channelId: z.string().trim().optional().default(""),
    createdByDiscordId: z.string().trim().optional().default("")
  }).parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const poll = await PollModel.create({
    allianceId,
    kind: body.kind,
    question: body.question,
    description: body.description,
    options: pollOptionsWithKeys(body.options),
    channelId: body.channelId,
    createdByDiscordId: body.createdByDiscordId,
    status: "Open"
  });
  res.status(201).json({ poll: pollDto(poll) });
});

export const botPollMessageUpdate = asyncHandler(async (req, res) => {
  const body = serviceContextSchema.extend({
    guildId: z.string().trim().optional(),
    channelId: z.string().trim().optional(),
    messageId: z.string().trim().optional()
  }).parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const messageLink = body.guildId && body.channelId && body.messageId
    ? `https://discord.com/channels/${body.guildId}/${body.channelId}/${body.messageId}`
    : "";
  const poll = await PollModel.findOneAndUpdate(
    { _id: req.params.id, allianceId },
    { $set: { channelId: body.channelId || "", messageId: body.messageId || "", messageLink } },
    { new: true }
  );
  if (!poll) throw new HttpError(404, "Poll not found");
  res.json({ poll: pollDto(poll) });
});

export const botPollVote = asyncHandler(async (req, res) => {
  const body = serviceContextSchema.extend({
    discordId: z.string().trim().min(1),
    displayName: z.string().trim().max(120).optional(),
    optionKey: z.string().trim().regex(/^o\d{1,2}$/)
  }).parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  res.json(await recordPollVote({
    allianceId,
    pollId: req.params.id,
    discordId: body.discordId,
    displayName: body.displayName,
    optionKey: body.optionKey
  }));
});

export const botShieldAlert = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      officerDiscordId: z.string(),
      officerName: z.string().optional(),
      playerDiscordId: z.string(),
      playerName: z.string().optional()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const alert = await recordKellaAction(allianceId, {
    type: "shield_alert",
    actorDiscordId: body.officerDiscordId,
    actorName: body.officerName,
    targetDiscordId: body.playerDiscordId,
    targetName: body.playerName,
    status: "Sent"
  });
  res.status(201).json({ alert });
});

export const botAttackAlert = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      officerDiscordId: z.string(),
      officerName: z.string().optional(),
      channelId: z.string().optional(),
      messageId: z.string().optional()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const alert = await recordKellaAction(allianceId, {
    type: "attack_alert",
    actorDiscordId: body.officerDiscordId,
    actorName: body.officerName,
    status: "Open",
    payload: { channelId: body.channelId, messageId: body.messageId }
  });
  emitAlliance(allianceId, realtimeEvents.callToArmsCreated, alert);
  res.status(201).json({ alert });
});

export const botAttackResponse = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      status: z.enum(["Joining Fight", "Defending", "On The Way", "Unavailable"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const response = await recordKellaAction(allianceId, {
    type: "attack_response",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    status: body.status
  });
  emitAlliance(allianceId, realtimeEvents.callToArmsResponse, response);
  res.status(201).json({ response });
});

export const botEventResponse = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      eventId: z.string(),
      status: z.enum(["Attending", "Absent", "Not Sure"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  if (!Types.ObjectId.isValid(body.eventId)) throw new HttpError(400, "Invalid event id");

  const event = (await KellaActionModel.findOne({ allianceId, _id: body.eventId, type: "event_created" }).lean()) as any;
  if (!event) throw new HttpError(404, "Event not found");

  const response = await KellaActionModel.findOneAndUpdate(
    {
      allianceId,
      type: "event_response",
      reportId: body.eventId,
      actorDiscordId: body.discordId
    },
    {
      $setOnInsert: {
        allianceId,
        type: "event_response",
        reportId: body.eventId,
        actorDiscordId: body.discordId
      },
      $set: {
        actorName: body.displayName,
        eventType: event.eventType || event.payload?.title || "Alliance Event",
        status: body.status,
        sentAt: new Date()
      }
    },
    { upsert: true, new: true }
  );
  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, response);
  res.status(201).json({ response });
});




export const botSummitResponse = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      status: z.enum(["Attending", "Absent", "Not Sure"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const response = await recordKellaAction(allianceId, {
    type: "summit_response",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    eventType: "Summit",
    status: body.status
  });
  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, response);
  res.status(201).json({ response });
});

export const botDailyCheckIn = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const checkIn = await recordKellaAction(allianceId, {
    type: "daily_checkin",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    status: "Checked In"
  });
  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, checkIn);
  res.status(201).json({ checkIn });
});

export const botAbsence = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      reason: z.string(),
      startDate: z.string(),
      endDate: z.string()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const absence = await recordKellaAction(allianceId, {
    type: "absence",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    status: "Away",
    payload: { reason: body.reason, startDate: body.startDate, endDate: body.endDate }
  });
  res.status(201).json({ absence });
});

export const botApplication = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      ign: z.string(),
      power: z.coerce.number().min(0),
      timezone: z.string(),
      mainLegion: z.string()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const application = await recordKellaAction(allianceId, {
    type: "application",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    status: "Pending",
    payload: {
      ign: body.ign,
      power: body.power,
      timezone: body.timezone,
      mainLegion: body.mainLegion
    }
  });
  emitAlliance(allianceId, realtimeEvents.recruitmentUpdated, application);
  res.status(201).json({ application });
});

export const botComplaint = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      kind: z.enum(["Complaint", "Suggestion"]).default("Complaint"),
      message: z.string().min(1).max(1800),
      anonymous: z.boolean().optional().default(false)
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const complaint = await recordKellaAction(allianceId, {
    type: "complaint",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    eventType: body.kind,
    status: "Pending",
    payload: {
      kind: body.kind,
      message: body.message,
      anonymous: body.anonymous
    }
  });
  res.status(201).json({ complaint });
});


export const botEventReminder = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      officerDiscordId: z.string(),
      officerName: z.string().optional(),
      eventType: z.string()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const reminder = await recordKellaAction(allianceId, {
    type: "event_reminder",
    actorDiscordId: body.officerDiscordId,
    actorName: body.officerName,
    eventType: body.eventType,
    status: "Queued"
  });
  res.status(201).json({ reminder });
});

export const botAlert = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      title: z.string(),
      message: z.string(),
      priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("HIGH"),
      target: z.string().optional(),
      createdByDiscordId: z.string()
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const user = await UserModel.findOne({ allianceId, discordId: body.createdByDiscordId });
  if (!user) throw new HttpError(404, "Discord user is not linked to a dashboard user");
  const alert = await CallToArmsModel.create({ ...body, allianceId, createdBy: user._id });
  await publishCallToArms(alert._id.toString());
  res.status(201).json({ alert });
});



export const botCallToArmsResponse = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      status: z.enum(["Responding", "Reinforcing", "Unavailable"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: body.discordId });
  const alert = await CallToArmsModel.findOne({ _id: req.params.id, allianceId });
  if (!member || !alert) throw new HttpError(404, "Member or alert not found");
  alert.set(
    "responses",
    alert.responses
      .filter((response: any) => response.memberId.toString() !== member._id.toString())
      .concat({ memberId: member._id, status: body.status, respondedAt: new Date() } as never)
  );
  await alert.save();
  emitAlliance(allianceId, realtimeEvents.callToArmsResponse, { alertId: alert._id, memberId: member._id, status: body.status });
  res.json({ alert });
});
