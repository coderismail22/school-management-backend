import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { StudentServices } from "./student.service";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.createStudentInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getStudentFromDB(req.params.studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully",
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students fetched successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.updateStudentInDB(
    req.params.studentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.deleteStudentFromDB(
    req.params.studentId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

const getDistinctYears = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getDistinctYearsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Years fetched successfully",
    data: result,
  });
});

const getDistinctVersions = catchAsync(async (req: Request, res: Response) => {
  const { year } = req.params;
  const result = await StudentServices.getDistinctVersionsFromDB(year);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Versions fetched successfully",
    data: result,
  });
});

const getDistinctClasses = catchAsync(async (req: Request, res: Response) => {
  const { year, version } = req.params;
  const result = await StudentServices.getDistinctClassesFromDB(year, version);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Classes fetched successfully",
    data: result,
  });
});

const getDistinctSections = catchAsync(async (req: Request, res: Response) => {
  const { year, version, class: className } = req.params;
  const result = await StudentServices.getDistinctSectionsFromDB(
    year,
    version,
    className,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sections fetched successfully",
    data: result,
  });
});

const filterStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await StudentServices.filterStudentsFromDB(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Filtered students fetched successfully",
    data: result,
  });
});

const getDistinctGroups = catchAsync(async (req: Request, res: Response) => {
  const { year, version, class: className } = req.params;
  const result = await StudentServices.getDistinctGroupsFromDB(
    year,
    version,
    className,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Groups fetched successfully",
    data: result,
  });
});
export const StudentControllers = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  filterStudents,
  getDistinctClasses,
  getDistinctSections,
  getDistinctVersions,
  getDistinctYears,
  getDistinctGroups,
};
