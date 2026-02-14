/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { PageService } from "./types";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { ArrowDown, ArrowUp } from "lucide-react";

const ServiceForm = ({
  initialData,
  setIsModalOpent,
}: {
  initialData: any;
  setIsModalOpent: (p: false) => void;
}) => {
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PageService>({
    defaultValues: initialData
      ? initialData
      : {
          type: "",
          tag: "",
          heading: ["", ""],
          paragraph: "",
          services: [
            {
              service_title: "",
              service_description: "",
              image: "",
              alt: "",
            },
          ],
        },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "services",
  });

  const moveService = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      move(index, index - 1);
    } else if (direction === "down" && index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  const onSubmit = async (data: PageService) => {
    try {
      const response = await api_url.post("/api/our-service", data);
      if (response.status === 200 || response.status === 201) {
        setIsModalOpent(false);
        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.errorDetails?.[0]?.message ?? "falied to save",
      );
      console.log(error?.response?.data?.errorDetails?.[0]?.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-linear-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E9ED2] flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1E9ED2]/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Service Section Configuration
        </h1>
        <p className="text-gray-400 mt-2">
          Configure your service section with details and services
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {/* Basic Information Section */}
        <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-gray-800">
            <span className="text-[#1E9ED2]">#</span> Basic Information
          </h2>

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
                slice={1}
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
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
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
          <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-gray-800">
            <span className="text-[#1E9ED2]">#</span> Content
          </h2>

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

        {/* Services Section */}
        <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">
              <span className="text-[#1E9ED2]">#</span> Services
              <span className="ml-3 px-3 py-1 bg-[#1E9ED2]/20 text-[#1E9ED2] text-sm font-medium rounded-full">
                {fields.length} {fields.length === 1 ? "Service" : "Services"}
              </span>
            </h2>
            <button
              type="button"
              onClick={() =>
                append({
                  service_title: "",
                  service_description: "",
                  image: "",
                  alt: "",
                })
              }
              className="flex items-center gap-2 bg-linear-to-r from-[#1E9ED2] to-[#0D8BC6] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#1787b5] hover:to-[#0C7AA5] transition-all shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative group bg-linear-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                {/* Service Header with Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E9ED2]/10 flex items-center justify-center">
                      <span className="text-[#1E9ED2] font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Service #{index + 1}
                    </h3>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-gray-900 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => moveService(index, "up")}
                        disabled={index === 0}
                        className={`p-2 rounded transition-all ${
                          index === 0
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 cursor-pointer"
                        }`}
                        title="Move up"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveService(index, "down")}
                        disabled={index === fields.length - 1}
                        className={`p-2 rounded transition-all ${
                          index === fields.length - 1
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 cursor-pointer"
                        }`}
                        title="Move down"
                      >
                        <ArrowDown size={18} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                      title="Remove service"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="block font-medium text-gray-200">
                        Service Title
                      </label>
                      <input
                        {...register(
                          `services.${index}.service_title` as const,
                          { required: "Service title is required" },
                        )}
                        type="text"
                        className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all"
                        placeholder="Enter a descriptive service title"
                      />
                      {errors?.services?.[index]?.service_title?.message && (
                        <p className="text-red-500 text-sm">
                          {errors.services[index].service_title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-medium text-gray-200">
                        Service Description
                      </label>
                      <textarea
                        {...register(
                          `services.${index}.service_description` as const,
                          { required: "Service Description is required" },
                        )}
                        className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all resize-none"
                        rows={3}
                        placeholder="Describe what this service includes..."
                      ></textarea>
                      {errors?.services?.[index]?.service_title?.message && (
                        <p className="text-red-500 text-sm">
                          {errors.services[index].service_title.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-medium text-gray-200">
                        Image URL
                      </label>
                      <input
                        {...register(`services.${index}.image` as const, {
                          required: "Image is Required",
                        })}
                        type="text"
                        className="w-full hidden p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                      <ImageUploader
                        value={watch(`services.${index}.image`)}
                        onChange={(url) =>
                          setValue(`services.${index}.image`, url)
                        }
                      />
                      {errors?.services?.[index]?.image?.message && (
                        <p className="text-red-500 text-sm">
                          {errors.services[index].image.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block font-medium text-gray-200">
                        Alt Text
                      </label>
                      <input
                        {...register(`services.${index}.alt` as const, {
                          required: "Alt is required",
                        })}
                        type="text"
                        className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all"
                        placeholder="Descriptive text for accessibility"
                      />
                      {errors?.services?.[index]?.alt?.message && (
                        <p className="text-red-500 text-sm">
                          {errors.services[index].alt.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  No services added yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start by adding your first service
                </p>
                <button
                  type="button"
                  onClick={() =>
                    append({
                      service_title: "",
                      service_description: "",
                      image: "",
                      alt: "",
                    })
                  }
                  className="inline-flex items-center gap-2 bg-linear-to-r from-[#1E9ED2] to-[#0D8BC6] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1787b5] hover:to-[#0C7AA5] transition-all shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add First Service
                </button>
              </div>
            )}
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

export default ServiceForm;
