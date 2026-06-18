import { realtimeEvents } from "@cod-amp/shared";
import { z } from "zod";
import { TaskModel, taskStatuses } from "../models/task.model.js";
import { emitAlliance } from "../services/realtime.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  status: z.enum(taskStatuses).default("Backlog"),
  assigneeIds: z.array(z.string()).default([]),
  dueDate: z.coerce.date().optional()
});

export const listTasks = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const tasks = await TaskModel.find({ allianceId: req.user.allianceId }).sort({ dueDate: 1, createdAt: -1 }).lean();
  const columns = taskStatuses.map((status) => ({ status, tasks: tasks.filter((task) => task.status === status) }));
  res.json({ columns, tasks });
});

export const createTask = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const input = taskSchema.parse(req.body);
  const task = await TaskModel.create({ ...input, allianceId: req.user.allianceId, createdBy: req.user.id });
  emitAlliance(req.user.allianceId, realtimeEvents.taskUpdated, task);
  res.status(201).json({ task });
});

export const updateTask = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!task) throw new HttpError(404, "Task not found");
  emitAlliance(req.user.allianceId, realtimeEvents.taskUpdated, task);
  res.json({ task });
});

export const addTaskComment = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = z.object({ body: z.string().min(1) }).parse(req.body);
  const task = await TaskModel.findOneAndUpdate(
    { _id: req.params.id, allianceId: req.user.allianceId },
    { $push: { comments: { authorId: req.user.id, body: body.body } } },
    { new: true }
  );
  if (!task) throw new HttpError(404, "Task not found");
  emitAlliance(req.user.allianceId, realtimeEvents.taskUpdated, task);
  res.json({ task });
});
