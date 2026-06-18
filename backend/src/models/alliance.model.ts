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
      defaultAlliance: { type: String }
    }
  },
  { timestamps: true }
);

export const AllianceModel = model("Alliance", allianceSchema);
