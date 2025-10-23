import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { robotsService } from "./robots.service";

export const createRobots = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body || {};
    const result = await robotsService.createRobot(data.robotTxt);
    responseHandler(res, 200, true, "Sitemap data saved", result);
  }
);
export const getRobot = asyncHandler(async (req: Request, res: Response) => {
  const result = await robotsService.getRobot();
  responseHandler(res, 200, true, "Sitemap data fetched", result);
});
export const getAdminRobot = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await robotsService.getRobot();
    responseHandler(res, 200, true, "Sitemap data fetched", result);
  }
);
