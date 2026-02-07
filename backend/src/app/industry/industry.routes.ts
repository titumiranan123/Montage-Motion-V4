import express from "express";
import { validate } from "../../midleware/validate";
import { createSectionSchema, updateSectionSchema } from "./industry.zod";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "./industry.controller";
import auth from "../../midleware/authMidleware";

const industriesRoute = express.Router();

industriesRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  validate(createSectionSchema),
  createSection,
);
industriesRoute.get("/", getSections);
industriesRoute.patch(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  validate(updateSectionSchema),
  updateSection,
);
industriesRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deleteSection);

export default industriesRoute;
