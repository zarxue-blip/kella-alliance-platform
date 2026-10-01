import { Router } from "express";
import { createDiplomacy, listDiplomacy, updateDiplomacy } from "../controllers/diplomacy.controller.js";
import { authenticate, requireVipAccess } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const diplomacyRouter = Router();

diplomacyRouter.use(authenticate, requireVipAccess);
diplomacyRouter.get("/", requirePermission("diplomacy:read"), listDiplomacy);
diplomacyRouter.post("/", requirePermission("diplomacy:create"), createDiplomacy);
diplomacyRouter.patch("/:id", requirePermission("diplomacy:update"), updateDiplomacy);
