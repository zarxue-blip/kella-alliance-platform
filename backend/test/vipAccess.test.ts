import assert from "node:assert/strict";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/vip-access-test",
  JWT_SECRET: "vip-access-test-secret-123456789",
  DISCORD_CLIENT_ID: "test-discord-client",
  DISCORD_CLIENT_SECRET: "test-discord-secret",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/discord/callback",
  BOT_API_TOKEN: "vip-access-test-service-token",
  DASHBOARD_ADMIN_DISCORD_IDS: "",
  KELLA_LOCKDOWN: "false"
});

const { createApp } = await import("../src/app.js");
const { UserModel } = await import("../src/models/user.model.js");
const { MemberModel } = await import("../src/models/member.model.js");
const { EventModel } = await import("../src/models/event.model.js");
const { env } = await import("../src/config/env.js");
const { hasVipAccess, isValidMemberSession, memberLandingPath, signSessionToken } = await import("../src/middleware/auth.js");
const { beginPaymentAccess } = await import("../src/services/paymentAccess.service.js");

const allianceId = "aaaaaaaaaaaaaaaaaaaaaaaa";
const common = { role: "Member", allianceId, disabled: false, discordRoleIds: ["1485933229168005282"] };
const users: Record<string, any> = {
  regular: { ...common, _id: "regular", discordId: "regular-discord", privateSiteAccess: true },
  vip: { ...common, _id: "vip", discordId: "vip-discord", kofiPaymentRequired: true,
    kofiPaymentEmail: "vip@example.com", kofiPaidThrough: new Date(Date.now() + 86_400_000),
    baseLayout: { version: 6, buildings: [] }, commanderTools: { identity: { name: "VIP" } } },
  gift: { ...common, _id: "gift", discordId: "private-member:bbbbbbbbbbbbbbbbbbbbbbbb", privateSiteAccess: true },
  admin: { ...common, _id: "admin", discordId: "admin-discord", discordRoleIds: ["1522274495728062475"] },
  owner: { ...common, _id: "owner", discordId: "owner-discord", role: "Owner", discordRoleIds: [] },
  editor: { ...common, _id: "editor", discordId: "editor-discord", discordRoleIds: ["1529826271813570650"] },
  pending: { ...common, _id: "pending", discordId: "local:pending", localApprovalStatus: "pending", disabled: true },
  terminated: { ...common, _id: "terminated", discordId: "google:terminated", googleApprovalStatus: "terminated",
    disabled: true, kofiPaymentEmail: "terminated@example.com", kofiPaidThrough: new Date(Date.now() + 86_400_000) }
};

(UserModel as any).findById = (id: string) => {
  const query: any = Promise.resolve(users[id] || null);
  query.select = query.populate = query.lean = () => query;
  return query;
};
const queryRows = (rows: any[]) => ({
  select() { return this; }, sort() { return this; }, skip() { return this; }, limit() { return this; },
  lean: async () => rows
});
(MemberModel as any).find = (filter: any) => {
  assert.equal(filter.allianceId, allianceId);
  return queryRows([{ _id: "bbbbbbbbbbbbbbbbbbbbbbbb", ign: "A player", notes: "admin-only",
    discordUsername: "private-name", privateSiteAccess: true, privateAccessPath: "/access/private" }]);
};
(MemberModel as any).countDocuments = async () => 1;
(EventModel as any).find = (filter: any) => {
  assert.equal(filter.allianceId, allianceId);
  return queryRows([{ _id: "cccccccccccccccccccccccc", title: "Alliance event", rsvps: [{memberId:"private-response"}] }]);
};

const app = createApp();
// A test-only route produces the same limited upgrade cookie as signup, without
// exposing it to production or accepting a frontend owner ID.
app.get("/test/upgrade", (_req, res) => { beginPaymentAccess(res, users.regular); res.sendStatus(204); });
const server = app.listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const base = `http://127.0.0.1:${(server.address() as any).port}`;
const headers = (id: string, extra: Record<string, unknown> = {}) => ({ cookie: `${env.SESSION_COOKIE_NAME}=${signSessionToken({
  id, discordId: users[id].discordId, role: users[id].role, allianceId, ...extra
})}` });

