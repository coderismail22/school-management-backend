// src/app/modules/exam/exam.service.ts
import { Exam } from "./exam.model";
import { IExam } from "./exam.interface";
import httpStatus from "http-status";
import { FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";
import { Subject } from "../subject/subject.model";

// OLD
// const createExamInDB = async (payload: IExam): Promise<IExam> => {
//   const newExam = await Exam.create(payload);
//   return newExam;
// };

// New Solution:
const createExamInDB = async (payload: IExam): Promise<IExam> => {
  // 1. Fetch the subjects that match the criteria (e.g., class, year, etc.)
  const subjects = await Subject.find({
    year: payload.year,
    version: payload.version,
    class: payload.class,
    shift: payload.shift,
    section: payload.section,
    group: payload.group,
  });

  if (subjects.length === 0) {
    throw new Error("No subjects found for the given criteria");
  }

  // 2. Use the fetched subjects' data in the exam creation payload
  payload.subjects = subjects.map((subject) => ({
    _id: subject._id, // Use the existing subject's `_id`
    name: subject.name,
    code: subject.code,
    year: subject.year,
    version: subject.version,
    class: subject.class,
    shift: subject.shift,
    section: subject.section,
    group: subject.group,
    hasPlainMarks: subject.hasPlainMarks,
    hasMCQ: subject.hasMCQ,
    hasCQ: subject.hasCQ,
    hasPractical: subject.hasPractical,
    mcqMarks: subject.mcqMarks,
    cqMarks: subject.cqMarks,
    practicalMarks: subject.practicalMarks,
    plainMarks: subject.plainMarks,
    totalMarks: subject.totalMarks,
    subjectTeacher: subject.subjectTeacher,
  }));

  // 3. Create the exam with the updated subjects
  const newExam = await Exam.create(payload);

  return newExam;
};

const getExamFromDB = async (examId: string): Promise<IExam> => {
  const exam = await Exam.findById(examId)
    .populate("subjects.subjectTeacher")
    .populate("students");
  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }
  return exam;
};

const updateExamInDB = async (
  examId: string,
  payload: Partial<IExam>,
): Promise<IExam> => {
  const updatedExam = await Exam.findByIdAndUpdate(examId, payload, {
    new: true,
  })
    .populate("subjects.subjectTeacher")
    .populate("students");
  if (!updatedExam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }
  return updatedExam;
};

const deleteExamFromDB = async (examId: string): Promise<IExam> => {
  const exam = await Exam.findByIdAndDelete(examId);
  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }
  return exam;
};

const getAllExamsFromDB = async (filters: any): Promise<IExam[]> => {
  const filterQuery: FilterQuery<IExam> = {};
  console.log("service filterQuery", filterQuery);
  if (filters.year) filterQuery.year = filters.year;
  if (filters.version) filterQuery.version = filters.version;
  if (filters.class) filterQuery.class = filters.class;
  if (filters.shift) filterQuery.shift = filters.shift;
  if (filters.section) filterQuery.section = filters.section;
  if (filters.group) filterQuery.group = filters.group;

  const exams = await Exam.find(filterQuery)
    .populate("subjects.subjectTeacher")
    .populate("students");
  return exams;
};

// Teacher only exams
interface ExamFilters {
  year?: string;
  version?: string;
  className?: string;
  shift?: string;
  section?: string;
  group?: string;
  teacherId?: string;
}

const getTeacherExams = async (filters: ExamFilters): Promise<IExam[]> => {
  const filterQuery: any = {};

  // Add filters to the query
  if (filters.year) filterQuery.year = filters.year;
  if (filters.version) filterQuery.version = filters.version;
  if (filters.className) filterQuery.class = filters.className;
  if (filters.shift) filterQuery.shift = filters.shift;
  if (filters.section) filterQuery.section = filters.section;
  if (filters.group) filterQuery.group = filters.group;

  // Fetch exams and populate subjects and their teachers
  const exams = await Exam.find(filterQuery).populate(
    "subjects.subjectTeacher",
  );
  // .populate("students");

  // Filter exams based on teacher ID
  return exams.filter((exam) =>
    exam.subjects.some(
      (subject) => subject.subjectTeacher._id.toString() === filters.teacherId,
    ),
  );
};

export const ExamServices = {
  createExamInDB,
  getExamFromDB,
  updateExamInDB,
  deleteExamFromDB,
  getAllExamsFromDB,
  getTeacherExams,
};
