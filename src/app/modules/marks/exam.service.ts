import { ExamModel } from "./exam.model";
import { IExam } from "./exam.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createExamInDB = async (payload: IExam) => {
  return await ExamModel.create(payload);
};

const getExamFromDB = async (examId: string) => {
  const exam = await ExamModel.findById(examId);
  if (!exam) throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  return exam;
};

const getAllExamsFromDB = async () => {
  return await ExamModel.find();
};

const updateExamInDB = async (examId: string, payload: Partial<IExam>) => {
  const updatedExam = await ExamModel.findByIdAndUpdate(examId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedExam) throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  return updatedExam;
};

const deleteExamFromDB = async (examId: string) => {
  const deletedExam = await ExamModel.findByIdAndDelete(examId);
  if (!deletedExam) throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  return deletedExam;
};

export const ExamServices = {
  createExamInDB,
  getExamFromDB,
  getAllExamsFromDB,
  updateExamInDB,
  deleteExamFromDB,
};
