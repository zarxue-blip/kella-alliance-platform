import { Router } from "express";
import { bulkUpdateMembers, createMember, exportMembers, importMembers, listMembers, updateMember } from "../controllers/member.controller.js";
import { authenticate, authenticateDashboardAdmin } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const memberRouter = Router();

memberRouter.use(authenticate);
memberRouter.get("/", requirePermission("members:read"), listMembers);
memberRouter.post("/", authenticateDashboardAdmin, createMember);
memberRouter.patch("/bulk", authenticateDashboardAdmin, bulkUpdateMembers);
memberRouter.get("/export.csv", authenticateDashboardAdmin, exportMembers);
memberRouter.post("/import", authenticateDashboardAdmin, importMembers);
memberRouter.patch("/:id", authenticateDashboardAdmin, updateMember);
