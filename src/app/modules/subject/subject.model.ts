import { Schema, model } from "mongoose";
import { ISubject } from "./subject.interface";

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    subjectCode: { type: String, required: true, unique: true },
    hasMCQ: { type: Boolean, default: false },
    hasCQ: { type: Boolean, default: false },
    hasPractical: { type: Boolean, default: false },
    mcqMarks: { type: Number },
    cqMarks: { type: Number },
    practicalMarks: { type: Number },
    totalMarks: { type: Number, required: true },
    group: { type: String, enum: ["Science", "Commerce", "Arts"], required: false },
    classLevel: { type: Number, required: true },
  },
  { timestamps: true }
);

export const SubjectModel = model<ISubject>("Subject", SubjectSchema);
