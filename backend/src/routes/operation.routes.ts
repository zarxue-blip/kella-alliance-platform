import { Router } from "express";
import {
  addOperationTimeline,
  createCallToArms,
  createOperation,
  listOperations,
  respondToCallToArms,
  updateOperation
} from "../controllers/operation.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const operationRouter = Router();

operationRouter.use(authenticate);
operationRouter.get("/", requirePermission("war:read"), listOperations);
operationRouter.post("/", requirePermission("war:create"), createOperation);
operationRouter.patch("/:id", requirePermission("war:update"), updateOperation);
operationRouter.post("/:id/timeline", requirePermission("war:update"), addOperationTimeline);
operationRouter.post("/call-to-arms", requirePermission("war:manage"), createCallToArms);
operationRouter.post("/call-to-arms/:id/respond", requirePermission("war:read"), respondToCallToArms);
