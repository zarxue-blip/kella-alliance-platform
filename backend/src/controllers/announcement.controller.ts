import { realtimeEvents } from "@cod-amp/shared";
import { z } from "zod";
import { AnnouncementModel } from "../models/announcement.model.js";
import { emitAlliance, emitNotification, moduleNotification } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const announcementSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  template: z.enum(["War Alert", "Summit Reminder", "Recruitment", "Emergency Defense", "Maintenance"]),
  embedColor: z.string().default("#f59e0b"),
  channels: z.array(z.string()).default(["dashboard", "discord"]),
  scheduledFor: z.coerce.date().optional()
});

export const listAnnouncements = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const announcements = await AnnouncementModel.find({ allianceId: req.user.allianceId }).sort({ createdAt: -1 }).limit(100).lean();
  res.json({ announcements });
});

export const createAnnouncement = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = announcementSchema.parse(req.body);
  const announcement = await AnnouncementModel.create({ ...input, allianceId: req.user.allianceId, createdBy: req.user.id });
  emitAlliance(req.user.allianceId, realtimeEvents.announcementScheduled, announcement);
  emitNotification(req.user.allianceId, moduleNotification("announcements", "Announcement scheduled", announcement.title, "MEDIUM"));
  res.status(201).json({ announcement });
});

export const publishAnnouncement = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const announcement = await AnnouncementModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: { sentAt: new Date() } },
    { new: true }
  );
  if (!announcement) throw new HttpError(404, "Announcement not found");
  emitNotification(req.user.allianceId, moduleNotification("announcements", announcement.title, announcement.body, "HIGH"));
  res.json({ announcement });
});
