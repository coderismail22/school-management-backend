import { Administration } from "./administration.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createAdministrationInDB = async (payload: any) => {
  const administration = await Administration.create(payload);
  return administration;
};

const getAdministrationFromDB = async (administrationId: string) => {
  const administration = await Administration.findById(administrationId);
  if (!administration) {
    throw new AppError(httpStatus.NOT_FOUND, "Administration not found");
  }
  return administration;
};

const getAllAdministrationsFromDB = async () => {
  const administrations = await Administration.find().sort({ createdAt: -1 });
  return administrations;
};

const updateAdministrationInDB = async (
  administrationId: string,
  payload: any,
) => {
  const administration = await Administration.findByIdAndUpdate(
    administrationId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!administration) {
    throw new AppError(httpStatus.NOT_FOUND, "Administration not found");
  }
  return administration;
};

const deleteAdministrationFromDB = async (administrationId: string) => {
  const administration =
    await Administration.findByIdAndDelete(administrationId);
  if (!administration) {
    throw new AppError(httpStatus.NOT_FOUND, "Administration not found");
  }
  return administration;
};

export const AdministrationServices = {
  createAdministrationInDB,
  getAdministrationFromDB,
  getAllAdministrationsFromDB,
  updateAdministrationInDB,
  deleteAdministrationFromDB,
};
