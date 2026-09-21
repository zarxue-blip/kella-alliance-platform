import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { Router } from "express";
import {
  dashboardAlerts,
  dashboardResponseReports,
  dashboardMembers,
  dashboardMemberCreate,
  dashboardMemberDelete,
  dashboardMemberUpdate,
  dashboardMemberXlsxImport,
  dashboardRosterUploadDelete,
  dashboardRosterUploadsClear,
  dashboardRosterUploads,
  dashboardRosterUploadUpdate,
  dashboardDiscordMemberSync,
  dashboardProfile,
  dashboardProfileUpdate,
  dashboardPollCreate,
  dashboardPollDelete,
  dashboardPolls,
  dashboardPollStatusUpdate,
  dashboardDmAlertSend,
  dashboardSettings,
  dashboardSettingsUpdate,
  dashboardAttackSend,
  dashboardChatSend,
  dashboardThumbnailSend,
  dashboardComplaintCreate,
  dashboardComplaintReply,
  dashboardComplaintStatusUpdate,
  dashboardComplaints,
  dashboardEventDelete,
  dashboardEventSend,
  dashboardEvents,
  dashboardPersonalAttendance,
  dashboardShieldSend,
  dashboardSummary,
  dashboardWikiAdminList,
  dashboardWikiCreate,
  dashboardWikiDelete,
  dashboardWikiList,
  dashboardWikiUpdate,
  dashboardDmAlertResendFailed,
} from "../controllers/dashboard.controller.js";
import { authenticate, authenticateDashboardAdmin, authenticateDashboardWikiEditor, requireEvoMemberAccess } from "../middleware/auth.js";

import { listChatImages, uploadChatImage, deleteChatImage } from '../controllers/chatImages.controller.js';
export const dashboardRouter = Router();
dashboardRouter.get('/chat-images', authenticateDashboardAdmin, listChatImages);
dashboardRouter.post('/chat-images', authenticateDashboardAdmin, uploadChatImage);
dashboardRouter.delete('/chat-images/:id', authenticateDashboardAdmin, deleteChatImage);

dashboardRouter.get("/access", authenticateDashboardAdmin, (_req, res) => res.json({admin: true}));

