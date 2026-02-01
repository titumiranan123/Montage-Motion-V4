"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ImageUploader from "../ImageUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import ReactPlayer from "react-player";

interface IWork {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  video_link: string;
  is_visible: boolean;
  is_feature: boolean;
  position?: number;
  type: string;
}

interface IWorkFormProps {
  onSubmit: (data: IWork) => Promise<void> | void;
  initialData?: Partial<IWork | null>;
  onCancel?: () => void;
}

const Workform: React.FC<IWorkFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { isSubmitting },
  } = useForm<IWork>({
    defaultValues: {
      type: "home",
      ...initialData,
    },
  });

  const selectedType = watch("type");
  const onSubmitHandler = async (data: IWork) => {
    try {
      await onSubmit(data);
    } catch (error) {
      const err = error as Error;
      await Swal.fire(
        "Error!",
        err.message || "Failed to submit form",
        "error",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-8 h-[600px] overflow-y-auto max-w-7xl mx-auto p-5 mt-10 bg-[#070707] rounded-xl"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-bold text-2xl text-gray-100">
          {initialData?.id ? "Edit Work" : "Create Work"}
        </h1>
        <div className="w-full h-px bg-gray-700"></div>
      </div>

      {/* Main Form Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Type <span className="text-red-500">*</span>
            </label>
            <ServiceTypeSelect
              value={selectedType}
              onChange={(url: any) => {
                setValue(`type`, url, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </div>

          {/* Video URL */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Video Url <span className="text-red-500">*</span>
            </label>
            <input
              {...register("video_link")}
              type="text"
              placeholder="Video Url"
              className={`w-full rounded-md p-3 bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#1FB5DD] focus:border-transparent focus:outline-none transition-all`}
            />
          </div>

          {/* Toggles */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-gray-300">
                    Visible
                  </span>
                  <p className="text-xs text-gray-400">
                    Show this work publicly
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("is_visible")}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1FB5DD] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1FB5DD]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-gray-300">
                    Featured
                  </span>
                  <p className="text-xs text-gray-400">Highlight this work</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("is_feature")}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1FB5DD] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1FB5DD]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Media Preview */}
        <div className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <ImageUploader
                value={watch("thumbnail") || ""}
                onChange={(url) => {
                  setValue(`thumbnail`, url, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                title=""
              />
            </div>
          </div>

          {/* Video Preview */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Preview
            </label>
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <div className="aspect-video flex items-center justify-center">
                {watch(`video_link`) ? (
                  <ReactPlayer
                    url={watch(`video_link`)}
                    width="100%"
                    height="100%"
                    controls
                    className="aspect-video"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
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
                    <p className="text-sm">Enter a video URL to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={() => onCancel()}
            className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900 border border-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-[#1FB5DD] text-white rounded-lg hover:bg-[#1aa5c9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default Workform;
