import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import jwt from "jsonwebtoken";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/kofi-webhook-test",
  JWT_SECRET: "kofi-webhook-test-secret-123456789",
  DISCORD_CLIENT_ID: "test-discord-client",
  DISCORD_CLIENT_SECRET: "test-discord-secret",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/discord/callback",
  DISCORD_GUILD_ID: "",
  GOOGLE_CLIENT_ID: "test-google-client",
  GOOGLE_CLIENT_SECRET: "test-google-secret",
  GOOGLE_REDIRECT_URI: "http://127.0.0.1/google/callback",
  BOT_API_TOKEN: "kofi-test-service-token",
  DASHBOARD_ADMIN_DISCORD_IDS: "123456789012345678",
  KOFI_VERIFICATION_TOKEN: "kofi-test-secret-verification-token",
  KELLA_LOCKDOWN: "true"
});

const { UserModel } = await import("../src/models/user.model.js");
const { KofiPaymentModel } = await import("../src/models/kofiPayment.model.js");
const { AllianceModel } = await import("../src/models/alliance.model.js");
const { MemberModel } = await import("../src/models/member.model.js");
const { createApp } = await import("../src/app.js");
const { env } = await import("../src/config/env.js");
const { signSessionToken } = await import("../src/middleware/auth.js");
const { addPaymentMonth, assignKofiPayment, isCurrentKofiAccess } = await import("../src/services/kofiPayment.service.js");
const { googleOAuthStateCookie, oauthStateCookie } = await import("../src/services/oauthState.service.js");

const allianceId = "aaaaaaaaaaaaaaaaaaaaaaaa";
const adminId = "111111111111111111111111";
const users: any[] = [{
  _id: adminId, allianceId, discordId: "123456789012345678", username: "Admin",
  role: "R4 Officer", discordRoleIds: [], privateSiteAccess: true, disabled: false
}];
const payments: any[] = [];
let nextUserId = 2;

function matches(row: any, filter: any): boolean {
  return Object.entries(filter).every(([key, expected]) => {
    if (key === "$or") return (expected as any[]).some((item) => matches(row, item));
    if (expected && typeof expected === "object") {
      if ("$exists" in expected) return (row[key] !== undefined) === (expected as any).$exists;
      if ("$ne" in expected) return row[key] !== (expected as any).$ne;
      if ("$gt" in expected) return new Date(row[key]).getTime() > new Date((expected as any).$gt).getTime();
    }
    return String(row[key]) === String(expected);
  });
}

(AllianceModel as any).findOneAndUpdate = async () => ({ _id: allianceId });
(UserModel as any).findById = (id: string) => {
  const query: any = Promise.resolve(users.find((user) => String(user._id) === String(id)) || null);
  query.populate = query.lean = () => query;
  return query;
};
(UserModel as any).findOne = (filter: any) => {
  const query:any=Promise.resolve(users.find((user)=>matches(user,filter)) || null);
  query.lean=()=>query; return query;
};
(UserModel as any).countDocuments = async () => users.length;
(MemberModel as any).findOne = () => ({select(){return this;},lean:async()=>null});
(UserModel as any).find = (filter: any) => ({select() {return this;},sort() {return this;},
  lean:async()=>users.filter((user)=>matches(user,filter))});
(UserModel as any).create = async (input: any) => {
  const user = { ...input, _id: String(nextUserId++).padStart(24, "0"), baseLayout: null };
  users.push(user);
  return user;
};
(UserModel as any).updateOne = async (filter: any, update: any) => {
  const user = users.find((candidate) => matches(candidate, filter));
  if (user) {
    if (update.$set?.kofiPaymentEmail && users.some((other) => other !== user &&
      other.kofiPaymentRequired && other.kofiPaymentEmail === update.$set.kofiPaymentEmail)) {
      throw Object.assign(new Error("duplicate payer"), {code:11000});
    }
    Object.assign(user, update.$set || {});
    for (const [key, value] of Object.entries(update.$max || {})) {
      if (!user[key] || new Date(value as any).getTime() > new Date(user[key]).getTime()) user[key] = value;
    }
  }
  return { matchedCount: user ? 1 : 0 };
};
(UserModel as any).findOneAndUpdate = (filter: any, update: any,options:any) => {
  let user=users.find((candidate)=>matches(candidate,filter));
  if(!user && options?.upsert) {user={...filter,...update.$setOnInsert,_id:String(nextUserId++).padStart(24,"0")};users.push(user);}
  if(user) Object.assign(user,update.$set);
  const query:any=Promise.resolve(user || null);query.lean=()=>query;return query;
};

