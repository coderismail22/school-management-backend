import { Schema, model } from "mongoose";
import { IMark } from "./mark.interface";

const MarksSchema = new Schema<IMark>(
  {
    studentId: { type: String, required: true },
    examId: { type: String, required: true },
    subjectId: { type: String, required: true },
    teacherId: { type: String, required: true },
    marks: {
      mcq: { type: Number },
      cq: { type: Number },
      practical: { type: Number },
      total: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export const MarkModel = model<IMark>("Mark", MarksSchema);
