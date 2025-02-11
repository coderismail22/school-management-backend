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
    hasMCQ: { type: Boolean, default: false },
    hasCQ: { type: Boolean, default: false },
    hasPractical: { type: Boolean, default: false },
    mcqMark: { type: Number, default: 0 },
    cqMark: { type: Number, default: 0 },
    practicalMark: { type: Number, default: 0 },
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
