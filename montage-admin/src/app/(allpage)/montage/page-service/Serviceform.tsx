"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { PageService } from "./types";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { ArrowDown, ArrowUp } from "lucide-react";

const ServiceForm = ({ initialData }: { initialData: any }) => {
  const { register, control, setValue, watch, handleSubmit } =
    useForm<PageService>({
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
    console.log("✅ Form Submitted:", data);
    try {
      const response = await api_url.post("/api/our-service", data);
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-8 rounded-2xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#1E9ED2]">
        Service Section Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 h-[70vh] overflow-y-auto"
      >
        {/* Section Type */}
        <div>
          <label className="block font-medium text-gray-200">
            Section Type
          </label>
          <ServiceTypeSelect
            onChange={(type: string) => {
              setValue("type", type);
            }}
            value={watch("type")}
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block font-medium text-gray-200">Tag</label>
          <input
            {...register("tag")}
            type="text"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
            placeholder="Enter Tag"
          />
        </div>

        {/* Heading - Fixed to match form structure */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-200">
              Heading (Part 1)
            </label>
            <input
              {...register("heading_part1")}
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
              placeholder="Enter first part of heading"
            />
          </div>
        </div>

        {/* Paragraph */}
        <div>
          <label className="block font-medium text-gray-200">Paragraph</label>
          <textarea
            {...register("paragraph")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
            rows={4}
            placeholder="Enter paragraph text"
          ></textarea>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1E9ED2] mb-3">
            Services
          </h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border border-gray-700 bg-gray-950 rounded-xl p-4 mb-4 space-y-4"
            >
              {/* Move buttons in top-right corner - Fixed positioning */}
              <div className="absolute right-4 top-4 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={() => moveService(index, "up")}
                  disabled={index === 0}
                  className={`p-2 rounded transition-colors ${
                    index === 0
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
                  }`}
                  title="Move up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveService(index, "down")}
                  disabled={index === fields.length - 1}
                  className={`p-2 rounded transition-colors ${
                    index === fields.length - 1
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
                  }`}
                  title="Move down"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              <div className="mt-6">
                <div>
                  <label className="block font-medium text-gray-200">
                    Service Title
                  </label>
                </div>
                <input
                  {...register(`services.${index}.service_title` as const)}
                  type="text"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-200">
                  Service Description
                </label>
                <textarea
                  {...register(
                    `services.${index}.service_description` as const
                  )}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                  rows={3}
                  placeholder="Enter service description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-200">
                    Image URL
                  </label>
                  <input
                    {...register(`services.${index}.image` as const)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter image URL"
                  />
                  <ImageUploader
                    value={watch(`services.${index}.image`)}
                    onChange={(url) => setValue(`services.${index}.image`, url)}
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-200">
                    Alt Text
                  </label>
                  <input
                    {...register(`services.${index}.alt` as const)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter alt text"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 font-medium hover:underline transition-colors"
              >
                ❌ Remove Service
              </button>
            </div>
          ))}

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
            className="mt-2 bg-[#1E9ED2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1787b5] transition-all"
          >
            ➕ Add Service
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#1E9ED2] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1787b5] transition-all"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
