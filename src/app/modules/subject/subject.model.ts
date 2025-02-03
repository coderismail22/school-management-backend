// src/app/modules/subject/subject.model.ts
import { Schema, model } from "mongoose";
import { ISubject } from "./subject.interface";

const SubjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      // unique: true,
    },
    year: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "NA"],
      default: "NA",
    },
    hasPlainMark: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasMCQ: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasCQ: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasPractical: {
      type: Boolean,
      required: true,
      default: false,
    },
    mcqMark: {
      type: Number,
      required: true,
      default: 0,
    },
    cqMark: {
      type: Number,
      required: true,
      default: 0,
    },
    practicalMark: {
      type: Number,
      required: true,
      default: 0,
    },
    plainMark: {
      type: Number,
      required: true,
      default: 0,
    },
    totalMark: {
      type: Number,
      required: true,
    },
    subjectTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Subject = model<ISubject>("Subject", SubjectSchema);
