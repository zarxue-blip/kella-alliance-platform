import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import jwt from "jsonwebtoken";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/kingdom-signup-test",
  JWT_SECRET: "kingdom-signup-test-secret-123456789",
  DISCORD_CLIENT_ID: "test-discord-client",
  DISCORD_CLIENT_SECRET: "test-discord-secret",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/discord/callback",
  GOOGLE_CLIENT_ID: "test-google-client",
  GOOGLE_CLIENT_SECRET: "test-google-secret",
  GOOGLE_REDIRECT_URI: "http://127.0.0.1/google/callback",
  BOT_API_TOKEN: "kingdom-test-service-token",
  DASHBOARD_ADMIN_DISCORD_IDS: "123456789012345678",
  KOFI_VERIFICATION_TOKEN: "kingdom-signup-test-kofi-secret",
  KELLA_LOCKDOWN: "false"
});

const { UserModel } = await import("../src/models/user.model.js");
const { AllianceModel } = await import("../src/models/alliance.model.js");
const { KofiPaymentModel } = await import("../src/models/kofiPayment.model.js");
const { createApp } = await import("../src/app.js");
const { env } = await import("../src/config/env.js");
const { signSessionToken } = await import("../src/middleware/auth.js");
const {
  createGoogleOAuthState,
  googleOAuthStateCookie,
  googleSignupCookie,
  signGoogleSignupIdentity,
  verifyGoogleOAuthState,
  verifyGoogleSignupIdentity
} = await import("../src/services/oauthState.service.js");

const ownAlliance = "aaaaaaaaaaaaaaaaaaaaaaaa";
const otherAlliance = "bbbbbbbbbbbbbbbbbbbbbbbb";
const adminId = "111111111111111111111111";
const memberId = "222222222222222222222222";
let nextUserId = 3;
const users: any[] = [
  {
    _id: adminId, allianceId: ownAlliance, discordId: "123456789012345678",
    username: "Kella admin", role: "R4 Officer", discordRoleIds: [],
    privateSiteAccess: true, disabled: false
  },
  {
    _id: memberId, allianceId: ownAlliance, discordId: "234567890123456789",
    username: "Kella member", role: "Member", discordRoleIds: [],
    privateSiteAccess: true, disabled: false
  },
  {
    _id: "999999999999999999999999", allianceId: otherAlliance,
    discordId: "google:other-alliance", googleSub: "other-alliance",
    username: "Other alliance", inGameUsername: "Other alliance",
    email: "other@example.com", googleApprovalStatus: "pending",
    role: "Member", discordRoleIds: [], privateSiteAccess: false,
    disabled: true, createdAt: new Date("2026-01-01T00:00:00Z")
  }
];

function matches(user: any, filter: any) {
  return Object.entries(filter).every(([key, expected]) => {
    if (expected && typeof expected === "object" && "$exists" in expected) {
      return (user[key] !== undefined) === (expected as any).$exists;
    }
    return String(user[key]) === String(expected);
  });
}

