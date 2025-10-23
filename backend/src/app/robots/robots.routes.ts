import express from "express";
import { createRobots, getAdminRobot, getRobot } from "./robots.controller";

const robotsRoute = express.Router();

robotsRoute.post("/robots", createRobots);
robotsRoute.get("/robots", getRobot);
robotsRoute.get("/admin/robots", getAdminRobot);
// seoRoute.get("/sitemap", getSeoMetaByPage);
// seoRoute.delete("sitemap", deleteSeoMetaByPage);

export default robotsRoute;
