import assert from "node:assert/strict";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/local-signup-test",
  JWT_SECRET: "local-signup-test-secret-123456789",
  DISCORD_CLIENT_ID: "test-discord-client",
  DISCORD_CLIENT_SECRET: "test-discord-secret",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/discord/callback",
  BOT_API_TOKEN: "local-signup-test-service-token",
  DASHBOARD_ADMIN_DISCORD_IDS: "123456789012345678",
  KELLA_LOCKDOWN: "false"
});

const { UserModel } = await import("../src/models/user.model.js");
const { AllianceModel } = await import("../src/models/alliance.model.js");
const { KofiPaymentModel } = await import("../src/models/kofiPayment.model.js");
const { createApp } = await import("../src/app.js");
const { env } = await import("../src/config/env.js");
const { signSessionToken } = await import("../src/middleware/auth.js");

const allianceId = "aaaaaaaaaaaaaaaaaaaaaaaa";
const admin = {
  _id: "111111111111111111111111", allianceId, discordId: "123456789012345678",
  username: "Admin", role: "R4 Officer", discordRoleIds: [], privateSiteAccess: true, disabled: false
};
const member = {
  _id: "222222222222222222222222", allianceId, discordId: "234567890123456789",
  username: "Member", role: "Member", discordRoleIds: [], privateSiteAccess: true, disabled: false
};
const users: any[] = [admin, member];
let nextUserId = 3;

function matches(user: any, filter: Record<string, any>) {
  return Object.entries(filter).every(([key, value]) => {
    if (key === "$or") return value.some((part: any) => matches(user, part));
    if (value && typeof value === "object" && "$ne" in value) return user[key] !== value.$ne;
    if (value && typeof value === "object" && "$exists" in value) {
      return (user[key] !== undefined) === value.$exists;
    }
    return String(user[key]) === String(value);
  });
}

(AllianceModel as any).findOneAndUpdate = async () => ({ _id: allianceId });
(UserModel as any).exists = async (filter: any) => users.some((user) => matches(user, filter));
(UserModel as any).create = async (input: any) => {
  const user = {
    ...input, _id: String(nextUserId++).padStart(24, "0"), createdAt: new Date("2026-09-30T00:00:00Z")
  };
  users.push(user);
  return user;
};
(UserModel as any).findOne = (filter: any) => {
  const query: any = Promise.resolve(users.find((user) => matches(user, filter)) || null);
  query.select = () => query;
  return query;
};
(UserModel as any).findById = (id: string) => {
  const query: any = Promise.resolve(users.find((user) => String(user._id) === String(id)) || null);
  query.select = query.populate = query.lean = () => query;
  return query;
};
(UserModel as any).updateOne = async (filter: any, update: any) => {
  const user = users.find((candidate) => matches(candidate, filter));
  if (user) Object.assign(user, update.$set, update.$max);
  return { matchedCount: user ? 1 : 0 };
};
(UserModel as any).find = (filter: any) => ({
  select() { return this; },
  sort() { return this; },
  lean: async () => users.filter((user) => matches(user, filter))
});
const verifiedPayment: any = { _id: "444444444444444444444444", email: "payer@example.com",
  amountCents: 500, tierName: "Forest Guardian", transactionId: "receipt-id",
  paidAt: new Date(), paidThrough: new Date(Date.now()+86_400_000) };
(KofiPaymentModel as any).find = () => ({sort() {return this;},limit() {return this;},lean:async()=>[verifiedPayment]});
(KofiPaymentModel as any).findById = async (id: string) => id === verifiedPayment._id ? {...verifiedPayment} : null;
(KofiPaymentModel as any).findOneAndUpdate = async (filter: any, update: any) => {
  if (!matches(verifiedPayment, filter)) return null;
  Object.assign(verifiedPayment,update.$set); return verifiedPayment;
};
(UserModel as any).findOneAndUpdate = (filter: any, update: any) => ({
  lean: async () => {
    const user = users.find((candidate) => matches(candidate, filter));
    if (!user) return null;
    Object.assign(user, update.$set);
    return user;
  }
});

const server = createApp().listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const base = `http://127.0.0.1:${(server.address() as any).port}`;
const sessionCookie = (user: any) => `${env.SESSION_COOKIE_NAME}=${signSessionToken({
  id: String(user._id), discordId: user.discordId, role: user.role,
  allianceId: String(user.allianceId), privateSiteAccess: user.privateSiteAccess
})}`;
const jsonHeaders = { "content-type": "application/json" };
const post = (path: string, body: unknown) => fetch(base + path, {
  method: "POST", headers: jsonHeaders, body: JSON.stringify(body), redirect: "manual"
});

