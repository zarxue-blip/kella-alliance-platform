import { z } from "zod";
import { env } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { EmbedTemplateModel } from "../models/embedTemplate.model.js";
import { KellaActionModel } from "../models/kellaAction.model.js";
import { listDiscordTextChannels, sendDiscordEmbed } from "../services/discord.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();

const embedPayloadSchema = z.object({
  channelId: z.string().min(1, "Channel ID is required"),
  title: z.string().max(256).optional().default(""),
  description: z.string().min(1, "Description is required").max(4000),
  color: z.string().regex(/^#?[0-9a-fA-F]{6}$/).optional().default("#facc15"),
  imageUrl: optionalUrl,
  thumbnailUrl: optionalUrl,
  footer: z.string().max(2048).optional().default("Sent by Kella"),
  roleMentionId: z.string().optional().default("")
});

const templateSchema = embedPayloadSchema.extend({
  name: z.string().min(1).max(80)
});

async function resolveAlliance() {
  const alliance =
    (env.DISCORD_GUILD_ID ? await AllianceModel.findOne({ discordGuildId: env.DISCORD_GUILD_ID }) : undefined) ??
    (await AllianceModel.findOne().sort({ createdAt: 1 }));

  if (alliance) return alliance;

  return AllianceModel.create({
    name: "Dragon Command Alliance",
    tag: "DCA",
    discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured",
    timezone: "UTC"
  });
}

export const embedChannels = asyncHandler(async (_req, res) => {
  res.json({ channels: await listDiscordTextChannels() });
});

export const embedTemplates = asyncHandler(async (_req, res) => {
  const alliance = await resolveAlliance();
  const templates = await EmbedTemplateModel.find({ allianceId: alliance._id }).sort({ updatedAt: -1 }).limit(50).lean();
  res.json({
    templates: templates.map((template: any) => ({
      id: template._id.toString(),
      name: template.name,
      channelId: template.channelId,
      title: template.title,
      description: template.description,
      color: template.color,
      imageUrl: template.imageUrl,
      thumbnailUrl: template.thumbnailUrl,
      footer: template.footer,
      roleMentionId: template.roleMentionId
    }))
  });
});

export const embedTemplateSave = asyncHandler(async (req, res) => {
  const body = templateSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const template = await EmbedTemplateModel.findOneAndUpdate(
    { allianceId: alliance._id, name: body.name },
    { $set: { ...body, allianceId: alliance._id, createdBy: "Dashboard" } },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(201).json({ template });
});

export const embedTemplateDelete = asyncHandler(async (req, res) => {
  const alliance = await resolveAlliance();
  const template = await EmbedTemplateModel.findOneAndDelete({ _id: req.params.id, allianceId: alliance._id });
  if (!template) throw new HttpError(404, "Template not found");
  res.json({ deleted: true });
});

export const embedSend = asyncHandler(async (req, res) => {
  const body = embedPayloadSchema.parse(req.body);
  const alliance = await resolveAlliance();
  const message = await sendDiscordEmbed(body);
  const action = await KellaActionModel.create({
    allianceId: alliance._id,
    type: "embed_sent",
    actorName: "Dashboard",
    targetDiscordId: body.channelId,
    status: "Sent",
    payload: {
      title: body.title,
      description: body.description,
      color: body.color,
      imageUrl: body.imageUrl,
      thumbnailUrl: body.thumbnailUrl,
      footer: body.footer,
      roleMentionId: body.roleMentionId,
      messageId: message?.id,
      messageLink: env.DISCORD_GUILD_ID && message?.channel_id && message?.id
        ? `https://discord.com/channels/${env.DISCORD_GUILD_ID}/${message.channel_id}/${message.id}`
        : undefined
    }
  });
  res.status(201).json({ message, action });
});
