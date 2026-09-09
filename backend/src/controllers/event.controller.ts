import { MemberModel } from "../models/member.model.js";
import { z } from "zod";
import { EventModel } from "../models/event.model.js";
import { emitNotification, moduleNotification } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import { isDashboardAdminUser, type AuthenticatedRequest } from "../middleware/auth.js";

const eventSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Summit", "Fortress", "Stronghold", "Pass", "Behemoth", "Roots of War", "Darkling", "Training", "Meeting"]),
  description: z.string().default(""),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  reminderMinutes: z.array(z.number()).default([1440, 60, 15])
});

export const listEvents = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const events = await EventModel.find({ allianceId: req.user.allianceId }).sort({ startsAt: 1 }).limit(200).lean();
  res.json({ events });
});

export const createEvent = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = eventSchema.parse(req.body);
  const event = await EventModel.create({ ...input, allianceId: req.user.allianceId, createdBy: req.user.id });
  emitNotification(req.user.allianceId, moduleNotification("events", "Event created", event.title, "MEDIUM"));
  res.status(201).json({ event });
});

export const rsvpEvent = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ memberId: z.string(), status: z.enum(["Going", "Maybe", "Unavailable"]) }).parse(req.body);
  const member = await MemberModel.findOne({ _id: body.memberId, allianceId: req.user.allianceId }).lean() as { discordId?: string } | null;
  if (!member || (!isDashboardAdminUser(req.user) && member.discordId !== req.user.discordId)) throw new HttpError(403, "You may only register your own member profile");
  const event = await EventModel.findOne({ _id: req.params.id, allianceId: req.user.allianceId });
  if (!event) throw new HttpError(404, "Event not found");
  event.set(
    "rsvps",
    event.rsvps
      .filter((rsvp: any) => rsvp.memberId.toString() !== body.memberId)
      .concat({ memberId: body.memberId, status: body.status, respondedAt: new Date() } as never)
  );
  await event.save();
  res.json({ event });
});
