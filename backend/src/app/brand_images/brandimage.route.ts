import express from "express";

import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { BrandImageSchema } from "./brandimage.zod";
import {
  createBrandImage,
  deleteBrandImage,
  getAllBrandImages,
  getBrandImageById,
  updateBrandImage,
} from "./brandimage.controller";

const bradImageRoute = express.Router();

bradImageRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  validate(BrandImageSchema),
  createBrandImage
);
bradImageRoute.get("/", getAllBrandImages);
bradImageRoute.get("/:id", getBrandImageById);
bradImageRoute.patch("/:id", auth("ADMIN", "MODARATOR"), getBrandImageById);
bradImageRoute.put("/", auth("ADMIN", "MODARATOR"), updateBrandImage);
bradImageRoute.delete("/:id", auth("ADMIN", "MODARATOR"), deleteBrandImage);

export default bradImageRoute;
