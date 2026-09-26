import type { Request, Response } from "express";
import { Types } from "mongoose";
import { env, isProduction } from "../config/env.js";
import { MemberModel } from "../models/member.model.js";
import { UserModel } from "../models/user.model.js";
import { signSessionToken } from "../middleware/auth.js";
import {
  verifyPrivateMemberAccessSignature
} from "../services/privateMemberAccess.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export const beginPrivateMemberAccess = asyncHandler(async (req: Request, res: Response) => {
  const { memberId, signature } = req.params;
  if (!Types.ObjectId.isValid(memberId)) throw new HttpError(404, "Access link not found");
  const member = await MemberModel.findOne({ _id: memberId, privateSiteAccess: true })
    .select("allianceId ign privateAccessVersion")
    .lean() as any;
  const version = Number(member?.privateAccessVersion || 0);
  if (!member || !verifyPrivateMemberAccessSignature(memberId, version, signature)) {
    throw new HttpError(404, "Access link not found");
  }
  const privateIdentity = `private-member:${memberId}`;
  const user = await UserModel.findOneAndUpdate(
    { discordId: privateIdentity },
    {
      $set: {
        username: member.ign || "Private Member",
        role: "Member",
        allianceId: member.allianceId,
        memberId: member._id,
        privateSiteAccess: true,
        inConfiguredGuild: false,
        lastLoginAt: new Date()
      }
    },
    { upsert: true, new: true }
  );
  const token = signSessionToken({
    id: user._id.toString(),
    discordId: privateIdentity,
    role: "Member",
    privateSiteAccess: true,
    allianceId: member.allianceId.toString()
  });
  res.cookie(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.set("Cache-Control", "private, no-store").redirect("/profile");
});
