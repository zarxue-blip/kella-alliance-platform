import type { DashboardModule, UserRole } from "./types.js";

export type PermissionAction = "read" | "create" | "update" | "delete" | "export" | "manage";
export type Permission = `${DashboardModule}:${PermissionAction}` | "system:admin";

const officerModules: DashboardModule[] = [
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
  "announcements"
];

const memberReadModules: DashboardModule[] = ["home", "attendance", "events", "war", "shields", "tasks", "announcements"];

const expand = (modules: DashboardModule[], actions: PermissionAction[]): Permission[] =>
  modules.flatMap((module) => actions.map((action) => `${module}:${action}` as Permission));

export const rolePermissions: Record<UserRole, Permission[]> = {
  Owner: ["system:admin", ...expand(officerModules.concat("settings"), ["read", "create", "update", "delete", "export", "manage"])],
  Leader: [...expand(officerModules.concat("settings"), ["read", "create", "update", "delete", "export", "manage"])],
  "R4 Officer": [...expand(officerModules, ["read", "create", "update", "export"]), "settings:read"],
  "War Marshal": [
    ...expand(["home", "members", "attendance", "war", "shields", "analytics", "announcements"], ["read"]),
    ...expand(["attendance", "war", "shields", "announcements"], ["create", "update", "manage"])
  ],
  Recruiter: [
    ...expand(["home", "members", "recruitment", "analytics", "announcements"], ["read"]),
    ...expand(["recruitment", "announcements"], ["create", "update", "manage"])
  ],
  "Event Manager": [
    ...expand(["home", "members", "attendance", "events", "analytics", "announcements"], ["read"]),
    ...expand(["attendance", "events", "announcements"], ["create", "update", "manage"])
  ],
  Member: [...expand(memberReadModules, ["read"]), "attendance:create", "events:create", "shields:update", "tasks:update"]
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes("system:admin") || permissions.includes(permission);
}
