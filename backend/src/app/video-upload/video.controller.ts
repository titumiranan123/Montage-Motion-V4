/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";

import { errorLogger, logger } from "../../logger/logger";
import { db } from "../../db/db";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://3baf2988ad4837c5c3396cdbe69ccf66.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: "26c72631615111ea50e406cde8e9e61b",
    secretAccessKey:
      "5c9b5fa71f05fcf252c42a49af879a1ef2c245151eeee19a5da85d1cbed93209",
  },
});

/**
 * Step 1: Initiate upload
 */
export const initiateVideoUpload = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.body;
    if (!fileName) {
      return res.status(400).json({ message: "Missing fileName" });
    }

    const key = `videos/${fileName.replace(/\s+/g, "-").toLowerCase()}`;

    const command = new CreateMultipartUploadCommand({
      Bucket: "montagemotion",
      Key: key,
      ContentType: "video/mp4",
    });

    const response = await s3.send(command);

    // ✅ Save initial info
    await db.query(
      `INSERT INTO video_upload_parts (upload_id, video_id, part_number, etag)
       VALUES ($1, $2, 0, 'INITIATED')`,
      [response.UploadId, key]
    );

    return res.json({
      uploadId: response.UploadId,
      videoId: key,
    });
  } catch (err: any) {
    errorLogger.error("❌ Failed to initiate R2 upload:", err);
    return res.status(500).json({
      message: "Failed to initiate upload",
      error: err.message,
    });
  }
};

/**
 * Step 2: Upload part
 */
export const uploadVideoPart = async (req: Request, res: Response) => {
  try {
    const { uploadId, partNumber, videoId } = req.body;

    if (!uploadId || !partNumber || !videoId || !req.file) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const fileBuffer = req.file.buffer;

    const command = new UploadPartCommand({
      Bucket: "montagemotion",
      Key: videoId,
      UploadId: uploadId,
      PartNumber: Number(partNumber),
      Body: fileBuffer,
    });

    const result = await s3.send(command);

    // ✅ Save ETag and part info to DB
    await db.query(
      `INSERT INTO video_upload_parts (upload_id, video_id, part_number, etag)
       VALUES ($1, $2, $3, $4)`,
      [uploadId, videoId, partNumber, result.ETag]
    );

    return res.json({
      ETag: result.ETag,
      PartNumber: Number(partNumber),
    });
  } catch (error) {
    logger.error("Error uploading video part:", error);
    return res.status(500).json({ message: "Failed to upload video part" });
  }
};

/**
 * Step 3: Complete upload
 */
export const completeVideoUpload = async (req: Request, res: Response) => {
  try {
    const { videoId, uploadId } = req.body;

    if (!videoId || !uploadId) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // ✅ Fetch all uploaded parts from DB
    const { rows: parts } = await db.query(
      `SELECT etag, part_number FROM video_upload_parts 
         WHERE upload_id = $1 AND part_number > 0 ORDER BY part_number ASC`,
      [uploadId]
    );

    if (!parts.length) {
      return res.status(400).json({ message: "No uploaded parts found" });
    }

    // ✅ Complete multipart upload
    const command = new CompleteMultipartUploadCommand({
      Bucket: "montagemotion",
      Key: videoId,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts.map((p) => ({
          ETag: p.etag,
          PartNumber: p.part_number,
        })),
      },
    });

    await s3.send(command);

    // ✅ Delete temp records from DB
    await db.query(`DELETE FROM video_upload_parts WHERE upload_id = $1`, [
      uploadId,
    ]);

    // ✅ Generate the final public video URL (Cloudflare R2 public bucket URL)
    const videoUrl = `https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/${videoId}`;

    return res.json({
      message: "Video upload completed successfully!",
      videoUrl,
    });
  } catch (error) {
    logger.error("Error completing video upload:", error);
    return res.status(500).json({ message: "Failed to complete upload" });
  }
};
