import { Schema, model, type InferSchemaType } from "mongoose";
import { attendanceTypes } from "./attendanceEvent.model.js";

const rsvpSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    status: { type: String, enum: ["Going", "Maybe", "Unavailable"], required: true },
    respondedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true },
    type: { type: String, enum: attendanceTypes, required: true },
    description: { type: String, default: "" },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date },
    reminderMinutes: { type: [Number], default: [1440, 60, 15] },
    calendarProvider: { type: String, enum: ["none", "google", "ical"], default: "none" },
    rsvps: { type: [rsvpSchema], default: [] },
    attendanceEventId: { type: Schema.Types.ObjectId, ref: "AttendanceEvent" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type EventDocument = InferSchemaType<typeof eventSchema>;
export const EventModel = model("Event", eventSchema);
