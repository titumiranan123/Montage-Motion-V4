/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";

import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { useRouter } from "next/navigation";
interface IWorkHeader {
  id?: string;
  tag: string;
  type: string;
  heading_part1: string;
  paragraph: string;
}
const WorkHeaderForm = ({
  initialData,
  setIsModalOpent,
}: {
  initialData: IWorkHeader;
  setIsModalOpent: (p: false) => void;
}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IWorkHeader>({
    defaultValues: initialData
      ? initialData
      : {
          type: "",
          tag: "",
          heading_part1: "",
          paragraph: "",
        },
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const response = await api_url.post("/api/work-header", data);
      if (response.status === 200 || response.status === 201) {
        setIsModalOpent(false);
        router.refresh();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 99999 }}
      className="max-w-5xl mx-auto bg-linear-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl border border-gray-800"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E9ED2] flex items-center gap-2">
          Work Section Header
        </h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {/* Basic Information Section */}
        <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section Type */}
            <div className="space-y-2">
              <label className=" font-medium text-gray-200 flex items-center gap-2">
                Page Type *
              </label>
              <ServiceTypeSelect
                onChange={(type: string) => {
                  setValue("type", type);
                }}
                value={watch("type")}
                slice={0}
              />
              <input
                type="hidden"
                {...register(`type`, {
                  required: "type is required",
                })}
              />
              {errors.type && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Tag */}
            <div className="space-y-2">
              <label className=" font-medium text-gray-200 flex items-center gap-2">
                Tag
              </label>
              <input
                {...register("tag", { required: "Required Field" })}
                type="text"
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all"
                placeholder="e.g., Premium, Featured, New"
              />
              {errors?.tag?.message && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>
          </div>
        </section>
        {/* Content Section */}
        <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="space-y-6">
            {/* Heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className=" font-medium text-gray-200 flex items-center gap-2">
                  Heading
                </label>
                <input
                  {...register("heading_part1", { required: "Required Field" })}
                  type="text"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all"
                  placeholder="Enter main heading text"
                />
                {errors?.heading_part1?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.heading_part1.message}
                  </p>
                )}
              </div>
            </div>

            {/* Paragraph */}
            <div className="space-y-2">
              <label className=" font-medium text-gray-200 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Description Paragraph
              </label>
              <textarea
                {...register("paragraph", {
                  required: "Paragraph is Required",
                })}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all resize-none"
                rows={4}
                placeholder="Enter detailed description for this section..."
              ></textarea>
              {errors?.paragraph?.message && (
                <p className="text-red-500 text-sm">
                  {errors.paragraph.message}
                </p>
              )}
            </div>
          </div>
        </section>
        {/* Submit Section */}
        <div className="sticky bottom-0 pt-4 bg-linear-to-t from-black via-black to-transparent">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 flex items-center gap-3 justify-center w-full bg-[#1FB5DD] rounded-md disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Saving ...
              </>
            ) : (
              "Submit"
            )}
          </button>
          <p className="text-center text-gray-500 text-sm mt-3">
            Review all information before submitting
          </p>
        </div>
      </form>
    </div>
  );
};

export default WorkHeaderForm;
