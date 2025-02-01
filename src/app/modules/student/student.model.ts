import { Schema, model } from "mongoose";
import { IStudent } from "./student.interface";

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    roll: { type: String, required: true },
    profileImg: { type: String }, // Optional profile image URL
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    guardianName: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    year: { type: String, required: true }, // Changed from number to string
    version: { type: String, required: true },
    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      required: true,
    },
    class: { type: String, required: true },
    section: { type: String, required: true },
    group: {
      type: String,
      default: "NA",
      enum: ["Science", "Commerce", "Arts", "NA"],
    }, // Optional for class 9-12 only
  },
  { timestamps: true },
);

export const Student = model<IStudent>("Student", StudentSchema);
