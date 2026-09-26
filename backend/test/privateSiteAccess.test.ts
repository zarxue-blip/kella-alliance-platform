import assert from "node:assert/strict";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/test",
  JWT_SECRET: "private-site-test-secret-123456789",
  DISCORD_CLIENT_ID: "123456789012345678",
  DISCORD_CLIENT_SECRET: "test",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/callback",
  BOT_API_TOKEN: "private-site-service-token",
  KELLA_LOCKDOWN: "true",
  KELLA_OWNER_KEY: "owner-link-key"
});

const { UserModel } = await import("../src/models/user.model.js");
const { MemberModel } = await import("../src/models/member.model.js");
const { createApp } = await import("../src/app.js");
const { signSessionToken } = await import("../src/middleware/auth.js");
const { env } = await import("../src/config/env.js");
const { privateMemberAccessPath } = await import("../src/services/privateMemberAccess.service.js");

const users: Record<string, any> = {
  special: { _id: "special", discordId: "222222222222222222", role: "Member", discordRoleIds: [], privateSiteAccess: true, allianceId: "aaaaaaaaaaaaaaaaaaaaaaaa" },
  ordinary: { _id: "ordinary", discordId: "333333333333333333", role: "Member", discordRoleIds: [], privateSiteAccess: false, allianceId: "aaaaaaaaaaaaaaaaaaaaaaaa" }
};

(UserModel as any).findById = (id: string) => ({ lean: async () => users[id] });
const specialMemberId = "bbbbbbbbbbbbbbbbbbbbbbbb";
(MemberModel as any).findOne = (filter: any) => ({
  select() { return this; },
  lean: async () => String(filter._id) === specialMemberId && filter.privateSiteAccess === true
    ? {
        _id: specialMemberId,
        allianceId: users.special.allianceId,
        ign: "Bond",
        privateSiteAccess: true,
        privateAccessVersion: 1
      }
    : null
});
(UserModel as any).findOneAndUpdate = async () => users.special;

const cookie = (id: string) => env.SESSION_COOKIE_NAME + "=" + signSessionToken({ id, ...users[id] });
const server = createApp().listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const base = "http://127.0.0.1:" + (server.address() as any).port;

try {
  assert.equal((await fetch(base + "/")).status, 404);
  assert.equal((await fetch(base + "/", { headers: { cookie: cookie("ordinary") } })).status, 404);
  assert.equal((await fetch(base + "/", { headers: { cookie: cookie("special") } })).status, 200);
  assert.equal((await fetch(base + "/base", { headers: { cookie: cookie("special") } })).status, 200);
  assert.equal((await fetch(base + "/officer", { headers: { cookie: cookie("special") } })).status, 403);
  assert.equal((await fetch(base + "/api/auth/me")).status, 401);
  const exclusivePath = privateMemberAccessPath(specialMemberId, 1);
  const exclusive = await fetch(base + exclusivePath, { redirect: "manual" });
  assert.equal(exclusive.status, 302);
  assert.equal(exclusive.headers.get("location"), "/profile");
  const exclusiveCookie = (exclusive.headers.get("set-cookie") || "").split(";")[0];
  assert.match(exclusiveCookie, new RegExp(`^${env.SESSION_COOKIE_NAME}=`));
  assert.equal((await fetch(base + "/base", { headers: { cookie: exclusiveCookie } })).status, 200);
  assert.equal((await fetch(base + "/officer", { headers: { cookie: exclusiveCookie } })).status, 403);
  assert.equal((await fetch(base + `/access/${specialMemberId}/${"0".repeat(64)}`, { redirect: "manual" })).status, 404);
  assert.equal((await fetch(base + "/?owner=owner-link-key", { redirect: "manual" })).status, 302);
  console.log("Private site access: ordinary users denied, approved profile admitted, exclusive signed link verified, member tools allowed, admin page denied and owner link preserved.");
} finally {
  server.close();
}
