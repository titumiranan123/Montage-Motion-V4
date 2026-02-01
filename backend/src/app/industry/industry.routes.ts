import express from "express";
import { validate } from "../../midleware/validate";
import { createSectionSchema, updateSectionSchema } from "./industry.zod";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "./industry.controller";

const industriesRoute = express.Router();

industriesRoute.post("/", validate(createSectionSchema), createSection);
industriesRoute.get("/", getSections);
industriesRoute.patch("/:id", validate(updateSectionSchema), updateSection);
industriesRoute.delete("/:id", deleteSection);

export default industriesRoute;
