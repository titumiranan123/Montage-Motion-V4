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

const router = express.Router();

router.post(
  "/brand/image",
  auth("ADMIN", "MODARATOR"),
  validate(BrandImageSchema),
  createBrandImage
);
router.get("/brand/image", getAllBrandImages);
router.get("/brand/image/:id", getBrandImageById);
router.patch("/brand/image/:id", auth("ADMIN", "MODARATOR"), getBrandImageById);
router.put("/brand/image", auth("ADMIN", "MODARATOR"), updateBrandImage);
router.delete("/brand/image/:id", auth("ADMIN", "MODARATOR"), deleteBrandImage);

export default router;
