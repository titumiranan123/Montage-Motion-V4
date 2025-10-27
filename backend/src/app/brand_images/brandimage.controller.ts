// brandImage.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { BrandImageService } from "./brandimage.service";
import { responseHandler } from "../../utils/responseHandler";

// Create Brand Image
export const createBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await BrandImageService.createBaranImage(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Brand image created successfully",
      result
    );
  }
);

// Get All Brand Images (✅ includes ?type= query filter)
export const getAllBrandImages = asyncHandler(
  async (req: Request, res: Response) => {
    const type = req.query.type as string | undefined;
    const result = await BrandImageService.getAllBrandImage(type);
    return responseHandler(res, 200, true, "All brand images fetched", result);
  }
);

// Get Brand Image By ID
export const getBrandImageById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.getBrandImageById(id);
    if (!result)
      return responseHandler(res, 404, false, "Brand image not found");
    return responseHandler(res, 200, true, "Brand image fetched", result);
  }
);

// Update Brand Image
export const updateBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.updateBrandImage(id, req.body);
    return responseHandler(res, 200, true, "Brand image updated", result);
  }
);

// Delete Brand Image
export const deleteBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.deleteBrandImage(id);
    if (!result)
      return responseHandler(res, 404, false, "Brand image not found");
    return responseHandler(res, 200, true, "Brand image deleted", result);
  }
);
