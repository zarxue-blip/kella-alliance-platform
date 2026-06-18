import { Schema, model, type InferSchemaType } from "mongoose";
import type { RootsOfWarRegistrationStatus, RootsOfWarTimeSlot } from "@cod-amp/shared";

export const rootsOfWarSlots = ["14UTC", "20UTC"] as const satisfies readonly RootsOfWarTimeSlot[];
export const rootsOfWarStatuses = ["Registered", "Checked In", "Cancelled"] as const satisfies readonly RootsOfWarRegistrationStatus[];

const rootsOfWarRegistrationSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true, index: true },
    discordId: { type: String, required: true, index: true },
    slot: { type: String, enum: [...rootsOfWarSlots], required: true, index: true },
    status: { type: String, enum: [...rootsOfWarStatuses], default: "Registered", index: true },
    registeredAt: { type: Date, default: Date.now },
    checkedInAt: { type: Date },
    checkedInBy: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

rootsOfWarRegistrationSchema.index({ allianceId: 1, memberId: 1 }, { unique: true });
rootsOfWarRegistrationSchema.index({ allianceId: 1, slot: 1, status: 1 });

export type RootsOfWarRegistrationDocument = InferSchemaType<typeof rootsOfWarRegistrationSchema>;
export const RootsOfWarRegistrationModel = model("RootsOfWarRegistration", rootsOfWarRegistrationSchema);
