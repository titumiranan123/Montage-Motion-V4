/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ProcessSchema } from "./types";
import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { useRouter } from "next/navigation";

// ✅ Tailwind custom toggle (no Headless UI)
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-[#1E9ED2]" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const ProcessForm = ({
  initialData,
  setIsModalOpent,
}: {
  initialData: any;
  setIsModalOpent: (p: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ProcessSchema>({
    defaultValues: initialData
      ? initialData
      : {
          tag: "",
          heading_part1: "",
          heading_part2: "",
          paragraph: "",
          type: " ",
          image: "",
          alt: "",
          process_steps: [
            { icon: "", title: "", description: "", isHiden: false, alt: "" },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "process_steps",
  });

  const onSubmit = async (data: ProcessSchema) => {
    try {
      const response = await api_url.post("/api/process", data);
      if (response.status === 201) {
        router.refresh();
        toast.success(response.data.message);
        setIsModalOpent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl max-h-[80vh] overflow-y-scroll mx-auto bg-black text-white p-8 rounded-2xl border border-gray-800">
      <h1 className="text-3xl font-bold text-[#1E9ED2] mb-8">
        Working Process Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        {/* Process Type */}
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
          <label className="block text-gray-200 mb-1">Tag</label>
          <input
            {...register("tag", { required: "This field is required" })}
            placeholder="Enter section tag"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        {/* Headings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1">Heading (Part 1)</label>
            <input
              {...register("heading_part1", {
                required: "This field is required",
              })}
              placeholder="Enter first part of heading"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
            />
            {errors?.heading_part1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.heading_part1.message}
              </p>
            )}
          </div>
        </div>

        {/* Paragraph */}
        <div>
          <label className="block text-gray-200 mb-1">Paragraph</label>
          <textarea
            {...register("paragraph", { required: "This field is required" })}
            placeholder="Enter section paragraph"
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
          ></textarea>
          {errors?.paragraph && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paragraph.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1">Image</label>

            <ImageUploader
              value={watch("image")}
              onChange={(url) => setValue(`image`, url)}
            />
            <input
              {...register("image", { required: "This field is required" })}
              placeholder="Enter section  tag"
              className="hidden"
            />
            {errors?.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-200 mb-1">Alt *</label>
            <input
              {...register(`alt` as const, {
                required: "This field is required",
              })}
              placeholder="Enter step title"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
            />
            {errors?.alt && (
              <p className="text-red-500 text-sm mt-1">{errors.alt.message}</p>
            )}
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1E9ED2] mb-3">
            Process Steps
          </h2>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-700 rounded-xl p-5 mb-4 bg-gray-950"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-200 mb-1">Icon</label>

                  <ImageUploader
                    value={watch(`process_steps.${index}.icon`)}
                    onChange={(url) =>
                      setValue(`process_steps.${index}.icon`, url)
                    }
                  />
                  <input
                    {...register(`process_steps.${index}.icon`, {
                      required: "This field is required",
                    })}
                    placeholder="Enter section  tag"
                    className="hidden"
                  />
                  {errors?.process_steps?.[index]?.icon && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.process_steps?.[index]?.icon?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-200 mb-1">Title</label>
                  <input
                    {...register(`process_steps.${index}.title` as const, {
                      required: "This field is required",
                    })}
                    placeholder="Enter step title"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                  />
                  {errors?.process_steps?.[index]?.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.process_steps?.[index]?.title?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-gray-200 mb-1">Description</label>
                <textarea
                  {...register(`process_steps.${index}.description` as const, {
                    required: "This field is required",
                  })}
                  placeholder="Enter step description"
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                ></textarea>
                {errors?.process_steps?.[index]?.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.process_steps?.[index]?.description?.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label className="block text-gray-200 mb-1">Alt *</label>
                <textarea
                  {...register(`process_steps.${index}.alt` as const, {
                    required: "This field is required",
                  })}
                  placeholder="Enter icon alt"
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                ></textarea>
                {errors?.process_steps?.[index]?.alt && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.process_steps?.[index]?.alt?.message}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <label className="text-gray-300">Hide Step</label>
                <ToggleSwitch
                  checked={watch(`process_steps.${index}.isHiden`)}
                  onChange={(val) =>
                    setValue(`process_steps.${index}.isHiden`, val)
                  }
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-4 text-red-500 font-medium hover:underline"
              >
                ❌ Remove Step
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                icon: "",
                title: "",
                description: "",
                isHiden: false,
                alt: "",
              })
            }
            className="bg-[#1E9ED2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1787b5] transition-all"
          >
            ➕ Add Step
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
              Submiting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
