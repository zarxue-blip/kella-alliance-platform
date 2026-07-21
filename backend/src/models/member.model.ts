import { Schema, model, type InferSchemaType } from "mongoose";
import { roleValues } from "./user.model.js";

const memberSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    mainMemberId: { type: Schema.Types.ObjectId, ref: "Member", default: undefined, index: true },
    discordId: { type: String, required: true, index: true },
    discordUsername: { type: String, default: "", trim: true },
    discordDisplayName: { type: String, default: "", trim: true },
    discordAvatarUrl: { type: String, default: "", trim: true },
    profilePhotoUrl: { type: String, default: "", trim: true },
    ign: { type: String, required: true, trim: true, index: "text" },
    uid: { type: String, required: true, trim: true, index: true },
    power: { type: Number, default: 0, min: 0, index: true },
    powerHistory: [
      {
        date: { type: Date, required: true },
        power: { type: Number, required: true, min: 0 },
        source: { type: String, default: "TopN Excel" },
        filename: { type: String, default: "" }
      }
    ],
    statHistory: [
      {
        date: { type: Date, required: true },
        metrics: { type: Schema.Types.Mixed, default: {} },
        source: { type: String, default: "TopN Excel" },
        filename: { type: String, default: "" }
      }
    ],
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
memberSchema.index({ allianceId: 1, mainMemberId: 1 });
memberSchema.index({ allianceId: 1, "powerHistory.date": -1 });
memberSchema.index({ allianceId: 1, "statHistory.date": -1 });

export type MemberDocument = InferSchemaType<typeof memberSchema>;
export const MemberModel = model<any>("Member", memberSchema);
