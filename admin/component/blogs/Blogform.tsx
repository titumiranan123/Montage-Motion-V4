/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiPlus, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import ImageUploader from "../ImageUploader";
import MyTextEditor from "./Texteditor";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";

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
  read_time?: string;
  updatedAt?: string;
  whatWillLearn?: string[];
  created_at?: Date;
  updated_at?: Date;
}

interface BlogFormProps {
  initialData?: Partial<IBlog>;
  onCancel: (p: boolean) => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onCancel }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IBlog>({
    defaultValues: {
      title: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      keywords: [],
      short_description: "",
      description: "",
      image: "",
      alt: "",
      is_publish: false,
      is_feature: false,
      is_position: false,
      read_time: "",
      updatedAt: "",
      whatWillLearn: [],
      ...initialData,
    },
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  // Automatically slugify title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title, { shouldDirty: true });

    const existingSlug = getValues("slug");
    if (!existingSlug || existingSlug === slugify(existingSlug)) {
      setValue("slug", slugify(title), { shouldDirty: true });
    }
  };

  // Keywords
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

  // WhatWillLearn
  const handleAddLearn = () => {
    const trimmed = learnInput.trim();
    if (trimmed) {
      const current = getValues("whatWillLearn") || [];
      if (!current.includes(trimmed)) {
        setValue("whatWillLearn", [...current, trimmed], { shouldDirty: true });
      }
      setLearnInput("");
    }
  };

  const handleRemoveLearn = (item: string) => {
    const updated = (getValues("whatWillLearn") || []).filter(
      (i) => i !== item,
    );
    setValue("whatWillLearn", updated, { shouldDirty: true });
  };

  const handleFormSubmit = async (data: IBlog) => {
    try {
      const url = data?.id ? `/api/blogs/${data?.id}` : "/api/blogs";
      const res = await api_url.post(url, data);
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        onCancel(false);
        toast.success("Blog Created");
      }
    } catch (error: any) {
      Swal.fire(
        "Error!",
        error.response?.data?.errorMessages?.[0]?.message ||
          "Something went wrong",
        "error",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 p-4 lg:p-6 xl:p-8 bg-[#0F111A] rounded-lg shadow-lg overflow-y-auto max-w-7xl  w-full max-h-[90vh]"
    >
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2 text-center">
        {initialData?.id ? "Edit Blog" : "Create New Blog"}
      </h2>

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
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

        <div>
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
      </div>

      {/* Meta Title & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
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

        <div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Keywords
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="grow p-2 border rounded-md bg-[#1A1D2E] text-white border-gray-700"
              placeholder="Add keyword"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="p-2 bg-[#1FB5DD] text-white rounded-md"
            >
              <FiPlus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(getValues("keywords") || []).map((kw) => (
              <span
                key={kw}
                className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-1"
              >
                {kw}
                <FiX
                  size={14}
                  className="cursor-pointer text-red-400"
                  onClick={() => handleRemoveKeyword(kw)}
                />
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Read Time *
          </label>
          <input
            {...register("read_time", { required: "Read Time is required" })}
            onChange={handleTitleChange}
            className={`w-full p-2 border rounded-md bg-[#1A1D2E] text-white ${
              errors.read_time ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Read Time"
          />
          {errors.read_time && (
            <p className="mt-1 text-sm text-red-500">
              {errors.read_time.message}
            </p>
          )}
        </div>
      </div>

      {/* What Will Learn */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          What You Will Learn
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={learnInput}
            onChange={(e) => setLearnInput(e.target.value)}
            className="grow p-2 border rounded-md bg-[#1A1D2E] text-white border-gray-700"
            placeholder="Add learning point"
          />
          <button
            type="button"
            onClick={handleAddLearn}
            className="p-2 bg-[#1FB5DD] text-white rounded-md"
          >
            <FiPlus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(getValues("whatWillLearn") || []).map((item) => (
            <span
              key={item}
              className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-1"
            >
              {item}
              <FiX
                size={14}
                className="cursor-pointer text-red-400"
                onClick={() => handleRemoveLearn(item)}
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

      {/* Alt + Image Upload */}
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

        <Controller
          name="image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <ImageUploader
                value={field.value}
                onChange={(p: string) => field.onChange(p)}
                title="Featured Image*"
              />{" "}
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </>
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
          onClick={() => onCancel(false)}
          type="button"
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
