// section.route.ts
import { Router } from 'express';
import { SectionControllers } from './section.controller';
import { SectionValidations } from './section.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  "/create-section",
  validateRequest(SectionValidations.createSectionValidationSchema),
  SectionControllers.createSection
);

router.get("/:sectionId", SectionControllers.getSection);

router.get("/", SectionControllers.getAllSections);

router.patch(
  "/update-section/:sectionId",
  validateRequest(SectionValidations.updateSectionValidationSchema),
  SectionControllers.updateSection
);

router.delete("/:sectionId", SectionControllers.deleteSection);

export const SectionRoutes = router;