(KofiPaymentModel as any).findOneAndUpdate = async (filter: any, update: any) => {
  const existing = payments.find((payment) => matches(payment, filter));
  if (existing) {Object.assign(existing,update.$set);return {...existing};}
  if (!update.$setOnInsert) return null;
  if (payments.some((payment) => payment.messageId === update.$setOnInsert.messageId)) {
    throw Object.assign(new Error("duplicate message"), { code: 11000 });
  }
  const payment = { ...update.$setOnInsert, _id: String(payments.length+100).padStart(24,"0") };
  payments.push(payment);
  return payment;
};
(KofiPaymentModel as any).findById = async (id:string) => {
  const found=payments.find((payment)=>payment._id===id); return found?{...found}:null;
};
(KofiPaymentModel as any).updateOne = async (filter:any,update:any) => {
  const found=payments.find((payment)=>matches(payment,filter));
  if(found) for(const key of Object.keys(update.$unset || {})) delete found[key];
};
(KofiPaymentModel as any).find = (filter:any) => ({sort() {return this;},limit() {return this;},
  lean:async()=>payments.filter((payment)=>matches(payment,filter))});
(KofiPaymentModel as any).findOne = (filter: any) => {
  const found = payments.find((payment) => matches(payment, filter)) || null;
  return {
    sort() { return this; },
    lean: async () => found,
    then: (resolve: any, reject: any) => Promise.resolve(found).then(resolve, reject)
  };
};

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "kofi-test-key", use: "sig" };
const identities = new Map<string, { sub: string; email: string; nonce: string }>();
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input);
  if(url==="https://discord.com/api/oauth2/token") return Response.json({token_type:"Bearer",access_token:new URLSearchParams(init?.body).get("code")});
  if(url==="https://discord.com/api/users/@me") return Response.json({id:init.headers.authorization.split(" ")[1],username:"Discord Player"});
  if (url === "https://oauth2.googleapis.com/token") {
    const code = new URLSearchParams(init?.body).get("code") || "";
    const identity = identities.get(code);
    assert.ok(identity);
    const id_token = jwt.sign({ ...identity, email_verified: true }, privateKey, {
      algorithm: "RS256", keyid: "kofi-test-key", audience: env.GOOGLE_CLIENT_ID,
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

let message = 0;
function payment(overrides: Record<string, unknown> = {}) {
  const id = ++message;
  return {
    verification_token: env.KOFI_VERIFICATION_TOKEN,
    message_id: `message-${id}`,
    kofi_transaction_id: `transaction-${id}`,
    timestamp: new Date().toISOString(),
    type: "Subscription", is_subscription_payment: true,
    tier_name: "Forest Guardian", amount: "5.00", currency: "USD",
    email: "payer@example.com", ...overrides
  };
}
function postPayment(data: Record<string, unknown>) {
  return fetch(base + "/api/webhooks/kofi", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ data: JSON.stringify(data) })
  });
}
async function googleLogin(code: string, sub: string, email: string, username?: string) {
  const response = await fetch(base + (username ? "/api/auth/google/signup" : "/api/auth/google"), {
    method: username ? "POST" : "GET",
    headers: username ? { "content-type": "application/json" } : undefined,
    body: username ? JSON.stringify({ inGameUsername: username }) : undefined,
    redirect: "manual"
  });
  const location = new URL(response.headers.get("location")!);
  const nonce = location.searchParams.get("nonce")!;
  identities.set(code, { sub, email, nonce });
  const stateCookie = cookieFrom(response, googleOAuthStateCookie);
  return fetch(base + `/api/auth/google/callback?code=${code}&state=${location.searchParams.get("state")}`, {
    headers: { cookie: stateCookie }, redirect: "manual"
  });
}

