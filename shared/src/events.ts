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

export type RealtimeEventName = (typeof realtimeEvents)[keyof typeof realtimeEvents];
