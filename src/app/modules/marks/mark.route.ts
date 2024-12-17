import { Router } from "express";
import { MarkControllers } from "./mark.controller";
import { MarkValidations } from "./mark.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-mark",
  validateRequest(MarkValidations.createMarkSchema),
  MarkControllers.createMark
);

router.get("/:markId", MarkControllers.getMark);
router.get("/", MarkControllers.getAllMarks);

router.patch(
  "/update-mark/:markId",
  validateRequest(MarkValidations.updateMarkSchema),
  MarkControllers.updateMark
);

router.delete("/:markId", MarkControllers.deleteMark);

export const MarkRoutes = router;
