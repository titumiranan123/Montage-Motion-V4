// serviceSection.route.ts
import { Router } from "express";
import {
  createServiceSection,
  deleteServiceSection,
  getAllServiceSections,
  getServiceSectionById,
  updateServiceSection,
} from "./page_service.controller";

const pageServiceRoute = Router();

pageServiceRoute.post("/", createServiceSection);
pageServiceRoute.get("/", getAllServiceSections);
pageServiceRoute.get("/:id", getServiceSectionById);
pageServiceRoute.put("/:id", updateServiceSection);
pageServiceRoute.delete("/:id", deleteServiceSection);

export default pageServiceRoute;
