import { Document, Types } from "mongoose";

export interface IExamSubject {
  _id?: string;
  name: string;
  code: string;
  year: string;
  version: string;
  class: string;
  shift: "Morning" | "Day" | "Evening";
  section: string;
  group?: "Science" | "Commerce" | "Arts" | "NA";
  hasMCQ: boolean;
  hasCQ: boolean;
  hasPractical: boolean;
  mcqMark?: number;
  cqMark?: number;
  practicalMark?: number;
  subjectTeacher: Types.ObjectId;
}

export interface IExam extends Document {
  name: string;
  year: string;
  version: string;
  class: string;
  shift: "Morning" | "Day" | "Evening";
  section: string;
  group?: "Science" | "Commerce" | "Arts" | "NA";
  subjects: IExamSubject[];
  students: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
