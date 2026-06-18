import { Router } from "express";
import {
  botAlert,
  botAttendance,
  botCallToArmsResponse,
  botProfile,
  botRegister,
  botRootsOfWarCheckIn,
  botRootsOfWarRegister,
  botShield,
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
botRouter.get("/summary", botSummary);
botRouter.post("/alert", botAlert);
botRouter.post("/alert/:id/respond", botCallToArmsResponse);