(AllianceModel as any).findOneAndUpdate = async (_filter: any, _update: any, options: any) => {
  assert.equal(options.upsert, true);
  return { _id: ownAlliance };
};
(UserModel as any).findById = (id: string) => {
  const query: any = Promise.resolve(users.find((user) => String(user._id) === String(id)) || null);
  query.select = query.lean = () => query;
  return query;
};
(KofiPaymentModel as any).find = () => ({sort() {return this;},limit() {return this;},lean:async()=>[]});
(KofiPaymentModel as any).findOne = () => ({sort() {return this;},lean:async()=>null});
(UserModel as any).findOne = async (filter: any) => users.find((user) => matches(user, filter)) || null;
(UserModel as any).create = async (input: any) => {
  assert.equal(input.googleApprovalStatus, "pending");
  const user = {
    ...input,
    _id: String(nextUserId++).padStart(24, "0"),
    createdAt: new Date("2026-02-01T00:00:00Z"),
    baseLayout: null
  };
  users.push(user);
  return user;
};
(UserModel as any).updateOne = async (filter: any, update: any) => {
  const user = users.find((candidate) => matches(candidate, filter));
  if (user) Object.assign(user, update.$set);
  return { matchedCount: user ? 1 : 0 };
};
(UserModel as any).find = (filter: any) => ({
  select(_fields: string) { return this; },
  sort(_order: any) { return this; },
  lean: async () => users.filter((user) => matches(user, filter))
});
(UserModel as any).findOneAndUpdate = (filter: any, update: any, options: any) => ({
  lean: async () => {
    assert.equal(options.runValidators, true);
    const user = users.find((candidate) => matches(candidate, filter));
    if (!user) return null;
    Object.assign(user, update.$set);
    return user;
  }
});

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "kingdom-test-key", use: "sig" };
const identities = new Map<string, { sub: string; email: string; name: string; nonce: string; verified?: boolean }>();
let googleExchanges = 0;
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input);
  if (url === "https://oauth2.googleapis.com/token") {
    googleExchanges++;
    const body = new URLSearchParams(init?.body);
    assert.equal(body.get("client_id"), env.GOOGLE_CLIENT_ID);
    assert.equal(body.get("redirect_uri"), env.GOOGLE_REDIRECT_URI);
    const identity = identities.get(body.get("code") || "");
    assert.ok(identity, "unexpected Google authorization code");
    const id_token = jwt.sign({
      sub: identity.sub, email: identity.email, name: identity.name,
      email_verified: identity.verified !== false, nonce: identity.nonce
    }, privateKey, {
      algorithm: "RS256", keyid: "kingdom-test-key", audience: env.GOOGLE_CLIENT_ID,
      issuer: "https://accounts.google.com", expiresIn: "10m"
    });
    return Response.json({ id_token });
  }
  if (url === "https://www.googleapis.com/oauth2/v3/certs") {
    return Response.json({ keys: [jwk] }, { headers: { "cache-control": "max-age=3600" } });
  }
  if (url.startsWith("https://")) throw new Error(`Unexpected external request: ${url}`);
  return originalFetch(input, init);
}) as typeof fetch;

const server = createApp().listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const base = `http://127.0.0.1:${(server.address() as any).port}`;
const sessionCookie = (user: any) => `${env.SESSION_COOKIE_NAME}=${signSessionToken({
  id: String(user._id), discordId: user.discordId, role: user.role,
  allianceId: String(user.allianceId), privateSiteAccess: user.privateSiteAccess
})}`;
const cookieFrom = (response: Response, name: string) => {
  const match = new RegExp(`(?:^|[, ]+)${name}=([^;]+)`).exec(response.headers.get("set-cookie") || "");
  assert.ok(match, `${name} cookie missing`);
  return `${name}=${match[1]}`;
};

async function beginGoogle(code: string, identity: Omit<NonNullable<ReturnType<typeof identities.get>>, "nonce">, inGameUsername?: string) {
  const response = await fetch(base + (inGameUsername === undefined ? "/api/auth/google" : "/api/auth/google/signup"), {
    method: inGameUsername === undefined ? "GET" : "POST",
    headers: inGameUsername === undefined ? undefined : { "content-type": "application/json" },
    body: inGameUsername === undefined ? undefined : JSON.stringify({ inGameUsername }),
    redirect: "manual"
  });
  assert.equal(response.status, 302);
  const location = new URL(response.headers.get("location")!);
  assert.equal(location.hostname, "accounts.google.com");
  assert.equal(location.searchParams.get("scope"), "openid email profile");
  const state = location.searchParams.get("state")!;
  const nonce = location.searchParams.get("nonce")!;
  const stateCookie = cookieFrom(response, googleOAuthStateCookie);
  identities.set(code, { ...identity, nonce });
  return { state, nonce, stateCookie };
}

async function callback(code: string, login: Awaited<ReturnType<typeof beginGoogle>>) {
  return fetch(base + `/api/auth/google/callback?code=${encodeURIComponent(code)}&state=${login.state}`, {
    headers: { cookie: login.stateCookie }, redirect: "manual"
  });
}

