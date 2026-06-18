import { Router } from "express";
import { bulkUpdateMembers, createMember, exportMembers, importMembers, listMembers, updateMember } from "../controllers/member.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const memberRouter = Router();

memberRouter.use(authenticate);
memberRouter.get("/", requirePermission("members:read"), listMembers);
memberRouter.post("/", requirePermission("members:create"), createMember);
memberRouter.patch("/bulk", requirePermission("members:update"), bulkUpdateMembers);
memberRouter.get("/export.csv", requirePermission("members:export"), exportMembers);
memberRouter.post("/import", requirePermission("members:create"), importMembers);
memberRouter.patch("/:id", requirePermission("members:update"), updateMember);
