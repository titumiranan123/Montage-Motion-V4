import express from "express";
import { validate } from "../../midleware/validate";
import {
  createComparisonSchema,
  updateComparisonSchema,
} from "./comparsion.zod";
import {
  createComparison,
  deleteComparison,
  getComparisons,
  updateComparison,
} from "./comparsion.controller";
import auth from "../../midleware/authMidleware";

const comparisonRoute = express.Router();

comparisonRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  validate(createComparisonSchema),
  createComparison,
);

comparisonRoute.patch(
  "/:id",
  validate(updateComparisonSchema),
  updateComparison,
);

comparisonRoute.get("/", getComparisons);

comparisonRoute.delete("/:id", deleteComparison);

export default comparisonRoute;
