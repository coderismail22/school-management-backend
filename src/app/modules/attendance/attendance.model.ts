import { Schema, model } from "mongoose";
import { IAttendance } from "./attendance.interface";

const AttendanceSchema = new Schema<IAttendance>(
  {
    date: { type: String, required: true },
    studentId: { type: String, required: true },
    classLevel: { type: Number, required: true },
    section: { type: String, required: true },
    subjectId: { type: String, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true,
    },
    recordedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  AttendanceSchema
);
