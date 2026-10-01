import { memberForViewer } from './memberPrivacy.service.js';
import { randomUUID } from "node:crypto";
import type { Server, Socket } from "socket.io";
import { realtimeEvents, type DashboardModule, type NotificationDto, type Priority } from "@cod-amp/shared";
import { isDashboardAdminUser } from "../middleware/auth.js";

let io: Server | undefined;

export function registerRealtimeServer(server: Server) {
  io = server;
}

export async function updateRealtimeAccess(socket: Pick<Socket, "data" | "join" | "leave">, user: any) {
  const allianceId = user.allianceId.toString();
  const previousAlliance = socket.data.user?.allianceId;
  if (previousAlliance && previousAlliance !== allianceId) {
    await socket.leave(`alliance:${previousAlliance}`);
    await socket.leave(`alliance:${previousAlliance}:admin`);
  }
  // The caller supplies the freshly loaded account, never token role claims.
  socket.data.user = { id: user._id.toString(), discordId: user.discordId, role: user.role, allianceId };
  await socket.join(`alliance:${allianceId}`);
  if (isDashboardAdminUser(user)) await socket.join(`alliance:${allianceId}:admin`);
  else await socket.leave(`alliance:${allianceId}:admin`);
}

export function disconnectUser(userId: string) {
  for (const socket of io?.sockets.sockets.values() || []) {
    if (socket.data.user?.id === userId) socket.disconnect(true);
  }
}

export function emitAlliance(allianceId: string, event: string, payload: unknown) {
  const room = `alliance:${allianceId}${event === realtimeEvents.recruitmentUpdated ? ":admin" : ""}`;
  let visiblePayload = payload;
  if (event === realtimeEvents.memberUpdated && payload && typeof payload === "object") {
    const member = memberForViewer(JSON.parse(JSON.stringify(payload)));
    // Bulk edits put the changed fields under patch instead of at the top level.
    if (member.patch && typeof member.patch === "object" && !Array.isArray(member.patch)) {
      member.patch = memberForViewer(member.patch);
    }
    visiblePayload = member;
  }
  io?.to(room).emit(event, visiblePayload);
}

export function emitNotification(allianceId: string, notification: Omit<NotificationDto, "id" | "createdAt">) {
  const payload: NotificationDto = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...notification
  };
  emitAlliance(allianceId, realtimeEvents.notification, payload);
}

export function moduleNotification(module: DashboardModule, title: string, message: string, priority: Priority = "MEDIUM") {
  return { module, title, message, priority };
}
