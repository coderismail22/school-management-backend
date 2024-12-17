import { Router } from "express";
import { ResultControllers } from "./result.controller";
import { ResultValidations } from "./result.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-result",
  validateRequest(ResultValidations.createResultSchema),
  ResultControllers.createResult
);

router.get("/:resultId", ResultControllers.getResult);
router.get("/", ResultControllers.getAllResults);

router.patch(
  "/update-result/:resultId",
  validateRequest(ResultValidations.updateResultSchema),
  ResultControllers.updateResult
);

router.delete("/:resultId", ResultControllers.deleteResult);

export const ResultRoutes = router;
