// src/app/modules/subject/subject.interface.ts
import { Document, Types } from "mongoose";
export interface ISubject extends Document {
  name: string; // e.g., "Bangla 1st Paper"
  code: string; // custom code, e.g., "BNG101"
  year: string; // e.g., "2025"
  version: string; // e.g., "Bangla" / "English"
  class: string; // e.g., "10"
  shift: "Morning" | "Day" | "Evening";
  section: string; // e.g., "A"
  group: "Science" | "Commerce" | "Arts" | "NA";
  hasPlainMark: boolean; // If there's no MCQ/CQ/Practical
  hasMCQ: boolean;
  hasCQ: boolean;
  hasPractical: boolean;
  mcqMark: number;
  cqMark: number;
  practicalMark: number;
  plainMark: number;
  totalMark: number;
  subjectTeacher: Types.ObjectId; // references a Teacher
}
