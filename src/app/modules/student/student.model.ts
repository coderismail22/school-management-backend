import { Schema, model } from "mongoose";
import { IStudent } from "./student.interface";

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    classLevel: { type: Number, required: true, min: 1, max: 12 },
    section: { type: String, required: true },
    shift: { type: String, enum: ["Morning", "Evening"] },
    group: { type: String, enum: ["Science", "Commerce", "Arts"] },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", StudentSchema);
