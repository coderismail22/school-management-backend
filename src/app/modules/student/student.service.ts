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

const updateStudentInDB = async (
  studentId: string,
  payload: Partial<IStudent>,
) => {
  console.log('payloaddddd',payload)
  const updatedStudent = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedStudent)
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  return updatedStudent;
};

const deleteStudentFromDB = async (studentId: string) => {
  const deletedStudent = await Student.findByIdAndDelete(studentId);
  if (!deletedStudent)
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  return deletedStudent;
};
const getDistinctYearsFromDB = async () => {
  return await Student.distinct("year");
};

const getDistinctVersionsFromDB = async (year: string) => {
  return await Student.distinct("version", { year });
};

const getDistinctClassesFromDB = async (year: string, version: string) => {
  return await Student.distinct("class", { year, version });
};

const getDistinctSectionsFromDB = async (
  year: string,
  version: string,
  className: string,
) => {
  return await Student.distinct("section", { year, version, class: className });
};

const getDistinctGroupsFromDB = async (
  year: string,
  version: string,
  className: string,
) => {
  if (parseInt(className) < 9) return []; // ✅ No group needed for classes < 9
  return await Student.distinct("group", { year, version, class: className });
};

// TODO: Add types here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterStudentsFromDB = async (filters: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};
  if (filters.year) query.year = filters.year;
  if (filters.version) query.version = filters.version;
  if (filters.class) query.class = filters.class;
  if (filters.shift) query.shift = filters.shift;
  if (filters.section) query.section = filters.section;
  if (filters.group) query.group = filters.group; // ✅ Added group filter

  return await Student.find(query);
};

export const StudentServices = {
  createStudentInDB,
  getStudentFromDB,
  getAllStudentsFromDB,
  updateStudentInDB,
  deleteStudentFromDB,
  getDistinctYearsFromDB,
  getDistinctVersionsFromDB,
  getDistinctClassesFromDB,
  getDistinctSectionsFromDB,
  filterStudentsFromDB,
  getDistinctGroupsFromDB,
};
