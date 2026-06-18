import { Schema, model, type InferSchemaType } from "mongoose";
import type { OperationStatus, OperationType, Priority } from "@cod-amp/shared";

export const operationTypes: OperationType[] = ["Fortress", "Stronghold", "Pass", "Kingdom War", "Defense", "Emergency Defense"];
export const operationStatuses: OperationStatus[] = ["Planning", "Active", "Completed", "Cancelled"];
export const priorityValues: Priority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

const operationAssignmentSchema = new Schema(
  {
    squad: { type: String, required: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    role: { type: String, required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

const timelineSchema = new Schema(
  {
    at: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { _id: false }
);

const operationSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    operationName: { type: String, required: true, trim: true },
    type: { type: String, enum: operationTypes, required: true, index: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true, index: true },
    priority: { type: String, enum: priorityValues, default: "MEDIUM", index: true },
    target: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    assignments: { type: [operationAssignmentSchema], default: [] },
    status: { type: String, enum: operationStatuses, default: "Planning", index: true },
    warNotes: { type: String, default: "" },
    timeline: { type: [timelineSchema], default: [] },
    attendanceEventId: { type: Schema.Types.ObjectId, ref: "AttendanceEvent" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type OperationDocument = InferSchemaType<typeof operationSchema>;
export const OperationModel = model<any>("Operation", operationSchema);
