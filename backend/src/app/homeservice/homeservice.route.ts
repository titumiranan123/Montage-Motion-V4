// serviceSection.route.ts
import { Router } from "express";
import {
  createHomeService,
  deleteServiceSection,
  getAllServiceSections,
} from "./homeservice.controller";
import auth from "../../midleware/authMidleware";

const homeServiceRoute = Router();

homeServiceRoute.post("/", auth("ADMIN", "MODARATOR"), createHomeService);
homeServiceRoute.get("/", getAllServiceSections);
homeServiceRoute.delete(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  deleteServiceSection,
);

export default homeServiceRoute;
