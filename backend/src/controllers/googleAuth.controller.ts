import type { Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { isDashboardAdminUser, signSessionToken, type AuthenticatedRequest } from "../middleware/auth.js";
import { UserModel } from "../models/user.model.js";
import { exchangeGoogleCode, googleAuthorizationUrl, googleOAuthConfigured, type GoogleIdentity } from "../services/googleOAuth.service.js";
import { getOrCreateLoginAlliance } from "../services/loginAlliance.service.js";
import { assignKofiPayment, isCurrentKofiAccess, requiresKofiPayment, syncKofiPaymentForGoogleUser } from "../services/kofiPayment.service.js";
import { beginPaymentAccess } from "../services/paymentAccess.service.js";
import { KofiPaymentModel } from "../models/kofiPayment.model.js";
import { disconnectUser } from "../services/realtime.service.js";
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

function paymentStep(res: Response, user: any) {
  beginPaymentAccess(res, user);
  return res.redirect("/kingdom/payment");
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
      if (env.KOFI_VERIFICATION_TOKEN) await syncKofiPaymentForGoogleUser(identity.email);
      return UserModel.findOne({ googleSub: identity.sub });
    }
    return existing;
  }
  const alliance = await getOrCreateLoginAlliance();
  try {
    const user = await UserModel.create({
      discordId: `google:${identity.sub}`,
      googleSub: identity.sub,
      email: identity.email,
      inGameUsername,
      googleApprovalStatus: "pending",
      kofiPaymentRequired: true,
      username: inGameUsername,
      role: "Member",
      discordRoleIds: [],
      inConfiguredGuild: false,
      privateSiteAccess: false,
      disabled: true,
      allianceId: alliance._id
    });
    if (env.KOFI_VERIFICATION_TOKEN) await syncKofiPaymentForGoogleUser(identity.email);
    return await UserModel.findOne({ googleSub: identity.sub }) || user;
  } catch (error: any) {
    if (error?.code === 11000) {
      const duplicate = await UserModel.findOne({ googleSub: identity.sub });
      if (duplicate) {
        if (env.KOFI_VERIFICATION_TOKEN) await syncKofiPaymentForGoogleUser(identity.email);
        return UserModel.findOne({ googleSub: identity.sub });
      }
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
  if (existing?.googleApprovalStatus === "terminated") return res.redirect(statusPath("terminated"));
  if (existing?.googleApprovalStatus === "approved" && !existing.disabled) {
    await UserModel.updateOne({ _id: existing._id }, { $set: { email: identity.email } });
    if (requiresKofiPayment(existing) && env.KOFI_VERIFICATION_TOKEN) {
      await syncKofiPaymentForGoogleUser(identity.email);
    }
    const current = await UserModel.findOne({ googleSub: identity.sub });
    if (current && isCurrentKofiAccess(current)) {
      await UserModel.updateOne({ _id: current._id }, { $set: { lastLoginAt: new Date() } });
      googleUserSession(res, current);
      return res.redirect("/base");
    }
    return paymentStep(res, current || existing);
  }
  if (login.inGameUsername) {
    const user = await createPendingGoogleUser(identity, login.inGameUsername);
    if (user?.googleApprovalStatus === "approved" && !user.disabled && isCurrentKofiAccess(user)) {
      googleUserSession(res, user);
      return res.redirect("/base");
    }
    return paymentStep(res, user);
  }
  if (existing?.googleApprovalStatus === "pending") {
    await UserModel.updateOne({ _id: existing._id }, { $set: { email: identity.email } });
    if (env.KOFI_VERIFICATION_TOKEN) await syncKofiPaymentForGoogleUser(identity.email);
    const current = await UserModel.findOne({ googleSub: identity.sub });
    if (current?.googleApprovalStatus === "approved" && !current.disabled && isCurrentKofiAccess(current)) {
      googleUserSession(res, current);
      return res.redirect("/base");
    }
    return paymentStep(res, current || existing);
  }
  res.cookie(googleSignupCookie, signGoogleSignupIdentity(identity), { ...googleCookieOptions(req), maxAge: 600_000 });
  res.redirect("/kingdom/complete");
});

export const completeGoogleSignup = asyncHandler(async (req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");
  const identity = verifyGoogleSignupIdentity(req.cookies?.[googleSignupCookie]);
  if (!identity) return res.redirect(statusPath("expired"));
  const inGameUsername = parseInGameUsername(req.body?.inGameUsername);
  const user = await createPendingGoogleUser(identity, inGameUsername);
  res.clearCookie(googleSignupCookie, googleCookieOptions(req));
  if (user?.googleApprovalStatus === "approved" && !user.disabled && isCurrentKofiAccess(user)) {
    googleUserSession(res, user);
    return res.redirect("/base");
  }
  paymentStep(res, user);
});

function requireKingdomAdmin(req: AuthenticatedRequest) {
  if (!isDashboardAdminUser(req.user)) throw new HttpError(403, "Kella admin access required");
}

