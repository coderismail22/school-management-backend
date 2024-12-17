import { Schema, model } from "mongoose";
import { IExam, IExamSubject } from "./exam.interface";

const ExamSubjectSchema = new Schema<IExamSubject>({
  subjectId: { type: String, required: true },
  hasMCQ: { type: Boolean, default: false },
  hasCQ: { type: Boolean, default: false },
  hasPractical: { type: Boolean, default: false },
  mcqMarks: { type: Number },
  cqMarks: { type: Number },
  practicalMarks: { type: Number },
  totalMarks: { type: Number, required: true },
});

const ExamSchema = new Schema<IExam>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    classLevel: { type: Number, required: true },
    subjects: { type: [ExamSubjectSchema], required: true },
  },
  { timestamps: true },
);

export const ExamModel = model<IExam>("Exam", ExamSchema);
