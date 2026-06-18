import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const settingsRouter = Router();

settingsRouter.use(authenticate);
settingsRouter.get("/", requirePermission("settings:read"), getSettings);
settingsRouter.patch("/", requirePermission("settings:update"), updateSettings);
