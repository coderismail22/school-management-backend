import { Schema, model } from "mongoose";
import { IResult, ISubjectResult } from "./result.interface";

const SubjectResultSchema = new Schema<ISubjectResult>({
  subjectId: { type: String, required: true },
  marks: {
    mcq: { type: Number },
    cq: { type: Number },
    practical: { type: Number },
    total: { type: Number, required: true },
  },
  grade: { type: String, required: true },
  gradePoint: { type: Number, required: true },
});

const ResultSchema = new Schema<IResult>(
  {
    studentId: { type: String, required: true },
    examId: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    grade: { type: String, required: true },
    gradePoint: { type: Number, required: true },
    subjectResults: [SubjectResultSchema],
  },
  { timestamps: true }
);

export const ResultModel = model<IResult>("Result", ResultSchema);
