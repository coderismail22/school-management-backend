// src/modules/attendance/attendance.model.ts
import { Schema, model } from "mongoose";
import { IAttendance } from "./attendance.interface";

const AttendanceSchema = new Schema<IAttendance>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      enum: ["Science", "Arts", "Commerce", "NA"],
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "leave"],
      default: "present",
    },
  },
  {
    timestamps: true,
  },
);

export const Attendance = model<IAttendance>("Attendance", AttendanceSchema);
