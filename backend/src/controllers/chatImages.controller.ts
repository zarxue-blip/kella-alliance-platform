import { validateChatImage } from '../services/chatImageValidation.js';
import type { UserDocument } from '../models/user.model.js';
import { z } from 'zod';
import { Types } from 'mongoose';
import { env } from '../config/env.js';
import { ChatImageLibrary } from '../models/chatImageLibrary.model.js';
import { UserModel } from '../models/user.model.js';
import { isDashboardAdminUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';

function guild() {
  if (!env.DISCORD_GUILD_ID) throw new HttpError(503, 'Configure the Discord server first.');
  return env.DISCORD_GUILD_ID;
}
export const listChatImages = asyncHandler(async (_req,res) => {
  const library = await ChatImageLibrary.findOne({guildId:guild()}).lean();
  res.set('Cache-Control','no-store').json({images:library?.images || []});
});
export const uploadChatImage = asyncHandler(async (req,res) => {
  const body = z.object({name:z.string().trim().min(1).max(60),dataUrl:z.string().max(670_000)}).parse(req.body);
  validateChatImage(body.dataUrl);
  const guildId = guild();
  await ChatImageLibrary.updateOne({guildId},{$setOnInsert:{guildId,images:[]}},{upsert:true});
  const updated = await ChatImageLibrary.updateOne({guildId,'images.19':{$exists:false}},{$push:{images:body}});
  if (!updated.modifiedCount) throw new HttpError(409,'The library holds 20 images. Remove one before uploading another.');
  res.status(201).json({ok:true});
});
export const deleteChatImage = asyncHandler(async (req,res) => {
  if (!Types.ObjectId.isValid(req.params.id)) throw new HttpError(400,'Invalid image.');
  const result = await ChatImageLibrary.updateOne({guildId:guild()},{$pull:{images:{_id:new Types.ObjectId(req.params.id)}}});
  if (!result.modifiedCount) throw new HttpError(404,'Image already removed.');
  res.json({ok:true});
});
export const botChatImages = asyncHandler(async (req,res) => {
  const body = z.object({guildId:z.string(),discordId:z.string(),roleIds:z.array(z.string()).max(250),id:z.string().optional()}).parse(req.body);
  if (body.guildId !== guild()) throw new HttpError(403,'Admin access required.');
  const user = await UserModel.findOne({discordId:body.discordId}).lean<UserDocument>();
  if (user?.disabled || !isDashboardAdminUser({discordId:body.discordId,role:user?.role,discordRoleIds:body.roleIds})) throw new HttpError(403,'Admin access required.');
  const library = await ChatImageLibrary.findOne({guildId:body.guildId}).select(body.id ? '+images.dataUrl' : '-images.dataUrl').lean();
  const images = library?.images || [];
  res.set('Cache-Control','no-store');
  if (body.id) {
    const image = images.find(image=>String(image._id)===body.id);
    if (!image) throw new HttpError(404,'This image has been removed.');
    res.json({image});
  } else res.json({images:images.map(image=>({_id:String(image._id),name:image.name}))});
});
