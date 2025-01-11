import { Request, Response } from "express";
import { NoticeBannerServices } from "./noticeBanner.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createNoticeBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeBannerServices.createNoticeBannerInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice Banner created successfully!",
    data: result,
  });
});

const getNoticeBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeBannerServices.getNoticeBannerFromDB(req.params.noticeBannerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice Banner retrieved successfully!",
    data: result,
  });
});

const getAllNoticeBanners = catchAsync(async (_req: Request, res: Response) => {
  const result = await NoticeBannerServices.getAllNoticeBannersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Notice Banners retrieved successfully!",
    data: result,
  });
});

const updateNoticeBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeBannerServices.updateNoticeBannerInDB(
    req.params.noticeBannerId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice Banner updated successfully!",
    data: result,
  });
});

const deleteNoticeBanner = catchAsync(async (req: Request, res: Response) => {
  await NoticeBannerServices.deleteNoticeBannerFromDB(req.params.noticeBannerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice Banner deleted successfully!",
  });
});

export const NoticeBannerControllers = {
  createNoticeBanner,
  getNoticeBanner,
  getAllNoticeBanners,
  updateNoticeBanner,
  deleteNoticeBanner,
};
