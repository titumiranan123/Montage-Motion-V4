/* eslint-disable react-hooks/incompatible-library */

import { MemberProfile } from "@/interface/interface";
import ImageUploader from "@/component/ImageUploader";
import { useForm } from "react-hook-form";

interface MemberProfileFormProps {
  onSubmit: (data: MemberProfile) => void;
  defaultValues?: Partial<MemberProfile>;
}

export function MemberProfileForm({
  onSubmit,
  defaultValues,
}: MemberProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MemberProfile>({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 w-full max-w-4xl mx-auto rounded-lg shadow-md bg-gray-800  h-[80vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">
        {defaultValues?.id ? "Edit Member Profile" : "Add New Member Profile"}
      </h2>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white ${
                  errors.name ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Designation *
              </label>
              <input
                type="text"
                {...register("designation", {
                  required: "designation   is required",
                })}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white ${
                  errors.designation ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="John Doe"
              />
              {errors.designation && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.designation.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Alt *
              </label>
              <input
                type="text"
                {...register("alt", {
                  required: "Alt   is required",
                })}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white ${
                  errors.alt ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="John Doe"
              />
              {errors.alt && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.alt.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-600 pb-2">
            Profile Image
          </h3>

          <ImageUploader
            value={watch(`photourl`)}
            onChange={(url) => setValue(`photourl`, url)}
          />
          <input
            className="hidden"
            {...register("photourl", { required: "This field is required" })}
          />
          {errors?.photourl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.photourl.message}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition font-medium"
          >
            Cancel
          </button>
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
              <> {defaultValues?.id ? "Update Profile" : "Create Profile"} </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
