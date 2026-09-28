import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { processKofiWebhook, verifyKofiToken } from "../services/kofiPayment.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export const receiveKofiWebhook = asyncHandler(async (req: Request, res: Response) => {
  if (!env.KOFI_VERIFICATION_TOKEN) throw new HttpError(503, "Ko-fi webhook is not configured");
  if (!req.is("application/x-www-form-urlencoded")) throw new HttpError(415, "Form data required");
  if (typeof req.body?.data !== "string" || req.body.data.length > 32_768) {
    throw new HttpError(400, "Invalid Ko-fi webhook data");
  }
  let data: unknown;
  try {
    data = JSON.parse(req.body.data);
  } catch {
    throw new HttpError(400, "Invalid Ko-fi webhook data");
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new HttpError(400, "Invalid Ko-fi webhook data");
  }
  if (!verifyKofiToken((data as Record<string, unknown>).verification_token)) {
    throw new HttpError(401, "Invalid Ko-fi verification token");
  }
  await processKofiWebhook(data as Record<string, unknown>);
  res.status(200).json({ received: true });
});
