import { realtimeEvents } from "@cod-amp/shared";
import { Types } from "mongoose";
import { z } from "zod";
import { MemberModel } from "../models/member.model.js";
import { UserModel } from "../models/user.model.js";
import { membersToCsv } from "../services/csv.service.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const memberSchema = z.object({
  discordId: z.string().min(1),
  ign: z.string().min(1),
  uid: z.string().min(1),
  power: z.coerce.number().min(0).default(0),
  alliance: z.string().min(1),
  rank: z.string().default("R1"),
  role: z.enum(["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"]).default("Member"),
  timezone: z.string().default("UTC"),
  country: z.string().default("Unknown"),
  notes: z.string().optional()
});

export const listMembers = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { q, role, rank, country, sort = "power", order = "desc" } = req.query;
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 50), 1), 500);
  const filter: Record<string, unknown> = { allianceId: req.user.allianceId };

  if (typeof q === "string" && q.trim()) {
    filter.$or = [
      { ign: { $regex: q, $options: "i" } },
      { uid: { $regex: q, $options: "i" } },
      { discordId: { $regex: q, $options: "i" } }
    ];
  }
  if (typeof role === "string") filter.role = role;
  if (typeof rank === "string") filter.rank = rank;
  if (typeof country === "string") filter.country = country;

  const direction = order === "asc" ? 1 : -1;
  const [members, total] = await Promise.all([
    MemberModel.find(filter)
      .sort({ [String(sort)]: direction })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    MemberModel.countDocuments(filter)
  ]);
  res.json({ members, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const createMember = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = memberSchema.parse(req.body);
  const member = await MemberModel.create({ ...input, allianceId: req.user.allianceId });
  await UserModel.findOneAndUpdate(
    { discordId: member.discordId },
    { $set: { role: member.role, allianceId: req.user.allianceId, memberId: member._id } }
  );
  emitAlliance(req.user.allianceId, realtimeEvents.memberUpdated, member);
  res.status(201).json({ member });
});

export const updateMember = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const member = await MemberModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!member) throw new HttpError(404, "Member not found");
  emitAlliance(req.user.allianceId, realtimeEvents.memberUpdated, member);
  res.json({ member });
});

export const bulkUpdateMembers = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ ids: z.array(z.string()).min(1), patch: z.record(z.unknown()) }).parse(req.body);
  const result = await MemberModel.updateMany(
    { _id: { $in: body.ids }, allianceId: req.user.allianceId },
    { $set: body.patch },
    { runValidators: true }
  );
  emitAlliance(req.user.allianceId, realtimeEvents.memberUpdated, { bulk: true, ids: body.ids, patch: body.patch });
  res.json({ modifiedCount: result.modifiedCount });
});

export const exportMembers = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const rows = await MemberModel.find({ allianceId: req.user.allianceId }).lean();
  const csv = membersToCsv(
    rows.map((row) => ({
      id: row._id.toString(),
      discordId: row.discordId,
      ign: row.ign,
      uid: row.uid,
      power: row.power,
      alliance: row.alliance,
      rank: row.rank,
      role: row.role,
      timezone: row.timezone,
      country: row.country,
      joinDate: row.joinDate.toISOString(),
      lastActivity: row.lastActivity.toISOString(),
      attendanceScore: row.attendanceScore,
      warScore: row.warScore,
      contributionScore: row.contributionScore,
      notes: row.notes
    }))
  );
  res.header("content-type", "text/csv");
  res.attachment("members.csv").send(csv);
});

export const importMembers = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ members: z.array(memberSchema) }).parse(req.body);
  const allianceId = new Types.ObjectId(req.user.allianceId);
  const operations = body.members.map((member) => ({
    updateOne: {
      filter: { allianceId, uid: member.uid },
      update: { $set: { ...member, allianceId } },
      upsert: true
    }
  }));
  const result = operations.length ? await MemberModel.bulkWrite(operations) : undefined;
  emitAlliance(req.user.allianceId, realtimeEvents.memberUpdated, { import: true, count: body.members.length });
  res.json({ upsertedCount: result?.upsertedCount ?? 0, modifiedCount: result?.modifiedCount ?? 0 });
});
