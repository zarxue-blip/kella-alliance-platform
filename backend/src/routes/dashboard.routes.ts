import { Router } from "express";
import {
  dashboardAlerts,
  dashboardMembers,
  dashboardDiscordMemberSync,
  dashboardFarlightTopnSync,
  dashboardSettings,
  dashboardSettingsUpdate,
  dashboardAttackSend,
  dashboardShieldSend,
  dashboardSummary,
  rootsReportDetails,
  rootsReportList,
  rootsReportSend
} from "../controllers/dashboard.controller.js";
import { authenticateDashboardAdmin } from "../middleware/auth.js";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", dashboardSummary);
dashboardRouter.get("/members", dashboardMembers);
dashboardRouter.post("/sync-discord-members", authenticateDashboardAdmin, dashboardDiscordMemberSync);
dashboardRouter.post("/sync-farlight-topn", authenticateDashboardAdmin, dashboardFarlightTopnSync);
dashboardRouter.get("/alerts", dashboardAlerts);
dashboardRouter.get("/settings", dashboardSettings);
dashboardRouter.patch("/settings", dashboardSettingsUpdate);
dashboardRouter.get("/roots-reports", rootsReportList);
dashboardRouter.post("/roots-reports/:id/send", authenticateDashboardAdmin, rootsReportSend);
dashboardRouter.get("/roots-reports/:id", rootsReportDetails);
dashboardRouter.post("/tools/shield-alert", authenticateDashboardAdmin, dashboardShieldSend);
dashboardRouter.post("/tools/attack-alert", authenticateDashboardAdmin, dashboardAttackSend);
