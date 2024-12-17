import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SubjectServices } from "./subject.service";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.createSubjectInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const getSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.getSubjectFromDB(req.params.subjectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject fetched successfully",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.getAllSubjectsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All subjects fetched successfully",
    data: result,
  });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.updateSubjectInDB(
    req.params.subjectId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.deleteSubjectFromDB(req.params.subjectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject deleted successfully",
    data: result,
  });
});

export const SubjectControllers = {
  createSubject,
  getSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
};
