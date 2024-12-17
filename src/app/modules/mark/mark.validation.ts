import { z } from "zod";

const markSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  examId: z.string().min(1, "Exam ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  marks: z.object({
    mcq: z.number().optional(),
    cq: z.number().optional(),
    practical: z.number().optional(),
    total: z.number().positive("Total marks are required"),
  }),
});

export const MarkValidations = {
  createMarkSchema: z.object({ body: markSchema }),
  updateMarkSchema: z.object({
    body: markSchema.partial(),
  }),
};
