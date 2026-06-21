import { Router } from "express";
import {
  dashboardAlerts,
  dashboardMembers,
  dashboardMemberXlsxImport,
  dashboardDiscordMemberSync,
  dashboardSettings,
  dashboardSettingsUpdate,
  dashboardAttackSend,
  dashboardComplaintStatusUpdate,
  dashboardComplaints,
  dashboardEventSend,
  dashboardEvents,
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
dashboardRouter.post("/members/import-xlsx", authenticateDashboardAdmin, dashboardMemberXlsxImport);
dashboardRouter.post("/sync-discord-members", authenticateDashboardAdmin, dashboardDiscordMemberSync);
dashboardRouter.get("/alerts", dashboardAlerts);
dashboardRouter.get("/events", dashboardEvents);
dashboardRouter.post("/events", authenticateDashboardAdmin, dashboardEventSend);
dashboardRouter.get("/complaints", authenticateDashboardAdmin, dashboardComplaints);
dashboardRouter.patch("/complaints/:id/status", authenticateDashboardAdmin, dashboardComplaintStatusUpdate);
dashboardRouter.get("/settings", dashboardSettings);
dashboardRouter.patch("/settings", dashboardSettingsUpdate);
dashboardRouter.get("/roots-reports", rootsReportList);
dashboardRouter.post("/roots-reports/:id/send", authenticateDashboardAdmin, rootsReportSend);
dashboardRouter.get("/roots-reports/:id", rootsReportDetails);
dashboardRouter.post("/tools/shield-alert", authenticateDashboardAdmin, dashboardShieldSend);
dashboardRouter.post("/tools/attack-alert", authenticateDashboardAdmin, dashboardAttackSend);
