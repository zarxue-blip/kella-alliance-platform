import type { Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { isDashboardAdminUser, signSessionToken, type AuthenticatedRequest } from "../middleware/auth.js";
import { UserModel } from "../models/user.model.js";
import { exchangeGoogleCode, googleAuthorizationUrl, googleOAuthConfigured, type GoogleIdentity } from "../services/googleOAuth.service.js";
import { getOrCreateLoginAlliance } from "../services/loginAlliance.service.js";
import {
  createGoogleOAuthState, googleOAuthStateCookie, googleSignupCookie,
  signGoogleSignupIdentity, verifyGoogleOAuthState, verifyGoogleSignupIdentity
} from "../services/oauthState.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export function parseInGameUsername(value: unknown) {
  if (typeof value !== "string") throw new HttpError(400, "Enter your in-game username");
  const username = value.trim().replace(/\s+/g, " ");
  if (username.length < 2 || username.length > 40 || /[\x00-\x1f\x7f<>]/.test(username)) {
    throw new HttpError(400, "In-game username must be 2–40 characters");
  }
  return username;
}

function googleCookieOptions(req: Request) {
  const callbackHost = new URL(env.GOOGLE_REDIRECT_URI || env.DISCORD_REDIRECT_URI).hostname.replace(/^www\./, "");
  const sameSiteHost = req.hostname === callbackHost || req.hostname === "www." + callbackHost;
  return {
    httpOnly: true, secure: isProduction, sameSite: "lax" as const, path: "/",
    ...(isProduction && sameSiteHost ? { domain: callbackHost } : {})
  };
}

function statusPath(status: string) {
  return `/kingdom/access?status=${encodeURIComponent(status)}`;
}

function googleUserSession(res: Response, user: any) {
  const token = signSessionToken({
    id: user._id.toString(),
    discordId: user.discordId,
    role: user.role,
    privateSiteAccess: true,
    allianceId: user.allianceId.toString()
  });
  res.cookie(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true, secure: isProduction, sameSite: "lax", path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
}

async function createPendingGoogleUser(identity: GoogleIdentity, inGameUsername: string) {
  const existing = await UserModel.findOne({ googleSub: identity.sub });
  if (existing) {
    if (existing.googleApprovalStatus === "pending") {
      await UserModel.updateOne({ _id: existing._id }, { $set: { inGameUsername, username: inGameUsername, email: identity.email } });
    }
    return existing;
  }
  const alliance = await getOrCreateLoginAlliance();
  try {
    return await UserModel.create({
      discordId: `google:${identity.sub}`,
      googleSub: identity.sub,
      email: identity.email,
      inGameUsername,
      googleApprovalStatus: "pending",
      username: inGameUsername,
      role: "Member",
      discordRoleIds: [],
      inConfiguredGuild: false,
      privateSiteAccess: false,
      disabled: true,
      allianceId: alliance._id
    });
  } catch (error: any) {
    if (error?.code === 11000) {
      const duplicate = await UserModel.findOne({ googleSub: identity.sub });
      if (duplicate) return duplicate;
    }
    throw error;
  }
}

export const startGoogleLogin = asyncHandler(async (req: Request, res: Response) => {
  if (!googleOAuthConfigured()) return res.redirect(statusPath("unavailable"));
  const inGameUsername = req.method === "POST" ? parseInGameUsername(req.body?.inGameUsername) : undefined;
  const { state, nonce, cookie } = createGoogleOAuthState(inGameUsername);
  res.set("Cache-Control", "no-store");
  res.cookie(googleOAuthStateCookie, cookie, { ...googleCookieOptions(req), maxAge: 600_000 });
  res.redirect(googleAuthorizationUrl(state, nonce));
});

export const googleCallback = asyncHandler(async (req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");
  const login = verifyGoogleOAuthState(req.query.state, req.cookies?.[googleOAuthStateCookie]);
  res.clearCookie(googleOAuthStateCookie, googleCookieOptions(req));
  res.clearCookie(googleSignupCookie, googleCookieOptions(req));
  if (req.query.error) return res.redirect(statusPath("cancelled"));
  if (typeof req.query.code !== "string" || !login) return res.redirect(statusPath("expired"));
  const identity = await exchangeGoogleCode(req.query.code, login.nonce);
  const existing = await UserModel.findOne({ googleSub: identity.sub });
  if (existing?.googleApprovalStatus === "approved" && !existing.disabled) {
    await UserModel.updateOne({ _id: existing._id }, { $set: { email: identity.email, lastLoginAt: new Date() } });
    googleUserSession(res, existing);
    return res.redirect("/base");
  }
  if (existing?.googleApprovalStatus === "terminated") return res.redirect(statusPath("terminated"));
  if (login.inGameUsername) {
    await createPendingGoogleUser(identity, login.inGameUsername);
    return res.redirect(statusPath("pending"));
  }
  if (existing?.googleApprovalStatus === "pending") return res.redirect(statusPath("pending"));
  res.cookie(googleSignupCookie, signGoogleSignupIdentity(identity), { ...googleCookieOptions(req), maxAge: 600_000 });
  res.redirect("/kingdom/complete");
});

export const completeGoogleSignup = asyncHandler(async (req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");
  const identity = verifyGoogleSignupIdentity(req.cookies?.[googleSignupCookie]);
  if (!identity) return res.redirect(statusPath("expired"));
  const inGameUsername = parseInGameUsername(req.body?.inGameUsername);
  await createPendingGoogleUser(identity, inGameUsername);
  res.clearCookie(googleSignupCookie, googleCookieOptions(req));
  res.redirect(statusPath("pending"));
});

function requireKingdomAdmin(req: AuthenticatedRequest) {
  if (!isDashboardAdminUser(req.user)) throw new HttpError(403, "Kella admin access required");
}

export const listKingdomSignups = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  requireKingdomAdmin(req);
  const users = await UserModel.find({ allianceId: req.user.allianceId, googleSub: { $exists: true } })
    .select("_id inGameUsername email googleApprovalStatus createdAt lastLoginAt googleReviewedAt")
    .sort({ createdAt: -1 }).lean() as any[];
  res.set("Cache-Control", "private, no-store");
  res.json({ members: users.map((user) => ({
    id: user._id.toString(),
    inGameUsername: user.inGameUsername || "",
    email: user.email || "",
    status: user.googleApprovalStatus || "pending",
    signedUpAt: user.createdAt,
    lastLoginAt: user.lastLoginAt || null,
    reviewedAt: user.googleReviewedAt || null
  })) });
});

export const reviewKingdomSignup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  requireKingdomAdmin(req);
  const id = req.params.id;
  const status = req.body?.status;
  if (!/^[a-f\d]{24}$/i.test(id) || (status !== "approved" && status !== "terminated")) {
    throw new HttpError(400, "Choose Approve or Terminate");
  }
  const user = await UserModel.findOneAndUpdate(
    { _id: id, allianceId: req.user.allianceId, googleSub: { $exists: true } },
    { $set: {
      googleApprovalStatus: status,
      googleReviewedAt: new Date(),
      googleReviewedBy: req.user.id,
      privateSiteAccess: status === "approved",
      disabled: status !== "approved"
    } },
    { new: true, runValidators: true }
  ).lean() as any;
  if (!user) throw new HttpError(404, "Signup not found");
  res.set("Cache-Control", "private, no-store");
  res.json({ id: user._id.toString(), status: user.googleApprovalStatus });
});
