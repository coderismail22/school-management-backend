import { GradeModel } from "./grade.model";
import { IGrade } from "./grade.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createGradeInDB = async (payload: IGrade) => {
  return await GradeModel.create(payload);
};

const getGradeFromDB = async (gradeId: string) => {
  const grade = await GradeModel.findById(gradeId);
  if (!grade) throw new AppError(httpStatus.NOT_FOUND, "Grade not found");
  return grade;
};

const getAllGradesFromDB = async () => {
  return await GradeModel.find();
};

const updateGradeInDB = async (gradeId: string, payload: Partial<IGrade>) => {
  const updatedGrade = await GradeModel.findByIdAndUpdate(gradeId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedGrade)
    throw new AppError(httpStatus.NOT_FOUND, "Grade not found");
  return updatedGrade;
};

const deleteGradeFromDB = async (gradeId: string) => {
  const deletedGrade = await GradeModel.findByIdAndDelete(gradeId);
  if (!deletedGrade)
    throw new AppError(httpStatus.NOT_FOUND, "Grade not found");
  return deletedGrade;
};

export const GradeServices = {
  createGradeInDB,
  getGradeFromDB,
  getAllGradesFromDB,
  updateGradeInDB,
  deleteGradeFromDB,
};
