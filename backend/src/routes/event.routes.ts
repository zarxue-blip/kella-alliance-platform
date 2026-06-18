import { Router } from "express";
import { createEvent, listEvents, rsvpEvent } from "../controllers/event.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const eventRouter = Router();

eventRouter.use(authenticate);
eventRouter.get("/", requirePermission("events:read"), listEvents);
eventRouter.post("/", requirePermission("events:create"), createEvent);
eventRouter.post("/:id/rsvp", requirePermission("events:create"), rsvpEvent);
