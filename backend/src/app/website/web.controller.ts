import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { webservice } from "./web.service";

export const GetDashboardOverview = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await webservice();
    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Dashboard fetch successfully",
        result,
      );
    }
    return responseHandler(res, 400, false, "Dashboard operation failed");
  },
);
