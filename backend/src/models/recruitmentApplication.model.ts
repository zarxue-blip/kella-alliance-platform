import { Schema, model, type InferSchemaType } from "mongoose";
import type { RecruitmentStatus } from "@cod-amp/shared";

export const recruitmentStatuses: RecruitmentStatus[] = ["Applied", "Review", "Interview", "Approved", "Rejected"];

const recruitmentApplicationSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    ign: { type: String, required: true, trim: true },
    power: { type: Number, required: true, min: 0, index: true },
    timezone: { type: String, required: true },
    country: { type: String, required: true },
    experience: { type: String, required: true },
    previousAlliance: { type: String },
    discordId: { type: String, index: true },
    status: { type: String, enum: recruitmentStatuses, default: "Applied", index: true },
    recruiterId: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String, default: "" },
    history: [
      {
        status: { type: String, enum: recruitmentStatuses },
        note: { type: String },
        changedBy: { type: Schema.Types.ObjectId, ref: "User" },
        changedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export type RecruitmentApplicationDocument = InferSchemaType<typeof recruitmentApplicationSchema>;
export const RecruitmentApplicationModel = model("RecruitmentApplication", recruitmentApplicationSchema);
