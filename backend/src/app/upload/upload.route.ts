import express from "express";
import upload from "../../r2objectConfig/multerupload";
import { uploadFile } from "./upload.controller";
import auth from "../../midleware/authMidleware";

const router = express.Router();

router.post(
  "/upload",
  auth("ADMIN", "MODARATOR"),
  upload.single("file"),
  uploadFile
);
// router.post("/upload-video", auth("ADMIN", "MODARATOR"), uploadFiles);
// router.post("/upload-video", auth("ADMIN", "MODARATOR"), uploadVideo);

export default router;
