import { ClassModel } from "./class.model";
import { IClass } from "./class.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createClassInDB = async (payload: IClass) => {
  const result = await ClassModel.create(payload);
  return result;
};

const getClassFromDB = async (classId: string) => {
  const classData = await ClassModel.findById(classId);
  if (!classData) throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  return classData;
};

const getAllClassesFromDB = async () => {
  return await ClassModel.find();
};

const updateClassInDB = async (classId: string, payload: Partial<IClass>) => {
  const updatedClass = await ClassModel.findByIdAndUpdate(classId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedClass) throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  return updatedClass;
};

const deleteClassFromDB = async (classId: string) => {
  const deletedClass = await ClassModel.findByIdAndDelete(classId);
  if (!deletedClass) throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  return deletedClass;
};

export const ClassServices = {
  createClassInDB,
  getClassFromDB,
  getAllClassesFromDB,
  updateClassInDB,
  deleteClassFromDB,
};
