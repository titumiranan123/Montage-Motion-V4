import { Router } from "express";
import {
  createPackage,
  getAllPackages,
  deletePackage,
} from "./pricing.controller";
import auth from "../../midleware/authMidleware";
const pricingRoute = Router();
// Package routes
pricingRoute.post("/", auth("ADMIN", "MODARATOR"), createPackage);
pricingRoute.get("/", getAllPackages);
// pricingRoute.put("/pricing/", updatePackagePosition);
pricingRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deletePackage);

export default pricingRoute;
