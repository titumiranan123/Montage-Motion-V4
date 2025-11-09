// whychooseus.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";

import { whychooseusSectionService } from "./whychooseus.service";
import { whychooseusSchema } from "./whychooseus.zod";

// ✅ Create or Update (Upsert)
export const createOrUpdateWhyChooseUsSection = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = whychooseusSchema.parse(req.body);
    const result =
      await whychooseusSectionService.createOrUpdateSection(parsed);

    return responseHandler(
      res,
      201,
      true,
      "Why Choose Us section created or updated successfully",
      result
    );
  }
);

// ✅ Get All
export const getAllWhyChooseUsSections = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await whychooseusSectionService.getAllSections(req.query);
    return responseHandler(
      res,
      200,
      true,
      "All Why Choose Us sections fetched successfully",
      result
    );
  }
);

// ✅ Get by ID
export const getWhyChooseUsSectionById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id; // UUID → keep as string
    const result = await whychooseusSectionService.getSectionById(id);

    if (!result)
      return responseHandler(
        res,
        404,
        false,
        "Why Choose Us section not found"
      );

    return responseHandler(
      res,
      200,
      true,
      "Why Choose Us section fetched successfully",
      result
    );
  }
);

// ✅ Update
export const updateWhyChooseUsSection = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id; // UUID
    const result = await whychooseusSectionService.updateSection(id, req.body);

    return responseHandler(
      res,
      200,
      true,
      "Why Choose Us section updated successfully",
      result
    );
  }
);

// ✅ Delete
export const deleteWhyChooseUsSection = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id; // UUID
    const result = await whychooseusSectionService.deleteSection(id);

    if (!result)
      return responseHandler(
        res,
        404,
        false,
        "Why Choose Us section not found"
      );

    return responseHandler(
      res,
      200,
      true,
      "Why Choose Us section deleted successfully",
      result
    );
  }
);
