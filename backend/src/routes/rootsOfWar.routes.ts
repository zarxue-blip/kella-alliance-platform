import { Router } from "express";
import { checkInRootsOfWar, listRootsOfWarRegistrations, registerRootsOfWar } from "../controllers/rootsOfWar.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const rootsOfWarRouter = Router();

rootsOfWarRouter.use(authenticate);
rootsOfWarRouter.get("/", requirePermission("events:read"), listRootsOfWarRegistrations);
rootsOfWarRouter.post("/register", requirePermission("events:create"), registerRootsOfWar);
rootsOfWarRouter.post("/check-in", requirePermission("attendance:create"), checkInRootsOfWar);
