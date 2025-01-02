import { Schema, model } from "mongoose";
import { INotice } from "./notice.interface";

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    publishDate: { type: String, required: true },
    category: { type: String, required: true },
    noticePdfUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return /^https?:\/\//.test(value);
        },
        message: "Invalid URL format",
      },
    },
  },
  { timestamps: true },
);

export const Notice = model<INotice>("Notice", NoticeSchema);
