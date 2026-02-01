"use client";

import React, { useState, DragEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FiUpload, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk
const PARALLEL_CHUNK_COUNT = 3;
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface UploadStatus {
  type: "info" | "success" | "error";
  message: string;
}

interface InitiateResponse {
  uploadId: string;
  videoId: string;
}

interface VideoUploadProps {
  videoId: string | null;
  setVideoId: (id: string) => void;
  videoPreview: string | null;
  setVideoPreview: (preview: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  videoId,
  setVideoId,
  videoPreview,
  setVideoPreview,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parts, setParts] = useState<{ ETag: string; PartNumber: number }[]>(
    []
  );
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  /** 🧩 File Select */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("video/")) {
      setUploadStatus({
        type: "error",
        message: "Please select a valid video file.",
      });
      return;
    }

    const previewUrl = URL.createObjectURL(selected);
    setFile(selected);
    setVideoPreview(previewUrl);
    setProgress(0);
    setUploadStatus(null);
  };

  /** 🗑️ Remove Preview */
  const handleRemovePreview = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview("");
    setFile(null);
    setProgress(0);
    setUploadStatus(null);
  };

  /** 🎯 Drag Events */
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    if (!dropped.type.startsWith("video/")) {
      setUploadStatus({ type: "error", message: "Please drop a video file." });
      return;
    }

    const previewUrl = URL.createObjectURL(dropped);
    setFile(dropped);
    setVideoPreview(previewUrl);
    setProgress(0);
    setUploadStatus(null);
  };

  /** 🚀 Upload Handler */
  const handleUpload = async () => {
    if (!file)
      return setUploadStatus({ type: "error", message: "No file selected." });
    if (!file.type.startsWith("video/"))
      return setUploadStatus({
        type: "error",
        message: "File must be a video.",
      });

    setUploading(true);
    setUploadStatus({ type: "info", message: "Initiating upload..." });

    try {
      // Step 1 — Initiate
      const { data: initData }: AxiosResponse<InitiateResponse> =
        await axios.post(
          `${BASE_URL}/uploadVideo/initiate`,
          { fileName: file.name },
          { headers: { "Content-Type": "application/json" } }
        );

      const { uploadId, videoId: newVideoId } = initData;
      setVideoId(newVideoId);

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      setUploadStatus({
        type: "info",
        message: `Uploading ${totalChunks} parts...`,
      });

      // Step 2 — Upload in parallel chunks
      for (let i = 1; i <= totalChunks; i += PARALLEL_CHUNK_COUNT) {
        const parallelUploads: Promise<AxiosResponse>[] = [];

        for (let j = 0; j < PARALLEL_CHUNK_COUNT; j++) {
          const partNumber = i + j;
          if (partNumber > totalChunks) break;

          const start = (partNumber - 1) * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("videoId", newVideoId);
          formData.append("uploadId", uploadId);
          formData.append("partNumber", partNumber.toString());

          parallelUploads.push(
            axios.post(`${BASE_URL}/uploadVideo/upload-part`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
          );
        }

        const results = await Promise.all(parallelUploads);

        setParts((prev) => [
          ...prev,
          ...results.map((r) => ({
            ETag: r.data.ETag,
            PartNumber: r.data.PartNumber,
          })),
        ]);

        const uploaded = Math.min(i + PARALLEL_CHUNK_COUNT - 1, totalChunks);
        const percent = Math.round((uploaded / totalChunks) * 100);
        setProgress(percent);
      }

      // Step 3 — Complete upload
      setUploadStatus({ type: "info", message: "Finalizing upload..." });

      await axios.post(
        `${BASE_URL}/uploadVideo/complete`,
        { uploadId, videoId: newVideoId, parts },
        { headers: { "Content-Type": "application/json" } }
      );

      setProgress(100);
      setUploadStatus({
        type: "success",
        message: "Upload completed successfully!",
      });
    } catch (err) {
      const error = err as AxiosError;
      const message =
        axios.isAxiosError(error) && error.response?.data
          ? (error.response.data as any)?.error || error.response.statusText
          : (error as Error).message;

      setUploadStatus({ type: "error", message: `Upload failed: ${message}` });
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="md:text-lg text-sm text-gray-800 mb-1 font-medium flex items-center">
        Video Upload *
      </p>

      {/* 🖼 Preview */}
      {videoPreview && (
        <div className="mb-4 relative">
          <div className="relative w-full max-w-[500px] rounded-lg overflow-hidden">
            <video
              controls
              src={videoPreview}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={handleRemovePreview}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-all"
              aria-label="Remove video"
            >
              <FiX size={18} />
            </button>
          </div>

          {file && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">{file.name}</p>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </div>
      )}

      {/* 📦 Upload Area */}
      {!videoPreview && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all w-[330px] h-[200px] ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <FiUpload className="text-3xl text-gray-400 mb-3" />
            <p className="text-gray-600 mb-2">Drag & drop your video here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Browse Files
              </span>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* 📊 Progress */}
      {file && videoPreview && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* 🚀 Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`w-[180px] h-[44px] rounded-lg font-medium flex items-center justify-center transition-colors ${
          uploading || !file
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {uploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
              />
            </svg>
            Uploading {progress}%
          </>
        ) : (
          <>
            <FiUpload className="mr-2" />
            Upload Video
          </>
        )}
      </button>

      {/* ℹ️ Status Message */}
      {uploadStatus && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm flex items-center ${
            uploadStatus.type === "error"
              ? "bg-red-50 border border-red-200 text-red-700"
              : uploadStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-blue-50 border border-blue-200 text-blue-700"
          }`}
        >
          {uploadStatus.type === "error" ? (
            <FiAlertCircle className="mr-2 text-red-500" />
          ) : uploadStatus.type === "success" ? (
            <FiCheckCircle className="mr-2 text-green-500" />
          ) : (
            <svg
              className="animate-spin h-5 w-5 text-blue-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
              />
            </svg>
          )}
          {uploadStatus.message}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
