import { Schema, model, type InferSchemaType } from "mongoose";
import type { TaskStatus } from "@cod-amp/shared";

export const taskStatuses = ["Backlog", "Assigned", "In Progress", "Review", "Completed"] as const satisfies readonly TaskStatus[];

const commentSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const taskSchema = new Schema(
  {
    allianceId: { type: Schema.Types.ObjectId, ref: "Alliance", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, enum: taskStatuses, default: "Backlog", index: true },
    assigneeIds: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    dueDate: { type: Date, index: true },
    comments: { type: [commentSchema], default: [] },
    attachments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type TaskDocument = InferSchemaType<typeof taskSchema>;
export const TaskModel = model<any>("Task", taskSchema);
