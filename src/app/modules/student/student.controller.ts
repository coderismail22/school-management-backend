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
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.deleteStudentFromDB(req.params.studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
