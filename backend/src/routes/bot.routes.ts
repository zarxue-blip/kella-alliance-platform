import { Router } from "express";
import {
  botAlert,
  botAttendance,
  botCallToArmsResponse,
  botAbsence,
  botApplication,
  botAttackAlert,
  botAttackResponse,
  botDailyCheckIn,
  botEventReminder,
  botProfile,
  botRegister,
  botRootsResponse,
  botRootsSession,
  botRootsSessionUpdate,
  botRootsOfWarCheckIn,
  botRootsOfWarRegister,
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
botRouter.post("/attendance", botAttendance);
botRouter.post("/shield", botShield);
botRouter.post("/roots-of-war/register", botRootsOfWarRegister);
botRouter.post("/roots-of-war/check-in", botRootsOfWarCheckIn);
botRouter.post("/shield-alert", botShieldAlert);
botRouter.post("/attack", botAttackAlert);
botRouter.post("/attack/response", botAttackResponse);
botRouter.post("/roots/response", botRootsResponse);
botRouter.post("/roots/session", botRootsSession);
botRouter.patch("/roots/session/:id", botRootsSessionUpdate);
botRouter.post("/summit/response", botSummitResponse);
botRouter.post("/checkin", botDailyCheckIn);
botRouter.post("/absence", botAbsence);
botRouter.post("/application", botApplication);
botRouter.post("/reminder", botEventReminder);
botRouter.get("/summary", botSummary);
botRouter.post("/alert", botAlert);
botRouter.post("/alert/:id/respond", botCallToArmsResponse);
