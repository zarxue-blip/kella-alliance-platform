import { Schema, model, type InferSchemaType } from "mongoose";
import type { DiplomacyType } from "@cod-amp/shared";

export const diplomacyTypes: DiplomacyType[] = ["Allies", "NAP Agreements", "Enemies", "Friendly Alliances"];

const diplomacySchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    externalAllianceName: { type: String, required: true, trim: true },
    externalAllianceTag: { type: String, trim: true, uppercase: true },
    type: { type: String, enum: diplomacyTypes, required: true, index: true },
    agreement: { type: String, default: "" },
    notes: { type: String, default: "" },
    history: [
      {
        title: { type: String, required: true },
        body: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export type DiplomacyDocument = InferSchemaType<typeof diplomacySchema>;
export const DiplomacyModel = model("Diplomacy", diplomacySchema);
