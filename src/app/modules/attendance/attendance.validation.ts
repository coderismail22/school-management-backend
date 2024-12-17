import { z } from "zod";

export const AttendanceValidations = {
  createAttendanceSchema: z.object({
    body: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
      studentId: z.string().min(1, "Student ID is required"),
      classLevel: z.number().min(1).max(12, "Class level must be between 1-12"),
      section: z.string().min(1, "Section is required"),
      subjectId: z.string().min(1, "Subject ID is required"),
      status: z.enum(["Present", "Absent", "Late"]),
      recordedBy: z.string().min(1, "Teacher ID is required"),
    }),
  }),

  updateAttendanceSchema: z.object({
    body: z.object({
      date: z.string().optional(),
      studentId: z.string().optional(),
      classLevel: z.number().optional(),
      section: z.string().optional(),
      subjectId: z.string().optional(),
      status: z.enum(["Present", "Absent", "Late"]).optional(),
      recordedBy: z.string().optional(),
    }),
  }),
};
