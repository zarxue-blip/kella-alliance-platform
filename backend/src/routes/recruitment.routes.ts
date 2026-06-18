import { Router } from "express";
import { createApplication, listApplications, updateApplicationStatus } from "../controllers/recruitment.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const recruitmentRouter = Router();

recruitmentRouter.use(authenticate);
recruitmentRouter.get("/", requirePermission("recruitment:read"), listApplications);
recruitmentRouter.post("/", requirePermission("recruitment:create"), createApplication);
recruitmentRouter.patch("/:id/status", requirePermission("recruitment:update"), updateApplicationStatus);
