import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import {
  createSectionWithSteps,
  deleteSectionById,
  getSectionByPage,
  updateSectionById,
} from "./insight.services";

export const createSection = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createSectionWithSteps(req.body);
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
  const result = await getSectionByPage(page as string);
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
    await updateSectionById(id as string, req.body);
    return responseHandler(
      res,
      200,
      true,
      "Section updated successfully",
      null,
    );
  },
);

export const deleteSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteSectionById(id as string);
    return responseHandler(
      res,
      200,
      true,
      "Section deleted successfully",
      null,
    );
  },
);
