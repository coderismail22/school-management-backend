// src/modules/attendance/attendance.validation.ts
import { z } from "zod";

const loadAttendanceValidationSchema = z.object({
  query: z.object({
    year: z.string().min(1),
    version: z.string().min(1),
    class: z.string().min(1),
    section: z.string().min(1),
    shift: z.string().min(1),
    date: z.string().min(1), // We'll parse to Date
  }),
});

const updateAttendanceValidationSchema = z.object({
  // We'll receive an array of objects
  body: z.array(
    z.object({
      // We expect "student" to be the student's _id (string)
      student: z.string().min(1),
      date: z.string().min(1),
      year: z.string().min(1),
      version: z.string().min(1),
      shift: z.string().min(1),
      class: z.string().min(1),
      section: z.string().min(1),
      status: z.enum(["present", "absent", "late", "leave"]),
    }),
  ),
});

export const AttendanceValidations = {
  loadAttendanceValidationSchema,
  updateAttendanceValidationSchema,
};
