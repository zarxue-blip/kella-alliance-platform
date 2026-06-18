import { Schema, model, type InferSchemaType } from "mongoose";
import type { AnnouncementTemplate } from "@cod-amp/shared";

export const announcementTemplates: AnnouncementTemplate[] = [
  "War Alert",
  "Summit Reminder",
  "Recruitment",
  "Emergency Defense",
  "Maintenance"
];

const announcementSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    template: { type: String, enum: announcementTemplates, required: true },
    embedColor: { type: String, default: "#f59e0b" },
    channels: { type: [String], default: ["dashboard", "discord"] },
    scheduledFor: { type: Date, index: true },
    sentAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type AnnouncementDocument = InferSchemaType<typeof announcementSchema>;
export const AnnouncementModel = model<any>("Announcement", announcementSchema);
