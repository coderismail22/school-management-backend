import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ClassServices } from "./class.service";

const createClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.createClassInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Class created successfully",
    data: result,
  });
});

const getClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.getClassFromDB(req.params.classId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class fetched successfully",
    data: result,
  });
});

const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.getAllClassesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All classes fetched successfully",
    data: result,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.updateClassInDB(
    req.params.classId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class updated successfully",
    data: result,
  });
});

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.deleteClassFromDB(req.params.classId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class deleted successfully",
    data: result,
  });
});

export const ClassControllers = {
  createClass,
  getClass,
  getAllClasses,
  updateClass,
  deleteClass,
};
