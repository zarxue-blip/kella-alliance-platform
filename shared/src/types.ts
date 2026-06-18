export type UserRole =
  | "Owner"
  | "Leader"
  | "R4 Officer"
  | "War Marshal"
  | "Recruiter"
  | "Event Manager"
  | "Member";

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

export type AttendanceType =
  | "Summit"
  | "Fortress"
  | "Stronghold"
  | "Pass"
  | "Behemoth"
  | "Roots of War"
  | "Darkling"
  | "Training"
  | "Meeting";

export type RootsOfWarTimeSlot = "14UTC" | "20UTC";
export type RootsOfWarRegistrationStatus = "Registered" | "Checked In" | "Cancelled";

export type OperationType =
  | "Fortress"
  | "Stronghold"
  | "Pass"
  | "Kingdom War"
  | "Defense"
  | "Emergency Defense";

export type OperationStatus = "Planning" | "Active" | "Completed" | "Cancelled";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CallToArmsResponseStatus = "Responding" | "Reinforcing" | "Unavailable";
export type RecruitmentStatus = "Applied" | "Review" | "Interview" | "Approved" | "Rejected";
export type TaskStatus = "Backlog" | "Assigned" | "In Progress" | "Review" | "Completed";
export type DiplomacyType = "Allies" | "NAP Agreements" | "Enemies" | "Friendly Alliances";
export type AnnouncementTemplate =
  | "War Alert"
  | "Summit Reminder"
  | "Recruitment"
  | "Emergency Defense"
  | "Maintenance";

export interface MemberProfile {
  id: string;
  discordId: string;
  ign: string;
  uid: string;
  power: number;
  alliance: string;
  rank: string;
  role: UserRole;
  timezone: string;
  country: string;
  joinDate: string;
  lastActivity: string;
  attendanceScore: number;
  warScore: number;
  contributionScore: number;
  notes?: string;
}

export interface AttendanceEventDto {
  id: string;
  title: string;
  type: AttendanceType;
  startsAt: string;
  endsAt?: string;
  checkInWindowMinutes: number;
  qrToken?: string;
  attendees: string[];
}

export interface RootsOfWarRegistrationDto {
  id: string;
  memberId: string;
  discordId: string;
  ign: string;
  slot: RootsOfWarTimeSlot;
  status: RootsOfWarRegistrationStatus;
  registeredAt: string;
  checkedInAt?: string;
}

export interface OperationDto {
  id: string;
  operationName: string;
  type: OperationType;
  description: string;
  date: string;
  priority: Priority;
  target: string;
  participants: string[];
  assignments: OperationAssignmentDto[];
  status: OperationStatus;
}

export interface OperationAssignmentDto {
  id: string;
  squad: string;
  memberId: string;
  role: string;
  notes?: string;
}

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  priority: Priority;
  createdAt: string;
  module: DashboardModule;
}
