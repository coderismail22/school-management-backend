import { SubjectModel } from "./subject.model";
import { ISubject } from "./subject.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createSubjectInDB = async (payload: ISubject) => {
  const result = await SubjectModel.create(payload);
  return result;
};

const getSubjectFromDB = async (subjectId: string) => {
  const subject = await SubjectModel.findById(subjectId);
  if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  return subject;
};

const getAllSubjectsFromDB = async () => {
  return await SubjectModel.find();
};

const updateSubjectInDB = async (
  subjectId: string,
  payload: Partial<ISubject>,
) => {
  const updatedSubject = await SubjectModel.findByIdAndUpdate(
    subjectId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedSubject)
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  return updatedSubject;
};

const deleteSubjectFromDB = async (subjectId: string) => {
  const deletedSubject = await SubjectModel.findByIdAndDelete(subjectId);
  if (!deletedSubject)
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  return deletedSubject;
};

export const SubjectServices = {
  createSubjectInDB,
  getSubjectFromDB,
  getAllSubjectsFromDB,
  updateSubjectInDB,
  deleteSubjectFromDB,
};
