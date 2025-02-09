import { z } from "zod";

const createTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Teacher name is required"),
    teacherId: z.string().min(1, "Teacher ID is required"),
    profileImg: z.string().min(1, "Profile image is required"),
    dob: z.string().min(1, "Date of birth is required"),
    designation: z.string().min(1, "Designation is required"),
    subject: z.string().min(1, "Subject is required"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone number is required"),
    gender: z.string().min(1, "Gender is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const updateTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    teacherId: z.string().optional(),
    profileImg: z.string().optional(),
    dob: z.string().optional(),
    designation: z.string().optional(),
    subject: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const TeacherValidations = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
};
