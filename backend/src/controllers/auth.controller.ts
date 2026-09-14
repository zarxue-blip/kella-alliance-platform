import { migrationIdentityCookie, signMigrationIdentity } from '../services/migrationIdentity.service.js';
import type { Request, Response } from "express";
import { createOAuthState, verifyOAuthState, oauthStateCookie } from "../services/oauthState.service.js";
import { env, isProduction } from "../config/env.js";
import { AllianceModel } from "../models/alliance.model.js";
import { UserModel } from "../models/user.model.js";
import { getDiscordAuthorizationUrl, exchangeDiscordCode, getDiscordOAuthGuildMember } from "../services/discordOAuth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";
import { isDashboardAdminUser, isDashboardWikiEditorUser, signSessionToken, type AuthenticatedRequest } from "../middleware/auth.js";



function csvSet(value?: string) {
  return new Set(
    (value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

function hasAnyRole(userRoleIds: string[], allowedRoleIds?: string) {
  const allowed = csvSet(allowedRoleIds);
  if (!allowed.size) return true;
  return userRoleIds.some((roleId) => allowed.has(roleId));
}

export const startDiscordLogin = asyncHandler(async (_req: Request, res: Response) => {
  // Start on the callback origin so the same browser cookie returns from Discord.
  const callbackOrigin = new URL(env.DISCORD_REDIRECT_URI);
  if (isProduction && _req.get("host") !== callbackOrigin.host) {
    res.redirect(callbackOrigin.origin + "/api/auth/discord" + (_req.query.migration === "1" ? "?migration=1" : ""));
    return;
  }
  const { state, cookie } = createOAuthState(_req.query.migration === "1");
  res.set("Cache-Control", "no-store");
  res.cookie(oauthStateCookie, cookie, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/", maxAge: 600000 });
  res.redirect(getDiscordAuthorizationUrl(state));
});

export const discordCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const login = verifyOAuthState(state, req.cookies?.[oauthStateCookie]);
  res.set("Cache-Control", "no-store");
  res.clearCookie(oauthStateCookie, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" });
  if (typeof code !== "string" || !login) {
    res.status(400).type("html").send('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Restart Discord login</title></head><body style="background:#171b29;color:#ead5a8;font:18px system-ui;padding:40px;max-width:600px;margin:auto"><h1>Please restart Discord login</h1><p>This login link expired or no longer matches your browser. Your account permissions have not been checked yet.</p><p><a style="color:#a7afff" href="/api/auth/discord">Try Discord login again</a></p><a style="color:#ead5a8" href="/">Return to Kella</a></body></html>');
    return;
  }
  const migrationLogin = login.migration;

  const { token: discordToken, identity } = await exchangeDiscordCode(code);
  if(migrationLogin) {
    res.cookie(migrationIdentityCookie,signMigrationIdentity(identity.id),{httpOnly:true,secure:isProduction,sameSite:'lax',maxAge:3600000});
    res.redirect('/migration');
    return;
  }
  const guildMember = await getDiscordOAuthGuildMember(discordToken.token_type, discordToken.access_token);
  if (env.DISCORD_GUILD_ID && !guildMember) {
    throw new HttpError(403, "This Discord account is not in the configured Kella server");
  }

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

  const existingUser = await UserModel.findOne({ discordId: identity.id }).lean() as any;
  const userCount = await UserModel.countDocuments({ allianceId: alliance._id });
  const discordRoleIds = guildMember?.roles || [];
  const hasConfiguredAdminAccess = isDashboardAdminUser({
    discordId: identity.id,
    role: existingUser?.role,
    discordRoleIds
  });
  const hasConfiguredWikiEditorAccess = isDashboardWikiEditorUser({
    discordId: identity.id,
    role: existingUser?.role,
    discordRoleIds
  });
  if (
    env.DISCORD_GUILD_ID &&
    !hasConfiguredAdminAccess &&
    !hasConfiguredWikiEditorAccess &&
    userCount > 0 &&
    !hasAnyRole(discordRoleIds, env.DASHBOARD_MEMBER_ROLE_IDS)
  ) {
    throw new HttpError(403, "This Discord account does not have the Kella member role");
  }
  const nextRole =
    !existingUser || (existingUser.role === "Member" && hasConfiguredAdminAccess)
      ? userCount === 0
        ? "Owner"
        : hasConfiguredAdminAccess
          ? "R4 Officer"
          : "Member"
      : existingUser.role;
  const user = await UserModel.findOneAndUpdate(
    { discordId: identity.id },
    {
      $set: {
        username: guildMember?.nick || identity.global_name || identity.username,
        avatar: identity.avatar,
        discordRoleIds,
        inConfiguredGuild: Boolean(guildMember || !env.DISCORD_GUILD_ID),
        allianceId: alliance._id,
        role: nextRole,
        lastLoginAt: new Date()
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
  const fallbackUrl = `${req.protocol}://${req.get("host")}/`;
  const redirectUrl = isProduction && env.PUBLIC_APP_URL.includes("localhost") ? fallbackUrl : env.PUBLIC_APP_URL;
  res.redirect(redirectUrl);
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await UserModel.findById(req.user.id).populate("memberId").lean();
  res.json({
    user,
    isDashboardAdmin: Boolean(user && isDashboardAdminUser(user as any)),
    isDashboardWikiEditor: Boolean(user && isDashboardWikiEditorUser(user as any)),
    loginUrl: "/api/auth/discord"
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie(env.SESSION_COOKIE_NAME);
  res.status(204).send();
});
