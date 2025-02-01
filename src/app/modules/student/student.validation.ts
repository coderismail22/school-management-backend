import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    studentId: z.string().min(1, "Student ID is required"),
    roll: z.string().min(1, "Student Roll is required"),
    profileImg: z.string().url("Invalid profile image URL").optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    guardianName: z.string().min(1, "Guardian name is required"),
    address: z.string().min(1, "Address is required"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    year: z.string().min(4, "Year is required"),
    version: z.string().min(1, "Version is required"),
    shift: z.enum(["Morning", "Day", "Evening"]),
    class: z.string().min(1, "Class is required"),
    section: z.string().min(1, "Section is required"),
    group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    studentId: z.string().optional(),
    roll: z.string().optional(),
    profileImg: z.string().url("Invalid profile image URL").optional(),
    email: z.string().email("Invalid email").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
    guardianName: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
      .optional(),
    year: z.string().optional(),
    version: z.string().optional(),
    shift: z.enum(["Morning", "Day", "Evening"]).optional(),
    class: z.string().optional(),
    section: z.string().optional(),
    group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
