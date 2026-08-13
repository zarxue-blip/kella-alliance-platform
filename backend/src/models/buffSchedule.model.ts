import { Schema, model, type InferSchemaType } from "mongoose";

export const buffScheduleDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const buffScheduleTypes = ["Gathering", "Research", "Training", "Construction", "Healing"] as const;

const buffScheduleDaySchema = new Schema(
  {
    day: { type: String, enum: buffScheduleDays, required: true },
    buff: { type: String, enum: buffScheduleTypes, required: true },
    note: { type: String, default: "", trim: true, maxlength: 160 }
  },
  { _id: false }
);

const buffScheduleSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, unique: true, index: true },
    days: { type: [buffScheduleDaySchema], required: true },
    updatedBy: { type: String, default: "Dashboard", trim: true, maxlength: 120 },
    lastPublishedHash: { type: String, default: "", trim: true, maxlength: 80 },
    lastPublishedAt: { type: Date, default: undefined },
    lastDiscordMessageId: { type: String, default: "", trim: true, maxlength: 40 }
  },
  { timestamps: true }
);

export type BuffScheduleDocument = InferSchemaType<typeof buffScheduleSchema>;
export const BuffScheduleModel = model<any>("BuffSchedule", buffScheduleSchema);
