import express from "express";

import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";

import {
  createBrandImage,
  deleteBrandImage,
  getAllBrandImages,
  getBrandImageById,
  updateBrandImage,
} from "./teamimage.controller";
import { brandImageSchema } from "./teamimage.zod";

const teamimageRoute = express.Router();

teamimageRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  validate(brandImageSchema),
  createBrandImage
);
teamimageRoute.get("/", getAllBrandImages);
teamimageRoute.get("/:id", getBrandImageById);
teamimageRoute.patch("/:id", auth("ADMIN", "MODARATOR"), getBrandImageById);
teamimageRoute.put("/", auth("ADMIN", "MODARATOR"), updateBrandImage);
teamimageRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deleteBrandImage);

export default teamimageRoute;
