"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { whychooseus_Section } from "./types";
import { CategorySelectComponent } from "@/utils/CategorySelectComponent";

const Whychooseusform = ({ initialData }: { initialData: any }) => {
  const { register, control, setValue, handleSubmit, watch, reset } =
    useForm<whychooseus_Section>({
      defaultValues: initialData
        ? initialData
        : {
            type: "home",
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
    console.log("✅ Form Submitted:", data);
    try {
      const response = initialData?.id
        ? await api_url.put(`/api/why-choose-us/${initialData.id}`, data)
        : await api_url.post("/api/why-choose-us", data);

      if (response.status === 200 || response.status === 201) {
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
    <div className="w-2xl mx-auto bg-black text-white p-8 rounded-2xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#1E9ED2]">
        {initialData?.id ? "Edit" : "Add"} Service Section
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 h-[70vh] overflow-y-scroll"
      >
        {/* Section Type */}
        <div>
          <label className="block font-medium text-gray-200">
            Section Type
          </label>
          <CategorySelectComponent
            onChange={(url) => {
              setValue("type", url);
            }}
            value={watch("type")}
          />
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
            {...register("paragraph")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
            rows={4}
            placeholder="Enter paragraph text"
          ></textarea>
        </div>

        {/* Why Choose Us Items */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1E9ED2] mb-3">
            Why Choose us Cards
          </h2>
          {fields.map((field, index) => (
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-200">
                    Image URL
                  </label>
                  <input
                    {...register(`whychooseus_items.${index}.icon`)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter image URL"
                  />
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
                    {...register(`whychooseus_items.${index}.alt`)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter alt text"
                  />
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
          className="w-full bg-[#1E9ED2] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1787b5] transition-all"
        >
          {initialData?.id ? "Update" : "Submit"} Form
        </button>
      </form>
    </div>
  );
};

export default Whychooseusform;
