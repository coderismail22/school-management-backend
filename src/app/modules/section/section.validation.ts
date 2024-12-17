// section.validation.ts
import { z } from 'zod';

const createSectionValidationSchema = z.object({
  body: z.object({
    classId: z.string().min(1, "Class ID is required"),
    name: z.string().min(1, "Section name is required"),
  }),
});

const updateSectionValidationSchema = z.object({
  body: z.object({
    classId: z.string().optional(),
    name: z.string().optional(),
    teacherId: z.string().optional(),
    students: z.array(z.string()).optional(),
  }),
});

export const SectionValidations = {
  createSectionValidationSchema,
  updateSectionValidationSchema,
};
