import { Schema, model } from "mongoose";
import { IAssignment } from "./assignment.interface";

const AssignmentSchema = new Schema<IAssignment>(
  {
    teacherId: { type: String, required: true },
    classId: { type: String, required: true },
    section: { type: String, required: true },
    group: { type: String },
    subjectId: { type: String, required: true },
  },
  { timestamps: true }
);

export const AssignmentModel = model<IAssignment>(
  "Assignment",
  AssignmentSchema
);
