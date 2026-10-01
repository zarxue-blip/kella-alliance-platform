import assert from "node:assert/strict";
import type { Server, Socket } from "socket.io";

Object.assign(process.env, {
  NODE_ENV: "test", MONGODB_URI: "mongodb://127.0.0.1/test",
  JWT_SECRET: "realtime-test-only-session-secret-123456", DISCORD_CLIENT_ID: "test",
  DISCORD_CLIENT_SECRET: "test", DISCORD_REDIRECT_URI: "http://127.0.0.1/callback",
  BOT_API_TOKEN: "realtime-test-only-service-token", DASHBOARD_ADMIN_DISCORD_IDS: "",
  DASHBOARD_ADMIN_ROLE_IDS: ""
});

const { realtimeEvents } = await import("@cod-amp/shared");
const { registerRealtimeServer, emitAlliance, updateRealtimeAccess } = await import("../src/services/realtime.service.js");

const rooms = new Set<string>();
const socket = {
  data: { user: { role: "Owner", allianceId: "alliance" } },
  join: async (room: string) => { rooms.add(room); },
  leave: async (room: string) => { rooms.delete(room); }
} as unknown as Pick<Socket, "data" | "join" | "leave">;
const user = { _id: "vip-member", discordId: "member", role: "Member", allianceId: "alliance", discordRoleIds: [] as string[] };

await updateRealtimeAccess(socket, user);
assert.deepEqual([...rooms], ["alliance:alliance"], "Token-side Owner claims must not grant the admin room");
assert.equal(socket.data.user.role, "Member");
user.discordRoleIds = ["1522274495728062475"];
await updateRealtimeAccess(socket, user);
assert.ok(rooms.has("alliance:alliance:admin"), "Fresh DB admin role grants the admin room");
user.discordRoleIds = [];
await updateRealtimeAccess(socket, user);
assert.equal(rooms.has("alliance:alliance:admin"), false, "Revoked admin role leaves the admin room on revalidation");
user.role = "Owner";
await updateRealtimeAccess(socket, user);
assert.ok(rooms.has("alliance:alliance:admin"), "DB owner retains admin realtime access");
user.allianceId = "new-alliance";
await updateRealtimeAccess(socket, user);
assert.equal(rooms.has("alliance:alliance"), false);
assert.equal(rooms.has("alliance:alliance:admin"), false);
assert.ok(rooms.has("alliance:new-alliance:admin"));

const sent: Array<{ room: string; event: string; payload: unknown }> = [];
registerRealtimeServer({ to: (room: string) => ({ emit: (event: string, payload: unknown) => sent.push({ room, event, payload }) }) } as unknown as Server);
const application = { discordId: "applicant", history: [{ note: "Admin-only review" }] };
emitAlliance("alliance", realtimeEvents.recruitmentUpdated, application);
assert.deepEqual(sent.pop(), { room: "alliance:alliance:admin", event: realtimeEvents.recruitmentUpdated, payload: application });
emitAlliance("alliance", realtimeEvents.attendanceCheckedIn, { eventId: "event" });
assert.equal(sent.pop()?.room, "alliance:alliance", "Ordinary alliance events keep their existing audience");
const bulkMemberEdit = { bulk: true, ids: ["member"], patch: {
  ign: "Public game name", notes: "Officer notes", discordUsername: "private.handle",
  privateSiteAccess: true, privateAccessVersion: 1, privateAccessPath: "/access/private-link"
} };
emitAlliance("alliance", realtimeEvents.memberUpdated, bulkMemberEdit);
assert.deepEqual(sent.pop()?.payload, { bulk: true, ids: ["member"], patch: { ign: "Public game name" } });
assert.equal(bulkMemberEdit.patch.notes, "Officer notes", "Filtering must not mutate stored admin input");
console.log("Realtime recruitment records remain admin-only; room permissions follow current database roles.");
