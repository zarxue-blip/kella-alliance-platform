import type { DashboardModule } from "./types";

export const appName = "Dragon Command";
export const botName = "Kella";

export const rootsOfWarSlots = [
  { value: "14UTC", label: "14:00 UTC", hourUtc: 14 },
  { value: "20UTC", label: "20:00 UTC", hourUtc: 20 }
] as const;

export const dashboardModules: DashboardModule[] = [
  "home",
  "members",
  "attendance",
  "war",
  "events",
  "shields",
  "recruitment",
  "tasks",
  "diplomacy",
  "analytics",
  "announcements",
  "settings"
];

export const moduleLabels: Record<DashboardModule, string> = {
  home: "Home Dashboard",
  members: "Member Database",
  attendance: "Attendance System",
  war: "War Operations",
  events: "Event Management",
  shields: "Shield Tracking",
  recruitment: "Recruitment Center",
  tasks: "Task Board",
  diplomacy: "Diplomacy Center",
  analytics: "Analytics",
  announcements: "Announcements",
  settings: "Settings"
};

export const shieldAlertMinutes = [1440, 720, 360, 60, 15] as const;
