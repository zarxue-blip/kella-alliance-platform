import { Router } from "express";
import {
  dashboardAlerts,
  dashboardMembers,
  dashboardMemberCreate,
  dashboardMemberDelete,
  dashboardMemberUpdate,
  dashboardMemberXlsxImport,
  dashboardDiscordMemberSync,
  dashboardProfile,
  dashboardProfileUpdate,
  dashboardDmAlertSend,
  dashboardSettings,
  dashboardSettingsUpdate,
  dashboardAttackSend,
  dashboardChatSend,
  dashboardComplaintReply,
  dashboardComplaintStatusUpdate,
  dashboardComplaints,
  dashboardEventDelete,
  dashboardEventSend,
  dashboardEvents,
  dashboardRootsCreate,
  dashboardShieldSend,
  dashboardSummary,
  dashboardDmAlertResendFailed,
  rootsReportDetails,
  rootsReportList,
  rootsReportSend
} from "../controllers/dashboard.controller.js";
import { authenticate, authenticateDashboardAdmin } from "../middleware/auth.js";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", dashboardSummary);
dashboardRouter.get("/members", dashboardMembers);
dashboardRouter.post("/members", authenticateDashboardAdmin, dashboardMemberCreate);
dashboardRouter.patch("/members/:id", authenticateDashboardAdmin, dashboardMemberUpdate);
dashboardRouter.delete("/members/:id", authenticateDashboardAdmin, dashboardMemberDelete);
dashboardRouter.get("/profile", authenticate, dashboardProfile);
dashboardRouter.patch("/profile", authenticate, dashboardProfileUpdate);
dashboardRouter.post("/members/import-xlsx", authenticateDashboardAdmin, dashboardMemberXlsxImport);
dashboardRouter.post("/sync-discord-members", authenticateDashboardAdmin, dashboardDiscordMemberSync);
dashboardRouter.get("/alerts", dashboardAlerts);
dashboardRouter.get("/events", dashboardEvents);
dashboardRouter.post("/events", authenticateDashboardAdmin, dashboardEventSend);
dashboardRouter.delete("/events/:id", authenticateDashboardAdmin, dashboardEventDelete);
dashboardRouter.get("/complaints", authenticateDashboardAdmin, dashboardComplaints);
dashboardRouter.patch("/complaints/:id/status", authenticateDashboardAdmin, dashboardComplaintStatusUpdate);
dashboardRouter.post("/complaints/:id/reply", authenticateDashboardAdmin, dashboardComplaintReply);
dashboardRouter.get("/settings", dashboardSettings);
dashboardRouter.patch("/settings", dashboardSettingsUpdate);
dashboardRouter.get("/roots-reports", rootsReportList);
dashboardRouter.post("/roots-reports/:id/send", authenticateDashboardAdmin, rootsReportSend);
dashboardRouter.get("/roots-reports/:id", rootsReportDetails);
dashboardRouter.post("/tools/shield-alert", authenticateDashboardAdmin, dashboardShieldSend);
dashboardRouter.post("/tools/attack-alert", authenticateDashboardAdmin, dashboardAttackSend);
dashboardRouter.post("/tools/chat", authenticateDashboardAdmin, dashboardChatSend);
dashboardRouter.post("/tools/dm-alert", authenticateDashboardAdmin, dashboardDmAlertSend);
dashboardRouter.post("/tools/dm-alert/:id/resend-failed", authenticateDashboardAdmin, dashboardDmAlertResendFailed);
dashboardRouter.post("/tools/roots-registration", authenticateDashboardAdmin, dashboardRootsCreate);
