import { Request, Response } from "express";

import { responseHandler } from "../../utils/responseHandler";
import { asyncHandler } from "../../midleware/asyncHandler";
import { faqService } from "./faq.services";

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const result = await faqService.createFaqSection(req.body);
  return responseHandler(res, 201, true, "FAQ created successfully", result);
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.updateFaqSection(id, req.body);
  return responseHandler(res, 200, true, "FAQ updated successfully", result);
});

export const getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await faqService.getFaqSections(query);
  return responseHandler(res, 200, true, "All FAQs fetched", result);
});

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.deleteFaqSection(id);
  return responseHandler(res, 200, true, "FAQ deleted successfully", result);
});
