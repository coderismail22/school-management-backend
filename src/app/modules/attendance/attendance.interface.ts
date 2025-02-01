// src/modules/attendance/attendance.interface.ts
import { Types } from "mongoose";

export type AttendanceStatus = "present" | "absent" | "late" | "leave";

export interface IAttendance {
  _id?: Types.ObjectId;
  student: Types.ObjectId; // reference to the Student doc

  date: Date;
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  status: AttendanceStatus;
  group: "Science" | "Commerce" | "Arts" | "NA";
}
