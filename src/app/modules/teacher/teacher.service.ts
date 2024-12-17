import httpStatus from "http-status";
import { Teacher } from "./teacher.model";
import { ITeacher } from "./teacher.interface";
import AppError from "../../errors/AppError";

const createTeacherInDB = async (payload: ITeacher): Promise<ITeacher> => {
  const teacher = await Teacher.create(payload);
  return teacher;
};

const getTeacherFromDB = async (
  teacherId: string,
): Promise<ITeacher | null> => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  return teacher;
};

const getAllTeachersFromDB = async (): Promise<ITeacher[]> => {
  return await Teacher.find();
};

const updateTeacherInDB = async (
  teacherId: string,
  payload: Partial<ITeacher>,
): Promise<ITeacher | null> => {
  const teacher = await Teacher.findByIdAndUpdate(teacherId, payload, {
    new: true,
    runValidators: true,
  });
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  return teacher;
};

const deleteTeacherFromDB = async (teacherId: string): Promise<void> => {
  const result = await Teacher.findByIdAndDelete(teacherId);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
};

export const TeacherServices = {
  createTeacherInDB,
  getTeacherFromDB,
  getAllTeachersFromDB,
  updateTeacherInDB,
  deleteTeacherFromDB,
};
