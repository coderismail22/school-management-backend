// src/app/modules/examRegistration/examRegistration.validation.ts
import { z } from "zod";

const bulkRegisterValidationSchema = z.object({
  body: z.object({
    examId: z.string().min(1, "Exam ID is required"),
    studentIds: z.array(z.string()).min(1, "At least one student ID required"),
  }),
});

const getRegistrationsValidationSchema = z.object({
  query: z.object({
    examId: z.string().optional(),
    studentId: z.string().optional(),
  }),
});

export const ExamRegistrationValidation = {
  bulkRegisterValidationSchema,
  getRegistrationsValidationSchema,
};
