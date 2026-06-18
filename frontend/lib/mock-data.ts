import type { TaskStatus } from "@cod-amp/shared";

export const stats = [
  { label: "Registered Members", value: "8,742", change: "+14.2%" },
  { label: "Total Power", value: "42.8B", change: "+2.7B" },
  { label: "War Readiness", value: "91%", change: "+6%" },
  { label: "Open Alerts", value: "3", change: "1 critical" }
];

export const attendanceTrend = [
  { name: "Mon", attendance: 612, war: 288 },
  { name: "Tue", attendance: 690, war: 304 },
  { name: "Wed", attendance: 741, war: 382 },
  { name: "Thu", attendance: 815, war: 466 },
  { name: "Fri", attendance: 932, war: 520 },
  { name: "Sat", attendance: 1180, war: 744 },
  { name: "Sun", attendance: 1031, war: 681 }
];

export const growthTrend = [
  { name: "Jan", members: 6810, power: 29 },
  { name: "Feb", members: 7024, power: 31 },
  { name: "Mar", members: 7331, power: 34 },
  { name: "Apr", members: 7790, power: 37 },
  { name: "May", members: 8214, power: 40 },
  { name: "Jun", members: 8742, power: 43 }
];

export const members = [
  { ign: "Astra", uid: "1182993", power: 184200000, alliance: "DCA", role: "War Marshal", attendance: 98, war: 96, country: "PH" },
  { ign: "Riven", uid: "7710021", power: 151800000, alliance: "DCA", role: "R4 Officer", attendance: 94, war: 91, country: "US" },
  { ign: "Kairo", uid: "4409182", power: 137600000, alliance: "DCA2", role: "Event Manager", attendance: 89, war: 84, country: "SG" },
  { ign: "Nyx", uid: "2290184", power: 122900000, alliance: "DCA", role: "Recruiter", attendance: 87, war: 79, country: "AU" },
  { ign: "Vale", uid: "8891902", power: 110400000, alliance: "DCA3", role: "Member", attendance: 76, war: 72, country: "CA" }
];

export const operations = [
  { name: "North Pass Lock", target: "K54 Pass 3", priority: "CRITICAL", status: "Active", date: "2026-06-18T22:00:00Z" },
  { name: "Fortress Burn Window", target: "Rift Valley", priority: "HIGH", status: "Planning", date: "2026-06-19T13:00:00Z" },
  { name: "Stronghold Rotation", target: "Eastern Gate", priority: "MEDIUM", status: "Planning", date: "2026-06-20T09:00:00Z" }
];

export const shieldWarnings = [
  { ign: "Mira", expires: "15 min", risk: "Critical" },
  { ign: "Hale", expires: "58 min", risk: "High" },
  { ign: "Sora", expires: "5h 34m", risk: "Medium" },
  { ign: "Kane", expires: "11h 12m", risk: "Medium" }
];

export const recruitmentPipeline = [
  { status: "Applied", count: 21 },
  { status: "Review", count: 12 },
  { status: "Interview", count: 7 },
  { status: "Approved", count: 9 },
  { status: "Rejected", count: 4 }
];

export const rootsOfWarSlotStats = [
  { slot: "14UTC", label: "14:00 UTC", registered: 438, checkedIn: 312, marshal: "Astra" },
  { slot: "20UTC", label: "20:00 UTC", registered: 521, checkedIn: 387, marshal: "Riven" }
];

export const rootsOfWarRegistrants = [
  { ign: "Astra", slot: "14:00 UTC", status: "Checked In", power: 184200000 },
  { ign: "Riven", slot: "20:00 UTC", status: "Registered", power: 151800000 },
  { ign: "Kairo", slot: "14:00 UTC", status: "Registered", power: 137600000 },
  { ign: "Nyx", slot: "20:00 UTC", status: "Checked In", power: 122900000 }
];

export const taskColumns: Array<{ status: TaskStatus; tasks: Array<{ title: string; assignee: string; due: string }> }> = [
  { status: "Backlog", tasks: [{ title: "Audit inactive R2 farms", assignee: "Riven", due: "Jun 21" }] },
  { status: "Assigned", tasks: [{ title: "Prepare fortress rally squads", assignee: "Astra", due: "Jun 18" }] },
  { status: "In Progress", tasks: [{ title: "Update NAP notes for DKL", assignee: "Nyx", due: "Jun 19" }] },
  { status: "Review", tasks: [{ title: "Validate summit attendance export", assignee: "Kairo", due: "Jun 20" }] },
  { status: "Completed", tasks: [{ title: "Recruitment form refresh", assignee: "Vale", due: "Jun 17" }] }
];
