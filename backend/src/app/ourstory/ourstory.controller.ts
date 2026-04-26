import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { ourstoryService } from "./ourstory.service";
import { responseHandler } from "../../utils/responseHandler";

// CREATE বা UPSERT
export const upsertStory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ourstoryService.upsertStory(req.body);

    return responseHandler(
      res,
      200,
      true,
      "Story saved successfully",
      result,
    );
  },
);

// GET ALL
export const getAllStories = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ourstoryService.getAllStories(req.query);
    return responseHandler(res, 200, true, "Stories fetched", result);
  },
);

// GET ONE
export const getStoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ourstoryService.getStoryById(req.params.id as string);

    if (!result)
      return responseHandler(res, 404, false, "Story not found");

    return responseHandler(res, 200, true, "Story fetched", result);
  },
);

// UPDATE
export const updateStory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ourstoryService.updateStory(
      req.params.id as string,
      req.body,
    );

    return responseHandler(
      res,
      200,
      true,
      "Story updated successfully",
      result,
    );
  },
);

// DELETE
export const deleteStory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ourstoryService.deleteStory(req.params.id as string);

    if (!result)
      return responseHandler(res, 404, false, "Story not found");

    return responseHandler(
      res,
      200,
      true,
      "Story deleted successfully",
      result,
    );
  },
);