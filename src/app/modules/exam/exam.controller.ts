import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ExamServices } from "./exam.service";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.createExamInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Exam created successfully",
    data: result,
  });
});

const getExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.getExamFromDB(req.params.examId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam fetched successfully",
    data: result,
  });
});

const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.getAllExamsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All exams fetched successfully",
    data: result,
  });
});

const updateExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.updateExamInDB(req.params.examId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam updated successfully",
    data: result,
  });
});

const deleteExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.deleteExamFromDB(req.params.examId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam deleted successfully",
    data: result,
  });
});

export const ExamControllers = {
  createExam,
  getExam,
  getAllExams,
  updateExam,
  deleteExam,
};