try {
  for (const path of ["/", "/terms", "/privacy", "/billing", "/cookies"]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, `public page ${path}`);
    if (path !== "/") {
      const page = await response.text();
      for (const policy of ["/terms", "/privacy", "/billing", "/cookies"]) assert.match(page, new RegExp(`href="${policy}"`));
      assert.match(page, /October 1, 2026/);
    }
  }
  assert.equal(isValidMemberSession(users.regular), true);
  assert.equal(hasVipAccess(users.regular), false, "legacy privateSiteAccess alone is not VIP");
  assert.equal(memberLandingPath(users.regular), "/members");
  for (const id of ["vip", "gift", "admin", "owner"]) {
    assert.equal(hasVipAccess(users[id]), true, `${id} has VIP access`);
    assert.equal(memberLandingPath(users[id]), "/base");
    assert.equal((await fetch(base + "/base", {headers:headers(id)})).status, 200);
  }
  for (const path of ["/members", "/calendar"]) {
    assert.equal((await fetch(base + path)).status, 401);
    assert.equal((await fetch(base + path, {headers:headers("regular")})).status, 200);
  }
  const regularPages = ["/base", "/hospital", "/profile", "/wiki", "/wiki/sample", "/rankings", "/research",
    "/training-tools", "/lord-tools", "/attendance", "/attendance/cccccccccccccccccccccccc"];
  for (const path of regularPages) {
    const response = await fetch(base + path, {headers:headers("regular")});
    assert.equal(response.status, 403, `regular must not access ${path}`);
    assert.match(await response.text(), /Guardian/);
  }
  for (const path of ["/api/dashboard/commander", "/api/dashboard/base-layout", "/api/dashboard/profile",
    "/api/dashboard/my-attendance", "/api/dashboard/polls", "/api/dashboard/wiki", "/api/attendance",
    "/api/analytics", "/api/announcements", "/api/operations", "/api/diplomacy", "/api/shields", "/api/tasks", "/api/settings", "/api/recruitment"]) {
    const response = await fetch(base + path, {headers:headers("regular")});
    assert.equal(response.status, 403, `regular API lock ${path}`);
  }
  for (const [method, path] of [["PUT", "/api/dashboard/commander"], ["PUT", "/api/dashboard/base-layout"],
    ["PATCH", "/api/dashboard/profile"], ["POST", "/api/events/cccccccccccccccccccccccc/rsvp"],
    ["POST", "/api/members"], ["PATCH", "/api/members/bbbbbbbbbbbbbbbbbbbbbbbb"], ["GET", "/api/members/export.csv"]]) {
    assert.equal((await fetch(base + path, {method,headers:{...headers("regular"),"content-type":"application/json"},
      ...(method === "GET" ? {} : {body:"{}"})})).status, 403, `regular read-only: ${method} ${path}`);
  }
  const roster = await (await fetch(base + "/api/members", {headers:headers("regular")})).json();
  assert.equal(roster.members[0].ign, "A player");
  for (const field of ["notes", "discordUsername", "privateSiteAccess", "privateAccessPath"]) {
    assert.equal(field in roster.members[0], false, `member read hides ${field}`);
  }
  const events = await (await fetch(base + "/api/events", {headers:headers("regular")})).json();
  assert.equal(events.events[0].title, "Alliance event");
  assert.equal("rsvps" in events.events[0], false, "regular calendar does not expose attendance responses");

  const forged = headers("regular", { hasVipAccess: true, role: "Owner", discordRoleIds: ["1522274495728062475"], privateSiteAccess: true });
  assert.equal((await fetch(base + "/api/dashboard/commander", {headers:forged})).status, 403, "VIP is recomputed from DB, not token fields");
  assert.equal((await fetch(base + "/api/dashboard/access", {headers:forged})).status, 403, "admin roles are recomputed from DB");
  const current = await (await fetch(base + "/api/auth/me", {headers:forged})).json();
  assert.equal(current.hasVipAccess, false);
  assert.equal(current.isDashboardAdmin, false);
  assert.equal(current.user.role, "Member");

  const staleVip = headers("vip", {hasVipAccess:true});
  assert.equal((await fetch(base + "/api/dashboard/commander", {headers:staleVip})).status, 200);
  users.vip.kofiPaidThrough = new Date(Date.now() - 1000);
  assert.equal((await fetch(base + "/api/dashboard/commander", {headers:staleVip})).status, 403, "old JWT cannot retain expired VIP");
  assert.equal((await fetch(base + "/api/auth/me", {headers:staleVip})).status, 200, "expired VIP falls back to regular session");
  assert.equal((await fetch(base + "/calendar", {headers:staleVip})).status, 200);
  users.vip.kofiPaidThrough = new Date(Date.now() + 86_400_000);
  assert.equal((await fetch(base + "/api/dashboard/commander", {headers:staleVip})).status, 200, "renewal restores VIP without a new JWT");
  for (const id of ["vip", "gift"]) {
    assert.equal((await fetch(base + "/officer", {headers:headers(id)})).status, 403);
    assert.equal((await fetch(base + "/api/dashboard/access", {headers:headers(id)})).status, 403, `${id} is not admin`);
  }
  assert.equal((await fetch(base + "/api/dashboard/access", {headers:headers("admin")})).status, 200);
  for (const id of ["pending", "terminated"]) {
    assert.equal(hasVipAccess(users[id]), false);
    assert.equal((await fetch(base + "/members", {headers:headers(id)})).status, 401);
    assert.equal((await fetch(base + "/api/dashboard/commander", {headers:headers(id)})).status, 401);
  }
  assert.equal((await fetch(base + "/wiki?edit=1", {headers:headers("editor")})).status, 403, "unpaid editor cannot bypass VIP page gate");
  assert.equal((await fetch(base + "/api/dashboard/wiki/admin", {headers:headers("editor")})).status, 403, "unpaid editor cannot bypass VIP API gate");
  assert.equal((await fetch(base + "/api/dashboard/wiki", {method:"POST",headers:{...headers("editor"),"content-type":"application/json"},body:"{}"})).status, 403);

  const upgrade = await fetch(base + "/test/upgrade");
  const paymentCookie = /kella_payment_identity=[^;]+/.exec(upgrade.headers.get("set-cookie") || "")![0];
  const status = await (await fetch(base + "/api/auth/kofi/status", {headers:{cookie:paymentCookie}})).json();
  assert.equal(status.canContinueRegular, true, "approved regular can leave optional VIP checkout");
  const continued = await fetch(base + "/api/auth/kofi/regular", {headers:{cookie:paymentCookie},redirect:"manual"});
  assert.equal(continued.headers.get("location"), "/members");
  assert.match(continued.headers.get("set-cookie") || "", new RegExp(`${env.SESSION_COOKIE_NAME}=[^;,\\s]+`));
  console.log("VIP access: DB-authorized regular reads, server page/API locks, privacy, expired membership fallback, owner/admin/gift exceptions, and policy pages passed.");
} finally {
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