try {
  const state = createGoogleOAuthState("First Name");
  assert.deepEqual(verifyGoogleOAuthState(state.state, state.cookie), {
    nonce: state.nonce, inGameUsername: "First Name"
  });
  assert.equal(verifyGoogleOAuthState(state.state, undefined), null);
  assert.equal(verifyGoogleOAuthState("0".repeat(48), state.cookie), null);
  assert.equal(verifyGoogleOAuthState(state.state, state.cookie + "tampered"), null);
  const expiredState = jwt.sign({ purpose: "google-oauth", state: state.state, nonce: state.nonce, inGameUsername: "First Name" }, env.JWT_SECRET,
    { expiresIn: -1, audience: "kella-google-login" });
  assert.equal(verifyGoogleOAuthState(state.state, expiredState), null);
  const signupIdentity = { sub: "signed-user", email: "signed@example.com", name: "Signed user" };
  const signupToken = signGoogleSignupIdentity(signupIdentity);
  assert.deepEqual(verifyGoogleSignupIdentity(signupToken), signupIdentity);
  assert.equal(verifyGoogleSignupIdentity(signupToken + "tampered"), null);
  assert.equal(verifyGoogleSignupIdentity(state.cookie), null, "OAuth state must not be accepted as a signup identity");

  let response = await fetch(base + "/api/auth/google/signup", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ inGameUsername: "<script>" }), redirect: "manual"
  });
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("set-cookie"), null);

  const pendingLogin = await beginGoogle("new-user", {
    sub: "google-user", email: "Player@Example.com", name: "Google Player"
  }, "  Player   One  ");
  const exchangesBeforeInvalidState = googleExchanges;
  response = await fetch(base + `/api/auth/google/callback?code=new-user&state=${"0".repeat(48)}`, {
    headers: { cookie: pendingLogin.stateCookie }, redirect: "manual"
  });
  assert.equal(response.headers.get("location"), "/kingdom/access?status=expired");
  assert.equal(googleExchanges, exchangesBeforeInvalidState, "invalid state must stop before token exchange");
  response = await fetch(base + `/api/auth/google/callback?code=new-user&state=${pendingLogin.state}`, {
    redirect: "manual"
  });
  assert.equal(response.headers.get("location"), "/kingdom/access?status=expired");
  assert.equal(googleExchanges, exchangesBeforeInvalidState, "missing state cookie must stop before token exchange");
  response = await callback("new-user", pendingLogin);
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "/kingdom/payment");
  assert.doesNotMatch(response.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=[^;,\\s]+`));
  const pendingPaymentCookie = cookieFrom(response, "kella_payment_identity");
  response = await fetch(base + "/api/auth/kofi/status", { headers: { cookie: pendingPaymentCookie } });
  assert.deepEqual(await response.json(), { status: "payment-required" });
  assert.equal(response.headers.get("set-cookie"), null, "payment polling must not create a session");
  assert.equal((await fetch(base + "/base", { headers: { cookie: pendingPaymentCookie } })).status, 401);
  const pendingPage = await (await fetch(base + "/kingdom/access?status=pending")).text();
  assert.match(pendingPage, /https:\/\/ko-fi\.com\/exuz19\/tiers/);
  assert.match(pendingPage, /Join Forest Guardian · \$5\/month/);
  assert.match(pendingPage, /Wait for admin approval for regular access/);
  assert.doesNotMatch(await (await fetch(base + "/kingdom/access")).text(), /https:\/\/ko-fi\.com\/exuz19\/tiers/);
  const applicant = users.find((user) => user.googleSub === "google-user");
  assert.ok(applicant);
  assert.equal(applicant.inGameUsername, "Player One");
  assert.equal(applicant.email, "player@example.com");
  assert.equal(applicant.googleApprovalStatus, "pending");
  assert.equal(applicant.kofiPaymentRequired,true);
  assert.equal(applicant.privateSiteAccess, false);
  assert.equal(applicant.disabled, true);
  assert.equal(applicant.allianceId, ownAlliance);
  assert.equal(users.filter((user) => user.googleSub === "google-user").length, 1);

  const wrongNonce = await beginGoogle("wrong-nonce", {
    sub: "wrong-nonce", email: "wrong-nonce@example.com", name: "Wrong nonce"
  }, "Wrong Nonce");
  identities.get("wrong-nonce")!.nonce = "0".repeat(48);
  response = await callback("wrong-nonce", wrongNonce);
  assert.equal(response.status, 401);
  assert.equal(users.some((user) => user.googleSub === "wrong-nonce"), false);
  const unverified = await beginGoogle("unverified", {
    sub: "unverified", email: "unverified@example.com", name: "Unverified", verified: false
  }, "Unverified");
  response = await callback("unverified", unverified);
  assert.equal(response.status, 401);
  assert.equal(users.some((user) => user.googleSub === "unverified"), false);

  const pendingAgain = await beginGoogle("pending-again", {
    sub: "google-user", email: "new@example.com", name: "Google Player"
  }, "Player Two");
  response = await callback("pending-again", pendingAgain);
  assert.equal(response.headers.get("location"), "/kingdom/payment");
  assert.equal(applicant.inGameUsername, "Player Two");
  assert.equal(users.filter((user) => user.googleSub === "google-user").length, 1);

  const completion = await beginGoogle("complete-user", {
    sub: "complete-user", email: "complete@example.com", name: "Completer"
  });
  response = await callback("complete-user", completion);
  assert.equal(response.headers.get("location"), "/kingdom/complete");
  const signupCookie = cookieFrom(response, googleSignupCookie);
  response = await fetch(base + "/kingdom/complete", { headers: { cookie: signupCookie } });
  assert.equal(response.status, 200);
  const completePage = await response.text();
  assert.match(completePage, /Join Forest Guardian · \$5\/month/);
  assert.match(completePage, /Regular access includes Members and Calendar after approval/);
  response = await fetch(base + "/api/auth/google/complete", {
    method: "POST", headers: { "content-type": "application/json", cookie: signupCookie },
    body: JSON.stringify({ inGameUsername: "x" }), redirect: "manual"
  });
  assert.equal(response.status, 400);
  assert.equal(users.some((user) => user.googleSub === "complete-user"), false);
  response = await fetch(base + "/api/auth/google/complete", {
    method: "POST", headers: { "content-type": "application/json", cookie: signupCookie },
    body: JSON.stringify({ inGameUsername: "Completer" }), redirect: "manual"
  });
  assert.equal(response.headers.get("location"), "/kingdom/payment");
  const completePaymentCookie = cookieFrom(response, "kella_payment_identity");
  const completer = users.find((user) => user.googleSub === "complete-user")!;
  assert.equal(completer.disabled, true);
  completer.kofiPaymentEmail = completer.email;
  completer.kofiPaidThrough = new Date(Date.now() + 86_400_000);
  assert.deepEqual(await (await fetch(base + "/api/auth/kofi/status", {
    headers: { cookie: completePaymentCookie }
  })).json(), { status: "approval-pending" }, "payment cannot bypass a still-pending signup");
  response = await fetch(base + "/api/auth/google/complete", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ inGameUsername: "Anonymous" }), redirect: "manual"
  });
  assert.equal(response.headers.get("location"), "/kingdom/access?status=expired");

  const signupsUrl = base + "/api/dashboard/kingdom-signups";
  assert.equal((await fetch(signupsUrl)).status, 401);
  assert.equal((await fetch(signupsUrl, { headers: { cookie: sessionCookie(users[1]) } })).status, 403);
  assert.equal((await fetch(base + "/kingdom/admin", { headers: { cookie: sessionCookie(users[1]) } })).status, 403);
  response = await fetch(signupsUrl, { headers: { cookie: sessionCookie(users[0]) } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control") || "", /no-store/);
  const listed = (await response.json() as any).members;
  assert.deepEqual(listed.map((user: any) => user.inGameUsername).sort(), ["Completer", "Player Two"]);
  assert.equal(listed.some((user: any) => user.email === "other@example.com"), false);
  assert.equal((await fetch(base + "/kingdom/admin", { headers: { cookie: sessionCookie(users[0]) } })).status, 200);

  const reviewUrl = `${signupsUrl}/${applicant._id}`;
  const review = (url: string, status: string, cookie?: string) => fetch(url, {
    method: "PATCH", headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    body: JSON.stringify({ status })
  });
  assert.equal((await review(reviewUrl, "approved")).status, 401);
  assert.equal((await review(reviewUrl, "approved", sessionCookie(users[1]))).status, 403);
  assert.equal((await review(reviewUrl, "pending", sessionCookie(users[0]))).status, 400);
  assert.equal((await review(`${signupsUrl}/bad-id`, "approved", sessionCookie(users[0]))).status, 400);
  assert.equal((await review(`${signupsUrl}/999999999999999999999999`, "approved", sessionCookie(users[0]))).status, 404);
  assert.equal(users.find((user) => user.googleSub === "other-alliance")?.googleApprovalStatus, "pending");

  response = await review(reviewUrl, "approved", sessionCookie(users[0]));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { id: applicant._id, status: "approved" });
  assert.equal(applicant.privateSiteAccess, true);
  assert.equal(applicant.disabled, false);
  assert.equal(applicant.googleReviewedBy, adminId);
  assert.ok(applicant.googleReviewedAt instanceof Date);

  const approvedLogin = await beginGoogle("approved-user", {
    sub: "google-user", email: "approved@example.com", name: "Google Player"
  });
  applicant.kofiPaymentRequired = false;
  response = await callback("approved-user", approvedLogin);
  assert.equal(response.headers.get("location"), "/members","approved unpaid Google accounts enter with regular access");
  const regularCookie = cookieFrom(response, env.SESSION_COOKIE_NAME);
  assert.equal((await fetch(base + "/members", {headers:{cookie:regularCookie}})).status,200);
  assert.equal((await fetch(base + "/calendar", {headers:{cookie:regularCookie}})).status,200);
  const approvedPaymentCookie = pendingPaymentCookie;
  assert.deepEqual(await (await fetch(base + "/api/auth/kofi/status", {
    headers: { cookie: approvedPaymentCookie }
  })).json(), { status: "payment-required", canContinueRegular:true });
  assert.equal((await fetch(base + "/base",{headers:{cookie:sessionCookie(applicant)}})).status,403);
  applicant.kofiPaymentEmail = "approved@example.com";
  applicant.kofiPaidThrough = new Date(Date.now()+86_400_000);
  response = await fetch(base + "/api/auth/kofi/status", { headers: { cookie: approvedPaymentCookie } });
  assert.deepEqual(await response.json(), { status: "approved", redirectUrl: "/kingdom/payment" });
  assert.equal(response.headers.get("set-cookie"), null);
  response = await fetch(base + "/kingdom/payment", { headers: { cookie: approvedPaymentCookie }, redirect: "manual" });
  assert.equal(response.headers.get("location"), "/base");
  assert.match(response.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=`));
  const paidLogin = await beginGoogle("paid-user", {
    sub:"google-user",email:"approved@example.com",name:"Google Player"
  });
  response = await callback("paid-user",paidLogin);
  assert.equal(response.headers.get("location"), "/base");
  const approvedCookie = cookieFrom(response, env.SESSION_COOKIE_NAME);
  assert.equal(applicant.email, "approved@example.com");
  assert.ok(applicant.lastLoginAt instanceof Date);

  assert.equal((await fetch(base + "/base")).status, 401);
  assert.equal((await fetch(base + "/base", { headers: { cookie: sessionCookie(users.find((user) => user.googleSub === "complete-user")) } })).status, 401);
  assert.equal((await fetch(base + "/base", { headers: { cookie: approvedCookie } })).status, 200);
  assert.equal((await fetch(base + "/officer", { headers: { cookie: approvedCookie } })).status, 403);
  assert.equal((await fetch(base + "/api/dashboard/base-layout", { headers: { cookie: approvedCookie } })).status, 200);
  const layout = { version: 6, buildings: [{ id: "hub-1", type: "hub", x: 10, y: 20, level: 1 }], roads: [] };
  response = await fetch(base + "/api/dashboard/base-layout", {
    method: "PUT", headers: { "content-type": "application/json", cookie: approvedCookie },
    body: JSON.stringify({ data: layout })
  });
  assert.equal(response.status, 200);
  assert.deepEqual(applicant.baseLayout?.buildings, layout.buildings);
  assert.equal(users.find((user) => user.googleSub === "complete-user")?.baseLayout, null);
  response = await fetch(base + "/api/dashboard/base-layout", { headers: { cookie: sessionCookie(users[1]) } });
  assert.equal(response.status, 403,"regular accounts cannot fetch another member's VIP base layout");

  response = await review(reviewUrl, "terminated", sessionCookie(users[0]));
  assert.equal(response.status, 200);
  assert.equal(applicant.disabled, true);
  assert.equal(applicant.privateSiteAccess, false);
  assert.equal((await fetch(base + "/api/dashboard/base-layout", { headers: { cookie: approvedCookie } })).status, 401,
    "termination must invalidate an existing session");
  assert.equal((await fetch(base + "/base", { headers: { cookie: approvedCookie } })).status, 401);
  const terminatedLogin = await beginGoogle("terminated-user", {
    sub: "google-user", email: "terminated@example.com", name: "Google Player"
  }, "Attempted Rename");
  response = await callback("terminated-user", terminatedLogin);
  assert.equal(response.headers.get("location"), "/kingdom/access?status=terminated");
  assert.doesNotMatch(response.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=`));
  assert.equal(applicant.inGameUsername, "Player Two", "terminated applicants cannot change their signup");

  console.log("Kingdom signup: signed Google state and identity, pending/approved/terminated gates, admin review and alliance scope, and private per-user base access passed.");
} finally {
  process.env.KELLA_LOCKDOWN = "false";
  globalThis.fetch = originalFetch;
  server.close();
}
