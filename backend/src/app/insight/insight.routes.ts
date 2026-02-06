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

const insightRoute = express.Router();

// Create Section + Steps
insightRoute.post("/", validate(CreateInsightSectionSchema), createSection);

// Update Section by ID
insightRoute.patch("/:id", validate(UpdateInsightSectionSchema), updateSection);

// Get Sections by page query (?page=xxx)
insightRoute.get("/", getSections);

// Delete Section by ID
insightRoute.delete("/:id", deleteSection);

export default insightRoute;
