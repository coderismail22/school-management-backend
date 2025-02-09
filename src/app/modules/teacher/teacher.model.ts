import { Schema, model } from "mongoose";
import { ITeacher } from "./teacher.interface";

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    profileImg: { type: String, required: true, trim: true },
    teacherId: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
