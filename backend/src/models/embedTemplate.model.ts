import { Schema, model, type InferSchemaType } from "mongoose";

const embedTemplateSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    name: { type: String, required: true, trim: true },
    channelId: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, required: true },
    color: { type: String, default: "#facc15" },
    imageUrl: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    footer: { type: String, default: "Sent by Kella" },
    roleMentionId: { type: String, default: "" },
    createdBy: { type: String, default: "Dashboard" }
  },
  { timestamps: true }
);

embedTemplateSchema.index({ allianceId: 1, name: 1 }, { unique: true });

export type EmbedTemplateDocument = InferSchemaType<typeof embedTemplateSchema>;
export const EmbedTemplateModel = model<any>("EmbedTemplate", embedTemplateSchema);
