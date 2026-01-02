import express from "express";
import {
  deleteSeoMetaByPage,
  getAllSeoMeta,
  getSeoMetaByPage,
  upsertSeoMeta,
} from "./seo.controller";
import { validate } from "../../midleware/validate";
import { seoMetaSchema } from "./seo.zod";
import auth from "../../midleware/authMidleware";

const seoRoute = express.Router();

seoRoute.post(
  "/seo",
  auth("ADMIN", "MODARATOR"),
  validate(seoMetaSchema.partial()),
  upsertSeoMeta
);
seoRoute.get("/seo", getAllSeoMeta);
seoRoute.get("/seo/:pageName", getSeoMetaByPage);
seoRoute.delete(
  "seo/:pageName",
  auth("ADMIN", "MODARATOR"),
  deleteSeoMetaByPage
);

export default seoRoute;
