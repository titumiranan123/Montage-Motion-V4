// serviceSection.route.ts
import { Router } from "express";
import {
  createServiceSection,
  deleteServiceSection,
  getAllServiceSections,
} from "./page_service.controller";
import auth from "../../midleware/authMidleware";

const pageServiceRoute = Router();

pageServiceRoute.post("/", auth("ADMIN", "MODARATOR"), createServiceSection);
pageServiceRoute.get("/", getAllServiceSections);
pageServiceRoute.delete(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  deleteServiceSection,
);

export default pageServiceRoute;
