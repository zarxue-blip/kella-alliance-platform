import { Router } from "express";
import {
  attendanceLeaderboard,
  attendanceReport,
  checkInAttendance,
  createAttendanceEvent,
  listAttendanceEvents
} from "../controllers/attendance.controller.js";
import { authenticate, authenticateDashboardAdmin, requireVipAccess } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const attendanceRouter = Router();

attendanceRouter.use(authenticate, requireVipAccess);
attendanceRouter.get("/", requirePermission("attendance:read"), listAttendanceEvents);
attendanceRouter.post("/", authenticateDashboardAdmin, createAttendanceEvent);
attendanceRouter.post("/:id/check-in", requirePermission("attendance:create"), checkInAttendance);
attendanceRouter.get("/leaderboard", requirePermission("attendance:read"), attendanceLeaderboard);
attendanceRouter.get("/reports", authenticateDashboardAdmin, attendanceReport);
