import { Schema, model } from "mongoose";
import { IAdministration } from "./administration.interface";

const AdministrationSchema = new Schema<IAdministration>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    category: {
      type: String,
      enum: ["Governing Body", "Teacher", "Staff"],
      required: true,
    },
    linkedIn: { type: String, default: "" },
    fb: { type: String, default: "" },
    x: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Administration = model<IAdministration>(
  "Administration",
  AdministrationSchema,
);
