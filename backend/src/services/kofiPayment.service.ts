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

export function isCurrentKofiGoogleAccess(user: any, now = new Date()) {
  if (user.googleApprovalSource !== "kofi") return true;
  const paidThrough = user.kofiPaidThrough && new Date(user.kofiPaidThrough).getTime();
  return user.googleApprovalStatus === "approved" &&
    Boolean(user.privateSiteAccess) &&
    typeof user.email === "string" &&
    typeof user.kofiPaymentEmail === "string" &&
    normalizeKofiEmail(user.email) === normalizeKofiEmail(user.kofiPaymentEmail) &&
    Number.isFinite(paidThrough) && paidThrough > now.getTime();
}

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

async function applyPaymentToMatchingGoogleUsers(payment: any) {
  if (new Date(payment.paidThrough).getTime() <= Date.now()) return;
  const users = await UserModel.find({ email: payment.email, googleSub: { $exists: true } });
  for (const user of users) {
    if (user.googleApprovalStatus !== "pending" &&
      !(user.googleApprovalStatus === "approved" && user.googleApprovalSource === "kofi")) continue;
    await UserModel.updateOne(
      {
        _id: user._id, email: payment.email, googleSub: { $exists: true },
        googleApprovalStatus: user.googleApprovalStatus, googleApprovalSource: { $ne: "admin" }
      },
      {
        $set: {
          googleApprovalStatus: "approved", googleApprovalSource: "kofi",
          kofiPaymentEmail: payment.email, privateSiteAccess: true, disabled: false
        },
        $max: { kofiPaidThrough: payment.paidThrough }
      }
    );
  }
}

export async function syncKofiPaymentForGoogleUser(email: string) {
  const payment = await KofiPaymentModel.findOne({
    email: normalizeKofiEmail(email), paidThrough: { $gt: new Date() }
  }).sort({ paidThrough: -1 }).lean();
  if (payment) await applyPaymentToMatchingGoogleUsers(payment);
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
  await applyPaymentToMatchingGoogleUsers(stored);
}
