import { z } from "zod";

export const AssignmentValidations = {
  createAssignmentSchema: z.object({
    body: z.object({
      teacherId: z.string().min(1, "Teacher ID is required"),
      classId: z.string().min(1, "Class ID is required"),
      section: z.string().min(1, "Section is required"),
      group: z.string().optional(),
      subjectId: z.string().min(1, "Subject ID is required"),
    }),
  }),

  updateAssignmentSchema: z.object({
    body: z.object({
      teacherId: z.string().optional(),
      classId: z.string().optional(),
      section: z.string().optional(),
      group: z.string().optional(),
      subjectId: z.string().optional(),
    }),
  }),
};
