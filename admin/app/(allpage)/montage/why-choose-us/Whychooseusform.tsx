/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { whychooseus_Section } from "./types";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";

const Whychooseusform = ({
  initialData,
  setIsModalOpent,
}: {
  initialData: any;
  setIsModalOpent: (p: boolean) => void;
}) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<whychooseus_Section>({
    defaultValues: initialData
      ? initialData
      : {
          type: " ",
          tag: "",
          heading_part1: "",
          heading_part2: "",
          paragraph: "",
          whychooseus_items: [
            {
              title: "",
              description: "",
              icon: "",
              alt: "",
            },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "whychooseus_items",
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: whychooseus_Section) => {
    try {
      const response = initialData?.id
        ? await api_url.put(`/api/why-choose-us/${initialData.id}`, data)
        : await api_url.post("/api/why-choose-us", data);

      if (response.status === 200 || response.status === 201) {
        setIsModalOpent(false);
        toast.success(response?.data?.message);
        if (!initialData?.id) {
          reset(); // Reset form for new entries
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Submission error:", error.response || error);
    }
  };

  return (
    <div className="w-4xl h-[80vh] overflow-x-hidden overflow-y-scroll mx-auto bg-black text-white p-8 rounded-2xl shadow-lg border border-gray-800 ">
      <h2 className="text-3xl font-bold mb-6 text-[#1E9ED2]">
        {initialData?.id ? "Edit" : "Add"} Service Section
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
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
            <p className="text-sm text-red-400 mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Tag */}
        <div>
          <label className="block font-medium text-gray-200">Tag</label>
          <input
            {...register("tag", { required: "Tag is required" })}
            type="text"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
            placeholder="Enter Tag"
          />
          {errors?.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        {/* Heading */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-200">
              Heading (Part 1)
            </label>
            <input
              {...register("heading_part1", {
                required: "Heading part 1 is required",
              })}
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
              placeholder="Enter first part of heading"
            />
            {errors?.heading_part1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.heading_part1.message}
              </p>
            )}
          </div>
          {/* <div className="hidden">
            <label className="block font-medium text-gray-200">
              Heading (Part 2)
            </label>
            <input
              {...register("heading_part2")}
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
              placeholder="Enter second part of heading"
            />
          </div> */}
        </div>

        {/* Paragraph */}
        <div>
          <label className="block font-medium text-gray-200">Paragraph</label>
          <textarea
            {...register("paragraph", { required: "This field is required" })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
            rows={4}
            placeholder="Enter paragraph text"
          ></textarea>
          {errors?.paragraph && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paragraph.message}
            </p>
          )}
        </div>

        {/* Why Choose Us Items */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1E9ED2] mb-3">
            Why Choose us Cards
          </h2>
          {fields?.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-700 bg-gray-950 rounded-xl p-4 mb-4 space-y-3"
            >
              <div>
                <label className="block font-medium text-gray-200">Title</label>
                <input
                  {...register(`whychooseus_items.${index}.title`, {
                    required: "Title is required",
                  })}
                  type="text"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                  placeholder="Enter title"
                />
                {errors?.whychooseus_items?.[index]?.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.whychooseus_items?.[index]?.title?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-200">
                  Description
                </label>
                <textarea
                  {...register(`whychooseus_items.${index}.description`, {
                    required: "Description is required",
                  })}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                  rows={3}
                  placeholder="Enter description"
                ></textarea>
                {errors?.whychooseus_items?.[index]?.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.whychooseus_items?.[index]?.description?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-200">
                    Image
                  </label>
                  <input
                    {...register(`whychooseus_items.${index}.icon`, {
                      required: "This field is required",
                    })}
                    type="text"
                    className="w-full p-3 hidden bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter image URL"
                  />
                  {errors?.whychooseus_items?.[index]?.icon && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.whychooseus_items?.[index]?.icon?.message}
                    </p>
                  )}
                  <div className="mt-2">
                    <ImageUploader
                      value={watch(`whychooseus_items.${index}.icon`)}
                      onChange={(url) =>
                        setValue(`whychooseus_items.${index}.icon`, url)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-200">
                    Alt Text
                  </label>
                  <input
                    {...register(`whychooseus_items.${index}.alt`, {
                      required: "This field is required",
                    })}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter alt text"
                  />
                  {errors?.whychooseus_items?.[index]?.alt && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.whychooseus_items?.[index]?.alt?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 font-medium hover:underline"
                >
                  ❌ Remove Item
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                title: "",
                description: "",
                icon: "",
                alt: "",
              })
            }
            className="mt-2 bg-[#1E9ED2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1787b5] transition-all"
          >
            ➕ Add Why Choose Us Item
          </button>
        </div>

        {/* Submit */}
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
      </form>
    </div>
  );
};

export default Whychooseusform;
