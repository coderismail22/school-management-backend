// section.controller.ts
import { Request, Response } from 'express';
import { SectionServices } from './section.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createSection = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.createSectionInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Section created successfully",
    data: result,
  });
});

const getSection = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.getSectionFromDB(req.params.sectionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section fetched successfully",
    data: result,
  });
});

const getAllSections = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.getAllSectionsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All sections fetched successfully",
    data: result,
  });
});

const updateSection = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.updateSectionInDB(req.params.sectionId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section updated successfully",
    data: result,
  });
});

const deleteSection = catchAsync(async (req: Request, res: Response) => {
  await SectionServices.deleteSectionFromDB(req.params.sectionId);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Section deleted successfully",
  });
});

export const SectionControllers = {
  createSection,
  getSection,
  getAllSections,
  updateSection,
  deleteSection,
};
