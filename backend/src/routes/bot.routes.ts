import { Router } from "express";
import {
  botAlert,
  botAttendance,
  botCallToArmsResponse,
  botAbsence,
  botApplication,
  botAttackAlert,
  botAttackResponse,
  botComplaint,
  botCommandSettings,
  botDailyCheckIn,
  botEventReminder,
  botEventResponse,
  botProfile,
  botPollCreate,
  botPollMessageUpdate,
  botPollVote,
  botRegister,
  botShield,
  botShieldAlert,
  botSummitResponse,
  botSummary
} from "../controllers/bot.controller.js";
import { authenticateService } from "../middleware/auth.js";

export const botRouter = Router();

botRouter.use(authenticateService);
botRouter.post("/register", botRegister);
botRouter.get("/profile", botProfile);
botRouter.post("/polls", botPollCreate);
botRouter.patch("/polls/:id/message", botPollMessageUpdate);
botRouter.post("/polls/:id/vote", botPollVote);
botRouter.post("/attendance", botAttendance);
botRouter.post("/shield", botShield);
botRouter.post("/shield-alert", botShieldAlert);
botRouter.post("/attack", botAttackAlert);
botRouter.post("/attack/response", botAttackResponse);
botRouter.post("/event/response", botEventResponse);
botRouter.post("/summit/response", botSummitResponse);
botRouter.post("/checkin", botDailyCheckIn);
botRouter.post("/absence", botAbsence);
botRouter.post("/application", botApplication);
botRouter.post("/complaint", botComplaint);
botRouter.get("/command-settings", botCommandSettings);
botRouter.post("/reminder", botEventReminder);
botRouter.get("/summary", botSummary);
botRouter.post("/alert", botAlert);
botRouter.post("/alert/:id/respond", botCallToArmsResponse);
