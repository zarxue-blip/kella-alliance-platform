import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { signSessionToken } from "../middleware/auth.js";
import { UserModel } from "../models/user.model.js";
import { getOrCreateLoginAlliance } from "../services/loginAlliance.service.js";
import { hashLocalPassword, verifyLocalPassword } from "../services/localPassword.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { parseInGameUsername } from "./googleAuth.controller.js";

function isForm(req: Request) {
  return Boolean(req.is("application/x-www-form-urlencoded"));
}

function respond(req: Request, res: Response, code: number, status: string) {
  res.set("Cache-Control", "no-store");
  if (isForm(req)) return res.redirect(303, `/kingdom/access?status=${encodeURIComponent(status)}`);
  return res.status(code).json({ status });
}

export function localUsernameKey(value: unknown) {
  return parseInGameUsername(value).normalize("NFKC").toLowerCase();
}

function validLordId(value: unknown): value is string {
  return typeof value === "string" && /^\d{4,20}$/.test(value);
}

function validSignupPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= 12 && value.length <= 128 && Buffer.byteLength(value, "utf8") <= 512;
}

export const localSignup = asyncHandler(async (req: Request, res: Response) => {
  let username: string;
  let usernameKey: string;
  try {
    username = parseInGameUsername(req.body?.username);
    usernameKey = localUsernameKey(username);
  } catch {
    return respond(req, res, 400, "invalid-signup");
  }
  if (!validLordId(req.body?.lordId) || !validSignupPassword(req.body?.password)) {
    return respond(req, res, 400, "invalid-signup");
  }
  if (await UserModel.exists({ localUsernameKey: usernameKey })) {
    return respond(req, res, 409, "username-taken");
  }

  const alliance = await getOrCreateLoginAlliance();
  const passwordHash = await hashLocalPassword(req.body.password);
  try {
    await UserModel.create({
      discordId: `local:${randomUUID()}`,
      localUsernameKey: usernameKey,
      localLordId: req.body.lordId,
      localPasswordHash: passwordHash,
      localApprovalStatus: "pending",
      username,
      inGameUsername: username,
      role: "Member",
      discordRoleIds: [],
      inConfiguredGuild: false,
      privateSiteAccess: false,
      disabled: true,
      allianceId: alliance._id
    });
  } catch (error: any) {
    if (error?.code === 11000) return respond(req, res, 409, "username-taken");
    throw error;
  }
  return respond(req, res, 202, "pending-local");
});

export const localLogin = asyncHandler(async (req: Request, res: Response) => {
  let usernameKey: string;
  try {
    usernameKey = localUsernameKey(req.body?.username);
  } catch {
    return respond(req, res, 401, "invalid-credentials");
  }
  const password = req.body?.password;
  if (typeof password !== "string" || Buffer.byteLength(password, "utf8") > 512) {
    return respond(req, res, 401, "invalid-credentials");
  }
  const user = await UserModel.findOne({ localUsernameKey: usernameKey })
    .select("+localPasswordHash +localUsernameKey");
  if (!await verifyLocalPassword(password, user?.localPasswordHash)) {
    return respond(req, res, 401, "invalid-credentials");
  }
  if (user.localApprovalStatus !== "approved" || user.disabled) {
    return respond(req, res, 403,
      user.localApprovalStatus === "terminated" ? "terminated" : "pending-local");
  }
  const updated = await UserModel.updateOne(
    { _id: user._id, localApprovalStatus: "approved", disabled: false },
    { $set: { lastLoginAt: new Date() } }
  );
  if (!updated.matchedCount) return respond(req, res, 403, "pending-local");

  const token = signSessionToken({
    id: user._id.toString(), discordId: user.discordId, role: user.role,
    privateSiteAccess: Boolean(user.privateSiteAccess), allianceId: user.allianceId.toString()
  });
  res.cookie(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true, secure: isProduction, sameSite: "lax", path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.set("Cache-Control", "no-store");
  if (isForm(req)) return res.redirect(303, "/base");
  return res.json({ status: "approved", redirectUrl: "/base" });
});
