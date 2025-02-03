// src/app/modules/exam/exam.model.ts
import { Schema, model } from "mongoose";
import { IExam, IExamSubject } from "./exam.interface";

const ExamSubjectSchema = new Schema<IExamSubject>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    year: { type: String, required: true },
    version: { type: String, required: true },
    class: { type: String, required: true },
    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      required: true,
    },
    section: { type: String, required: true },
    group: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "NA"],
      default: "NA",
    },
    hasPlainMarks: { type: Boolean, default: false },
    hasMCQ: { type: Boolean, default: false },
    hasCQ: { type: Boolean, default: false },
    hasPractical: { type: Boolean, default: false },
    mcqMarks: { type: Number, default: 0 },
    cqMarks: { type: Number, default: 0 },
    practicalMarks: { type: Number, default: 0 },
    plainMarks: { type: Number, default: 0 },
    // totalMarks: { type: Number, required: true },
    subjectTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    _id: true, // keep subdocument _id
  },
);

const ExamSchema = new Schema<IExam>(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    version: { type: String, required: true },
    class: { type: String, required: true },
    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      required: true,
    },
    section: { type: String, required: true },
    group: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "NA"],
      default: "NA",
    },
    subjects: {
      type: [ExamSubjectSchema],
      default: [],
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Exam = model<IExam>("Exam", ExamSchema);
