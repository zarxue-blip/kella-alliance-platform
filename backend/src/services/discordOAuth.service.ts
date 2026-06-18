import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface DiscordIdentity {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
}

export function getDiscordAuthorizationUrl(state: string) {
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    redirect_uri: env.DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify guilds.members.read",
    state,
    prompt: "consent"
  });
  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

export async function exchangeDiscordCode(code: string) {
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: env.DISCORD_REDIRECT_URI
  });

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params
  });

  if (!tokenResponse.ok) {
    throw new HttpError(401, "Discord OAuth exchange failed");
  }

  const token = (await tokenResponse.json()) as DiscordTokenResponse;
  const identityResponse = await fetch("https://discord.com/api/users/@me", {
    headers: { authorization: `${token.token_type} ${token.access_token}` }
  });

  if (!identityResponse.ok) {
    throw new HttpError(401, "Discord profile lookup failed");
  }

  return {
    token,
    identity: (await identityResponse.json()) as DiscordIdentity
  };
}
