import express from "express";
import { AdministrationControllers } from "./administration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdministrationValidations } from "./administration.validation";

const router = express.Router();

router.post(
  "/create-administration",
  validateRequest(AdministrationValidations.createAdministrationValidationSchema),
  AdministrationControllers.createAdministration
);

router.get("/:administrationId", AdministrationControllers.getAdministration);

router.get("/", AdministrationControllers.getAllAdministrations);

router.patch(
  "/update-administration/:administrationId",
  validateRequest(AdministrationValidations.updateAdministrationValidationSchema),
  AdministrationControllers.updateAdministration
);

router.delete("/:administrationId", AdministrationControllers.deleteAdministration);

export const AdministrationRoutes = router;
