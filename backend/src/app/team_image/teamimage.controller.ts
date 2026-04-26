// brandImage.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { BrandImageService } from "./teamimage.service";
import { responseHandler } from "../../utils/responseHandler";

// Create Team Images
export const createBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await BrandImageService.createBrandImage(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Team Image created successfully",
      result,
    );
  },
);

// Get All Team Imagess (✅ includes ?type= query filter)
export const getAllBrandImages = asyncHandler(
  async (req: Request, res: Response) => {
    const type = req.query.type as string | undefined;
    const result = await BrandImageService.getAllBrandImage(type);
    return responseHandler(res, 200, true, "All Team Imagess fetched", result);
  },
);

// Get Team Images By ID
export const getBrandImageById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.getBrandImageById(id as string);
    if (!result)
      return responseHandler(res, 404, false, "Team Images not found");
    return responseHandler(res, 200, true, "Team Images fetched", result);
  },
);

// Update Team Images
export const updateBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.updateBrandImage(
      id as string,
      req.body,
    );
    return responseHandler(res, 200, true, "Team Images updated", result);
  },
);

// Delete Team Images
export const deleteBrandImage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BrandImageService.deleteBrandImage(id as string);
    if (!result)
      return responseHandler(res, 404, false, "Team Images not found");
    return responseHandler(res, 200, true, "Team Images deleted", result);
  },
);
