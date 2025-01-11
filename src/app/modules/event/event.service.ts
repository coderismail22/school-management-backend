/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from "./event.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createEventInDB = async (eventData: any) => {
  return await Event.create(eventData);
};

const getEventFromDB = async (eventId: string) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  return event;
};

const getAllEventsFromDB = async () => {
  return await Event.find().sort({ createdAt: -1 });
};

const updateEventInDB = async (eventId: string, updateData: any) => {
  const event = await Event.findByIdAndUpdate(eventId, updateData, {
    new: true,
  });
  if (!event) throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  return event;
};

const deleteEventFromDB = async (eventId: string) => {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) throw new AppError(httpStatus.NOT_FOUND, "Event not found");
};

export const EventServices = {
  createEventInDB,
  getEventFromDB,
  getAllEventsFromDB,
  updateEventInDB,
  deleteEventFromDB,
};
