import { randomUUID } from "node:crypto";
import type { Server } from "socket.io";
import { realtimeEvents, type DashboardModule, type NotificationDto, type Priority } from "@cod-amp/shared";

let io: Server | undefined;

export function registerRealtimeServer(server: Server) {
  io = server;
}

export function emitAlliance(allianceId: string, event: string, payload: unknown) {
  io?.to(`alliance:${allianceId}`).emit(event, payload);
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
