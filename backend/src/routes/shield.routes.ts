import { Router } from "express";
import { listShields, shieldWarnings, updateShield, upsertShield } from "../controllers/shield.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const shieldRouter = Router();

shieldRouter.use(authenticate);
shieldRouter.get("/", requirePermission("shields:read"), listShields);
shieldRouter.post("/", requirePermission("shields:update"), upsertShield);
shieldRouter.patch("/:id", requirePermission("shields:update"), updateShield);
shieldRouter.get("/warnings", requirePermission("shields:read"), shieldWarnings);
