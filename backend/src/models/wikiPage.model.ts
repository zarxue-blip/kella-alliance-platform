import { Schema, model, type InferSchemaType } from "mongoose";

export const wikiFontFamilies = ["serif", "sans", "display"] as const;
export const wikiFontSizes = ["small", "medium", "large"] as const;
export const wikiStatuses = ["Published", "Draft"] as const;

const wikiPageSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 },
    body: { type: String, required: true, trim: true, maxlength: 6000 },
    imageDataUrl: { type: String, default: "" },
    fontFamily: { type: String, enum: wikiFontFamilies, default: "serif" },
    fontSize: { type: String, enum: wikiFontSizes, default: "medium" },
    status: { type: String, enum: wikiStatuses, default: "Published", index: true },
    createdBy: { type: String, default: "Dashboard" },
    updatedBy: { type: String, default: "Dashboard" }
  },
  { timestamps: true }
);

wikiPageSchema.index({ allianceId: 1, slug: 1 }, { unique: true });
wikiPageSchema.index({ allianceId: 1, status: 1, updatedAt: -1 });

export type WikiPageDocument = InferSchemaType<typeof wikiPageSchema>;
export const WikiPageModel = model<any>("WikiPage", wikiPageSchema);
