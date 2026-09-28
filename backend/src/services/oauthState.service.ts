import { randomBytes, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const oauthStateCookie = "kella_oauth_session";
export const googleOAuthStateCookie = "kella_google_oauth";
export const googleSignupCookie = "kella_google_signup";
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

export function createGoogleOAuthState(inGameUsername?: string) {
  const state = randomBytes(24).toString("hex");
  const nonce = randomBytes(24).toString("hex");
  const cookie = jwt.sign(
    { purpose: "google-oauth", state, nonce, inGameUsername: inGameUsername || "" },
    env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "10m", audience: "kella-google-login" }
  );
  return { state, nonce, cookie };
}

export function verifyGoogleOAuthState(state: unknown, cookie: unknown): { nonce: string; inGameUsername: string } | null {
  if (typeof state !== "string" || !/^[a-f0-9]{48}$/.test(state) || typeof cookie !== "string") return null;
  try {
    const payload = jwt.verify(cookie, env.JWT_SECRET, { algorithms: ["HS256"], audience: "kella-google-login" }) as jwt.JwtPayload;
    if (payload.purpose !== "google-oauth" || typeof payload.state !== "string" ||
      typeof payload.nonce !== "string" || !/^[a-f0-9]{48}$/.test(payload.nonce) ||
      typeof payload.inGameUsername !== "string" || payload.state.length !== state.length) return null;
    if (!timingSafeEqual(Buffer.from(state), Buffer.from(payload.state))) return null;
    return { nonce: payload.nonce, inGameUsername: payload.inGameUsername };
  } catch { return null; }
}

export function signGoogleSignupIdentity(identity: { sub: string; email: string; name: string }) {
  return jwt.sign({ purpose: "google-signup", ...identity }, env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "10m", audience: "kella-google-signup" });
}

export function verifyGoogleSignupIdentity(cookie: unknown): { sub: string; email: string; name: string } | null {
  if (typeof cookie !== "string") return null;
  try {
    const payload = jwt.verify(cookie, env.JWT_SECRET, { algorithms: ["HS256"], audience: "kella-google-signup" }) as jwt.JwtPayload;
    if (payload.purpose !== "google-signup" || typeof payload.sub !== "string" ||
      typeof payload.email !== "string" || typeof payload.name !== "string") return null;
    return { sub: payload.sub, email: payload.email, name: payload.name };
  } catch { return null; }
}
