import { Schema, model, type InferSchemaType } from "mongoose";

const shieldSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    cityLocation: { type: String },
    lastAlertMinutes: { type: Number },
    notes: { type: String },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

shieldSchema.index({ allianceId: 1, expiresAt: 1 });

export type ShieldDocument = InferSchemaType<typeof shieldSchema>;
export const ShieldModel = model<any>("Shield", shieldSchema);
