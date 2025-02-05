// src/app/modules/examResult/examResult.service.ts
import { ExamResult } from "./examResult.model";
import { IExamResult } from "./examResult.interface";
import { Types } from "mongoose";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Exam } from "../exam/exam.model";
import { Subject } from "../subject/subject.model";
import { validateMark } from "./examResult.util";

const createOrUpdateExamResult = async (
  payload: IExamResult,
): Promise<IExamResult> => {
  // TODO: Check if the teacher is allowed to update the subject
  // const payloadTeacher = payload?.teacherId;
  // if (payloadTeacher !== exam._id) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "You are not allowed to entry marks for this subject.",
  //   );
  // }
  const payloadExamId = payload?.examId;

  // Find the exam document
  const exam = await Exam.findById(payloadExamId);
  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }

  // Find the subject document
  const subject = await Subject.findOne({ _id: payload?.examSubjectId });

  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }

  // console.log("mark entry", payload);
  // console.log("exam", exam);

  // Validate each type of mark (Less Than, Greater Than, Negative, Undefined, Null etc.)
  validateMark(payload?.marks?.mcqMark ?? 0, subject?.mcqMark ?? 0, "MCQ");
  validateMark(payload?.marks?.cqMark ?? 0, subject?.cqMark ?? 0, "CQ");
  validateMark(
    payload?.marks?.practicalMark ?? 0,
    subject?.practicalMark ?? 0,
    "Practical",
  );
  validateMark(
    payload?.marks?.plainMark ?? 0,
    subject?.plainMark ?? 0,
    "Plain",
  );
  const {
    mcqMark = 0,
    cqMark = 0,
    practicalMark = 0,
    plainMark = 0,
  } = payload.marks;
  payload.marks.totalMark = mcqMark + cqMark + practicalMark + plainMark;

  // Upsert logic: If a record for (examId, examSubjectId, studentId) already exists, update it
  const filter = {
    examId: new Types.ObjectId(payload.examId),
    examSubjectId: new Types.ObjectId(payload.examSubjectId),
    studentId: new Types.ObjectId(payload.studentId),
  };

  const update = {
    $set: {
      teacherId: new Types.ObjectId(payload.teacherId),
      marks: payload.marks,
    },
  };

  const options = { upsert: true, new: true };

  const result = await ExamResult.findOneAndUpdate(filter, update, options);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create/update exam result",
    );
  }
  return result;
};

const getExamResult = async (id: string): Promise<IExamResult> => {
  const examResult = await ExamResult.findById(id)
    .populate("examId")
    .populate("studentId")
    .populate("teacherId");
  if (!examResult) {
    throw new AppError(httpStatus.NOT_FOUND, "Result not found");
  }
  return examResult;
};

// For retrieving multiple results, e.g. to show a student's entire result or all results for an exam
const getExamResults = async (query: any): Promise<IExamResult[]> => {
  const findQuery: any = {};
  if (query.examId) findQuery.examId = new Types.ObjectId(query.examId);
  if (query.examSubjectId) findQuery.examSubjectId = query.examSubjectId;
  if (query.studentId)
    findQuery.studentId = new Types.ObjectId(query.studentId);
  if (query.teacherId)
    findQuery.teacherId = new Types.ObjectId(query.teacherId);

  // console.log("find query", findQuery);

  const results = await ExamResult.find(findQuery)
    .populate("examId")
    .populate("studentId")
    .populate("examSubjectId")
    .populate("teacherId");
  return results;
};

export const ExamResultServices = {
  createOrUpdateExamResult,
  getExamResult,
  getExamResults,
};
