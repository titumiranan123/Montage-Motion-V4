
"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiX } from "react-icons/fi";
import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IBrandImage {
  id?: string;
  image: string;
  alt: string;
  ishide: true;
  type: string;
}

interface BrandFormValues {
  image: string;
  alt: string;
  type: string;

  ishide: boolean;
}

interface BrandImageFormProps {
  initialValue?: IBrandImage | null;
  onClose: () => void;
}

const BrandImageFormModal: React.FC<BrandImageFormProps> = ({
  initialValue,
  onClose,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BrandFormValues>({
    defaultValues: initialValue
      ? {
          image: initialValue.image,
          alt: initialValue.alt,
          type: initialValue.type,
          ishide: initialValue.ishide,
        }
      : {
          image: "",
          alt: "",
          type: "about",
          ishide: false,
        },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<BrandFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting brand data:", data);
      // TODO: Replace console.log with API POST request here
      const responsce = await api_url.post(`/api/team-image`, data);
      if (responsce.status === 201 || responsce.status ===200) {
        toast.success(responsce.data.message);
        router.refresh();
      }
      onClose();
    } catch (error) {
      console.error("Error saving brand image:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl rounded-xl max-h-[86vh] overflow-y-scroll bg-slate-900     ">
      <div className="relative   p-8   text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {initialValue ? "Edit Brand Image" : "Add Brand Image"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-200 mb-1">
              Image URL *
            </label>

            <div className="mt-3">
              <ImageUploader
                value={watch("image")}
                onChange={(url) => setValue("image", url)}
              />
              <input
                {...register("image", { required: "Image is Required" })}
                type="text"
                className="hidden"
                placeholder=""
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Alt Text */}
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-200 mb-1">
                Alt Text *
              </label>
              <input
                {...register("alt", { required: "Alt text is required" })}
                type="text"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1FA4C0] focus:border-[#1FA4C0] transition-colors"
                placeholder="Enter alt text"
              />
              {errors.alt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.alt.message}
                </p>
              )}
            </div>
        
         
          </div>

       

          {/* Hide Field */}
          <div className="flex items-center space-x-3">
            <input
              {...register("ishide")}
              type="checkbox"
              id="ishide"
              className="w-4 h-4 text-[#1FA4C0] bg-gray-900 border-gray-700 rounded focus:ring-[#1FA4C0] focus:ring-2"
            />
            <label htmlFor="ishide" className="block font-medium text-gray-200">
              Hide Image
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#1FA4C0] text-white rounded-lg hover:bg-[#1A8DA8] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandImageFormModal;
