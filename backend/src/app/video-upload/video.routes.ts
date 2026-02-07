import express from "express";
import {
  completeVideoUpload,
  initiateVideoUpload,
  uploadVideoPart,
} from "./video.controller";
import multer from "multer";
import auth from "../../midleware/authMidleware";

export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const videoRoute = express.Router();

videoRoute.post(
  "/uploadVideo/initiate",
  auth("ADMIN", "MODARATOR"),
  initiateVideoUpload,
);
videoRoute.post(
  "/uploadVideo/upload-part",
  memoryUpload.single("file"),
  uploadVideoPart,
);
videoRoute.post(
  "/uploadVideo/complete",
  auth("ADMIN", "MODARATOR"),
  completeVideoUpload,
);

export default videoRoute;
