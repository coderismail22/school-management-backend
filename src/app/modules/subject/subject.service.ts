// src/app/modules/subject/subject.service.ts
import httpStatus from "http-status";
import { Subject } from "./subject.model";
import { ISubject } from "./subject.interface";
import { FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";

const createSubjectInDB = async (payload: ISubject): Promise<ISubject> => {
  // Optionally validate teacher existence, etc.
  const createdSubject = await Subject.create(payload);
  return createdSubject;
};

const getSubjectFromDB = async (subjectId: string): Promise<ISubject> => {
  const subject = await Subject.findById(subjectId).populate("subjectTeacher");
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }
  return subject;
};

const updateSubjectInDB = async (
  subjectId: string,
  payload: Partial<ISubject>,
): Promise<ISubject> => {
  const updatedSubject = await Subject.findByIdAndUpdate(subjectId, payload, {
    new: true,
  }).populate("subjectTeacher");

  if (!updatedSubject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }
  return updatedSubject;
};

const deleteSubjectFromDB = async (subjectId: string): Promise<ISubject> => {
  const subject = await Subject.findByIdAndDelete(subjectId);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }
  return subject;
};

const getAllSubjectsFromDB = async (filters: any): Promise<ISubject[]> => {
  const filterQuery: FilterQuery<ISubject> = {};

  if (filters.year) filterQuery.year = filters.year;
  if (filters.version) filterQuery.version = filters.version;
  if (filters.class) filterQuery.class = filters.class;
  if (filters.shift) filterQuery.shift = filters.shift;
  if (filters.section) filterQuery.section = filters.section;
  if (filters.group) filterQuery.group = filters.group;

  const subjects = await Subject.find(filterQuery).populate("subjectTeacher");
  return subjects;
};

export const SubjectServices = {
  createSubjectInDB,
  getSubjectFromDB,
  updateSubjectInDB,
  deleteSubjectFromDB,
  getAllSubjectsFromDB,
};
