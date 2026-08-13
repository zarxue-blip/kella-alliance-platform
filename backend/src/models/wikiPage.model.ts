import { Schema, model, type InferSchemaType } from "mongoose";

export const wikiFontFamilies = [
  "serif",
  "sans",
  "display",
  "script",
  "mono",
  "cod",
  "hero-king",
  "dragon-force",
  "tribal-dragon"
] as const;
export const wikiFontSizes = ["small", "medium", "large", "xlarge"] as const;
export const wikiStatuses = ["Published", "Draft"] as const;
export const wikiBlockTypes = ["text", "image", "video"] as const;
export const wikiAlignments = ["left", "center", "right"] as const;

const wikiBlockSchema = new Schema(
  {
    id: { type: String, required: true, trim: true, maxlength: 80 },
    type: { type: String, enum: wikiBlockTypes, required: true },
    text: { type: String, default: "", maxlength: 500000 },
    richTextHtml: { type: String, default: "", maxlength: 500000 },
    imageDataUrl: { type: String, default: "" },
    x: { type: Number, default: 90, min: 0, max: 760 },
    y: { type: Number, default: 90, min: 0, max: 50000 },
    width: { type: Number, default: 320, min: 24, max: 760 },
    height: { type: Number, default: 180, min: 24, max: 50000 },
    fontFamily: { type: String, enum: wikiFontFamilies, default: "serif" },
    fontSize: { type: String, enum: wikiFontSizes, default: "medium" },
    fontSizePx: { type: Number, min: 8, max: 240, default: undefined },
    color: { type: String, default: "#3f2a13", maxlength: 7 },
    align: { type: String, enum: wikiAlignments, default: "center" },
    imagePositionX: { type: Number, default: 0, min: -2000, max: 2000 },
    imagePositionY: { type: Number, default: 0, min: -2000, max: 2000 },
    imageScale: { type: Number, default: 1, min: 0.1, max: 8 },
    shadowEnabled: { type: Boolean, default: false },
    shadowBlur: { type: Number, default: 12, min: 0, max: 100 },
    shadowOffsetX: { type: Number, default: 0, min: -100, max: 100 },
    shadowOffsetY: { type: Number, default: 6, min: -100, max: 100 },
    shadowOpacity: { type: Number, default: 0.35, min: 0, max: 1 },
    shadowColor: { type: String, default: "#000000", maxlength: 7 },
    zIndex: { type: Number, default: 0, min: 0, max: 500 }
  },
  { _id: false }
);

const wikiPageSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    author: { type: String, default: "Kella Officer", trim: true, maxlength: 120 },
    tags: { type: [{ type: String, trim: true, maxlength: 30 }], default: [] },
    slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 },
    body: { type: String, required: true, trim: true, maxlength: 500000 },
    imageDataUrl: { type: String, default: "" },
    fontFamily: { type: String, enum: wikiFontFamilies, default: "serif" },
    fontSize: { type: String, enum: wikiFontSizes, default: "medium" },
    blocks: { type: [wikiBlockSchema], default: [] },
    status: { type: String, enum: wikiStatuses, default: "Published", index: true },
    createdBy: { type: String, default: "Dashboard" },
    updatedBy: { type: String, default: "Dashboard" }
  },
  { timestamps: true }
);

wikiPageSchema.index({ allianceId: 1, slug: 1 }, { unique: true });
wikiPageSchema.index({ allianceId: 1, status: 1, updatedAt: -1 });
wikiPageSchema.index({ allianceId: 1, tags: 1 });

export type WikiPageDocument = InferSchemaType<typeof wikiPageSchema>;
export const WikiPageModel = model<any>("WikiPage", wikiPageSchema);
