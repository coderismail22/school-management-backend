import { z } from "zod";

const createClassValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Class name is required"),
    hasGroups: z.boolean(),
    groups: z.array(z.string()).optional(),
    sections: z.array(z.string().min(1)).nonempty("At least one section is required"),
    shifts: z.array(z.enum(["Morning", "Evening"])).nonempty("At least one shift is required"),
    subjects: z.array(z.string()).nonempty("Subjects are required"),
  }),
});

const updateClassValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    hasGroups: z.boolean().optional(),
    groups: z.array(z.string()).optional(),
    sections: z.array(z.string()).optional(),
    shifts: z.array(z.enum(["Morning", "Evening"])).optional(),
    subjects: z.array(z.string()).optional(),
  }),
});

export const ClassValidations = {
  createClassValidationSchema,
  updateClassValidationSchema,
};
