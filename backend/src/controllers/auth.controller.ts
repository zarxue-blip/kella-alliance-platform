import type { Request, Response } from "express";
import { randomBytes } from "node:crypto";
import { env, isProduction } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { UserModel } from "../models/user.model.js";
import { getDiscordAuthorizationUrl, exchangeDiscordCode } from "../services/discordOAuth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import { signSessionToken, type AuthenticatedRequest } from "../middleware/auth.js";

const oauthStates = new Set<string>();

export const startDiscordLogin = asyncHandler(async (_req: Request, res: Response) => {
  const state = randomBytes(24).toString("hex");
  oauthStates.add(state);
  res.redirect(getDiscordAuthorizationUrl(state));
});

export const discordCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state } = req.query;
  if (typeof code !== "string" || typeof state !== "string" || !oauthStates.has(state)) {
    throw new HttpError(400, "Invalid OAuth callback");
  }
  oauthStates.delete(state);

  const { identity } = await exchangeDiscordCode(code);
  const alliance = await AllianceModel.findOneAndUpdate(
    { discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured" },
    {
      $setOnInsert: {
        name: "Dragon Command Alliance",
        tag: "DCA",
        discordGuildId: env.DISCORD_GUILD_ID ?? "unconfigured",
        timezone: "UTC"
      }
    },
    { upsert: true, new: true }
  );

  const userCount = await UserModel.countDocuments({ allianceId: alliance._id });
  const user = await UserModel.findOneAndUpdate(
    { discordId: identity.id },
    {
      $set: {
        username: identity.global_name || identity.username,
        avatar: identity.avatar,
        allianceId: alliance._id,
        lastLoginAt: new Date()
      },
      $setOnInsert: {
        role: userCount === 0 ? "Owner" : "Member"
      }
    },
    { upsert: true, new: true }
  );

  const token = signSessionToken({
    id: user._id.toString(),
    discordId: user.discordId,
    role: user.role,
    allianceId: user.allianceId.toString()
  });

  res.cookie(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  res.redirect(env.PUBLIC_APP_URL);
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await UserModel.findById(req.user.id).populate("memberId").lean();
  res.json({ user });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie(env.SESSION_COOKIE_NAME);
  res.status(204).send();
});
