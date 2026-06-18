import { Router } from "express";
import { createAnnouncement, listAnnouncements, publishAnnouncement } from "../controllers/announcement.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requirePermission } from "../middleware/requirePermission.js";

export const announcementRouter = Router();

announcementRouter.use(authenticate);
announcementRouter.get("/", requirePermission("announcements:read"), listAnnouncements);
announcementRouter.post("/", requirePermission("announcements:create"), createAnnouncement);
announcementRouter.post("/:id/publish", requirePermission("announcements:manage"), publishAnnouncement);
