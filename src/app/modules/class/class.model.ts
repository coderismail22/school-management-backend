import { Schema, model } from "mongoose";
import { IClass } from "./class.interface";

const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
    hasGroups: { type: Boolean, required: true },
    groups: [{ type: String }],
    sections: [{ type: String, required: true }],
    shifts: [{ type: String, enum: ["Morning", "Evening"] }],
    subjects: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const ClassModel = model<IClass>("Class", ClassSchema);
