import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { pricingPageService } from "./pricing.service";

/**
 * ✅ Create a new pricing package
 */
export const createPackage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await pricingPageService.upsertPagePricePlan(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Pricing package created successfully",
      result
    );
  }
);

/**
 * Get all pricing packages (with optional filters)
 */
export const getAllPackages = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await pricingPageService.getPagePricePlanByType(
      req.query as { type: string }
    );
    return responseHandler(
      res,
      200,
      true,
      "All pricing packages fetched successfully",
      result
    );
  }
);

/**
 * ✅ Delete a pricing package (and its features)
 */
export const deletePackage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await pricingPageService.deletePagePricePlan(id);
    return responseHandler(
      res,
      200,
      true,
      "Pricing package deleted successfully",
      result
    );
  }
);
