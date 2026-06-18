import { z } from "zod";
import { DiplomacyModel } from "../models/diplomacy.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const diplomacySchema = z.object({
  externalAllianceName: z.string().min(1),
  externalAllianceTag: z.string().optional(),
  type: z.enum(["Allies", "NAP Agreements", "Enemies", "Friendly Alliances"]),
  agreement: z.string().default(""),
  notes: z.string().default("")
});

export const listDiplomacy = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const agreements = await DiplomacyModel.find({ allianceId: req.user.allianceId }).sort({ type: 1, externalAllianceName: 1 }).lean();
  res.json({ agreements });
});

export const createDiplomacy = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = diplomacySchema.parse(req.body);
  const agreement = await DiplomacyModel.create({ ...input, allianceId: req.user.allianceId });
  res.status(201).json({ agreement });
});

export const updateDiplomacy = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const agreement = await DiplomacyModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!agreement) throw new HttpError(404, "Diplomacy record not found");
  res.json({ agreement });
});
