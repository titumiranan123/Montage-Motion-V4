import express from "express";
import upload from "../../r2objectConfig/multerupload";
import { deleteFile, uploadFile } from "./upload.controller";
import auth from "../../midleware/authMidleware";

const router = express.Router();

router.post(
  "/upload",
  auth("ADMIN", "MODARATOR"),
  upload.single("file"),
  uploadFile,
);
router.delete("/delete/file", auth("ADMIN", "MODARATOR"), deleteFile);
// router.post("/upload-video", auth("ADMIN", "MODARATOR"), uploadFiles);
// router.post("/upload-video", auth("ADMIN", "MODARATOR"), uploadVideo);

export default router;
