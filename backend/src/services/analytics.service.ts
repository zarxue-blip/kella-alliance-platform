import { Types } from "mongoose";
import { AttendanceEventModel } from "../models/attendanceEvent.model.js";
import { MemberModel } from "../models/member.model.js";
import { OperationModel } from "../models/operation.model.js";
import { RecruitmentApplicationModel } from "../models/recruitmentApplication.model.js";

export async function getAllianceAnalytics(allianceId: string) {
  const allianceObjectId = new Types.ObjectId(allianceId);
  const [members, attendance, operations, recruitment] = await Promise.all([
    MemberModel.aggregate([
      { $match: { allianceId: allianceObjectId } },
      { $group: { _id: "$role", count: { $sum: 1 }, power: { $sum: "$power" } } }
    ]),
    AttendanceEventModel.aggregate([
      { $match: { allianceId: allianceObjectId } },
      { $project: { type: 1, count: { $size: "$checkIns" }, startsAt: 1 } },
      { $sort: { startsAt: -1 } },
      { $limit: 24 }
    ]),
    OperationModel.aggregate([
      { $match: { allianceId: allianceObjectId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    RecruitmentApplicationModel.aggregate([
      { $match: { allianceId: allianceObjectId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ])
  ]);

  return { members, attendance, operations, recruitment };
}
