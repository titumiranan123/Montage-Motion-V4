"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ProcessSchema } from "./types";
import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";

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
  const { register, handleSubmit, control, setValue, watch } =
    useForm<ProcessSchema>({
      defaultValues: initialData
        ? initialData
        : {
            tag: "",
            heading_part1: "",
            heading_part2: "",
            paragraph: "",
            type: "home",
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
    console.log("✅ Submitted Data:", data);
    try {
      const response = await api_url.post("/api/process", data);
      if (response.status === 201) {
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
        <div>
          <label className="block text-gray-200 mb-1">Process Type</label>
          <ServiceTypeSelect
            onChange={(url) => {
              setValue("type", url);
            }}
            value={watch("type")}
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block text-gray-200 mb-1">Tag</label>
          <input
            {...register("tag")}
            placeholder="Enter section tag"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
          />
        </div>

        {/* Headings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1">Heading (Part 1)</label>
            <input
              {...register("heading_part1")}
              placeholder="Enter first part of heading"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
            />
          </div>
        </div>

        {/* Paragraph */}
        <div>
          <label className="block text-gray-200 mb-1">Paragraph</label>
          <textarea
            {...register("paragraph")}
            placeholder="Enter section paragraph"
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1">Image</label>

            <ImageUploader
              value={watch("image")}
              onChange={(url) => setValue(`image`, url)}
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-1">Alt *</label>
            <input
              {...register(`alt` as const)}
              placeholder="Enter step title"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
            />
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
                </div>
                <div>
                  <label className="block text-gray-200 mb-1">Title</label>
                  <input
                    {...register(`process_steps.${index}.title` as const)}
                    placeholder="Enter step title"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-gray-200 mb-1">Description</label>
                <textarea
                  {...register(`process_steps.${index}.description` as const)}
                  placeholder="Enter step description"
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                ></textarea>
              </div>
              <div className="mt-3">
                <label className="block text-gray-200 mb-1">Alt *</label>
                <textarea
                  {...register(`process_steps.${index}.alt` as const)}
                  placeholder="Enter icon alt"
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1E9ED2]"
                ></textarea>
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
          className="w-full bg-[#1E9ED2] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1787b5] transition-all"
        >
          Save Process
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
