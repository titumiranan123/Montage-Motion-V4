"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiUpload, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import Image from "next/image";
import MyTextEditor from "@/component/Texteditor";
import { api_url } from "@/hook/Apiurl";

interface IBlog {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  keywords?: string[];
  short_description: string;
  description: string;
  image: string;
  alt: string;
  is_publish?: boolean;
  is_feature?: boolean;
  is_position?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface BlogFormProps {
  initialData?: IBlog;
  onSuccess?: () => void;
  onSubmit: (data: IBlog) => Promise<void>;
  refetch: () => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  onSuccess,
  refetch,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IBlog>({
    defaultValues: initialData || {
      title: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      keywords: [],
      short_description: "",
      description: "",
      alt: "",
      image: "",
      is_publish: false,
      is_feature: false,
      is_position: false,
    },
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleTitleChange = (e: any) => {
    const title = e.target.value;
    setValue("title", title, { shouldDirty: true });

    const existingSlug = getValues("slug");
    if (!existingSlug || existingSlug === slugify(existingSlug)) {
      setValue("slug", slugify(title), { shouldDirty: true });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      Swal.fire(
        "Invalid File",
        "Only JPG, PNG, and WEBP images are allowed",
        "error"
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      Swal.fire("File Too Large", "Maximum file size is 5MB", "error");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api_url.post<{ url: string }>(
        "/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (ev) => {
            setImageUploadProgress(
              Math.round((ev.loaded * 100) / (ev.total || 1))
            );
          },
        }
      );

      setValue("image", response.data.url, { shouldDirty: true });
      Swal.fire("Success!", "Image uploaded successfully", "success");
    } catch {
      Swal.fire("Upload Failed", "Failed to upload image", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => setValue("image", "", { shouldDirty: true });

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed) {
      const current = getValues("keywords") || [];
      if (!current.includes(trimmed)) {
        setValue("keywords", [...current, trimmed], { shouldDirty: true });
      }
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    const updated = (getValues("keywords") || []).filter((k) => k !== kw);
    setValue("keywords", updated, { shouldDirty: true });
  };

  const onSubmit = async (data: IBlog) => {
    try {
      data.slug = slugify(data.slug || data.title);

      if (data.id) {
        await api_url.put(`/api/blogs/${data.id}`, data);
        Swal.fire("Success!", "Blog updated successfully", "success");
      } else {
        await api_url.post("/api/blogs", data);
        Swal.fire("Success!", "Blog created successfully", "success");
      }

      refetch();
      onSuccess?.();
    } catch (error: any) {
      Swal.fire(
        "Error!",
        error.response?.data?.errorMessages?.[0]?.message ||
          "Something went wrong",
        "error"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 lg:p-6 xl:p-8 bg-[#0F111A] rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
    >
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2 text-center">
        {initialData?.id ? "Edit Blog" : "Create New Blog"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Title*
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            onChange={handleTitleChange}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.title ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Slug*
          </label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.slug ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="blog-title-slug"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        {/* Meta Title */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Meta Title*
          </label>
          <input
            {...register("meta_title", { required: "Meta title is required" })}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.meta_title ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="SEO meta title"
          />
          {errors.meta_title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.meta_title.message}
            </p>
          )}
        </div>

        {/* Meta Description */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Meta Description*
          </label>
          <textarea
            {...register("meta_description", {
              required: "Meta description is required",
            })}
            rows={3}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.meta_description ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="SEO meta description"
          />
          {errors.meta_description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.meta_description.message}
            </p>
          )}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Keywords
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            className="flex-grow p-2 border rounded-md bg-[#1A1D2E] text-white border-gray-700"
            placeholder="Add keyword"
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="p-2 bg-[#1FB5DD] text-white rounded-md hover:opacity-90 transition"
          >
            <FiPlus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {(getValues("keywords") || []).map((kw) => (
            <span
              key={kw}
              className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {kw}
              <FiX
                size={14}
                className="cursor-pointer text-red-400 hover:text-red-500"
                onClick={() => handleRemoveKeyword(kw)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Short Description*
        </label>
        <textarea
          {...register("short_description", {
            required: "Short description is required",
          })}
          rows={3}
          className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
            errors.short_description ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="Brief summary of the blog"
        />
      </div>

      {/* Alt + Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Alt*
          </label>
          <input
            {...register("alt", { required: "Alt is required" })}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.alt ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Image alt text"
          />
        </div>

        {/* Image Upload */}
        <Controller
          name="image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Featured Image*
              </label>

              {isUploadingImage && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Uploading...</span>
                    <span>{imageUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#1FB5DD] h-2 rounded-full"
                      style={{ width: `${imageUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-start">
                {field.value && (
                  <div className="relative w-full sm:w-[250px] h-[180px] border rounded-md overflow-hidden">
                    <Image
                      src={field.value}
                      alt="Blog featured image"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}

                <label
                  htmlFor="image-upload"
                  className={`flex-1 min-w-[250px] ${
                    isUploadingImage ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 rounded-md hover:border-[#1FB5DD] transition cursor-pointer">
                    <div className="bg-gray-800 p-2 rounded-full mb-2">
                      <FiUpload size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-300 text-center">
                      <span className="font-medium text-[#1FB5DD]">
                        Click to upload
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["is_publish", "is_feature", "is_position"].map((field) => (
          <div className="p-3 border border-gray-700 rounded-md" key={field}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(field as any)}
                className="rounded text-[#1FB5DD]"
              />
              <span className="text-sm font-medium text-gray-200 capitalize">
                {field.replace("is_", "").replace("_", " ")}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Description*
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <MyTextEditor
                value={field.value}
                onChange={field.onChange}
                error={error?.message || ""}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-200 hover:bg-[#1FB5DD]/10 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#1FB5DD] disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
