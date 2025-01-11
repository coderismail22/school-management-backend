import { Schema, model } from "mongoose";
import { INoticeBanner } from "./noticeBanner.interface";

const NoticeBannerSchema = new Schema<INoticeBanner>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NoticeBanner = model<INoticeBanner>("NoticeBanner", NoticeBannerSchema);
