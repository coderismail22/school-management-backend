import { Schema, model } from "mongoose";
import { IStudent } from "./student.interface";

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    profileImg: { type: String, required: true }, // Profile image is now required
    year: { type: String, required: true },
    birthRegId: { type: String, required: true, unique: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    group: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "NA"],
      default: "NA", // Default to "NA" if not applicable
    },
    version: { type: String, enum: ["Bangla", "English"], required: true },
    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      required: true,
    },
    roll: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherPhone: { type: String, required: true },
    motherName: { type: String, required: true },
    motherPhone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const Student = model<IStudent>("Student", StudentSchema);
