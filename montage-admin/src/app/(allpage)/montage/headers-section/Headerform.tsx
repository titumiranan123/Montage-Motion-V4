"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import ImageUploader from "@/component/ImageUploader";
import { IPageHeader } from "./header.types";
import VideoUploader from "./VideoUploader";
import { CategorySelectComponent } from "@/utils/CategorySelectComponent";

interface IHeaderFormProps {
  defaultValues?: IPageHeader;
  onSubmit: SubmitHandler<IPageHeader>;
  isSubmitting: boolean;
  onCancel?: () => void;
}

const HeaderForm: React.FC<IHeaderFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
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
      className="space-y-6 w-full mt-8 rounded-xl shadow-xl p-6 lg:p-8 h-[580px] overflow-y-scroll"
    >
      <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">
        {defaultValues?.id ? "Edit Page Header" : "Create New Page Header"}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-300">Page Title</label>
          <input
            {...register("page_title", { required: "Title is required" })}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700"
          />
          {errors.page_title && (
            <p className="text-sm text-red-400">{errors.page_title.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Page Subtitle</label>
          <input
            {...register("page_subtitle", { required: "Subtitle is required" })}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700"
          />
          {errors.page_subtitle && (
            <p className="text-sm text-red-400">
              {errors.page_subtitle.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Type</label>
          <CategorySelectComponent
            onChange={(url) => {
              setValue("type", url);
            }}
            value={watch("type")}
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">CTA Primary Link</label>
          <input
            {...register("cta_primary_link")}
            placeholder="https://example.com"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-300">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700"
        />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Media Items</h3>
          <button
            type="button"
            onClick={addMedia}
            className="px-4 py-2 bg-[#1FB5DD] text-white rounded-md hover:bg-[#17A6CC]"
          >
            + Add Media
          </button>
        </div>

        {fields.map((field, index) => {
          // Watch the specific field values
          const imageUrl = watch(`media.${index}.image_url`);
          const videoUrl = watch(`media.${index}.video_url`);

          return (
            <div
              key={field.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-gray-200 font-medium">
                  Media #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeMediaItem(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              <div>
                <label className="text-sm text-gray-300">Alt Text</label>
                <input
                  {...register(`media.${index}.alt`, {
                    required: "Alt text is required",
                  })}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700"
                />
                {errors.media?.[index]?.alt && (
                  <p className="text-sm text-red-400">
                    {errors.media[index]?.alt?.message}
                  </p>
                )}
              </div>

              {/* Image Upload - NO CONTROLLER */}
              <div className="mt-3">
                <ImageUploader
                  value={imageUrl || ""}
                  onChange={(url) => {
                    setValue(`media.${index}.image_url`, url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  title="Featured Image*"
                />
                {errors.media?.[index]?.image_url && (
                  <p className="text-red-400 text-sm mt-1">Image is required</p>
                )}
              </div>

              {/* Video Upload - NO CONTROLLER */}
              <div className="mt-3">
                <VideoUploader
                  value={videoUrl || ""}
                  onChange={(url) => {
                    setValue(`media.${index}.video_url`, url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                {errors.media?.[index]?.video_url && (
                  <p className="text-red-400 text-sm">Video is required</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-[#1FB5DD] text-white flex items-center"
        >
          {isSubmitting ? (
            <>
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
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default HeaderForm;
