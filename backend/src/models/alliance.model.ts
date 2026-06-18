import { Schema, model } from "mongoose";

const allianceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    tag: { type: String, required: true, uppercase: true, trim: true, index: true },
    kingdom: { type: String, trim: true },
    discordGuildId: { type: String, index: true },
    timezone: { type: String, default: "UTC" },
    settings: {
      attendanceGraceMinutes: { type: Number, default: 10 },
      shieldAlertMinutes: { type: [Number], default: [1440, 720, 360, 60, 15] },
      defaultAlliance: { type: String },
      announcementChannel: { type: String, default: "" },
      attendanceChannel: { type: String, default: "" },
      alertChannel: { type: String, default: "" },
      officerRoles: { type: [String], default: ["Leader", "R4 Officer", "War Marshal", "Event Manager", "Recruiter"] },
      moduleStates: { type: Map, of: Boolean, default: {} }
    }
  },
  { timestamps: true }
);

export const AllianceModel = model<any>("Alliance", allianceSchema);
