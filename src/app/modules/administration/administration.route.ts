import express from "express";
import { AdministrationControllers } from "./administration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdministrationValidations } from "./administration.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-administration",
  auth(USER_ROLE.admin),
  validateRequest(
    AdministrationValidations.createAdministrationValidationSchema,
  ),
  AdministrationControllers.createAdministration,
);

router.get("/:administrationId", AdministrationControllers.getAdministration);

router.get("/", AdministrationControllers.getAllAdministrations);

router.patch(
  "/update-administration/:administrationId",
  auth(USER_ROLE.admin),
  validateRequest(
    AdministrationValidations.updateAdministrationValidationSchema,
  ),
  AdministrationControllers.updateAdministration,
);

router.delete(
  "/:administrationId",
  auth(USER_ROLE.admin),
  AdministrationControllers.deleteAdministration,
);

export const AdministrationRoutes = router;
