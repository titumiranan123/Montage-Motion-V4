// serviceSection.route.ts
import { Router } from "express";
import {
  createServiceSection,
  deleteServiceSection,
  getAllServiceSections,
} from "./page_service.controller";

const pageServiceRoute = Router();

pageServiceRoute.post("/", createServiceSection);
pageServiceRoute.get("/", getAllServiceSections);
pageServiceRoute.delete("/:id", deleteServiceSection);

export default pageServiceRoute;
