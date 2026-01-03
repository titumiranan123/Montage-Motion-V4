"use client";

import { api_url } from "@/hook/Apiurl";
import Image from "next/image";
import React, { useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  title?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  title,
}) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || !ALLOWED_TYPES.includes(file.type)) {
      Swal.fire("Invalid File", "Only JPG, PNG, WEBP allowed", "error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      Swal.fire("Too Large", "Max 5MB allowed", "error");
      return;
    }

    // 🔥 LOCAL PREVIEW
    const preview = URL.createObjectURL(file);
    onChange(preview);

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api_url.post<{ url: string }>("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const p = Math.round((e.loaded * 100) / (e.total ?? 1));
          setImageUploadProgress(p);
        },
      });

      // 🔥 SERVER URL SET
      onChange(res.data.url);

      Swal.fire("Success!", "Image uploaded successfully!", "success");
    } catch {
      Swal.fire("Failed", "Image upload failed", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="mt-2">
      {title && <label className="text-sm text-gray-200 mb-2">{title}</label>}

      {isUploadingImage && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Uploading...</span>
            <span>{imageUploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2.5 rounded-full">
            <div
              className="bg-[#1E9ED2] h-2.5 rounded-full"
              style={{ width: `${imageUploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {value ? (
        <div className="relative w-[350px] h-[250px] border rounded-md overflow-hidden">
          <Image
            src={value}
            width={350}
            height={250}
            className="object-cover"
            alt="preview"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
            onClick={() => onChange("")}
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="flex flex-col items-center justify-center border-2 border-gray-600 border-dashed w-[350px] h-[250px] bg-gray-950 rounded-md">
            <FiUpload size={24} className="text-gray-400 mb-2" />
            <p className="text-gray-300">Click to upload image</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploadingImage}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
