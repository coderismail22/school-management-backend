import { ResultModel } from "./result.model";
import { IResult } from "./result.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createResultInDB = async (payload: IResult) => {
  return await ResultModel.create(payload);
};

const getResultFromDB = async (resultId: string) => {
  const result = await ResultModel.findById(resultId);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Result not found");
  return result;
};

const getAllResultsFromDB = async () => {
  return await ResultModel.find();
};

const updateResultInDB = async (resultId: string, payload: Partial<IResult>) => {
  const updatedResult = await ResultModel.findByIdAndUpdate(resultId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedResult) throw new AppError(httpStatus.NOT_FOUND, "Result not found");
  return updatedResult;
};

const deleteResultFromDB = async (resultId: string) => {
  const deletedResult = await ResultModel.findByIdAndDelete(resultId);
  if (!deletedResult) throw new AppError(httpStatus.NOT_FOUND, "Result not found");
  return deletedResult;
};

export const ResultServices = {
  createResultInDB,
  getResultFromDB,
  getAllResultsFromDB,
  updateResultInDB,
  deleteResultFromDB,
};
