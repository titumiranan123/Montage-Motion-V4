import { Router } from "express";
import { GetDashboardOverview } from "./web.controller";
import { getAll } from "../accese/access";
import auth from "../../midleware/authMidleware";

const dashboardRoute = Router();
dashboardRoute.get(
  "/dashboard/overview",
  auth("ADMIN", "MODARATOR"),
  GetDashboardOverview,
);
dashboardRoute.get("/website/visitors", auth("ADMIN", "MODARATOR"), getAll);
export default dashboardRoute;
