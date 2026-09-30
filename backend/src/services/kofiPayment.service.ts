import { createHash, timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";
import { KofiPaymentModel } from "../models/kofiPayment.model.js";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";

const forestGuardianTier = "forest guardian";

type KofiWebhookData = Record<string, unknown>;

export function normalizeKofiEmail(value: string) {
  return value.trim().toLowerCase();
}

export function requiresKofiPayment(user: any) {
  return Boolean(user.kofiPaymentRequired || user.localApprovalStatus || user.googleApprovalSource === "kofi");
}

export function isCurrentKofiAccess(user: any, now = new Date()) {
  if (!requiresKofiPayment(user)) return true;
  const paidThrough = user.kofiPaidThrough && new Date(user.kofiPaidThrough).getTime();
  return typeof user.kofiPaymentEmail === "string" && Boolean(user.kofiPaymentEmail) &&
    Number.isFinite(paidThrough) && paidThrough > now.getTime();
}

// Compatibility for callers while all login providers share the same payment gate.
export const isCurrentKofiGoogleAccess = isCurrentKofiAccess;

export function addPaymentMonth(paidAt: Date) {
  const year = paidAt.getUTCFullYear();
  const month = paidAt.getUTCMonth();
  const nextMonthLastDay = new Date(Date.UTC(year, month + 2, 0)).getUTCDate();
  return new Date(Date.UTC(
    year, month + 1, Math.min(paidAt.getUTCDate(), nextMonthLastDay),
    paidAt.getUTCHours(), paidAt.getUTCMinutes(), paidAt.getUTCSeconds(), paidAt.getUTCMilliseconds()
  ));
}

export function verifyKofiToken(value: unknown) {
  if (!env.KOFI_VERIFICATION_TOKEN || typeof value !== "string") return false;
  const actual = createHash("sha256").update(value).digest();
  const expected = createHash("sha256").update(env.KOFI_VERIFICATION_TOKEN).digest();
  return timingSafeEqual(actual, expected);
}

function requiredId(value: unknown) {
  return typeof value === "string" && value.length >= 1 && value.length <= 255 && value === value.trim()
    ? value : null;
}

function qualifiedPayment(data: KofiWebhookData) {
  if (data.type !== "Subscription" || data.is_subscription_payment !== true ||
    typeof data.tier_name !== "string" || data.tier_name.trim().toLowerCase() !== forestGuardianTier ||
    data.currency !== "USD" || typeof data.amount !== "string" ||
    !/^(?:0|[1-9]\d{0,5})\.\d{2}$/.test(data.amount)) return null;

  const amountCents = Number(data.amount.replace(".", ""));
  if (amountCents < 500) return null;
  const messageId = requiredId(data.message_id);
  const transactionId = requiredId(data.kofi_transaction_id);
  const email = typeof data.email === "string" ? normalizeKofiEmail(data.email) : "";
  const paidAt = typeof data.timestamp === "string" ? new Date(data.timestamp) : new Date(NaN);
  if (!messageId || !transactionId || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !Number.isFinite(paidAt.getTime()) || paidAt.getTime() > Date.now() + 300_000) {
    throw new HttpError(400, "Invalid Ko-fi payment fields");
  }
  return {
    messageId, transactionId, email, amountCents, currency: "USD",
    tierName: "Forest Guardian", paidAt, paidThrough: addPaymentMonth(paidAt)
  };
}

function terminated(user: any) {
  return user.googleApprovalStatus === "terminated" || user.localApprovalStatus === "terminated" ||
    (user.disabled && !user.googleApprovalStatus && !user.localApprovalStatus);
}

export async function assignKofiPayment(paymentId: string, userId: string) {
  const [payment, user] = await Promise.all([
    KofiPaymentModel.findById(paymentId), UserModel.findById(userId)
  ]);
  if (!payment || !user || new Date(payment.paidThrough).getTime() <= Date.now()) {
    throw new HttpError(400, "A current verified Forest Guardian payment is required");
  }
  if (terminated(user)) throw new HttpError(409, "Reapprove this account before matching a payment");
  if (user.kofiPaymentEmail && user.kofiPaymentEmail !== payment.email) {
    throw new HttpError(409, "This account already has a different Ko-fi membership");
  }
  const claimed = await KofiPaymentModel.findOneAndUpdate({ _id: payment._id, $or: [
    { claimedByUserId: { $exists: false } }, { claimedByUserId: user._id }
  ] }, { $set: { claimedByUserId: user._id } }, { new: true });
  if (!claimed) throw new HttpError(409, "This payment is already linked to another account");
  const set: Record<string, unknown> = {
    kofiPaymentRequired: true, kofiPaymentEmail: payment.email, privateSiteAccess: true
  };
  if (user.googleApprovalStatus) {
    set.googleApprovalStatus = "approved";
    set.googleApprovalSource = user.googleApprovalSource === "admin" ? "admin" : "kofi";
    set.disabled = false;
  }
  if (user.localApprovalStatus) {
    set.localApprovalStatus = "approved";
    set.disabled = false;
  }
  try {
    const result = await UserModel.updateOne({ _id: user._id,
      googleApprovalStatus: { $ne: "terminated" }, localApprovalStatus: { $ne: "terminated" },
      $or: [{ kofiPaymentEmail: { $exists: false } }, { kofiPaymentEmail: payment.email }]
    }, { $set: set, $max: { kofiPaidThrough: payment.paidThrough } });
    if (!result.matchedCount) throw new HttpError(409, "Account changed; check its approval and membership again");
  } catch (error: any) {
    if (!payment.claimedByUserId) await KofiPaymentModel.updateOne(
      { _id: payment._id, claimedByUserId: user._id }, { $unset: { claimedByUserId: 1 } }
    );
    if (error?.code === 11000) throw new HttpError(409, "This Ko-fi membership is already linked to another account");
    throw error;
  }
}

async function applyPaymentToMatchingUser(payment: any) {
  if (new Date(payment.paidThrough).getTime() <= Date.now()) return;
  // Renewals follow an existing binding. A typed email alone never establishes one.
  let user = await UserModel.findOne({ kofiPaymentEmail: payment.email, kofiPaymentRequired: true });
  if (!user) {
    user = await UserModel.findOne({ email: payment.email, googleSub: { $exists: true } });
    if (!user || !requiresKofiPayment(user)) return;
  }
  if (terminated(user)) return;
  try { await assignKofiPayment(payment._id.toString(), user._id.toString()); }
  catch (error) { if (!(error instanceof HttpError && error.statusCode === 409)) throw error; }
}

export async function syncKofiPaymentForGoogleUser(email: string) {
  const payment = await KofiPaymentModel.findOne({
    email: normalizeKofiEmail(email), paidThrough: { $gt: new Date() }
  }).sort({ paidThrough: -1 }).lean();
  if (payment) await applyPaymentToMatchingUser(payment);
}

export async function processKofiWebhook(data: KofiWebhookData) {
  const payment = qualifiedPayment(data);
  if (!payment) return;

  // Ko-fi retries with the same message_id. Both unique keys guard against a
  // repeated payment being counted twice, even if a delivery changes one ID.
  let stored: any;
  try {
    stored = await KofiPaymentModel.findOneAndUpdate(
      { transactionId: payment.transactionId },
      { $setOnInsert: payment },
      { upsert: true, new: true, runValidators: true }
    );
  } catch (error: any) {
    if (error?.code !== 11000) throw error;
    stored = await KofiPaymentModel.findOne({ $or: [
      { transactionId: payment.transactionId }, { messageId: payment.messageId }
    ] });
    if (!stored) throw error;
  }
  await applyPaymentToMatchingUser(stored);
}
