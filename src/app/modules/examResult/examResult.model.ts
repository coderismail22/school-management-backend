// src/app/modules/examResult/examResult.model.ts
import { Schema, model } from "mongoose";
import { IExamResult } from "./examResult.interface";

const MarksBreakdownSchema = new Schema({
  mcqMark: { type: Number, default: 0 },
  cqMark: { type: Number, default: 0 },
  practicalMark: { type: Number, default: 0 },
  plainMark: { type: Number, default: 0 },
  totalMark: { type: Number, default: 0 },
});

const ExamResultSchema = new Schema<IExamResult>(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    examSubjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    marks: {
      type: MarksBreakdownSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Optionally create an index to ensure a student only has 1 result per subject:
ExamResultSchema.index(
  { examId: 1, examSubjectId: 1, studentId: 1 },
  { unique: true },
);

export const ExamResult = model<IExamResult>("ExamResult", ExamResultSchema);
