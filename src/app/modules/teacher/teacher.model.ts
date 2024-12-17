import { Schema, model } from "mongoose";
import { ITeacher } from "./teacher.interface";

const AssignedSubjectSchema = new Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  group: { type: String },
});

const AssignedClassSchema = new Schema({
  classId: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String, required: true },
  shift: { type: String },
});

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    assignedSubjects: { type: [AssignedSubjectSchema], default: [] },
    assignedClasses: { type: [AssignedClassSchema], default: [] },
  },
  { timestamps: true }
);

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
