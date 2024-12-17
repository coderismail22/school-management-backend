import { Schema, model } from "mongoose";
import { IGrade } from "./grade.interface";

const GradeSchema = new Schema<IGrade>(
  {
    grade: { type: String, required: true },
    minMarks: { type: Number, required: true },
    maxMarks: { type: Number, required: true },
    gradePoint: { type: Number, required: true },
  },
  { timestamps: true }
);

export const GradeModel = model<IGrade>("Grade", GradeSchema);
