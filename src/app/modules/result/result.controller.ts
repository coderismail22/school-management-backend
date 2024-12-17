import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ResultServices } from "./result.service";

const createResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.createResultInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Result created successfully",
    data: result,
  });
});

const getResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.getResultFromDB(req.params.resultId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result fetched successfully",
    data: result,
  });
});

const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const results = await ResultServices.getAllResultsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All results fetched successfully",
    data: results,
  });
});

const updateResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.updateResultInDB(
    req.params.resultId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result updated successfully",
    data: result,
  });
});

const deleteResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.deleteResultFromDB(req.params.resultId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result deleted successfully",
    data: result,
  });
});

export const ResultControllers = {
  createResult,
  getResult,
  getAllResults,
  updateResult,
  deleteResult,
};
