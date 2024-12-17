import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { MarkServices } from "./mark.service";

const createMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkServices.createMarkInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Mark created successfully",
    data: result,
  });
});

const getMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkServices.getMarkFromDB(req.params.markId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mark fetched successfully",
    data: result,
  });
});

const getAllMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkServices.getAllMarksFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All marks fetched successfully",
    data: result,
  });
});

const updateMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkServices.updateMarkInDB(req.params.markId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mark updated successfully",
    data: result,
  });
});

const deleteMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkServices.deleteMarkFromDB(req.params.markId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mark deleted successfully",
    data: result,
  });
});

export const MarkControllers = {
  createMark,
  getMark,
  getAllMarks,
  updateMark,
  deleteMark,
};
