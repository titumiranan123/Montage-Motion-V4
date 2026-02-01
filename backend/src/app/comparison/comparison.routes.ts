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

const comparisonRoute = express.Router();

comparisonRoute.post("/", validate(createComparisonSchema), createComparison);

comparisonRoute.patch(
  "/:id",
  validate(updateComparisonSchema),
  updateComparison,
);

comparisonRoute.get("/", getComparisons);

comparisonRoute.delete("/:id", deleteComparison);

export default comparisonRoute;
