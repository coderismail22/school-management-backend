import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./event.controller";
import { EventValidations } from "./event.validation";

const router = express.Router();

router.post(
  "/publish-event",
  validateRequest(EventValidations.createEventValidationSchema),
  EventControllers.createEvent,
);

router.get("/:eventId", EventControllers.getEvent);

router.get("/", EventControllers.getAllEvents);

router.patch(
  "/update-event/:eventId",
  validateRequest(EventValidations.updateEventValidationSchema),
  EventControllers.updateEvent,
);

router.delete("/:eventId", EventControllers.deleteEvent);

export const EventRoutes = router;
