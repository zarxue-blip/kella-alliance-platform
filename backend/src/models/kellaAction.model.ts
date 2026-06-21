import { Schema, model, type InferSchemaType } from "mongoose";

const kellaActionSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    type: {
      type: String,
      enum: [
        "shield_alert",
        "attack_alert",
        "attack_response",
        "roots_registration",
        "roots_response",
        "summit_response",
        "daily_checkin",
        "absence",
        "application",
        "event_reminder",
        "event_created",
        "embed_sent",
        "roots_report_sent",
        "complaint",
        "discord_member_sync",
        "member_xlsx_import"
      ],
      required: true,
      index: true
    },
    actorDiscordId: { type: String, index: true },
    actorName: { type: String },
    targetDiscordId: { type: String, index: true },
    targetName: { type: String },
    reportId: { type: String, index: true },
    eventType: { type: String, index: true },
    slot: { type: String, index: true },
    status: { type: String, index: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    sentAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

kellaActionSchema.index({ allianceId: 1, type: 1, sentAt: -1 });
kellaActionSchema.index({ allianceId: 1, eventType: 1, slot: 1, status: 1 });
kellaActionSchema.index({ allianceId: 1, reportId: 1, slot: 1, status: 1 });

export type KellaActionDocument = InferSchemaType<typeof kellaActionSchema>;
export const KellaActionModel = model<any>("KellaAction", kellaActionSchema);
