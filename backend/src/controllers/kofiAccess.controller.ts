import type { Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { signSessionToken } from "../middleware/auth.js";
import { UserModel } from "../models/user.model.js";
import { isCurrentKofiAccess, normalizeKofiEmail } from "../services/kofiPayment.service.js";
import { clearPaymentAccess, paymentAccessUser } from "../services/paymentAccess.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { kingdomPaymentHtml } from "../views/kingdomAccessPage.js";

export const showKingdomPayment = asyncHandler(async (req: Request, res: Response) => {
  res.set("Cache-Control", "private, no-store");
  const user = await paymentAccessUser(req);
  if (!user) return res.redirect("/kingdom/access?status=expired");
  if (!user.disabled && isCurrentKofiAccess(user)) {
    const token = signSessionToken({ id: user._id.toString(), discordId: user.discordId, role: user.role,
      privateSiteAccess: Boolean(user.privateSiteAccess), allianceId: user.allianceId.toString() });
    res.cookie(env.SESSION_COOKIE_NAME, token, { httpOnly: true, secure: isProduction, sameSite: "lax",
      path: "/", maxAge: 7 * 86_400_000 });
    clearPaymentAccess(res);
    return res.redirect("/base");
  }
  const status = typeof req.query.status === "string" ? req.query.status :
    user.kofiPaidThrough ? "expired" :
      user.googleApprovalStatus === "approved" || user.localApprovalStatus === "approved" ? "approved" : "";
  res.type("html").send(kingdomPaymentHtml({ accountLabel: user.inGameUsername || user.username,
    googleEmail: user.googleSub ? user.email : undefined, status }));
});

export const requestKofiPaymentMatch = asyncHandler(async (req: Request, res: Response) => {
  res.set("Cache-Control", "private, no-store");
  const user = await paymentAccessUser(req);
  if (!user) return res.status(401).json({ status: "expired" });
  const email = typeof req.body?.paymentEmail === "string" ? normalizeKofiEmail(req.body.paymentEmail) : "";
  const transactionId = typeof req.body?.transactionId === "string" ? req.body.transactionId.trim() : "";
  const valid = email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    transactionId.length <= 255 && !/[\x00-\x1f\x7f<>]/.test(transactionId);
  if (valid) {
    // These details are a review request, not proof of payment ownership.
    await UserModel.updateOne({ _id: user._id }, { $set: {
      kofiRequestedEmail: email, kofiRequestedTransactionId: transactionId
    } });
  }
  const status = valid ? "claim-review" : "claim-invalid";
  if (req.is("application/x-www-form-urlencoded")) return res.redirect(303, `/kingdom/payment?status=${status}`);
  res.status(valid ? 202 : 400).json({ status });
});
