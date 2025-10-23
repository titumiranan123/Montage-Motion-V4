import express from "express";
import {
  getAdminSiteMap,
  getSiteMap,
  siteController,
} from "./sitemap.controller";

const siteMap = express.Router();

siteMap.post("/sitemap", siteController);
siteMap.get("/sitemap", getSiteMap);
siteMap.get("/admin/sitemap", getAdminSiteMap);
// seoRoute.get("/sitemap", getSeoMetaByPage);
// seoRoute.delete("sitemap", deleteSeoMetaByPage);

export default siteMap;
