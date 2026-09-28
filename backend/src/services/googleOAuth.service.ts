import { createPublicKey, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

const authorizationEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const jwksEndpoint = "https://www.googleapis.com/oauth2/v3/certs";
let cachedKeys: Array<Record<string, unknown>> = [];
let keysExpireAt = 0;

export function googleOAuthConfigured() {
  return Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_REDIRECT_URI);
}

function requireGoogleConfig() {
  if (!googleOAuthConfigured()) throw new HttpError(503, "Google sign-in is not configured yet");
  return {
    clientId: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
    redirectUri: env.GOOGLE_REDIRECT_URI!
  };
}

export function googleAuthorizationUrl(state: string, nonce: string) {
  const { clientId, redirectUri } = requireGoogleConfig();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    prompt: "select_account"
  });
  return `${authorizationEndpoint}?${params.toString()}`;
}

async function googleKeys() {
  if (cachedKeys.length && Date.now() < keysExpireAt) return cachedKeys;
  const response = await fetch(jwksEndpoint, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new HttpError(502, "Google sign-in keys are unavailable");
  const body = await response.json() as { keys?: Array<Record<string, unknown>> };
  if (!Array.isArray(body.keys) || !body.keys.length) throw new HttpError(502, "Google sign-in keys are unavailable");
  const maxAge = Number(/max-age=(\d+)/.exec(response.headers.get("cache-control") || "")?.[1] || 3600);
  cachedKeys = body.keys;
  keysExpireAt = Date.now() + Math.min(Math.max(maxAge, 60), 21_600) * 1000;
  return cachedKeys;
}

export interface GoogleIdentity {
  sub: string;
  email: string;
  name: string;
}

export async function exchangeGoogleCode(code: string, expectedNonce: string): Promise<GoogleIdentity> {
  const { clientId, clientSecret, redirectUri } = requireGoogleConfig();
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code
    }),
    signal: AbortSignal.timeout(10_000)
  });
  if (!response.ok) throw new HttpError(401, "Google sign-in could not be completed");
  const token = await response.json() as { id_token?: unknown };
  if (typeof token.id_token !== "string") throw new HttpError(401, "Google identity was missing");
  const header = jwt.decode(token.id_token, { complete: true })?.header;
  if (!header || header.alg !== "RS256" || typeof header.kid !== "string") throw new HttpError(401, "Invalid Google identity");
  const key = (await googleKeys()).find((candidate) => candidate.kid === header.kid && candidate.kty === "RSA" && candidate.use === "sig");
  if (!key) throw new HttpError(401, "Google identity key was not found");
  let claims: jwt.JwtPayload;
  try {
    const publicKey = createPublicKey({ key: key as any, format: "jwk" });
    claims = jwt.verify(token.id_token, publicKey, {
      algorithms: ["RS256"],
      audience: clientId,
      issuer: ["accounts.google.com", "https://accounts.google.com"]
    }) as jwt.JwtPayload;
  } catch {
    throw new HttpError(401, "Google identity could not be verified");
  }
  if (typeof claims.nonce !== "string" || claims.nonce.length !== expectedNonce.length ||
    !timingSafeEqual(Buffer.from(claims.nonce), Buffer.from(expectedNonce)) ||
    typeof claims.sub !== "string" || !claims.sub || claims.sub.length > 255 ||
    typeof claims.email !== "string" || claims.email.length > 320 || claims.email_verified !== true) {
    throw new HttpError(401, "Google identity could not be verified");
  }
  const email = claims.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(401, "Google email was invalid");
  return {
    sub: claims.sub,
    email,
    name: typeof claims.name === "string" ? claims.name.slice(0, 100) : ""
  };
}
