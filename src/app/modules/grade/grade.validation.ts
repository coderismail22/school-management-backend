import { z } from "zod";

export const GradeValidations = {
  createGradeSchema: z.object({
    body: z.object({
      grade: z.string().min(1, "Grade is required"),
      minMarks: z.number().min(0, "Minimum marks must be a positive number"),
      maxMarks: z.number().min(0, "Maximum marks must be a positive number"),
      gradePoint: z.number().min(0, "Grade point must be a positive number"),
    }),
  }),

  updateGradeSchema: z.object({
    body: z.object({
      grade: z.string().optional(),
      minMarks: z.number().optional(),
      maxMarks: z.number().optional(),
      gradePoint: z.number().optional(),
    }),
  }),
};
