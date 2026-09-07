import { readMigrationIdentity } from '../services/migrationIdentity.service.js';
import { assignMigrationRoles } from '../services/migrationRoles.service.js';
import { AllianceModel } from '../models/alliance.model.js';
import { env } from '../config/env.js';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { authenticate, authenticateDashboardAdmin, type AuthenticatedRequest } from '../middleware/auth.js';
import { MigrationModel } from '../models/migration.model.js';
import { migrationFields } from '../services/migrationFields.js';
import { migrationDescriptions, migrationStatuses, validateMigration } from '../services/migrationData.service.js';
import { sendMigrationEmbed } from '../services/discord.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
export const migrationRouter = Router();
async function adminAlliance(req:AuthenticatedRequest) {
 if(req.user?.allianceId) return req.user.allianceId;
 const alliance:any=(env.DISCORD_GUILD_ID ? await AllianceModel.findOne({discordGuildId:env.DISCORD_GUILD_ID}).lean():null) ?? await AllianceModel.findOne().sort({createdAt:1}).lean();
 if(!alliance) throw new HttpError(404,'Alliance not configured');
 return alliance._id.toString();
}
const channelId='1541258653875830814';
async function deliver(id:string) {
  const submission = await MigrationModel.findOneAndUpdate({_id:id,deliveryStatus:{$in:['Pending','Failed']}},{$set:{deliveryStatus:'Sending',deliveryError:''}},{new:true});
  if (!submission) return;
  try {
    const pages=migrationDescriptions(submission.answers,submission.discordId,submission.fields);
    for (let i=submission.messageIds.length;i<pages.length;i++) {
      const message=await sendMigrationEmbed(submission.channelId,pages[i],id,i);
      submission.messageIds.push(message.id);
      await submission.save();
    }
    submission.deliveryStatus='Sent';await submission.save();
  } catch {
    submission.deliveryStatus='Failed';submission.deliveryError='Discord delivery failed. Answers are saved; an administrator can retry.';
    await submission.save();
  }
}
migrationRouter.get('/identity', (req,res)=>res.json({discordId:readMigrationIdentity(req)}));
migrationRouter.get('/fields', (_req,res)=>res.json({fields:migrationFields}));
migrationRouter.post('/', (req,res,next)=>{
  if(req.cookies?.[env.SESSION_COOKIE_NAME] || req.header('authorization')) return authenticate(req,res,next);
  next();
}, rateLimit({windowMs:3600000,limit:10}), asyncHandler(async(req:AuthenticatedRequest,res)=>{
  const body=z.object({requestKey:z.string().uuid(),answers:z.unknown()}).parse(req.body);
  let answers;try {answers=validateMigration(body.answers);}catch(error){throw new HttpError(400,error instanceof Error ? error.message : 'Invalid answers');}
  const allianceId=await adminAlliance(req);
  let submission;
  try {
    submission=await MigrationModel.findOneAndUpdate({requestKey:body.requestKey},{$setOnInsert:{allianceId,requesterId:req.user?.id,discordId:req.user?.discordId || readMigrationIdentity(req),requestKey:body.requestKey,answers,fields:migrationFields,channelId}},{upsert:true,new:true,setDefaultsOnInsert:true});
  } catch(error:any) {
    if(error?.code!==11000) throw error;
    submission=await MigrationModel.findOne({requestKey:body.requestKey});
  }
  await deliver(submission._id.toString());
  await assignMigrationRoles(submission._id.toString());
  const current:any=await MigrationModel.findById(submission._id).lean();
  res.status(201).json({id:submission._id,deliveryStatus:current.deliveryStatus,roleStatus:current.roleStatus,roleError:current.roleError,message:current.deliveryStatus==='Sent'?'Application saved and posted to Discord.':'Application saved. Discord delivery is pending administrator review.'});
}));
migrationRouter.get('/',authenticateDashboardAdmin,asyncHandler(async(req:AuthenticatedRequest,res)=>{
  const filter:any={allianceId:await adminAlliance(req)};
  if(req.query.status) filter.status=z.enum(migrationStatuses).parse(req.query.status);
  const page=z.coerce.number().int().min(1).max(10000).default(1).parse(req.query.page);
  const [submissions,total]=await Promise.all([MigrationModel.find(filter).sort({createdAt:-1}).skip((page-1)*30).limit(30).lean(),MigrationModel.countDocuments(filter)]);
  res.json({submissions,total,page});
}));
migrationRouter.delete('/:id',authenticateDashboardAdmin,asyncHandler(async(req:AuthenticatedRequest,res)=>{
  const id=z.string().regex(/^[a-f0-9]{24}$/i).parse(req.params.id);
  const item=await MigrationModel.findOneAndDelete({_id:id,allianceId:await adminAlliance(req)});
  if(!item) throw new HttpError(404,'Application not found');
  res.json({message:'Application deleted.'});
}));
migrationRouter.patch('/:id',authenticateDashboardAdmin,asyncHandler(async(req:AuthenticatedRequest,res)=>{
  const status=z.enum(migrationStatuses).parse(req.body.status);
  const item=await MigrationModel.findOneAndUpdate({_id:z.string().regex(/^[a-f0-9]{24}$/i).parse(req.params.id),allianceId:await adminAlliance(req)},{$set:{status}},{new:true});
  if(!item) throw new HttpError(404,'Application not found');res.json({submission:item});
}));
migrationRouter.post('/:id/retry',authenticateDashboardAdmin,asyncHandler(async(req:AuthenticatedRequest,res)=>{
  const item=await MigrationModel.findOne({_id:z.string().regex(/^[a-f0-9]{24}$/i).parse(req.params.id),allianceId:await adminAlliance(req)});
  if(!item) throw new HttpError(404,'Application not found');
  await deliver(item._id.toString());await assignMigrationRoles(item._id.toString());res.json({submission:await MigrationModel.findById(item._id).lean()});
}));

// A saved request key is an unguessable receipt; only a verified Discord login
// can attach an identity, and an already linked identity cannot be replaced.
migrationRouter.post('/connect-discord', rateLimit({windowMs:60000,limit:10}), asyncHandler(async(req,res)=>{
  const discordId=readMigrationIdentity(req);
  if(!discordId) throw new HttpError(401,'Connect Discord first.');
  const {requestKey}=z.object({requestKey:z.string().uuid()}).parse(req.body);
  const item=await MigrationModel.findOneAndUpdate({requestKey,$or:[{discordId:''},{discordId}]},{$set:{discordId}},{new:true});
  if(!item) throw new HttpError(404,'Application receipt not found or already linked to another account.');
  await assignMigrationRoles(item._id.toString());
  const current:any=await MigrationModel.findById(item._id).lean();
  res.json({roleStatus:current.roleStatus,roleError:current.roleError});
}));
