import { Schema, model, type InferSchemaType } from "mongoose";

const pollOptionSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    roleId: { type: String, default: "", trim: true }
  },
  { _id: false }
);

const pollVoteSchema = new Schema(
  {
    discordId: { type: String, required: true, trim: true },
    displayName: { type: String, default: "", trim: true },
    optionKey: { type: String, required: true, trim: true },
    votedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const pollSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    kind: { type: String, enum: ["poll", "best_online_time"], default: "poll", index: true },
    question: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    options: { type: [pollOptionSchema], required: true },
    votes: { type: [pollVoteSchema], default: [] },
    status: { type: String, enum: ["Open", "Closed"], default: "Open", index: true },
    channelId: { type: String, default: "", trim: true },
    messageId: { type: String, default: "", trim: true },
    messageLink: { type: String, default: "", trim: true },
    createdByDiscordId: { type: String, default: "", trim: true },
    closedAt: { type: Date }
  },
  { timestamps: true }
);

pollSchema.index({ allianceId: 1, createdAt: -1 });
pollSchema.index({ allianceId: 1, "votes.discordId": 1 });

export type PollDocument = InferSchemaType<typeof pollSchema>;
export const PollModel = model<any>("Poll", pollSchema);
