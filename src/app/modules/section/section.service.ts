// section.service.ts
import { Section } from "./section.model";
import { ISection } from "./section.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createSectionInDB = async (sectionData: ISection) => {
  const section = new Section(sectionData);
  return await section.save();
};

const getSectionFromDB = async (sectionId: string) => {
  const section = await Section.findById(sectionId);
  if (!section) throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  return section;
};

const getAllSectionsFromDB = async () => {
  return await Section.find();
};

const updateSectionInDB = async (
  sectionId: string,
  updateData: Partial<ISection>,
) => {
  const section = await Section.findByIdAndUpdate(sectionId, updateData, {
    new: true,
  });
  if (!section) throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  return section;
};

const deleteSectionFromDB = async (sectionId: string) => {
  const section = await Section.findByIdAndDelete(sectionId);
  if (!section) throw new AppError(httpStatus.NOT_FOUND, "Section not found");
};

export const SectionServices = {
  createSectionInDB,
  getSectionFromDB,
  getAllSectionsFromDB,
  updateSectionInDB,
  deleteSectionFromDB,
};
