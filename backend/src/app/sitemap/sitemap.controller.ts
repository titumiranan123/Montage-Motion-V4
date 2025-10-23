import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { siteMapService } from "./sitemap.service";

export const siteController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body || {};
    const result = await siteMapService.createSitemap(data.sitemap_xml);
    responseHandler(res, 200, true, "Sitemap data saved", result);
  }
);
export const getSiteMap = asyncHandler(async (req: Request, res: Response) => {
  const result = await siteMapService.getSitemap();
  res.send(result?.content);
});
export const getAdminSiteMap = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await siteMapService.getSitemap();
    responseHandler(res, 200, true, "Sitemap data fetched", result);
  }
);
