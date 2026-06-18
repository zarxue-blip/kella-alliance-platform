import { z } from "zod";
import { AllianceModel } from "../models/alliance.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const settingsSchema = z.object({
  name: z.string().min(1).optional(),
  tag: z.string().min(1).max(8).optional(),
  kingdom: z.string().optional(),
  timezone: z.string().optional(),
  settings: z
    .object({
      attendanceGraceMinutes: z.coerce.number().min(0).max(120).optional(),
      shieldAlertMinutes: z.array(z.number().min(1)).optional(),
      defaultAlliance: z.string().optional()
    })
    .optional()
});

export const getSettings = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const alliance = await AllianceModel.findById(req.user.allianceId).lean();
  if (!alliance) throw new HttpError(404, "Alliance settings not found");
  res.json({ alliance });
});

export const updateSettings = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = settingsSchema.parse(req.body);
  const alliance = await AllianceModel.findByIdAndUpdate(
    req.user.allianceId,
    { $set: input },
    { new: true, runValidators: true }
  );
  if (!alliance) throw new HttpError(404, "Alliance settings not found");
  res.json({ alliance });
});
