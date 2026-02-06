/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

type Step = {
  step_order: number;
  title: string;
  heading: string;
  description: string;
  image: string;
  items: string[];
};

type FormData = {
  id?: string;
  page: string;
  tag: string;
  heading_title?: string;
  paragraph?: string;

  steps: Step[];
};

interface Props {
  defaultValues?: Partial<FormData>;
}

export default function InsightSectionForm({ defaultValues }: Props) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: defaultValues || {
      page: "",
      tag: "",
      heading_title: "",
      paragraph: "",
      steps: [
        {
          step_order: 1,
          title: "",
          heading: "",
          description: "",
          image: "",
          items: [""],
        },
      ],
    },
  });

  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  // Create a separate component for the nested items
  const StepItemField = ({ stepIndex }: { stepIndex: number }) => {
    const {
      fields: itemsFields,
      append: appendItem,
      remove: removeItem,
    } = useFieldArray({
      control,
      name: `steps.${stepIndex}.items` as "steps",
    });

    return (
      <div className="mt-2">
        <label className="block text-gray-200 mb-1">Items</label>
        {itemsFields.map((item, itemIndex) => (
          <div key={item.id} className="flex gap-2 mb-2">
            <input
              {...register(`steps.${stepIndex}.items.${itemIndex}` as const)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeItem(itemIndex)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendItem("" as never)}
          className="bg-green-500 text-white px-3 py-2 mt-1 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Item
        </button>
      </div>
    );
  };

  const onSubmit = async (formdata: any) => {
    try {
      const res = defaultValues?.id
        ? await api_url.patch(`/api/insight/${defaultValues?.id}`, formdata)
        : await api_url.post("/api/insight", formdata);
      if (res.status === 201 || res.status === 200) {
        toast.success(
          `Successfull ${defaultValues?.id ? defaultValues?.id : ""}`,
        );
        // setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving comparison");
    }
  };

  const inputStyle = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg";
  const labelStyle = "block text-gray-200 mb-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 h-[70vh] bg-slate-900 overflow-y-scroll w-5xl p-5"
    >
      <h2 className="text-2xl">Create or Update Insight Form</h2>

      {/* HEADER */}
      <div className="col-span-3 grid grid-cols-2 space-y-2">
        <div>
          <label className={labelStyle}>Page Type</label>
          <ServiceTypeSelect
            onChange={(url) => setValue("page", url)}
            value={watch("page")}
          />
        </div>

        <div>
          <label className={labelStyle}>Tag *</label>
          <input
            {...register("tag", { required: "Tag is required" })}
            className={inputStyle}
          />
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Section Title *</label>
          <input
            {...register("heading_title", { required: "Tag is required" })}
            className={inputStyle}
          />
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Paragraph *</label>
          <textarea
            {...register("paragraph", { required: "Tag is required" })}
            rows={4}
            className={inputStyle}
          />
        </div>
      </div>

      <h3 className="font-bold">Steps</h3>

      {stepsFields.map((step, stepIndex) => (
        <div key={step.id} className="border p-4 mb-4">
          <div className="mb-3">
            <label className={labelStyle}>Title</label>
            <input
              {...register(`steps.${stepIndex}.title` as const)}
              className={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className={labelStyle}>Heading</label>
            <input
              {...register(`steps.${stepIndex}.heading` as const)}
              className={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className={labelStyle}>Description</label>
            <textarea
              {...register(`steps.${stepIndex}.description` as const)}
              rows={4}
              className={inputStyle}
            />
          </div>
          <ImageUploader
            onChange={(p) => setValue(`steps.${stepIndex}.image`, p)}
            value={watch(`steps.${stepIndex}.image`)}
          />

          {/* Use the separate component for items */}
          <StepItemField stepIndex={stepIndex} />

          <button
            type="button"
            onClick={() => removeStep(stepIndex)}
            className="bg-red-700 text-white px-3 py-2 mt-2 rounded-lg hover:bg-red-800 transition-colors w-40 ms-auto flex justify-center items-end"
          >
            Remove Step
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          appendStep({
            step_order: stepsFields.length + 1,
            title: "",
            heading: "",
            description: "",
            image: "",
            items: [""],
          })
        }
        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Step
      </button>

      <div className="flex justify-end items-end">
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700 transition-colors w-36 ms-auto "
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
      </div>
    </form>
  );
}
