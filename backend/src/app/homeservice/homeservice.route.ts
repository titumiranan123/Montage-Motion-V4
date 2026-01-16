// serviceSection.route.ts
import { Router } from "express";
import {
  createHomeService,
  deleteServiceSection,
  getAllServiceSections,
} from "./homeservice.controller";

const homeServiceRoute = Router();

homeServiceRoute.post("/", createHomeService);
homeServiceRoute.get("/", getAllServiceSections);
homeServiceRoute.delete("/:id", deleteServiceSection);

export default homeServiceRoute;
