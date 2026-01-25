import { Router } from "express";
import { GetDashboardOverview } from "./web.controller";
import auth from "../../midleware/authMidleware";

const dashboardRoute = Router();
dashboardRoute.get(
  "/dashboard/overview",
  auth("ADMIN", "MODARATOR"),
  GetDashboardOverview,
);

export default dashboardRoute;
