import { realtimeEvents } from "@cod-amp/shared";
import { z } from "zod";
import { CallToArmsModel } from "../models/callToArms.model.js";
import { OperationModel } from "../models/operation.model.js";
import { publishCallToArms } from "../services/alert.service.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const operationSchema = z.object({
  operationName: z.string().min(1),
  type: z.enum(["Fortress", "Stronghold", "Pass", "Kingdom War", "Defense", "Emergency Defense"]),
  description: z.string().default(""),
  date: z.coerce.date(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  target: z.string().min(1),
  status: z.enum(["Planning", "Active", "Completed", "Cancelled"]).default("Planning"),
  participants: z.array(z.string()).default([]),
  warNotes: z.string().default("")
});

export const listOperations = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const operations = await OperationModel.find({ allianceId: req.user.allianceId }).sort({ date: -1 }).limit(100).lean();
  res.json({ operations });
});

export const createOperation = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = operationSchema.parse(req.body);
  const operation = await OperationModel.create({ ...input, allianceId: req.user.allianceId, createdBy: req.user.id });
  emitAlliance(req.user.allianceId, realtimeEvents.operationUpdated, operation);
  res.status(201).json({ operation });
});

export const updateOperation = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const operation = await OperationModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!operation) throw new HttpError(404, "Operation not found");
  emitAlliance(req.user.allianceId, realtimeEvents.operationUpdated, operation);
  res.json({ operation });
});

export const addOperationTimeline = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ title: z.string().min(1), details: z.string().optional(), at: z.coerce.date().default(new Date()) }).parse(req.body);
  const operation = await OperationModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $push: { timeline: { ...body, createdBy: req.user.id } } },
    { new: true }
  );
  if (!operation) throw new HttpError(404, "Operation not found");
  emitAlliance(req.user.allianceId, realtimeEvents.operationUpdated, operation);
  res.json({ operation });
});

export const createCallToArms = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z
    .object({
      title: z.string().min(1),
      message: z.string().min(1),
      priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("HIGH"),
      target: z.string().optional(),
      operationId: z.string().optional(),
      channels: z.array(z.string()).default(["discord", "dashboard", "push"])
    })
    .parse(req.body);
  const alert = await CallToArmsModel.create({ ...body, allianceId: req.user.allianceId, createdBy: req.user.id });
  await publishCallToArms(alert._id.toString());
  res.status(201).json({ alert });
});

export const respondToCallToArms = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ memberId: z.string(), status: z.enum(["Responding", "Reinforcing", "Unavailable"]), message: z.string().optional() }).parse(req.body);
  const alert = await CallToArmsModel.findOne({ _id: req.params.id, allianceId: req.user.allianceId });
  if (!alert) throw new HttpError(404, "Call to Arms alert not found");

  alert.responses = alert.responses.filter((response) => response.memberId.toString() !== body.memberId);
  alert.responses.push({ memberId: body.memberId, status: body.status, message: body.message, respondedAt: new Date() });
  await alert.save();

  emitAlliance(req.user.allianceId, realtimeEvents.callToArmsResponse, { alertId: alert._id, response: body });
  res.json({ alert });
});
