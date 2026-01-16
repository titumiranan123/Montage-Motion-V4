"use client";

import React, { useState, DragEvent } from "react";
import { Controller, Control } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { FiUpload, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import ReactPlayer from "react-player";

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
  url?: string; // optional, if backend returns
}

interface VideoUploaderProps {
  control: Control<any>;
  registerName: string;
  setVideoUrl: (url: string) => void;
  videoUrl?: string;
}

const Videouploadwithhook: React.FC<VideoUploaderProps> = ({
  control,
  registerName,
  setVideoUrl,
  videoUrl,
}) => {
  const [temUrl, setTeamUrl] = useState<string | null>(videoUrl ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [parts, setParts] = useState<{ ETag: string; PartNumber: number }[]>(
    []
  );

  const MAX_VIDEO_SIZE = 300 * 1024 * 1024; // 300MB

  /** 📂 File Validation */
  const validateVideoFile = (file: File): string | null => {
    if (!file.type.startsWith("video/")) return "Only video files allowed";
    if (file.size > MAX_VIDEO_SIZE) return "File too large. Max size is 300MB.";
    return null;
  };

  /** 🧩 Drag Drop Handlers */
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, onChange: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;

    const validationError = validateVideoFile(dropped);
    if (validationError) {
      Swal.fire("Invalid File", validationError, "error");
      return;
    }

    const preview = URL.createObjectURL(dropped);
    setFile(dropped);
    setVideoUrl(preview);
    onChange(preview);
    setProgress(0);
  };

  /** 🚀 Upload Handler */
  const handleUpload = async (onChange: any) => {
    if (!file)
      return Swal.fire("Error", "No file selected for upload", "error");

    try {
      setUploading(true);
      setUploadStatus({ type: "info", message: "Initiating upload..." });

      // Step 1 — Initiate
      const { data: initData }: AxiosResponse<InitiateResponse> =
        await axios.post(
          `${BASE_URL}/uploadVideo/initiate`,
          { fileName: file.name },
          { headers: { "Content-Type": "application/json" } }
        );

      const { uploadId, videoId } = initData;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      // Step 2 — Upload chunks
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
          formData.append("uploadId", uploadId);
          formData.append("videoId", videoId);
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
      const url = await axios.post(`${BASE_URL}/uploadVideo/complete`, {
        uploadId,
        videoId,
        parts,
      });

      setProgress(100);
      setUploadStatus({
        type: "success",
        message: "Video uploaded successfully!",
      });
      setTeamUrl(url.data.videoUrl);
      setVideoUrl(url.data.videoUrl);
      onChange(url.data.videoUrl);

      await Swal.fire("Success!", "Video uploaded successfully!", "success");
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setUploadStatus({
        type: "error",
        message: "Upload failed. Please try again.",
      });
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Upload Video*
      </label>

      <Controller
        control={control}
        name={registerName}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              {/* 🎞 Preview */}
              {temUrl ? (
                <div className="relative w-[350px] rounded-md overflow-hidden border border-gray-700 mb-3">
                  <div className="relative w-full pb-[56.25%] overflow-hidden rounded-md">
                    {/* 16:9 aspect ratio (can be adjusted dynamically below) */}
                    <ReactPlayer
                      url={temUrl}
                      controls
                      width="100%"
                      height="100%"
                      className="absolute top-0 left-0 rounded-md"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrl("");
                      onChange("");
                      setTeamUrl(null);
                      setFile(null);
                      setProgress(0);
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center border-2 border-dashed border-gray-600 rounded-md p-6 lg:w-[350px] h-[220px] transition ${
                    isDragActive
                      ? "bg-gray-800 border-[#1E9ED2]"
                      : "bg-gray-950"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={(e) => handleDrop(e, onChange)}
                >
                  <div className="text-center">
                    <FiUpload
                      className="mx-auto text-gray-400 mb-2"
                      size={28}
                    />
                    <p className="text-gray-300 text-sm">
                      Drag & drop or{" "}
                      <label className="text-[#1E9ED2] cursor-pointer">
                        browse
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const validationError = validateVideoFile(f);
                            if (validationError) {
                              Swal.fire(
                                "Invalid File",
                                validationError,
                                "error"
                              );
                              return;
                            }
                            setFile(f);
                            const preview = URL.createObjectURL(f);
                            setVideoUrl(preview);
                            onChange(preview);
                          }}
                        />
                      </label>{" "}
                      to upload.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Max 300MB (MP4, MOV, etc.)
                    </p>
                  </div>
                </div>
              )}

              {/* 📊 Progress Bar */}
              {uploading && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div
                      className="bg-[#1E9ED2] h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 🚀 Upload Button */}
              {file && !uploading && (
                <button
                  type="button"
                  onClick={() => handleUpload(onChange)}
                  disabled={uploading}
                  className="mt-3 w-[180px] h-[40px] bg-[#1E9ED2] text-white rounded-md hover:bg-[#157fb1] transition"
                >
                  <FiUpload className="inline mr-2" /> Upload Video
                </button>
              )}

              {/* 🧩 Status */}
              {uploadStatus && (
                <div
                  className={`mt-3 p-3 rounded-md text-sm flex items-center ${
                    uploadStatus.type === "error"
                      ? "bg-red-900/30 text-red-400"
                      : uploadStatus.type === "success"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {uploadStatus.type === "error" ? (
                    <FiAlertCircle className="mr-2" />
                  ) : (
                    <FiCheckCircle className="mr-2" />
                  )}
                  {uploadStatus.message}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default Videouploadwithhook;
