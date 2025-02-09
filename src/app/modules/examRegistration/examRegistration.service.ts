// src/app/modules/examRegistration/examRegistration.service.ts
import { ExamRegistration } from "./examRegistration.model";
import { IExamRegistration } from "./examRegistration.interface";
import httpStatus from "http-status";
import mongoose, { Types, FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";
import { Exam } from "../exam/exam.model";

const bulkRegisterWithExamUpdate = async (
  examId: string,
  studentIds: string[],
): Promise<IExamRegistration[]> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const examObjectId = new Types.ObjectId(examId);

    // Step 1: Check for existing registrations
    const existingRegistrations = await ExamRegistration.find({
      examId: examObjectId,
      studentId: { $in: studentIds.map((id) => new Types.ObjectId(id)) },
    });

    // Filter out already registered student IDs
    const alreadyRegisteredIds = existingRegistrations.map((reg) =>
      reg.studentId.toString(),
    );
    const newStudentIds = studentIds.filter(
      (id) => !alreadyRegisteredIds.includes(id),
    );

    // Step 2: Register new students if any
    let registrations: IExamRegistration[] = [];
    if (newStudentIds.length > 0) {
      const registrationsToInsert = newStudentIds.map((sid) => ({
        examId: examObjectId,
        studentId: new Types.ObjectId(sid),
      }));

      registrations = await ExamRegistration.insertMany(registrationsToInsert, {
        session,
      });
    }

    // Step 3: Update the exam document with new student IDs
    await Exam.findByIdAndUpdate(
      examObjectId,
      {
        $addToSet: {
          students: {
            $each: newStudentIds.map((id) => new Types.ObjectId(id)),
          },
        },
      },
      { session },
    );

    // Step 4: Commit transaction
    await session.commitTransaction();
    session.endSession();

    return registrations;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(500, "Failed to register students");
  }
};

//With query filters
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

//Without query filters
const getSpecificExamRegistrations = async (
  examId: string,
): Promise<IExamRegistration[]> => {
  // const examObjectId = new Types.ObjectId(examId);
  // console.log("examId", examObjectId);
  const registrations = await ExamRegistration.find({ examId: examId })
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
  bulkRegisterWithExamUpdate,
  getRegistrations,
  getSpecificExamRegistrations,
  getRegistration,
  deleteRegistration,
};
