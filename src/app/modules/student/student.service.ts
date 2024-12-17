import { Student } from "./student.model";
import { IStudent } from "./student.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createStudentInDB = async (payload: IStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getStudentFromDB = async (studentId: string) => {
  const student = await Student.findById(studentId);
  if (!student) throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  return student;
};

const getAllStudentsFromDB = async () => {
  return await Student.find();
};

const updateStudentInDB = async (studentId: string, payload: Partial<IStudent>) => {
  const updatedStudent = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedStudent) throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  return updatedStudent;
};

const deleteStudentFromDB = async (studentId: string) => {
  const deletedStudent = await Student.findByIdAndDelete(studentId);
  if (!deletedStudent) throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  return deletedStudent;
};

export const StudentServices = {
  createStudentInDB,
  getStudentFromDB,
  getAllStudentsFromDB,
  updateStudentInDB,
  deleteStudentFromDB,
};
