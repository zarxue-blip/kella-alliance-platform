import { Schema, model, type InferSchemaType } from "mongoose";
import { priorityValues } from "./operation.model.js";

const responseSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    status: { type: String, enum: ["Responding", "Reinforcing", "Unavailable"], required: true },
    message: { type: String },
    respondedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const callToArmsSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: priorityValues, default: "HIGH", index: true },
    target: { type: String },
    operationId: { type: Schema.Types.ObjectId, ref: "Operation" },
    status: { type: String, enum: ["Open", "Resolved", "Cancelled"], default: "Open", index: true },
    channels: { type: [String], default: ["discord", "dashboard", "push"] },
    responses: { type: [responseSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type CallToArmsDocument = InferSchemaType<typeof callToArmsSchema>;
export const CallToArmsModel = model<any>("CallToArms", callToArmsSchema);
