import { Router } from "express";
import {
  deleteCareerPage,
  getCareerPageByType,
  upsertCareerPage,
} from "./carrer.controller";
import auth from "../../midleware/authMidleware";
const carrerRoute = Router();
// Package routes
carrerRoute.post("/", auth("ADMIN", "MODARATOR"), upsertCareerPage);
carrerRoute.get("/", getCareerPageByType);
// pricingRoute.put("/pricing/", updatePackagePosition);
carrerRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deleteCareerPage);

export default carrerRoute;
