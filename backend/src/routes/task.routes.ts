import { Router } from "express";
import { addTaskComment, createTask, listTasks, updateTask } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.get("/", requirePermission("tasks:read"), listTasks);
taskRouter.post("/", requirePermission("tasks:create"), createTask);
taskRouter.patch("/:id", requirePermission("tasks:update"), updateTask);
taskRouter.post("/:id/comments", requirePermission("tasks:update"), addTaskComment);
