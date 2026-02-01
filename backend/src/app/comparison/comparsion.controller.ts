import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { comparisonService } from "./comparison.services";

export const createComparison = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await comparisonService.createComparison(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Comparison created successfully",
      result,
    );
  },
);

export const updateComparison = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await comparisonService.updateComparison(id, req.body);
    return responseHandler(
      res,
      200,
      true,
      "Comparison updated successfully",
      result,
    );
  },
);

export const getComparisons = asyncHandler(
  async (req: Request, res: Response) => {
    const { page } = req.query;
    const result = await comparisonService.getComparisons(page as string);
    return responseHandler(
      res,
      200,
      true,
      "Comparisons fetched successfully",
      result,
    );
  },
);

export const deleteComparison = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await comparisonService.deleteComparison(id);
    return responseHandler(
      res,
      200,
      true,
      "Comparison deleted successfully",
      result,
    );
  },
);
