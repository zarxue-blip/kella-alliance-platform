import { Schema, model, type InferSchemaType } from "mongoose";
import { roleValues } from "./user.model.js";

const memberSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    discordId: { type: String, required: true, index: true },
    ign: { type: String, required: true, trim: true, index: "text" },
    uid: { type: String, required: true, trim: true, index: true },
    power: { type: Number, default: 0, min: 0, index: true },
    alliance: { type: String, required: true, trim: true, index: true },
    rank: { type: String, default: "R1", trim: true },
    role: { type: String, enum: roleValues, default: "Member", index: true },
    timezone: { type: String, default: "UTC" },
    country: { type: String, default: "Unknown" },
    joinDate: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now, index: true },
    attendanceScore: { type: Number, default: 0 },
    warScore: { type: Number, default: 0 },
    contributionScore: { type: Number, default: 0 },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

memberSchema.index({ allianceId: 1, uid: 1 }, { unique: true });
memberSchema.index({ allianceId: 1, discordId: 1 }, { unique: true });

export type MemberDocument = InferSchemaType<typeof memberSchema>;
export const MemberModel = model("Member", memberSchema);
