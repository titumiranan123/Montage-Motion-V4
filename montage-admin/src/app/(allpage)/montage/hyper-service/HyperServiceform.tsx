"use client";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

/* =========================
   SECTION CONSTANTS
========================= */

export const SECTION_NAMES = [
  "short_hero",
  "home_hero",
  "podcast_hero",

  "service",
  "shorts_service",

  "our_clients",
  "work",
  "pricing",
  "testimonial",
  "process",
  "industry",

  "insight",
  "podcast_insight",

  "whychooseus",
  "faq",
  "contact",

  "before_after_section",
  "whysaas_video",
] as const;

export type sectionName = (typeof SECTION_NAMES)[number];

const SECTION_GROUPS: Record<string, sectionName[]> = {
  hero: ["short_hero", "home_hero", "podcast_hero"],
  serviceType: ["service", "shorts_service"],
  insights: ["insight", "podcast_insight"],
};

const getGroupBySection = (section: sectionName) => {
  for (const key in SECTION_GROUPS) {
    if (SECTION_GROUPS[key].includes(section)) {
      return SECTION_GROUPS[key];
    }
  }
  return null;
};

interface SectionItem {
  section_name: sectionName;
  visible: boolean;
}

export interface ServiceItem {
  id?: string; // Add this field
  service_title: string;
  service_description: string;
  image: string;
  icon_alt?: string;
  icon?: string;
  alt: string;
  href?: string;
  available_section?: SectionItem[];
  order_index?: number; // Add this for ordering
}

export interface PageService {
  type: string;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  services: ServiceItem[];
}

/* =========================
   COMPONENT
========================= */

const ServiceForm = ({ initialData }: { initialData?: PageService }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<PageService>({
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

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "services",
  });
  const watchedServices = watch("services");

  const onSubmit = async (data: PageService) => {
    try {
      // Add order_index to each service based on their current position
      const servicesWithOrder = data.services.map((service, index) => ({
        ...service,
        order_index: index,
      }));

      const updatedData = {
        ...data,
        services: servicesWithOrder,
      };

      const response = await api_url.post("/api/home-service", updatedData);
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || "Service saved successfully!");

        // If the response contains the updated data with IDs, update the form
        if (response.data?.data?.services) {
          // You might want to update the form with the new IDs here
          // Or refresh the page to get the latest data
        }
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service!");
    }
  };

  const moveService = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      move(index, index - 1);
    } else if (direction === "down" && index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-black text-white p-8 rounded-2xl border border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#1E9ED2]">
        Service Section Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 h-[70vh] overflow-y-scroll"
      >
        {/* ================= Section Info ================= */}
        <div>
          <label className="block font-medium">Section Type</label>
          <select
            {...register("type")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          >
            <option value="home">Home</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tag</label>
          <input
            {...register("tag")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Heading</label>
          <input
            {...register("heading_part1")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Paragraph</label>
          <textarea
            {...register("paragraph")}
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        {/* ================= Services ================= */}

        {fields.map((field, index) => {
          const currentSections =
            watchedServices[index]?.available_section || [];

          return (
            <div
              key={field.id}
              className="border border-gray-700 rounded-xl p-4 space-y-4 relative"
            >
              {/* Move buttons in top-right corner */}
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => moveService(index, "up")}
                  disabled={index === 0}
                  className={`p-2 rounded ${
                    index === 0
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  title="Move up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveService(index, "down")}
                  disabled={index === fields.length - 1}
                  className={`p-2 rounded ${
                    index === fields.length - 1
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  title="Move down"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Hidden ID field if it exists */}
              {field.id && (
                <input type="hidden" {...register(`services.${index}.id`)} />
              )}

              <input
                {...register(`services.${index}.service_title`)}
                placeholder="Service Title"
                className="w-full p-3 bg-gray-900 border rounded-lg"
              />
              <textarea
                {...register(`services.${index}.service_description`)}
                placeholder="Service Description"
                className="w-full p-3 bg-gray-900 border rounded-lg"
              />
              <ImageUploader
                value={watch(`services.${index}.image`)}
                onChange={(url) => setValue(`services.${index}.image`, url)}
              />
              <ImageUploader
                value={watch(`services.${index}.icon`)}
                onChange={(url) => setValue(`services.${index}.icon`, url)}
              />
              <input
                {...register(`services.${index}.alt`)}
                placeholder="Alt Text"
                className="w-full p-3 bg-gray-900 border rounded-lg"
              />
              <input
                {...register(`services.${index}.icon_alt`)}
                placeholder="Icon Alt Text"
                className="w-full p-3 bg-gray-900 border rounded-lg"
              />
              <input
                {...register(`services.${index}.href`, {
                  required: true,
                })}
                placeholder="Slug"
                className="w-full p-3 bg-gray-900 border rounded-lg"
              />
              {/* ========== AVAILABLE SECTIONS (FIXED) ========== */}
              <div>
                <p className="font-medium mb-2">Available Sections</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SECTION_NAMES.map((section) => {
                    const isChecked = currentSections.some(
                      (s) => s.section_name === section
                    );

                    return (
                      <label key={section} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          className="accent-[#1E9ED2]"
                          onChange={(e) => {
                            let updated = [...currentSections];
                            const group = getGroupBySection(section);

                            if (e.target.checked) {
                              if (group) {
                                updated = updated.filter(
                                  (s) => !group.includes(s.section_name)
                                );
                              }
                              updated.push({
                                section_name: section,
                                visible: true,
                              });
                            } else {
                              updated = updated.filter(
                                (s) => s.section_name !== section
                              );
                            }

                            setValue(
                              `services.${index}.available_section`,
                              updated
                            );
                          }}
                        />
                        <span className="text-sm">{section}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Remove Service
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              service_title: "",
              service_description: "",
              image: "",
              icon: "",
              icon_alt: "",
              alt: "",
              href: "",
              available_section: [],
            })
          }
          className="bg-[#1E9ED2] px-4 py-2 rounded-lg"
        >
          Add Service
        </button>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full cursor-pointer disabled:cursor-no-drop bg-[#1E9ED2] py-3 rounded-lg disabled:bg-slate-400 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