try {
  let response = await fetch(base + "/kingdom/access");
  let page = await response.text();
  assert.match(page, /<details class="kingdom-signup"/);
  assert.doesNotMatch(page, /<details class="kingdom-signup" open/);
  assert.match(page, /action="\/api\/auth\/local\/login"/);
  assert.match(page, /Payment is required even if an admin approves you/);
  assert.match(page, /href="\/privacy"/);
  response = await fetch(base + "/api/auth/kofi/status");
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { status: "expired", redirectUrl: "/kingdom/access?status=expired" });
  assert.equal((await post("/api/auth/kofi/claim", { paymentEmail: "payer@example.com" })).status, 401);
  response = await fetch(base + "/privacy");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Google sign-in gives us your Google account identifier/);
  response = await fetch(base + "/terms");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /independent community site/);

  response = await post("/api/auth/local/signup", { username: "Forest Lord", lordId: "bad", password: "strong-password-123" });
  assert.equal(response.status, 400);
  response = await fetch(base + "/api/auth/local/signup", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: "Moss Walker", lordId: "45678", password: "strong-password-123" }),
    redirect: "manual"
  });
  assert.equal(response.status, 303, "the normal HTML form must reach the payment step");
  assert.equal(response.headers.get("location"), "/kingdom/payment");
  const formCookie = /kella_payment_identity=([^;]+)/.exec(response.headers.get("set-cookie") || "")![0];
  assert.doesNotMatch(response.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=[^;,\\s]+`));
  assert.deepEqual(await (await fetch(base + "/api/auth/kofi/status", { headers: { cookie: formCookie } })).json(),
    { status: "payment-required" });
  assert.equal((await fetch(base + "/base", { headers: { cookie: formCookie } })).status, 401);
  const formApplicant = users.at(-1)!;
  response = await post("/api/auth/local/signup", { username: "Forest Lord", lordId: "12345", password: "strong-password-123" });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { status: "payment-required", redirectUrl: "/kingdom/payment" });
  const pendingCookie = /kella_payment_identity=([^;]+)/.exec(response.headers.get("set-cookie") || "")![0];
  response = await fetch(base + "/api/auth/kofi/status", { headers: { cookie: pendingCookie } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "payment-required" });
  assert.equal(response.headers.get("set-cookie"), null, "polling must never issue a member session");
  const applicant = users.at(-1)!;
  assert.equal(applicant.localApprovalStatus, "pending");
  assert.equal(applicant.kofiPaymentRequired, true);
  response = await fetch(base + "/kingdom/payment", {headers:{cookie:pendingCookie}});
  assert.equal(response.status,200);
  const paymentPage = await response.text();
  assert.match(paymentPage, /<iframe title="Forest Guardian Ko-fi membership checkout"/);
  assert.match(paymentPage, /src="https:\/\/ko-fi\.com\/exuz19\/\?hidefeed=true&amp;widget=true&amp;embed=true/);
  assert.match(paymentPage, /\/assets\/kingdom-payment\.js/);
  assert.match(response.headers.get("content-security-policy") || "", /frame-src 'self' https:\/\/ko-fi\.com/);
  assert.equal((await fetch(base + "/base", {headers:{cookie:pendingCookie}})).status,401,
    "payment identity must not be a member session");
  response = await fetch(base + "/api/auth/kofi/claim", {method:"POST",headers:{...jsonHeaders,cookie:pendingCookie},
    body:JSON.stringify({paymentEmail:"payer@example.com",transactionId:"receipt-id",userId:admin._id})});
  assert.equal(response.status,202);
  assert.equal(applicant.kofiRequestedEmail,"payer@example.com");
  assert.equal(applicant.kofiPaidThrough,undefined,"receipt details alone never grant access");
  assert.deepEqual(await (await fetch(base + "/api/auth/kofi/status", { headers: { cookie: pendingCookie } })).json(),
    { status: "review-pending" });
  formApplicant.kofiPaymentEmail = "form@example.com";
  formApplicant.kofiPaidThrough = new Date(Date.now() + 86_400_000);
  assert.deepEqual(await (await fetch(base + "/api/auth/kofi/status", { headers: { cookie: formCookie } })).json(),
    { status: "approval-pending" }, "a paid but unapproved account still cannot enter");
  assert.equal(applicant.disabled, true);
  assert.equal(applicant.privateSiteAccess, false);
  assert.equal(applicant.memberId, undefined, "unverified Lord ID must not link roster data");
  assert.match(applicant.localPasswordHash, /^scrypt:/);
  assert.notEqual(applicant.localPasswordHash, "strong-password-123");
  response = await post("/api/auth/local/signup", { username: "Forest Lord", lordId: "12345", password: "strong-password-123" });
  assert.equal(response.status, 202, "resubmitting the same verified signup should resume payment");
  assert.deepEqual(await response.json(), { status: "payment-required", redirectUrl: "/kingdom/payment" });
  response = await post("/api/auth/local/signup", { username: "forest lord", lordId: "67890", password: "another-password-123" });
  assert.equal(response.status, 409);
  assert.equal(users.length, 4);

  response = await post("/api/auth/local/login", { username: "Unknown", password: "strong-password-123" });
  assert.equal(response.status, 401);
  response = await post("/api/auth/local/login", { username: "Forest Lord", password: "wrong-password" });
  assert.equal(response.status, 401);
  response = await post("/api/auth/local/login", { username: "FOREST LORD", password: "strong-password-123" });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { status: "payment-required", redirectUrl: "/kingdom/payment" });

  const signups = "/api/dashboard/kingdom-signups";
  assert.equal((await fetch(base + signups)).status, 401);
  assert.equal((await fetch(base + signups, { headers: { cookie: sessionCookie(member) } })).status, 403);
  response = await fetch(base + signups, { headers: { cookie: sessionCookie(admin) } });
  assert.equal(response.status, 200);
  const listing = await response.json() as any;
  assert.equal(listing.members.length, 2);
  assert.equal(listing.members.find((item: any) => item.id === applicant._id)?.provider, "local");
  assert.equal(listing.members.find((item: any) => item.id === applicant._id)?.lordId, "12345");
  assert.equal(JSON.stringify(listing).includes("strong-password-123"), false);
  assert.equal(JSON.stringify(listing).includes("localPasswordHash"), false);

  const review = (status: string, cookie: string) => fetch(base + `${signups}/${applicant._id}`, {
    method: "PATCH", headers: { ...jsonHeaders, cookie }, body: JSON.stringify({ status })
  });
  assert.equal((await review("approved", sessionCookie(member))).status, 403);
  response = await review("approved", sessionCookie(admin));
  assert.equal(response.status, 200);
  assert.equal(applicant.disabled, false);
  response = await post("/api/auth/local/login", { username: "forest lord", password: "strong-password-123" });
  assert.equal(response.status,403,"admin approval must not bypass required payment");
  const linkPayment = (cookie: string) => fetch(base + `${signups}/${applicant._id}/payment`, {
    method:"PATCH",headers:{...jsonHeaders,cookie},body:JSON.stringify({paymentId:verifiedPayment._id})});
  assert.equal((await linkPayment(sessionCookie(member))).status,403);
  assert.equal((await linkPayment(sessionCookie(admin))).status,200);
  response = await fetch(base + "/api/auth/kofi/status", { headers: { cookie: pendingCookie } });
  assert.deepEqual(await response.json(), { status: "approved", redirectUrl: "/kingdom/payment" });
  assert.equal(response.headers.get("set-cookie"), null, "status polling must not issue a login cookie");
  response = await fetch(base + "/kingdom/payment", { headers: { cookie: pendingCookie }, redirect: "manual" });
  assert.equal(response.headers.get("location"), "/base");
  assert.match(response.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=`),
    "only the confirmed payment page may establish a member session");
  response = await post("/api/auth/local/login", { username: "forest lord", password: "strong-password-123" });
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie") || "";
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=Lax/i);
  response = await fetch(base + "/base", { headers: { cookie } });
  assert.equal(response.status, 200);
  assert.equal((await fetch(base + signups, { headers: { cookie } })).status, 403);
  applicant.kofiPaidThrough = new Date(Date.now()-1000);
  assert.equal((await fetch(base + "/base", {headers:{cookie}})).status,401,"payment expiry revokes existing sessions");
  applicant.kofiPaidThrough = verifiedPayment.paidThrough;

  response = await review("terminated", sessionCookie(admin));
  assert.equal(response.status, 200);
  assert.equal((await fetch(base + "/base", { headers: { cookie } })).status, 401);
  response = await post("/api/auth/local/login", { username: "forest lord", password: "strong-password-123" });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { status: "terminated" });

  page = await (await fetch(base + "/kingdom/access?status=pending-local")).text();
  assert.match(page, /required Ko-fi membership step/);
  console.log("Local signup: validation, password hashing, pending approval, admin review, login, and termination passed.");
} finally {
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
