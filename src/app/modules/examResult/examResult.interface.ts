// src/app/modules/examResult/examResult.interface.ts
import { Document, Types } from "mongoose";

export interface IMarksBreakdown {
  mcqMark?: number;
  cqMark?: number;
  practicalMark?: number;
  plainMark?: number;
  totalMark?: number; // or compute it from the other fields
}

export interface IExamResult extends Document {
  examId: Types.ObjectId; // references Exam
  examSubjectId: Types.ObjectId; // the _id of the subdocument in Exam.subjects
  studentId: Types.ObjectId; // references Student
  teacherId: Types.ObjectId; // references Teacher who entered the marks
  marks: IMarksBreakdown;
  createdAt?: Date;
  updatedAt?: Date;
}
