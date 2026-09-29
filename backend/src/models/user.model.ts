import { Schema, model, type InferSchemaType } from "mongoose";
import type { UserRole } from "@cod-amp/shared";

export const roleValues: UserRole[] = ["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"];

const userSchema = new Schema(
  {
    discordId: { type: String, required: true, unique: true, index: true },
    googleSub: { type: String, unique: true, sparse: true },
    localUsernameKey: { type: String, unique: true, sparse: true, select: false },
    localLordId: { type: String, trim: true },
    localPasswordHash: { type: String, select: false },
    localApprovalStatus: { type: String, enum: ["pending", "approved", "terminated"] },
    localReviewedAt: { type: Date },
    localReviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String, lowercase: true, trim: true },
    inGameUsername: { type: String, trim: true },
    googleApprovalStatus: { type: String, enum: ["pending", "approved", "terminated"] },
    googleApprovalSource: { type: String, enum: ["admin", "kofi"] },
    googleReviewedAt: { type: Date },
    googleReviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    kofiPaymentEmail: { type: String, lowercase: true, trim: true },
    kofiPaidThrough: { type: Date },
    username: { type: String, required: true },
    avatar: { type: String },
    discordRoleIds: [{ type: String }],
    inConfiguredGuild: { type: Boolean, default: false },
    role: { type: String, enum: roleValues, default: "Member", index: true },
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member" },
    commanderTools: { type: Schema.Types.Mixed, default: {}, select: false },
    baseLayout: { type: Schema.Types.Mixed, default: {}, select: false },
    privateSiteAccess: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model<any>("User", userSchema);
