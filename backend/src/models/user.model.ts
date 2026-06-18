import { Schema, model, type InferSchemaType } from "mongoose";
import type { UserRole } from "@cod-amp/shared";

export const roleValues: UserRole[] = ["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"];

const userSchema = new Schema(
  {
    discordId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: roleValues, default: "Member", index: true },
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member" },
    disabled: { type: Boolean, default: false },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model<any>("User", userSchema);
