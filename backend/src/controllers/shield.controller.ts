import { realtimeEvents } from "@cod-amp/shared";
import { z } from "zod";
import { ShieldModel } from "../models/shield.model.js";
import { emitAlliance, emitNotification, moduleNotification } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const shieldSchema = z.object({
  memberId: z.string(),
  expiresAt: z.coerce.date(),
  cityLocation: z.string().optional(),
  notes: z.string().optional()
});

export const listShields = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const shields = await ShieldModel.find({ allianceId: req.user.allianceId })
    .populate("memberId", "ign uid power alliance")
    .sort({ expiresAt: 1 })
    .limit(500)
    .lean();
  res.json({ shields });
});

export const upsertShield = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = shieldSchema.parse(req.body);
  const shield = await ShieldModel.findOneAndUpdate(
    { allianceId: req.user.allianceId, memberId: input.memberId },
    { $set: { ...input, allianceId: req.user.allianceId, updatedBy: req.user.id } },
    { upsert: true, new: true, runValidators: true }
  );
  emitAlliance(req.user.allianceId, realtimeEvents.shieldExpiring, { shield, updated: true });
  res.json({ shield });
});

export const updateShield = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const shield = await ShieldModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: { ...req.body, updatedBy: req.user.id } },
    { new: true, runValidators: true }
  );
  if (!shield) throw new HttpError(404, "Shield not found");
  emitAlliance(req.user.allianceId, realtimeEvents.shieldExpiring, { shield, updated: true });
  res.json({ shield });
});

export const shieldWarnings = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const soon = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const shields = await ShieldModel.find({ allianceId: req.user.allianceId, expiresAt: { $lte: soon } })
    .populate("memberId", "ign uid")
    .sort({ expiresAt: 1 })
    .lean();

  if (shields.length) {
    emitNotification(
      req.user.allianceId,
      moduleNotification("shields", "Shield warnings active", `${shields.length} members have shields expiring in the next 24 hours.`, "HIGH")
    );
  }

  res.json({ shields });
});
