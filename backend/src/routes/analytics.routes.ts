import { Router } from "express";
import { analyticsCsvExport, analyticsOverview, analyticsPdfExport } from "../controllers/analytics.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const analyticsRouter = Router();

analyticsRouter.use(authenticate);
analyticsRouter.get("/", requirePermission("analytics:read"), analyticsOverview);
analyticsRouter.get("/export.csv", requirePermission("analytics:export"), analyticsCsvExport);
analyticsRouter.get("/export.pdf", requirePermission("analytics:export"), analyticsPdfExport);
