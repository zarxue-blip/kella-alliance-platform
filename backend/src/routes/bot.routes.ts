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

import { botChatImages } from '../controllers/chatImages.controller.js';
botRouter.use(authenticateService);
botRouter.post('/chat-images', botChatImages);
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

import { requireBotAdmin } from '../services/botAdmin.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
botRouter.post('/admin-access',asyncHandler(async(req,res)=>{await requireBotAdmin(String(req.body.guildId),String(req.body.discordId));res.json({admin:true});}));

import { z } from 'zod';
import { createTicket,closeTicket } from '../services/ticket.service.js';
const ticketActor=z.object({guildId:z.string().regex(/^\d{15,22}$/),discordId:z.string().regex(/^\d{15,22}$/)});
botRouter.post('/tickets',asyncHandler(async(req,res)=>{const b=ticketActor.extend({category:z.string()}).parse(req.body);const ticket=await createTicket(b.guildId,b.discordId,b.category);res.json({channelId:ticket.channelId});}));
botRouter.post('/tickets/:id/close',asyncHandler(async(req,res)=>{const b=ticketActor.extend({action:z.enum(['close','delete'])}).parse(req.body);await closeTicket(z.string().regex(/^[a-f0-9]{24}$/).parse(req.params.id),b.guildId,b.discordId,b.action);res.json({ok:true});}));
