import { randomBytes, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const oauthStateCookie = "kella_oauth_session";
export function createOAuthState(migration: boolean) {
  const state = randomBytes(24).toString("hex");
  return { state, cookie: jwt.sign({ purpose: "discord-oauth", state, migration }, env.JWT_SECRET, { algorithm: "HS256", expiresIn: "10m", audience: "kella-discord-login" }) };
}
export function verifyOAuthState(state: unknown, cookie: unknown): { migration: boolean } | null {
  if (typeof state !== "string" || !/^[a-f0-9]{48}$/.test(state) || typeof cookie !== "string") return null;
  try {
    const payload = jwt.verify(cookie, env.JWT_SECRET, { algorithms: ["HS256"], audience: "kella-discord-login" }) as jwt.JwtPayload;
    if (payload.purpose !== "discord-oauth" || typeof payload.state !== "string" || payload.state.length !== state.length || typeof payload.migration !== "boolean") return null;
    if (!timingSafeEqual(Buffer.from(state), Buffer.from(payload.state))) return null;
    return { migration: payload.migration };
  } catch { return null; }
}
