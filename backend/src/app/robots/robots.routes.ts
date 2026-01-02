import express from "express";
import { createRobots, getAdminRobot, getRobot } from "./robots.controller";
import auth from "../../midleware/authMidleware";

const robotsRoute = express.Router();

robotsRoute.post("/robots", auth("ADMIN", "MODARATOR"), createRobots);
robotsRoute.get("/robots", getRobot);
robotsRoute.get("/admin/robots", auth("ADMIN", "MODARATOR"), getAdminRobot);
// seoRoute.get("/sitemap", getSeoMetaByPage);
// seoRoute.delete("sitemap", deleteSeoMetaByPage);

export default robotsRoute;
