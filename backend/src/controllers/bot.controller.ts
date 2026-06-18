import { realtimeEvents } from "@cod-amp/shared";
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
import { RootsOfWarRegistrationModel } from "../models/rootsOfWarRegistration.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { publishCallToArms } from "../services/alert.service.js";
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

export const botRootsResponse = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      displayName: z.string().optional(),
      slot: z.enum(["14UTC", "20UTC"]),
      status: z.enum(["Available", "Absent", "Not Sure"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const response = await recordKellaAction(allianceId, {
    type: "roots_response",
    actorDiscordId: body.discordId,
    actorName: body.displayName,
    eventType: "Roots of War",
    slot: body.slot,
    status: body.status
  });
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

export const botRootsOfWarRegister = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      slot: z.enum(["14UTC", "20UTC"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: body.discordId });
  if (!member) throw new HttpError(404, "Register with /register before joining Roots of War");

  const registration = await RootsOfWarRegistrationModel.findOneAndUpdate(
    { allianceId, memberId: member._id },
    {
      $set: {
        allianceId,
        memberId: member._id,
        discordId: member.discordId,
        slot: body.slot,
        status: "Registered"
      },
      $setOnInsert: { registeredAt: new Date() }
    },
    { upsert: true, new: true, runValidators: true }
  );
  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, {
    rootsOfWar: true,
    action: "registered",
    slot: body.slot,
    memberId: member._id
  });
  res.json({ registration, member });
});

export const botRootsOfWarCheckIn = asyncHandler(async (req, res) => {
  const body = serviceContextSchema
    .extend({
      discordId: z.string(),
      slot: z.enum(["14UTC", "20UTC"])
    })
    .parse(req.body);
  const allianceId = await resolveAllianceId(body.allianceId);
  const member = await MemberModel.findOne({ allianceId, discordId: body.discordId });
  if (!member) throw new HttpError(404, "Register with /register before checking in");

  const existing = await RootsOfWarRegistrationModel.findOne({ allianceId, memberId: member._id });
  const alreadyCheckedIn = existing?.status === "Checked In";
  const registration = await RootsOfWarRegistrationModel.findOneAndUpdate(
    { allianceId, memberId: member._id },
    {
      $set: {
        allianceId,
        memberId: member._id,
        discordId: member.discordId,
        slot: body.slot,
        status: "Checked In",
        checkedInAt: new Date()
      },
      $setOnInsert: { registeredAt: new Date() }
    },
    { upsert: true, new: true, runValidators: true }
  );

  if (!alreadyCheckedIn) {
    await MemberModel.updateOne(
      { _id: member._id },
      { $inc: { attendanceScore: 1, warScore: 1 }, $set: { lastActivity: new Date() } }
    );
  }

  emitAlliance(allianceId, realtimeEvents.attendanceCheckedIn, {
    rootsOfWar: true,
    action: "checked-in",
    slot: body.slot,
    memberId: member._id
  });
  res.json({ checkedIn: !alreadyCheckedIn, registration, member });
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
