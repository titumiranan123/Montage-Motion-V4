import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { homeapiServices } from "./home.service";
import { responseHandler } from "../../utils/responseHandler";

export const getAllhomeData = asyncHandler(
  async (req: Request, res: Response) => {
    const { type, table } = req.query;
    let tables: string[] = [];
    if (typeof table === "string") {
      tables = table.split(",");
    }
    const result = await homeapiServices.advertsingService(
      type as string,
      tables
    );

    return responseHandler(res, 200, true, "Fetched all header videos", result);
  }
);
export const getAllServicesData = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.query;
    const result = await homeapiServices.servicesData(type as string);
    return responseHandler(
      res,
      200,
      true,
      "Fetched all service page data",
      result
    );
  }
);
export const getAllAboutData = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await homeapiServices.aboutService();
    return responseHandler(res, 200, true, "Fetched all about data", result);
  }
);

export const getAllBlogs = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await homeapiServices.getAllHomeBlogs();
    return responseHandler(res, 200, true, "Blogs fetched", result);
  }
);
export const getSingleBlogs = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await homeapiServices.getSingleBlogs(req.params.slug);
    return responseHandler(res, 200, true, "Blogs fetched", result);
  }
);