try {
  assert.equal(addPaymentMonth(new Date("2026-01-31T12:00:00Z")).toISOString(), "2026-02-28T12:00:00.000Z");
  assert.equal((await postPayment(payment({ verification_token: "wrong" }))).status, 401);
  assert.equal(payments.length, 0);
  assert.equal((await fetch(base + "/api/webhooks/kofi", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payment())
  })).status, 415);
  for (const invalid of [
    { type: "Donation" }, { amount: "2.00" }, { tier_name: "Other Tier" },
    { currency: "EUR" }, { is_subscription_payment: false }
  ]) assert.equal((await postPayment(payment(invalid))).status, 200);
  assert.equal(payments.length, 0, "non-qualifying payments must not grant access");

  const first = payment({ email: "Payer@Example.com" });
  assert.equal((await postPayment(first)).status, 200, "payment must arrive through lockdown");
  assert.equal(payments.length, 1);
  assert.equal(payments[0].email, "payer@example.com");
  const firstPaidThrough = payments[0].paidThrough.getTime();
  assert.equal((await postPayment({ ...first, timestamp: new Date(Date.now() + 60_000).toISOString() })).status, 200);
  assert.equal((await postPayment({ ...first, message_id: "another-delivery" })).status, 200);
  assert.equal((await postPayment({ ...first, kofi_transaction_id: "another-transaction" })).status, 200);
  assert.equal(payments.length, 1);
  assert.equal(payments[0].paidThrough.getTime(), firstPaidThrough, "replay cannot move paid-through date");

  let response = await googleLogin("payer-signup", "payer-sub", "payer@example.com", "Payer IGN");
  assert.equal(response.headers.get("location"), "/base", "payment before registration should grant access");
  const payer = users.find((user) => user.googleSub === "payer-sub");
  assert.equal(payer.googleApprovalStatus, "approved");
  assert.equal(payer.googleApprovalSource, "kofi");
  assert.equal(payer.kofiPaymentEmail, "payer@example.com");
  const payerCookie = cookieFrom(response, env.SESSION_COOKIE_NAME);
  assert.equal((await fetch(base + "/api/auth/me", { headers: { cookie: payerCookie } })).status, 200);
  assert.equal((await fetch(base + "/base", { headers: { cookie: payerCookie } })).status, 200);

  response = await googleLogin("unpaid-signup", "unpaid-sub", "unpaid@example.com", "Unpaid IGN");
  assert.equal(response.headers.get("location"), "/kingdom/payment");
  const pendingPage = await (await fetch(base + "/kingdom/access?status=pending")).text();
  assert.match(pendingPage, /Join Forest Guardian · \$5\/month/);
  assert.match(pendingPage, /same email as your Google account/);
  const unpaid = users.find((user) => user.googleSub === "unpaid-sub");
  assert.equal(unpaid.disabled, true);
  assert.equal((await postPayment(payment({ email: "different@example.com" }))).status, 200);
  assert.equal(unpaid.googleApprovalStatus, "pending", "a different payer email must not approve signup");
  assert.equal((await postPayment(payment({ email: "UNPAID@EXAMPLE.COM" }))).status, 200);
  assert.equal(unpaid.googleApprovalStatus, "approved");
  assert.equal(unpaid.googleApprovalSource, "kofi");

  payer.kofiPaidThrough = new Date(Date.now() - 1000);
  assert.equal((await fetch(base + "/api/auth/me", { headers: { cookie: payerCookie } })).status, 401,
    "an existing session must expire with payment");
  assert.equal((await fetch(base + "/base", { headers: { cookie: payerCookie } })).status, 401);
  assert.equal((await postPayment(payment({ email: "PAYER@example.com" }))).status, 200);
  assert.ok(payer.kofiPaidThrough.getTime() > Date.now(), "renewal should restore access");
  assert.equal((await fetch(base + "/api/auth/me", { headers: { cookie: payerCookie } })).status, 200);

  response = await googleLogin("changed-email", "payer-sub", "changed@example.com");
  assert.equal(response.headers.get("location"), "/base");
  assert.equal(payer.kofiPaymentEmail,"payer@example.com","a changed Google email must not replace the established payer binding");

  const adminCookie = sessionCookie(users[0]);
  response = await fetch(base + `/api/dashboard/kingdom-signups/${unpaid._id}`, {
    method: "PATCH", headers: { "content-type": "application/json", cookie: adminCookie },
    body: JSON.stringify({ status: "approved" })
  });
  assert.equal(response.status, 200);
  assert.equal(unpaid.googleApprovalSource, "admin");
  unpaid.kofiPaidThrough = new Date(Date.now() - 1000);
  assert.equal((await fetch(base + "/api/auth/me", { headers: { cookie: sessionCookie(unpaid) } })).status, 401,
    "manual approval must not bypass payment expiry");

  response = await fetch(base + `/api/dashboard/kingdom-signups/${unpaid._id}`, {
    method: "PATCH", headers: { "content-type": "application/json", cookie: adminCookie },
    body: JSON.stringify({ status: "terminated" })
  });
  assert.equal(response.status, 200);
  assert.equal((await postPayment(payment({ email: "unpaid@example.com" }))).status, 200);
  assert.equal(unpaid.googleApprovalStatus, "terminated", "payment must not override admin termination");

  const local:any={_id:"888888888888888888888888",allianceId,discordId:"local:test",
    username:"Local",role:"Member",localApprovalStatus:"approved",disabled:false,privateSiteAccess:true};
  users.push(local);
  assert.equal(isCurrentKofiAccess(local),false,"existing approved local signup also needs payment");
  await assert.rejects(assignKofiPayment(payments[0]._id,local._id),/already linked/,
    "one verified payment cannot unlock two accounts");
  const localData=payment({email:"local@example.com"});
  assert.equal((await postPayment(localData)).status,200);
  assert.equal(isCurrentKofiAccess(local),false,"unverified email does not auto-link a local user");
  const localPayment=payments.find((item)=>item.transactionId===localData.kofi_transaction_id);
  await assignKofiPayment(localPayment._id,local._id);
  assert.equal(isCurrentKofiAccess(local),true);
  local.kofiPaidThrough=new Date(Date.now()-1000);
  assert.equal((await postPayment(payment({email:"local@example.com"}))).status,200);
  assert.equal(isCurrentKofiAccess(local),true,"renewal follows the verified local binding");
  const second:any={...local,_id:"777777777777777777777777",discordId:"different",kofiPaymentEmail:undefined,kofiPaidThrough:undefined,kofiPaymentRequired:true};
  users.push(second);
  const duplicateEmail=payment({email:"local@example.com"});
  assert.equal((await postPayment(duplicateEmail)).status,200);
  const duplicatePayment=payments.find((item)=>item.transactionId===duplicateEmail.kofi_transaction_id);
  await assert.rejects(assignKofiPayment(duplicatePayment._id,second._id),/already linked/);
  assert.equal(isCurrentKofiAccess(second),false);
  assert.equal(isCurrentKofiAccess(users[0]),true,"established Discord owner keeps access");
  const discordLogin = async(id:string)=>{
    const start=await fetch(base+"/api/auth/discord",{redirect:"manual"});
    const state=new URL(start.headers.get("location")!).searchParams.get("state");
    return fetch(base+`/api/auth/discord/callback?code=${id}&state=${state}`,{
      headers:{cookie:cookieFrom(start,oauthStateCookie)},redirect:"manual"});
  };
  response=await discordLogin("987654321098765432");
  assert.equal(response.headers.get("location"),"/kingdom/payment");
  const newDiscord=users.find(user=>user.discordId==="987654321098765432");
  assert.equal(newDiscord.kofiPaymentRequired,true);
  assert.equal((await fetch(base+"/api/auth/me",{headers:{cookie:sessionCookie(newDiscord)}})).status,401);
  response=await discordLogin(users[0].discordId);
  assert.match(response.headers.get("set-cookie") || "",new RegExp(`${env.SESSION_COOKIE_NAME}=`),"legacy Discord login remains available");

  console.log("Ko-fi: verified $5 payments, replay safety, account binding, expiry/renewal, manual approval payment gate and termination passed.");
} finally {
  process.env.KELLA_LOCKDOWN = "false";
  globalThis.fetch = originalFetch;
  server.close();
}
