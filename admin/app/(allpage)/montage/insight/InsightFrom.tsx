/* eslint-disable react-hooks/incompatible-library */
"use client";

import ImageUploader from "@/component/ImageUploader";
import { api_url } from "@/hook/Apiurl";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  heading_title: string;
  paragraph: string;

  steps: Step[];
};

interface Props {
  defaultValues?: Partial<FormData>;
  onCancel?: () => void;
  onSaved?: () => void;
}

const emptyStep = (): Step => ({
  step_order: 1,
  title: "",
  heading: "",
  description: "",
  image: "",
  items: [""],
});

const getDefaultValues = (defaultValues?: Partial<FormData>): FormData => ({
  id: defaultValues?.id,
  page: defaultValues?.page ?? "",
  tag: defaultValues?.tag ?? "",
  heading_title: defaultValues?.heading_title ?? "",
  paragraph: defaultValues?.paragraph ?? "",
  steps: defaultValues?.steps?.length
    ? defaultValues.steps.map((step, index) => ({
        step_order: step.step_order ?? index + 1,
        title: step.title ?? "",
        heading: step.heading ?? "",
        description: step.description ?? "",
        image: step.image ?? "",
        items: step.items?.length ? step.items : [""],
      }))
    : [emptyStep()],
});

export default function InsightSectionForm({
  defaultValues,
  onCancel,
  onSaved,
}: Props) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({ defaultValues: getDefaultValues(defaultValues) });

  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const StepItemField = ({ stepIndex }: { stepIndex: number }) => {
    const items = watch(`steps.${stepIndex}.items`) ?? [];
    const itemPath = `steps.${stepIndex}.items` as const;

    return (
      <div className="mt-2">
        <label className="block text-gray-200 mb-1">Items</label>
        {items.map((_, itemIndex) => (
          <div key={`${stepIndex}-${itemIndex}`} className="flex gap-2 mb-2">
            <input
              {...register(`steps.${stepIndex}.items.${itemIndex}` as const, {
                required: "Item is required",
                validate: (value) =>
                  value.trim().length > 0 || "Item is required",
              })}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            <button
              type="button"
              disabled={items.length === 1}
              onClick={() =>
                setValue(
                  itemPath,
                  items.filter((__, index) => index !== itemIndex),
                  { shouldDirty: true, shouldValidate: true },
                )
              }
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setValue(itemPath, [...items, ""], {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          className="bg-green-500 text-white px-3 py-2 mt-1 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Item
        </button>
      </div>
    );
  };

  const onSubmit = async (formdata: FormData) => {
    const payload: FormData = {
      ...formdata,
      page: formdata.page.trim(),
      tag: formdata.tag.trim(),
      heading_title: formdata.heading_title?.trim(),
      paragraph: formdata.paragraph?.trim(),
      steps: formdata.steps.map((step, index) => ({
        ...step,
        step_order: index + 1,
        title: step.title.trim(),
        heading: step.heading.trim(),
        description: step.description.trim(),
        image: step.image?.trim() ?? "",
        items: step.items.map((item) => item.trim()),
      })),
    };

    if (
      !payload.page ||
      !payload.tag ||
      !payload.heading_title ||
      !payload.paragraph ||
      payload.steps.length === 0 ||
      payload.steps.some(
        (step) =>
          !step.title ||
          !step.heading ||
          !step.description ||
          step.items.length === 0 ||
          step.items.some((item) => !item),
      )
    ) {
      toast.error("Complete all required insight fields before saving");
      return;
    }

    try {
      const res = defaultValues?.id
        ? await api_url.patch(`/api/insight/${defaultValues.id}`, payload)
        : await api_url.post("/api/insight", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data?.message ?? "Insight saved successfully");
        onSaved?.();
        router.refresh();
      }
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not save insight");
    }
  };

  const inputStyle = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg";
  const labelStyle = "block text-gray-200 mb-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 h-[70vh] bg-slate-900 overflow-y-scroll w-5xl p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl">
          {defaultValues?.id ? "Edit Insight Section" : "Create Insight Section"}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        )}
      </div>

      {/* HEADER */}
      <div className="col-span-3 grid grid-cols-2 space-y-2">
        <div>
          <label className={labelStyle}>Page Type *</label>
          <ServiceTypeSelect
            onChange={(url) =>
              setValue("page", url, { shouldDirty: true, shouldValidate: true })
            }
            value={watch("page")}
          />
          <input
            type="hidden"
            {...register("page", {
              required: "Page type is required",
              validate: (value) =>
                value.trim().length > 0 || "Page type is required",
            })}
          />
          {errors.page && (
            <p className="text-sm text-red-400">{errors.page.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyle}>Tag *</label>
          <input
            {...register("tag", {
              required: "Tag is required",
              validate: (value) => value.trim().length > 0 || "Tag is required",
            })}
            className={inputStyle}
          />
          {errors.tag && (
            <p className="text-sm text-red-400">{errors.tag.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Section Title *</label>
          <input
            {...register("heading_title", {
              required: "Section title is required",
              validate: (value) =>
                value.trim().length > 0 || "Section title is required",
            })}
            className={inputStyle}
          />
          {errors.heading_title && (
            <p className="text-sm text-red-400">{errors.heading_title.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Paragraph *</label>
          <textarea
            {...register("paragraph", {
              required: "Paragraph is required",
              validate: (value) =>
                value.trim().length > 0 || "Paragraph is required",
            })}
            rows={4}
            className={inputStyle}
          />
          {errors.paragraph && (
            <p className="text-sm text-red-400">{errors.paragraph.message}</p>
          )}
        </div>
      </div>

      <h3 className="font-bold">Steps</h3>

      {stepsFields.map((step, stepIndex) => (
        <div key={step.id} className="border p-4 mb-4">
          <div className="mb-3">
            <label className={labelStyle}>Title</label>
            <input
              {...register(`steps.${stepIndex}.title` as const, {
                required: "Title is required",
                validate: (value) =>
                  value.trim().length > 0 || "Title is required",
              })}
              className={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className={labelStyle}>Heading</label>
            <input
              {...register(`steps.${stepIndex}.heading` as const, {
                required: "Heading is required",
                validate: (value) =>
                  value.trim().length > 0 || "Heading is required",
              })}
              className={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className={labelStyle}>Description</label>
            <textarea
              {...register(`steps.${stepIndex}.description` as const, {
                required: "Description is required",
                validate: (value) =>
                  value.trim().length > 0 || "Description is required",
              })}
              rows={4}
              className={inputStyle}
            />
          </div>
          <ImageUploader
            onChange={(p) =>
              setValue(`steps.${stepIndex}.image`, p, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            value={watch(`steps.${stepIndex}.image`)}
          />

          {/* Use the separate component for items */}
          <StepItemField stepIndex={stepIndex} />

          <button
            type="button"
            disabled={stepsFields.length === 1}
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