dashboardRouter.get("/summary", dashboardSummary);
dashboardRouter.get("/summary/admin", authenticateDashboardAdmin, (_req, res, next) => { res.locals.adminSummary = true; next(); }, dashboardSummary);
dashboardRouter.get("/champions", (_req, res, next) => { res.locals.publicChampions = true; next(); }, dashboardMembers);
dashboardRouter.get("/members", authenticate, dashboardMembers);
dashboardRouter.get("/members/manage", authenticateDashboardAdmin, (_req, res, next) => { res.locals.memberManagement = true; next(); }, dashboardMembers);
dashboardRouter.post("/members", authenticateDashboardAdmin, dashboardMemberCreate);
dashboardRouter.patch("/members/:id", authenticateDashboardAdmin, dashboardMemberUpdate);
dashboardRouter.delete("/members/:id", authenticateDashboardAdmin, dashboardMemberDelete);
dashboardRouter.get('/commander',authenticate,asyncHandler(async(req,res)=>{const user=await UserModel.findById((req as AuthenticatedRequest).user.id).select('+commanderTools').lean<any>();res.set('Cache-Control','no-store').json({data:user?.commanderTools || {}});}));
dashboardRouter.put('/commander',authenticate,asyncHandler(async(req,res)=>{
 const data=req.body?.data;
 if(!data || Array.isArray(data) || typeof data!=='object' || JSON.stringify(data).length>200000 || /"(?:__proto__|constructor|prototype)"\s*:/.test(JSON.stringify(data))) throw new HttpError(400,'Invalid commander profile.');
 await UserModel.updateOne({_id:(req as AuthenticatedRequest).user.id},{$set:{commanderTools:data}});res.json({ok:true});
}));
const baseBuildingTypes = new Set(['hub','archery','eagle','stable','research','sentry','arch','notice','infantry','admin']);
dashboardRouter.get('/base-layout',authenticate,requireEvoMemberAccess,asyncHandler(async(req,res)=>{
 const user=await UserModel.findById((req as AuthenticatedRequest).user.id).select('+baseLayout').lean<any>();
 res.set('Cache-Control','private, no-store').json({data:user?.baseLayout || null});
}));
dashboardRouter.put('/base-layout',authenticate,requireEvoMemberAccess,asyncHandler(async(req,res)=>{
 const data=req.body?.data;
 if(!data || data.version!==6 || !Array.isArray(data.buildings) || data.buildings.length>40) throw new HttpError(400,'Invalid base layout.');
 const seen=new Set<string>();
 const buildings=data.buildings.map((item:any)=>{
  const type=typeof item?.type==='string'?item.type:'';
  const id=typeof item?.id==='string'?item.id:'';
  const x=Number(item?.x),y=Number(item?.y),level=Number(item?.level || 1);
  if(!baseBuildingTypes.has(type)||seen.has(type)||!id||id.length>100||!Number.isFinite(x)||!Number.isFinite(y)||x<0||x>1448||y<0||y>1086||!Number.isInteger(level)||level<1||level>100) throw new HttpError(400,'Invalid base layout.');
  seen.add(type);
  return {id,type,x,y,level};
 });
 const layout={version:6,buildings};
 await UserModel.updateOne({_id:(req as AuthenticatedRequest).user.id},{$set:{baseLayout:layout}});
 res.json({ok:true});
}));
dashboardRouter.get("/profile", authenticate, dashboardProfile);
dashboardRouter.patch("/profile", authenticate, dashboardProfileUpdate);
dashboardRouter.post("/members/import-xlsx", authenticateDashboardAdmin, dashboardMemberXlsxImport);
dashboardRouter.get("/uploads", authenticateDashboardAdmin, dashboardRosterUploads);
dashboardRouter.patch("/uploads/:id", authenticateDashboardAdmin, dashboardRosterUploadUpdate);
dashboardRouter.delete("/uploads", authenticateDashboardAdmin, dashboardRosterUploadsClear);
dashboardRouter.delete("/uploads/:id", authenticateDashboardAdmin, dashboardRosterUploadDelete);
dashboardRouter.post("/sync-discord-members", authenticateDashboardAdmin, dashboardDiscordMemberSync);
dashboardRouter.get("/responses", authenticateDashboardAdmin, dashboardResponseReports);
dashboardRouter.get("/alerts", authenticateDashboardAdmin, dashboardAlerts);
dashboardRouter.get("/events", authenticate, dashboardEvents);
dashboardRouter.get("/my-attendance", authenticate, dashboardPersonalAttendance);
dashboardRouter.post("/events", authenticateDashboardAdmin, dashboardEventSend);
dashboardRouter.delete("/events/:id", authenticateDashboardAdmin, dashboardEventDelete);
dashboardRouter.get("/polls", authenticate, dashboardPolls);
dashboardRouter.post("/polls", authenticateDashboardAdmin, dashboardPollCreate);
dashboardRouter.patch("/polls/:id/status", authenticateDashboardAdmin, dashboardPollStatusUpdate);
dashboardRouter.delete("/polls/:id", authenticateDashboardAdmin, dashboardPollDelete);
dashboardRouter.get("/wiki", authenticate, dashboardWikiList);
dashboardRouter.get("/wiki/admin", authenticateDashboardWikiEditor, dashboardWikiAdminList);
dashboardRouter.post("/wiki", authenticateDashboardWikiEditor, dashboardWikiCreate);
dashboardRouter.patch("/wiki/:id", authenticateDashboardWikiEditor, dashboardWikiUpdate);
dashboardRouter.delete("/wiki/:id", authenticateDashboardAdmin, dashboardWikiDelete);
dashboardRouter.post("/complaints", authenticate, dashboardComplaintCreate);
dashboardRouter.get("/complaints", authenticateDashboardAdmin, dashboardComplaints);
dashboardRouter.patch("/complaints/:id/status", authenticateDashboardAdmin, dashboardComplaintStatusUpdate);
dashboardRouter.post("/complaints/:id/reply", authenticateDashboardAdmin, dashboardComplaintReply);
dashboardRouter.get("/settings", dashboardSettings);
dashboardRouter.patch("/settings", authenticateDashboardAdmin, dashboardSettingsUpdate);
dashboardRouter.post("/tools/shield-alert", authenticateDashboardAdmin, dashboardShieldSend);
dashboardRouter.post("/tools/attack-alert", authenticateDashboardAdmin, dashboardAttackSend);
dashboardRouter.post("/tools/chat", authenticateDashboardAdmin, dashboardChatSend);
dashboardRouter.post("/tools/thumbnail", authenticateDashboardAdmin, dashboardThumbnailSend);
dashboardRouter.post("/tools/dm-alert", authenticateDashboardAdmin, dashboardDmAlertSend);
dashboardRouter.post("/tools/dm-alert/:id/resend-failed", authenticateDashboardAdmin, dashboardDmAlertResendFailed);

import { TicketModel,TicketMessageModel } from '../models/ticket.model.js';
import { env as ticketEnv } from '../config/env.js';
dashboardRouter.get('/tickets',authenticateDashboardAdmin,asyncHandler(async(_req,res)=>{const tickets=await TicketModel.find({guildId:ticketEnv.DISCORD_GUILD_ID}).sort({openedAt:-1}).limit(500).lean();res.set('Cache-Control','no-store').json({tickets});}));
dashboardRouter.get('/tickets/:id',authenticateDashboardAdmin,asyncHandler(async(req,res)=>{if(!/^[a-f0-9]{24}$/.test(req.params.id))throw new HttpError(400,'Invalid ticket.');const ticket=await TicketModel.findOne({_id:req.params.id,guildId:ticketEnv.DISCORD_GUILD_ID}).lean();if(!ticket)throw new HttpError(404,'Ticket not found.');const messages=await TicketMessageModel.find({ticketId:ticket._id}).sort({at:1}).limit(2000).lean();res.set('Cache-Control','no-store').json({ticket,messages});}));
