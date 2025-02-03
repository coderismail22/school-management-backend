// src/app/modules/examRegistration/examRegistration.interface.ts
import { Document, Types } from "mongoose";

export interface IExamRegistration extends Document {
  examId: Types.ObjectId;     // references Exam
  studentId: Types.ObjectId;  // references Student
  status?: string;            // e.g., "registered", "canceled"
  createdAt?: Date;
  updatedAt?: Date;
}
