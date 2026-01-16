// serviceSection.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { homeServiceSchema } from "./homeservice.zod";
import { homeService } from "./homeservice.service";

// Create
export const createHomeService = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = homeServiceSchema.parse(req.body);

    const result = await homeService.createOrUpdateSection(parsed);
    return responseHandler(
      res,
      201,
      true,
      "Service section created successfully",
      result
    );
  }
);

// Get All
export const getAllServiceSections = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await homeService.getAllSections(req.query);
    return responseHandler(
      res,
      200,
      true,
      "All service sections fetched",
      result
    );
  }
);
// type
export const getAllServiceSectionsType = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await homeService.getAllSectionsType();
    return responseHandler(
      res,
      200,
      true,
      "All service sections fetched",
      result
    );
  }
);

// Delete
export const deleteServiceSection = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await homeService.deleteSection(id);
    if (!result)
      return responseHandler(res, 404, false, "Service section not found");
    return responseHandler(res, 200, true, "Service section deleted", result);
  }
);
