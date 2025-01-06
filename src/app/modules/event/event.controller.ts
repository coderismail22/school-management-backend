import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EventServices } from "./event.service";
import httpStatus from "http-status";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.createEventInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getEventFromDB(req.params.eventId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event fetched successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (_req: Request, res: Response) => {
  const result = await EventServices.getAllEventsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events fetched successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.updateEventInDB(req.params.eventId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  await EventServices.deleteEventFromDB(req.params.eventId);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Event deleted successfully",
  });
});

export const EventControllers = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
