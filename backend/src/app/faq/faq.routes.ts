import { Router } from "express";
import { createFaq, deleteFaq, getAllFaqs, updateFaq } from "./faq.controllers";
import { validate } from "../../midleware/validate";
import auth from "../../midleware/authMidleware";
import { faqSectionSchema } from "./faq.zod";

const router = Router();

router.post(
  "/faq",
  auth("ADMIN", "MODARATOR"),
  validate(faqSectionSchema),
  createFaq
);
router.patch("/faq/:id", auth("ADMIN", "MODARATOR"), updateFaq);
router.get("/faq", getAllFaqs);
// router.get("/faq/:id", getFaqById);
// router.get("/faq/type/:type", getFaqByType);
router.delete("/faq/:id", auth("ADMIN", "MODARATOR"), deleteFaq);

export default router;