export const listKingdomSignups = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  requireKingdomAdmin(req);
  const paymentFields = " kofiPaymentRequired kofiPaymentEmail kofiPaidThrough +kofiRequestedEmail +kofiRequestedTransactionId";
  const [googleUsers, localUsers, otherUsers, payments] = await Promise.all([
    UserModel.find({ allianceId: req.user.allianceId, googleSub: { $exists: true } })
      .select("_id inGameUsername email googleApprovalStatus googleApprovalSource createdAt lastLoginAt googleReviewedAt" + paymentFields)
      .sort({ createdAt: -1 }).lean() as Promise<any[]>,
    UserModel.find({ allianceId: req.user.allianceId, localApprovalStatus: { $exists: true } })
      .select("_id username inGameUsername localLordId localApprovalStatus createdAt lastLoginAt localReviewedAt" + paymentFields)
      .sort({ createdAt: -1 }).lean() as Promise<any[]>,
    UserModel.find({ allianceId: req.user.allianceId, kofiPaymentRequired: true,
      googleSub: { $exists: false }, localApprovalStatus: { $exists: false } })
      .select("_id discordId username inGameUsername disabled createdAt lastLoginAt" + paymentFields)
      .sort({ createdAt: -1 }).lean() as Promise<any[]>,
    KofiPaymentModel.find({ claimedByUserId: { $exists: false }, paidThrough: { $gt: new Date() } })
      .sort({ paidAt: -1 }).limit(100).lean() as Promise<any[]>
  ]);
  res.set("Cache-Control", "private, no-store");
  res.json({ members: [
    ...googleUsers.map((user) => ({ ...user, provider: "google" as const })),
    ...localUsers.map((user) => ({ ...user, provider: "local" as const })),
    ...otherUsers.map((user) => ({ ...user, provider: user.discordId?.startsWith("private-member:") ? "private" : "discord" }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((user) => ({
    id: user._id.toString(),
    provider: user.provider,
    username: user.username || user.inGameUsername || "",
    lordId: user.provider === "local" ? user.localLordId || "" : "",
    inGameUsername: user.inGameUsername || "",
    email: user.email || "",
    status: user.provider === "local" ? user.localApprovalStatus || "pending" :
      user.provider === "google" ? user.googleApprovalStatus || "pending" : user.disabled ? "terminated" : "approved",
    paymentRequired: requiresKofiPayment(user),
    paymentStatus: isCurrentKofiAccess(user) ? "paid" : "unpaid",
    paidThrough: user.kofiPaidThrough || null,
    paymentEmail: user.kofiPaymentEmail || "",
    requestedPaymentEmail: user.kofiRequestedEmail || "",
    requestedTransactionId: user.kofiRequestedTransactionId || "",
    signedUpAt: user.createdAt,
    lastLoginAt: user.lastLoginAt || null,
    reviewedAt: user.provider === "local" ? user.localReviewedAt || null : user.googleReviewedAt || null
  })), payments: payments.map((payment) => ({ id: payment._id.toString(), email: payment.email,
    transactionId: payment.transactionId, amountCents: payment.amountCents, tierName: payment.tierName,
    paidAt: payment.paidAt, paidThrough: payment.paidThrough })) });
});

export const matchKingdomPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  requireKingdomAdmin(req);
  const id = req.params.id;
  const paymentId = req.body?.paymentId;
  if (!/^[a-f\d]{24}$/i.test(id) || typeof paymentId !== "string" || !/^[a-f\d]{24}$/i.test(paymentId)) {
    throw new HttpError(400, "Choose a verified payment");
  }
  const user = await UserModel.findOne({ _id: id, allianceId: req.user.allianceId });
  if (!user || !requiresKofiPayment(user)) throw new HttpError(404, "Signup not found");
  await assignKofiPayment(paymentId, id);
  res.set("Cache-Control", "private, no-store").json({ id, status: "paid" });
});

export const reviewKingdomSignup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  requireKingdomAdmin(req);
  const id = req.params.id;
  const status = req.body?.status;
  if (!/^[a-f\d]{24}$/i.test(id) || (status !== "approved" && status !== "terminated")) {
    throw new HttpError(400, "Choose Approve or Terminate");
  }
  let user = await UserModel.findOneAndUpdate(
    { _id: id, allianceId: req.user.allianceId, googleSub: { $exists: true } },
    { $set: {
      googleApprovalStatus: status,
      googleApprovalSource: "admin",
      googleReviewedAt: new Date(),
      googleReviewedBy: req.user.id,
      privateSiteAccess: status === "approved",
      disabled: status !== "approved"
    } },
    { new: true, runValidators: true }
  ).lean() as any;
  if (!user) {
    user = await UserModel.findOneAndUpdate(
      { _id: id, allianceId: req.user.allianceId, localApprovalStatus: { $exists: true } },
      { $set: {
        localApprovalStatus: status,
        localReviewedAt: new Date(),
        localReviewedBy: req.user.id,
        privateSiteAccess: status === "approved",
        disabled: status !== "approved"
      } },
      { new: true, runValidators: true }
    ).lean() as any;
  }
  if (!user) {
    user = await UserModel.findOneAndUpdate(
      { _id: id, allianceId: req.user.allianceId, kofiPaymentRequired: true,
        googleSub: { $exists: false }, localApprovalStatus: { $exists: false } },
      { $set: { disabled: status !== "approved", privateSiteAccess: status === "approved" } },
      { new: true, runValidators: true }
    ).lean() as any;
  }
  if (!user) throw new HttpError(404, "Signup not found");
  if (status === "terminated") disconnectUser(user._id.toString());
  res.set("Cache-Control", "private, no-store");
  res.json({ id: user._id.toString(), status: user.localApprovalStatus || user.googleApprovalStatus || status });
});
