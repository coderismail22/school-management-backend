import { NoticeBanner } from "./noticeBanner.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createNoticeBannerInDB = async (payload: { title: string }) => {
  const noticeBanner = await NoticeBanner.create(payload);
  return noticeBanner;
};

const getNoticeBannerFromDB = async (noticeBannerId: string) => {
  const noticeBanner = await NoticeBanner.findById(noticeBannerId);
  if (!noticeBanner) {
    throw new AppError(httpStatus.NOT_FOUND, "Notice Banner not found");
  }
  return noticeBanner;
};

const getAllNoticeBannersFromDB = async () => {
  return await NoticeBanner.find();
};

const updateNoticeBannerInDB = async (
  noticeBannerId: string,
  payload: Partial<{ title: string }>
) => {
  const updatedNoticeBanner = await NoticeBanner.findByIdAndUpdate(
    noticeBannerId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedNoticeBanner) {
    throw new AppError(httpStatus.NOT_FOUND, "Notice Banner not found");
  }
  return updatedNoticeBanner;
};

const deleteNoticeBannerFromDB = async (noticeBannerId: string) => {
  const deletedNoticeBanner = await NoticeBanner.findByIdAndDelete(noticeBannerId);
  if (!deletedNoticeBanner) {
    throw new AppError(httpStatus.NOT_FOUND, "Notice Banner not found");
  }
  return deletedNoticeBanner;
};

export const NoticeBannerServices = {
  createNoticeBannerInDB,
  getNoticeBannerFromDB,
  getAllNoticeBannersFromDB,
  updateNoticeBannerInDB,
  deleteNoticeBannerFromDB,
};
