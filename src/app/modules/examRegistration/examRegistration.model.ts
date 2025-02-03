// src/app/modules/examRegistration/examRegistration.model.ts
import { Schema, model } from "mongoose";
import { IExamRegistration } from "./examRegistration.interface";

const ExamRegistrationSchema = new Schema<IExamRegistration>(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      default: "registered",
    },
  },
  {
    timestamps: true,
  }
);

// Optionally, create a compound index to prevent duplicates:
ExamRegistrationSchema.index({ examId: 1, studentId: 1 }, { unique: true });

export const ExamRegistration = model<IExamRegistration>(
  "ExamRegistration",
  ExamRegistrationSchema
);
