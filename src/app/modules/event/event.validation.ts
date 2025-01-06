import { z } from "zod";

const createEventValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    category: z.enum(["photo", "video"]),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    type: z.enum(["ended", "upcoming"]),
  }),
});

const updateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    category: z.enum(["photo", "video"]).optional(),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    type: z.enum(["ended", "upcoming"]).optional(),
  }),
});

export const EventValidations = {
  createEventValidationSchema,
  updateEventValidationSchema,
};
