import { Schema, model, type InferSchemaType } from "mongoose";
import type { AttendanceType } from "@cod-amp/shared";

export const attendanceTypes: AttendanceType[] = [
  "Summit",
  "Fortress",
  "Stronghold",
  "Pass",
  "Behemoth",
  "Roots of War",
  "Darkling",
  "Training",
  "Meeting"
];

const checkInSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    discordId: { type: String },
    method: { type: String, enum: ["discord", "web", "qr", "manual"], required: true },
    checkedInBy: { type: Schema.Types.ObjectId, ref: "User" },
    checkedInAt: { type: Date, default: Date.now },
    notes: { type: String }
  },
  { _id: false }
);

const attendanceEventSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: attendanceTypes, required: true, index: true },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date },
    checkInWindowMinutes: { type: Number, default: 60 },
    qrToken: { type: String, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIns: { type: [checkInSchema], default: [] }
  },
  { timestamps: true }
);

attendanceEventSchema.index({ allianceId: 1, startsAt: -1 });
attendanceEventSchema.index({ allianceId: 1, "checkIns.memberId": 1 });

export type AttendanceEventDocument = InferSchemaType<typeof attendanceEventSchema>;
export const AttendanceEventModel = model<any>("AttendanceEvent", attendanceEventSchema);
