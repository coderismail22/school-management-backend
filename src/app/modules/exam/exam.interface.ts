// src/app/modules/exam/exam.interface.ts
import { Document, Types } from "mongoose";

export interface IExamSubject {
  _id?: string;
  name: string; // e.g., "Bangla 1st Paper"
  code: string; // e.g., "BNG101"
  year: string;
  version: string;
  class: string;
  shift: "Morning" | "Day" | "Evening";
  section: string;
  group?: "Science" | "Commerce" | "Arts" | "NA";
  hasPlainMarks: boolean;
  hasMCQ: boolean;
  hasCQ: boolean;
  hasPractical: boolean;
  mcqMarks?: number;
  cqMarks?: number;
  practicalMarks?: number;
  plainMarks?: number;
  // totalMarks: number;
  subjectTeacher: Types.ObjectId;
}

export interface IExam extends Document {
  name: string; // e.g., "Midterm", "Final"
  year: string; // e.g., "2025"
  version: string;
  class: string;
  shift: "Morning" | "Day" | "Evening";
  section: string;
  group?: "Science" | "Commerce" | "Arts" | "NA";
  subjects: IExamSubject[];
  students: Types.ObjectId[]; // references Student documents
  createdAt?: Date;
  updatedAt?: Date;
}
