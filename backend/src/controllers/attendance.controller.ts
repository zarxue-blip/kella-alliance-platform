import { realtimeEvents } from "@cod-amp/shared";
import { randomBytes } from "node:crypto";
import { Types } from "mongoose";
import { z } from "zod";
import { AttendanceEventModel } from "../models/attendanceEvent.model.js";
import { MemberModel } from "../models/member.model.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const attendanceSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Summit", "Fortress", "Stronghold", "Pass", "Behemoth", "Roots of War", "Darkling", "Training", "Meeting"]),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  checkInWindowMinutes: z.coerce.number().min(5).max(1440).default(60)
});

export const listAttendanceEvents = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const events = await AttendanceEventModel.find({ allianceId: req.user.allianceId })
    .sort({ startsAt: -1 })
    .limit(100)
    .lean();
  res.json({ events });
});

export const createAttendanceEvent = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = attendanceSchema.parse(req.body);
  const event = await AttendanceEventModel.create({
    ...input,
    allianceId: req.user.allianceId,
    createdBy: req.user.id,
    qrToken: randomBytes(20).toString("hex")
  });
  emitAlliance(req.user.allianceId, realtimeEvents.attendanceCheckedIn, { event, created: true });
  res.status(201).json({ event });
});

export const checkInAttendance = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z
    .object({
      memberId: z.string().optional(),
      discordId: z.string().optional(),
      method: z.enum(["discord", "web", "qr", "manual"]).default("web"),
      qrToken: z.string().optional(),
      notes: z.string().optional()
    })
    .parse(req.body);

  const event = await AttendanceEventModel.findOne({ _id: req.params.id, allianceId: req.user.allianceId });
  if (!event) throw new HttpError(404, "Attendance event not found");
  if (body.method === "qr" && event.qrToken !== body.qrToken) throw new HttpError(403, "Invalid QR check-in token");

  const member = body.memberId
    ? await MemberModel.findOne({ _id: body.memberId, allianceId: req.user.allianceId })
    : await MemberModel.findOne({ discordId: body.discordId ?? req.user.discordId, allianceId: req.user.allianceId });
  if (!member) throw new HttpError(404, "Member not found");

  const alreadyCheckedIn = event.checkIns.some((entry: any) => entry.memberId.toString() === member._id.toString());
  if (!alreadyCheckedIn) {
    event.checkIns.push({
      memberId: member._id,
      discordId: member.discordId,
      method: body.method,
      checkedInBy: req.user.id,
      checkedInAt: new Date(),
      notes: body.notes
    });
    await event.save();
    await MemberModel.updateOne(
      { _id: member._id },
      { $inc: { attendanceScore: 1 }, $set: { lastActivity: new Date() } }
    );
  }

  emitAlliance(req.user.allianceId, realtimeEvents.attendanceCheckedIn, { eventId: event._id, memberId: member._id });
  res.json({ checkedIn: !alreadyCheckedIn, event });
});

export const attendanceLeaderboard = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const leaders = await MemberModel.find({ allianceId: req.user.allianceId })
    .sort({ attendanceScore: -1, warScore: -1 })
    .limit(50)
    .select("ign uid power alliance role attendanceScore warScore contributionScore")
    .lean();
  res.json({ leaders });
});

export const attendanceReport = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const period = String(req.query.period ?? "weekly");
  const days = period === "monthly" ? 31 : period === "all" ? 3650 : 7;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const report = await AttendanceEventModel.aggregate([
    { $match: { allianceId: new Types.ObjectId(req.user.allianceId), startsAt: { $gte: since } } },
    { $project: { title: 1, type: 1, startsAt: 1, attendeeCount: { $size: "$checkIns" } } },
    { $sort: { startsAt: -1 } }
  ]);
  res.json({ period, report });
});
