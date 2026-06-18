import { realtimeEvents, type RootsOfWarTimeSlot } from "@cod-amp/shared";
import { z } from "zod";
import { MemberModel } from "../models/member.model.js";
import { RootsOfWarRegistrationModel, rootsOfWarSlots } from "../models/rootsOfWarRegistration.model.js";
import { emitAlliance, emitNotification, moduleNotification } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const slotSchema = z.enum(["14UTC", "20UTC"]);
const registrationSchema = z.object({
  slot: slotSchema,
  memberId: z.string().optional(),
  discordId: z.string().optional(),
  notes: z.string().optional()
});

export const listRootsOfWarRegistrations = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const slot = typeof req.query.slot === "string" ? req.query.slot : undefined;
  const registrations = await RootsOfWarRegistrationModel.find({
    allianceId: req.user.allianceId,
    ...(slot ? { slot } : {})
  })
    .populate("memberId", "ign uid power alliance role")
    .sort({ slot: 1, registeredAt: 1 })
    .limit(1000)
    .lean();

  const summary = rootsOfWarSlots.map((slotValue) => ({
    slot: slotValue,
    registered: registrations.filter((registration) => registration.slot === slotValue && registration.status !== "Cancelled").length,
    checkedIn: registrations.filter((registration) => registration.slot === slotValue && registration.status === "Checked In").length
  }));

  res.json({ registrations, summary });
});

export const registerRootsOfWar = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = registrationSchema.parse(req.body);
  const member = await resolveMember(req.user.allianceId, input.memberId, input.discordId ?? req.user.discordId);
  const registration = await RootsOfWarRegistrationModel.findOneAndUpdate(
    { allianceId: req.user.allianceId, memberId: member._id },
    {
      $set: {
        allianceId: req.user.allianceId,
        memberId: member._id,
        discordId: member.discordId,
        slot: input.slot,
        status: "Registered",
        notes: input.notes ?? ""
      },
      $setOnInsert: { registeredAt: new Date() }
    },
    { upsert: true, new: true, runValidators: true }
  );

  emitAlliance(req.user.allianceId, realtimeEvents.attendanceCheckedIn, {
    rootsOfWar: true,
    action: "registered",
    slot: input.slot,
    memberId: member._id
  });
  emitNotification(
    req.user.allianceId,
    moduleNotification("events", "Roots of War registration", `${member.ign} registered for ${formatSlot(input.slot)}.`, "MEDIUM")
  );
  res.status(201).json({ registration });
});

export const checkInRootsOfWar = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = registrationSchema.parse(req.body);
  const member = await resolveMember(req.user.allianceId, input.memberId, input.discordId ?? req.user.discordId);
  const existing = await RootsOfWarRegistrationModel.findOne({ allianceId: req.user.allianceId, memberId: member._id });
  const alreadyCheckedIn = existing?.status === "Checked In";

  const registration = await RootsOfWarRegistrationModel.findOneAndUpdate(
    { allianceId: req.user.allianceId, memberId: member._id },
    {
      $set: {
        allianceId: req.user.allianceId,
        memberId: member._id,
        discordId: member.discordId,
        slot: input.slot,
        status: "Checked In",
        checkedInAt: new Date(),
        checkedInBy: req.user.id,
        notes: input.notes ?? existing?.notes ?? ""
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

  emitAlliance(req.user.allianceId, realtimeEvents.attendanceCheckedIn, {
    rootsOfWar: true,
    action: "checked-in",
    slot: input.slot,
    memberId: member._id
  });
  res.json({ checkedIn: !alreadyCheckedIn, registration });
});

async function resolveMember(allianceId: string, memberId?: string, discordId?: string) {
  const member = memberId
    ? await MemberModel.findOne({ _id: memberId, allianceId })
    : await MemberModel.findOne({ discordId, allianceId });
  if (!member) throw new HttpError(404, "Member not found for Roots of War registration");
  return member;
}

function formatSlot(slot: RootsOfWarTimeSlot) {
  return slot === "14UTC" ? "14:00 UTC" : "20:00 UTC";
}
