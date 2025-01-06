import { Schema, model } from "mongoose";
import { IEvent } from "./event.interface";

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, enum: ["photo", "video"], required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
    type: { type: String, enum: ["ended", "upcoming"], required: true },
  },
  { timestamps: true },
);

export const Event = model<IEvent>("Event", EventSchema);
