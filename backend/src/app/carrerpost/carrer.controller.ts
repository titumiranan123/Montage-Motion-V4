import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { careerPageService } from "./carrer.service";

/**
 * ✅ Create or update a career page (with job posts)
 */
export const upsertCareerPage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await careerPageService.upsertCareerPage(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Career page saved successfully ✅",
      result
    );
  }
);

/**
 * ✅ Get a career page by type (e.g. 'career', 'about', etc.)
 */
export const getCareerPageByType = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await careerPageService.getCareerPageByType();
    return responseHandler(
      res,
      200,
      true,
      "Career page fetched successfully ✅",
      result
    );
  }
);

/**
 * ✅ Delete an entire career page (and all its jobs)
 */
export const deleteCareerPage = asyncHandler(
  async (req: Request, res: Response) => {
    const type = req.params.type;
    const result = await careerPageService.deleteCareerPage(type);
    return responseHandler(
      res,
      200,
      true,
      "Career page and all related job posts deleted successfully 🗑️",
      result
    );
  }
);

/**
 * ✅ Delete a single job post (inside a page)
 */
export const deleteSingleJob = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await careerPageService.deleteSingleJob(id);
    return responseHandler(
      res,
      200,
      true,
      "Job post deleted successfully 🗑️",
      result
    );
  }
);
