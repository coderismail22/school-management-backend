// src/app/modules/subject/subject.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { ISubject } from "./subject.interface";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { SubjectServices } from "./subject.service";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.createSubjectInDB(req.body);
  sendResponse<ISubject>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const getSubjectById = catchAsync(async (req: Request, res: Response) => {
  const { subjectId } = req.params;
  const result = await SubjectServices.getSubjectFromDB(subjectId);
  sendResponse<ISubject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject retrieved successfully",
    data: result,
  });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const { subjectId } = req.params;
  const result = await SubjectServices.updateSubjectInDB(subjectId, req.body);
  sendResponse<ISubject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const { subjectId } = req.params;
  const result = await SubjectServices.deleteSubjectFromDB(subjectId);
  sendResponse<ISubject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject deleted successfully",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  // We can add filtering logic by year/version/class if needed
  const filters = req.query;
  const result = await SubjectServices.getAllSubjectsFromDB(filters);
  sendResponse<ISubject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subjects retrieved successfully",
    data: result,
  });
});

export const SubjectController = {
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getAllSubjects,
};
