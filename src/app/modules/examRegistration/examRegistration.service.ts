// src/app/modules/examRegistration/examRegistration.service.ts
import { ExamRegistration } from "./examRegistration.model";
import { IExamRegistration } from "./examRegistration.interface";
import httpStatus from "http-status";
import { Types, FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";

const bulkRegister = async (
  examId: string,
  studentIds: string[],
): Promise<IExamRegistration[]> => {
  // Convert strings to ObjectIds:
  const examObjectId = new Types.ObjectId(examId);
  const registrationsToInsert = studentIds.map((sid) => ({
    examId: examObjectId,
    studentId: new Types.ObjectId(sid),
  }));

  // InsertMany in one shot
  // If you have a unique index, duplicates will error out
  // We can handle that with try/catch or "ordered: false"
  const result = await ExamRegistration.insertMany(registrationsToInsert, {
    ordered: false, // continue on duplicate errors (optional)
  });
  return result;
};

const getRegistrations = async (filters: any): Promise<IExamRegistration[]> => {
  const query: FilterQuery<IExamRegistration> = {};

  if (filters.examId) {
    query.examId = new Types.ObjectId(filters.examId);
  }
  if (filters.studentId) {
    query.studentId = new Types.ObjectId(filters.studentId);
  }

  const registrations = await ExamRegistration.find(query)
    .populate("examId")
    .populate("studentId");
  return registrations;
};

const getRegistration = async (
  filters: any,
): Promise<IExamRegistration | null> => {
  const query: FilterQuery<IExamRegistration> = {};

  if (filters.registrationId) {
    query._id = new Types.ObjectId(filters.registrationId);
  }

  if (filters.examId) {
    query.examId = new Types.ObjectId(filters.examId);
  }

  if (filters.studentId) {
    query.studentId = new Types.ObjectId(filters.studentId);
  }


  const registration = await ExamRegistration.findOne(query)
    .populate("examId")
    .populate("studentId");
  return registration;
};

const deleteRegistration = async (
  registrationId: string,
): Promise<IExamRegistration> => {
  const registration = await ExamRegistration.findByIdAndDelete(registrationId);
  if (!registration) {
    throw new AppError(httpStatus.NOT_FOUND, "Registration not found");
  }
  return registration;
};

export const ExamRegistrationServices = {
  bulkRegister,
  getRegistrations,
  getRegistration,
  deleteRegistration,
};
