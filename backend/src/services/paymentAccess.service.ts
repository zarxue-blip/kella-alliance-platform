import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";
import { UserModel } from "../models/user.model.js";

const paymentIdentityCookie = "kella_payment_identity";
const options = { httpOnly: true, secure: isProduction, sameSite: "lax" as const, path: "/" };

// This cookie only identifies the payment screen. It is never a member session.
export function beginPaymentAccess(res: Response, user: any) {
  const token = jwt.sign({ purpose: "payment", userId: user._id.toString() }, env.JWT_SECRET,
    { algorithm: "HS256", audience: "kella-payment", expiresIn: "1d" });
  res.cookie(paymentIdentityCookie, token, { ...options, maxAge: 86_400_000 });
  // Switching to an unpaid account must not leave a previous account signed in.
  res.clearCookie(env.SESSION_COOKIE_NAME, options);
  res.set("Cache-Control", "private, no-store");
}

export function clearPaymentAccess(res: Response) {
  res.clearCookie(paymentIdentityCookie, options);
}

export async function paymentAccessUser(req: Request) {
  try {
    const cookie = req.cookies?.[paymentIdentityCookie];
    if (typeof cookie !== "string") return null;
    const payload = jwt.verify(cookie, env.JWT_SECRET,
      { algorithms: ["HS256"], audience: "kella-payment" }) as jwt.JwtPayload;
    if (payload.purpose !== "payment" || typeof payload.userId !== "string") return null;
    const user = await UserModel.findById(payload.userId).select("+kofiRequestedEmail");
    if (!user || user.googleApprovalStatus === "terminated" || user.localApprovalStatus === "terminated" ||
      (user.disabled && !user.googleApprovalStatus && !user.localApprovalStatus)) return null;
    return user;
  } catch { return null; }
}
