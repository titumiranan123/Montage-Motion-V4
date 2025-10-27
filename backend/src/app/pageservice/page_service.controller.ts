// serviceSection.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { ServiceSectionSchema } from "./page_service.zod";
import { serviceSectionService } from "./page_service.service";

// Create
export const createServiceSection = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = ServiceSectionSchema.parse(req.body);
    const result = await serviceSectionService.createSection(parsed);
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
  async (_req: Request, res: Response) => {
    const result = await serviceSectionService.getAllSections();
    return responseHandler(
      res,
      200,
      true,
      "All service sections fetched",
      result
    );
  }
);

// Get by ID
export const getServiceSectionById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await serviceSectionService.getSectionById(id);
    if (!result)
      return responseHandler(res, 404, false, "Service section not found");
    return responseHandler(res, 200, true, "Service section fetched", result);
  }
);

// Update
export const updateServiceSection = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await serviceSectionService.updateSection(id, req.body);
    return responseHandler(res, 200, true, "Service section updated", result);
  }
);

// Delete
export const deleteServiceSection = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await serviceSectionService.deleteSection(id);
    if (!result)
      return responseHandler(res, 404, false, "Service section not found");
    return responseHandler(res, 200, true, "Service section deleted", result);
  }
);
