"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import ImageUploader from "@/component/ImageUploader";
import { IPageHeader } from "./header.types";
import VideoUploader from "./VideoUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import ReactPlayer from "react-player";

interface IHeaderFormProps {
  defaultValues?: IPageHeader;
  onSubmit: SubmitHandler<IPageHeader>;
  onCancel?: () => void;
}

const HeaderForm: React.FC<IHeaderFormProps> = ({
  defaultValues,
  onSubmit,

  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPageHeader>({
    defaultValues: defaultValues || {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const addMedia = () => {
    append({ image_url: "", video_url: "", alt: "" });
  };

  const removeMediaItem = (index: number) => {
    remove(index);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 w-full max-w-7xl mx-auto mt-8 rounded-xl shadow-xl bg-gray-900 p-6 lg:p-8 h-[580px] overflow-y-auto"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          {defaultValues?.id ? "Edit Page Header" : "Create New Page Header"}
        </h2>
        <div className="w-full h-px bg-gray-700"></div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Information */}
        <div className="space-y-6">
          {/* Page Title & Subtitle */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Page Title *
              </label>
              <input
                {...register("page_title", { required: "Title is required" })}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent"
                placeholder="Enter page title"
              />
              {errors.page_title && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.page_title.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Page Subtitle *
              </label>
              <input
                {...register("page_subtitle", {
                  required: "Subtitle is required",
                })}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent"
                placeholder="Enter page subtitle"
              />
              {errors.page_subtitle && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.page_subtitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Type & CTA Link */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Type</label>
              <ServiceTypeSelect
                onChange={(url) => setValue("type", url)}
                value={watch("type")}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                CTA Primary Link
              </label>
              <input
                {...register("cta_primary_link")}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent resize-none"
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Right Column - Media Items */}
        <div className="space-y-6">
          {/* Media Items Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Media Items</h3>
              <p className="text-sm text-gray-400">
                Add images and videos for this page
              </p>
            </div>
            <button
              type="button"
              onClick={addMedia}
              className="px-4 py-2 bg-[#1FB5DD] text-white rounded-lg hover:bg-[#17A6CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              + Add Media
            </button>
          </div>

          {/* Media Items List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {fields.map((field, index) => {
              const imageUrl = watch(`media.${index}.image_url`);
              const videoUrl = watch(`media.${index}.video_url`);

              return (
                <div
                  key={field.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 space-y-4"
                >
                  {/* Media Item Header */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="text-gray-200 font-medium">
                        Media #{index + 1}
                      </h4>
                      <p className="text-xs text-gray-400">
                        Configure media details
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMediaItem(index)}
                      className="text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Alt Text */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Alt Text *
                    </label>
                    <input
                      {...register(`media.${index}.alt`, {
                        required: "Alt text is required",
                      })}
                      className="w-full px-4 py-2.5 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent"
                      placeholder="Enter alt text for accessibility"
                    />
                    {errors.media?.[index]?.alt && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.media[index]?.alt?.message}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Featured Image *
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <ImageUploader
                        value={imageUrl || ""}
                        onChange={(url) => {
                          setValue(`media.${index}.image_url`, url, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                        title=""
                      />
                    </div>
                    {errors.media?.[index]?.image_url && (
                      <p className="text-red-400 text-sm mt-1">
                        Image is required
                      </p>
                    )}
                  </div>

                  {/* Video Section */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Hero Video URL *
                      </label>
                      <input
                        {...register(`media.${index}.video_url`, {
                          required: "Video URL is required",
                        })}
                        className="w-full px-4 py-2.5 bg-gray-800 rounded-lg text-white border border-gray-700 focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent"
                        placeholder="Enter video URL"
                      />
                      {errors.media?.[index]?.video_url && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.media[index]?.video_url?.message}
                        </p>
                      )}
                    </div>

                    {/* Video Preview */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                      <div className="aspect-video flex items-center justify-center">
                        {videoUrl ? (
                          <ReactPlayer
                            url={videoUrl}
                            width="100%"
                            height="100%"
                            controls
                            className="aspect-video"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2 p-4">
                            <svg
                              className="w-12 h-12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm text-center">
                              Enter a video URL to see preview
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-[#1FB5DD] text-white hover:bg-[#17A6CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default HeaderForm;
