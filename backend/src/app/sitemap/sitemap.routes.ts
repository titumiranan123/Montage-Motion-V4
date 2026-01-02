import express from "express";
import {
  getAdminSiteMap,
  getSiteMap,
  siteController,
} from "./sitemap.controller";
import auth from "../../midleware/authMidleware";

const siteMap = express.Router();

siteMap.post("/sitemap", auth("ADMIN", "MODARATOR"), siteController);
siteMap.get("/sitemap", getSiteMap);
siteMap.get("/admin/sitemap", auth("ADMIN", "MODARATOR"), getAdminSiteMap);
// seoRoute.get("/sitemap", getSeoMetaByPage);
// seoRoute.delete("sitemap", deleteSeoMetaByPage);

export default siteMap;
