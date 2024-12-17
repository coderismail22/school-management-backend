import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { GradeServices } from "./grade.service";

const createGrade = catchAsync(async (req: Request, res: Response) => {
  const grade = await GradeServices.createGradeInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Grade created successfully",
    data: grade,
  });
});

const getGrade = catchAsync(async (req: Request, res: Response) => {
  const grade = await GradeServices.getGradeFromDB(req.params.gradeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grade fetched successfully",
    data: grade,
  });
});

const getAllGrades = catchAsync(async (req: Request, res: Response) => {
  const grades = await GradeServices.getAllGradesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All grades fetched successfully",
    data: grades,
  });
});

const updateGrade = catchAsync(async (req: Request, res: Response) => {
  const grade = await GradeServices.updateGradeInDB(req.params.gradeId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grade updated successfully",
    data: grade,
  });
});

const deleteGrade = catchAsync(async (req: Request, res: Response) => {
  const grade = await GradeServices.deleteGradeFromDB(req.params.gradeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grade deleted successfully",
    data: grade,
  });
});

export const GradeControllers = {
  createGrade,
  getGrade,
  getAllGrades,
  updateGrade,
  deleteGrade,
};
