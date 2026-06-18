import { realtimeEvents } from "@cod-amp/shared";
import { z } from "zod";
import { RecruitmentApplicationModel } from "../models/recruitmentApplication.model.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const applicationSchema = z.object({
  ign: z.string().min(1),
  power: z.coerce.number().min(0),
  timezone: z.string().min(1),
  country: z.string().min(1),
  experience: z.string().min(1),
  previousAlliance: z.string().optional(),
  discordId: z.string().optional()
});

export const listApplications = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const status = typeof req.query.status === "string" ? req.query.status : undefined;
  const applications = await RecruitmentApplicationModel.find({
    allianceId: req.user.allianceId,
    ...(status ? { status } : {})
  })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  res.json({ applications });
});

export const createApplication = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = applicationSchema.parse(req.body);
  const application = await RecruitmentApplicationModel.create({
    ...input,
    allianceId: req.user.allianceId,
    history: [{ status: "Applied", note: "Application submitted", changedBy: req.user.id }]
  });
  emitAlliance(req.user.allianceId, realtimeEvents.recruitmentUpdated, application);
  res.status(201).json({ application });
});

export const updateApplicationStatus = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ status: z.enum(["Applied", "Review", "Interview", "Approved", "Rejected"]), note: z.string().optional() }).parse(req.body);
  const application = await RecruitmentApplicationModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    {
      $set: { status: body.status, recruiterId: req.user.id },
      $push: { history: { status: body.status, note: body.note, changedBy: req.user.id } }
    },
    { new: true }
  );
  if (!application) throw new HttpError(404, "Application not found");
  emitAlliance(req.user.allianceId, realtimeEvents.recruitmentUpdated, application);
  res.json({ application });
});
