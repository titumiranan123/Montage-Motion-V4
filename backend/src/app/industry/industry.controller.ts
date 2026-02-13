import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { industryTabsService } from "./industry.services";

export const createSection = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await industryTabsService.createSection(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Section created successfully",
      result,
    );
  },
);

export const getSections = asyncHandler(async (req: Request, res: Response) => {
  const { page } = req.query;
  const result = await industryTabsService.getSections(
    page as string | undefined,
  );
  return responseHandler(
    res,
    200,
    true,
    "Sections fetched successfully",
    result,
  );
});

export const updateSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await industryTabsService.updateSection(
      id as string,
      req.body,
    );
    return responseHandler(
      res,
      200,
      true,
      "Section updated successfully",
      result,
    );
  },
);

export const deleteSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await industryTabsService.deleteSection(id as string);
    return responseHandler(
      res,
      200,
      true,
      "Section deleted successfully",
      result,
    );
  },
);
