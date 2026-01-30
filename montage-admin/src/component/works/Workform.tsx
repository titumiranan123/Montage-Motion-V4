"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ImageUploader from "../ImageUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";

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
    control,
    formState: { errors, isSubmitting },
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
      className="space-y-6 h-[600px] overflow-y-auto  grid grid-cols-1 lg:grid-cols-2 max-w-7xl gap-7 mx-auto p-5 mt-10   "
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 col-span-1 lg:col-span-2">
        <h1 className="lg:col-span-3  font-bold text-2xl border-b border-gray-700 pb-4">
          {initialData?.id ? "Edit Work" : "Create Work"}
        </h1>

        {/* Name */}
        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Project Title"
            className={`w-full rounded-md p-2.5 bg-gray-800 border  text-white focus:ring-2 focus:ring-[#1FB5DD] focus:border-[#1FB5DD]`}
          />
          {errors.title && (
            <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>
          )}
        </div> */}

        {/* Description */}
        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            {...register("description")}
            type="text"
            placeholder="Project description"
            className={`w-full rounded-md p-2.5 bg-gray-800 border  text-white focus:ring-2 focus:ring-[#1FB5DD] focus:border-[#1FB5DD]`}
          />
        </div> */}

        {/* Type */}
        <div className="space-y-2 ">
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
        <div className="space-y-2 col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Video Url <span className="text-red-500">*</span>
          </label>
          <input
            {...register("video_link")}
            type="text"
            placeholder="Video Url"
            className={`w-full rounded-md p-2.5 bg-gray-800 border  text-white focus:ring-2 focus:ring-[#1FB5DD] focus:border-[#1FB5DD]`}
          />
        </div>
      </div>

      <ImageUploader
        value={watch("thumbnail") || ""}
        onChange={(url) => {
          setValue(`thumbnail`, url, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        title="Thumbnail *"
      />
      {/* Visibility and Featured Toggles */}
      <div className="bg-gray-800 p-6 rounded-lg shadow col-span-1 lg:col-span-2">
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("is_visible")}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1FB5DD] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1FB5DD]"></div>
              <span className="ms-3 text-sm font-medium text-gray-300">
                Visible
              </span>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("is_feature")}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1FB5DD] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1FB5DD]"></div>
              <span className="ms-3 text-sm font-medium text-gray-300">
                Featured
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit/Cancel Buttons */}
      <div className="flex justify-end gap-4 col-span-1 lg:col-span-2 pt-4 border-t border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={() => onCancel()}
            className="px-6 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-[#1FB5DD] text-white rounded-lg    transition-colors focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] disabled:opacity-50 disabled:cursor-not-allowed"
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
