import express from "express";
import { validate } from "../../midleware/validate";
import {
  CreateInsightSectionSchema,
  UpdateInsightSectionSchema,
} from "./insight.zod";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "./insight.controller";
import auth from "../../midleware/authMidleware";

const insightRoute = express.Router();

// Create Section + Steps
insightRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  validate(CreateInsightSectionSchema),
  createSection,
);

// Update Section by ID
insightRoute.patch(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  validate(UpdateInsightSectionSchema),
  updateSection,
);

// Get Sections by page query (?page=xxx)
insightRoute.get("/", getSections);

// Delete Section by ID
insightRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deleteSection);

export default insightRoute;
