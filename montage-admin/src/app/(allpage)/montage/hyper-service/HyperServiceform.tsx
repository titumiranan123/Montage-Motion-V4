"use client";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

// ✅ SECTION_NAMES constant
export const SECTION_NAMES = [
  "short-hero",
  "home-hero",
  "podcast-hero",
  "work",
  "testimonial",
  "pricing",
  "service",
  "process",
  "faq",
  "whychooseus",
  "contact",
  "our-clients",
  "shorts_service",
  "insight",
  "before_after_section",
  "industry",
  "whysaas_video",
] as const;

export type sectionName = (typeof SECTION_NAMES)[number];

interface SectionItem {
  section_name: sectionName;
  visible: boolean;
}

export interface ServiceItem {
  service_title: string;
  service_description: string;
  image: string;
  icon_alt?: string;
  icon?: string;
  alt: string;
  href?: string;
  available_section?: SectionItem[];
}

export interface PageService {
  type: string;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  services: ServiceItem[];
}

const ServiceForm = ({ initialData }: { initialData?: PageService }) => {
  const { register, control, handleSubmit, setValue, watch } =
    useForm<PageService>({
      defaultValues: initialData || {
        type: "home",
        tag: "",
        heading_part1: "",
        heading_part2: "",
        paragraph: "",
        services: [
          {
            service_title: "",
            service_description: "",
            image: "",
            icon: "",
            icon_alt: "",
            alt: "",
            href: "",
            available_section: [],
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Watch the services to get current values
  const watchedServices = watch("services");

  const onSubmit = async (data: PageService) => {
    console.log("✅ Form Submitted:", data);
    try {
      const response = await api_url.post("/api/our-service", data);
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || "Service saved successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save service!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-8 rounded-2xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#1E9ED2]">
        Service Section Form
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
          <select
            {...register("type")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
          >
            <option value="home" selected>
              Home
            </option>
          </select>
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

        {/* Headings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block font-medium text-gray-200">Heading</label>
            <input
              {...register("heading_part1")}
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
              placeholder="Enter first part of heading"
            />
          </div>
          <div className="hidden">
            <label className="block font-medium text-gray-200">
              Heading (Part 2)
            </label>
            <input
              {...register("heading_part2")}
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
              placeholder="Enter second part of heading"
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
              className="border border-gray-700 bg-gray-950 rounded-xl p-4 mb-4 space-y-3"
            >
              {/* Title */}
              <div>
                <label className="block font-medium text-gray-200">
                  Service Title
                </label>
                <input
                  {...register(`services.${index}.service_title` as const)}
                  type="text"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                  placeholder="Enter service title"
                />
              </div>

              {/* Description */}
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

              {/* Image + Alt + Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div className="hidden">
                  <label className="block font-medium text-gray-200">
                    Image URL
                  </label>
                  <input
                    {...register(`services.${index}.image` as const)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter image URL"
                  />
                </div>
                <ImageUploader
                  value={watch(`services.${index}.image`)}
                  onChange={(url) => setValue(`services.${index}.image`, url)}
                />
                <ImageUploader
                  value={watch(`services.${index}.icon`)}
                  onChange={(url) => setValue(`services.${index}.icon`, url)}
                />

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

                <div>
                  <label className="block font-medium text-gray-200">
                    Icon Alt Text
                  </label>
                  <input
                    {...register(`services.${index}.icon_alt` as const)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter alt text"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-200">
                    Slug (href)
                  </label>
                  <input
                    {...register(`services.${index}.href` as const, {
                      required: "Slug is required ",
                    })}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter slug "
                  />
                </div>

                <div className="hidden">
                  <label className="block font-medium text-gray-200">
                    Icon
                  </label>
                  <input
                    {...register(`services.${index}.icon` as const)}
                    type="text"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#1E9ED2]"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              {/* ✅ FIXED: Available Sections */}
              <div>
                <label className="block font-medium text-gray-200 mb-2">
                  Available Sections
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SECTION_NAMES?.map((section) => {
                    const currentSections =
                      watchedServices[index]?.available_section || [];
                    const isChecked = currentSections.some(
                      (s) => s.section_name === section
                    );

                    return (
                      <label
                        key={section}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="accent-[#1E9ED2] cursor-pointer"
                          checked={isChecked}
                          onChange={(e) => {
                            const updatedSections = [...currentSections];

                            if (e.target.checked) {
                              // Add section if checked
                              updatedSections.push({
                                section_name: section,
                                visible: true,
                              });
                            } else {
                              // Remove section if unchecked
                              const filteredSections = updatedSections.filter(
                                (s) => s.section_name !== section
                              );
                              setValue(
                                `services.${index}.available_section`,
                                filteredSections
                              );
                              return;
                            }

                            setValue(
                              `services.${index}.available_section`,
                              updatedSections
                            );
                          }}
                        />
                        <span className="text-gray-300 text-sm">{section}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 font-medium hover:underline"
              >
                ❌ Remove Service
              </button>
            </div>
          ))}

          {/* Add New */}
          <button
            type="button"
            onClick={() =>
              append({
                service_title: "",
                service_description: "",
                image: "",
                alt: "",
                href: "",
                icon: "",
                icon_alt: "",
                available_section: [],
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
