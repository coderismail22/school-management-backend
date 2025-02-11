import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./event.controller";
import { EventValidations } from "./event.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/publish-event",
  auth(USER_ROLE.admin),
  validateRequest(EventValidations.createEventValidationSchema),
  EventControllers.createEvent,
);

router.get("/:eventId", EventControllers.getEvent);

router.get("/", EventControllers.getAllEvents);

router.patch(
  "/update-event/:eventId",
  auth(USER_ROLE.admin),
  validateRequest(EventValidations.updateEventValidationSchema),
  EventControllers.updateEvent,
);

router.delete("/:eventId", auth(USER_ROLE.admin), EventControllers.deleteEvent);

export const EventRoutes = router;
