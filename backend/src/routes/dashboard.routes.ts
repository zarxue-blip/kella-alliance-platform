import { Router } from "express";
import {
  dashboardAlerts,
  dashboardMembers,
  dashboardSettings,
  dashboardSettingsUpdate,
  dashboardSummary,
  rootsReportDetails,
  rootsReportList
} from "../controllers/dashboard.controller.js";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", dashboardSummary);
dashboardRouter.get("/members", dashboardMembers);
dashboardRouter.get("/alerts", dashboardAlerts);
dashboardRouter.get("/settings", dashboardSettings);
dashboardRouter.patch("/settings", dashboardSettingsUpdate);
dashboardRouter.get("/roots-reports", rootsReportList);
dashboardRouter.get("/roots-reports/:id", rootsReportDetails);
