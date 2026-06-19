export const appName = "Dragon Command";
export const botName = "Kella";

export type DashboardModule =
  | "home"
  | "members"
  | "attendance"
  | "war"
  | "events"
  | "shields"
  | "recruitment"
  | "tasks"
  | "diplomacy"
  | "analytics"
  | "announcements"
  | "settings";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type TaskStatus = "Backlog" | "Assigned" | "In Progress" | "Review" | "Completed";

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  priority: Priority;
  createdAt: string;
  module: DashboardModule;
}

export const realtimeEvents = {
  connected: "connected",
  memberUpdated: "member:updated",
  attendanceCheckedIn: "attendance:checked-in",
  operationUpdated: "operation:updated",
  callToArmsCreated: "call-to-arms:created",
  callToArmsResponse: "call-to-arms:response",
  shieldExpiring: "shield:expiring",
  recruitmentUpdated: "recruitment:updated",
  taskUpdated: "task:updated",
  announcementScheduled: "announcement:scheduled",
  notification: "notification"
} as const;
