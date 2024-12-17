import { Router } from "express";
import { ClassControllers } from "./class.controller";
import { ClassValidations } from "./class.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-class",
  validateRequest(ClassValidations.createClassValidationSchema),
  ClassControllers.createClass
);

router.get("/:classId", ClassControllers.getClass);
router.get("/", ClassControllers.getAllClasses);

router.patch(
  "/update-class/:classId",
  validateRequest(ClassValidations.updateClassValidationSchema),
  ClassControllers.updateClass
);

router.delete("/:classId", ClassControllers.deleteClass);

export const ClassRoutes = router;
