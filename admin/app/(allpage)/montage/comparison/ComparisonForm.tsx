/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray, UseFormRegister } from "react-hook-form";
import {
  ComparisonEntry,
  ComparisonFormData,
  defaultComparisonValues,
} from "./compariosn";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import { PlusCircle, X } from "lucide-react";
import ImageUploader from "@/component/ImageUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";

type SectionProps = {
  title: string;
  colIndex: 0 | 1 | 2;
  allowBonus?: boolean;
  register: UseFormRegister<ComparisonFormData>;
  fieldArray: ReturnType<typeof useFieldArray<ComparisonFormData>>;
  watch: any;
  setValue: any;
  errors: any;
};

const Section = ({
  title,
  colIndex,
  allowBonus,
  register,
  fieldArray,
  watch,
  setValue,
  errors,
}: SectionProps) => {
  const { fields, append, remove } = fieldArray;

  // 🔧 FIX: preserve original index
  const items = fields
    .map((f, index) => ({ ...(f as ComparisonEntry), index }))
    .filter((f) => f.entry_type === "item");

  const bonuses = fields
    .map((f, index) => ({ ...(f as ComparisonEntry), index }))
    .filter((f) => f.entry_type === "bonus");

  return (
    <div className="border p-5 w-full rounded-xl space-y-5">
      <h2 className="text-lg font-semibold">{title}</h2>

      {watch(`columns.${colIndex}.title`) === null && (
        <div className="w-62.5 overflow-hidden">
          <label className="block text-gray-200 mb-1">Image</label>

          <ImageUploader
            value={watch(`columns.${colIndex}.image`)}
            onChange={(url) => setValue(`columns.${colIndex}.image`, url)}
            className="w-62.5! h-20!"
          />
        </div>
      )}

      {/* Items */}
      {items?.map((entry) => {
        const fieldError =
          errors?.columns?.[colIndex]?.entries?.[entry.index]?.text;

        return (
          <div key={entry.index} className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <input
                {...register(
                  `columns.${colIndex}.entries.${entry.index}.text`,
                  { required: "Text is required" },
                )}
                className="input w-full border border-slate-800 py-2 px-3 rounded-lg"
                placeholder="Item text"
              />

              <input
                type="hidden"
                {...register(
                  `columns.${colIndex}.entries.${entry.index}.entry_type`,
                )}
              />

              <button type="button" onClick={() => remove(entry.index)}>
                <X />
              </button>
            </div>

            {/* 🔴 Error message */}
            {fieldError && (
              <p className="text-red-500 text-sm">{fieldError.message}</p>
            )}
          </div>
        );
      })}

      {/* Bonus */}
      {bonuses.length > 0 && (
        <div className="p-4 rounded-lg space-y-2 border">
          <input
            {...register(`columns.${colIndex}.bonus_title`)}
            placeholder="Title"
            className="input w-full border border-slate-800 py-2 px-3 rounded-lg"
          />

          {bonuses.map((entry) => (
            <div key={entry.index} className="flex gap-2">
              <input
                {...register(`columns.${colIndex}.entries.${entry.index}.text`)}
                className="input w-full border border-slate-800 py-2 px-3 rounded-lg"
                placeholder="Bonus text"
              />
              <button type="button" onClick={() => remove(entry.index)}>
                <X />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            append({
              entry_type: "item",
              text: "",
              position: fields.length + 1,
            })
          }
          className="bg-[#1fc3f5] flex items-center gap-3 px-3 py-1 rounded"
        >
          <PlusCircle size={16} /> Add Item
        </button>

        {allowBonus && (
          <button
            type="button"
            onClick={() =>
              append({
                entry_type: "bonus",
                text: "",
                position: fields.length + 1,
              })
            }
            className="flex items-center gap-3 border border-[#1fc3f5] px-3 py-1 rounded text-[#1fc3f5]"
          >
            <PlusCircle size={18} /> Add Bonus
          </button>
        )}
      </div>
    </div>
  );
};

export default function ComparisonForm({
  data,
  setOpen,
}: {
  data: any;
  setOpen: (p: boolean) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm<ComparisonFormData>({
    defaultValues: data ? data : defaultComparisonValues,
  });

  const montage = useFieldArray({
    control,
    name: "columns.0.entries",
  });
  const agencies = useFieldArray({
    control,
    name: "columns.1.entries",
  });
  const freelancers = useFieldArray({
    control,
    name: "columns.2.entries",
  });

  const onSubmit = async (formdata: ComparisonFormData) => {
    formdata.columns.forEach((col) => {
      col.entries.forEach((e, i) => (e.position = i + 1));
    });
    try {
      const res = data?.id
        ? await api_url.patch(`/api/comparison/${data?.id}`, formdata)
        : await api_url.post("/api/comparison", formdata);
      if (res.status === 201 || res.status === 200) {
        toast.success(`Successfull ${data?.id ? data?.id : ""}`);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving comparison");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 grid grid-cols-3 h-[80vh] bg-slate-900  overflow-y-scroll p-5 gap-2 max-w-7xl rounded-xl"
    >
      <h2 className="text-2xl">Create or Update ComarisonFrom</h2>
      {/* HEADER */}
      <div className="col-span-3 grid grid-cols-2 space-y-2">
        <div>
          <label className="block text-gray-200 mb-1">Page Type</label>
          <ServiceTypeSelect
            onChange={(url) => setValue("page", url)}
            value={watch("page")}
          />
          <input
            type="text"
            {...register("page", { required: "This field is required" })}
          />
          {errors?.page && (
            <p className="text-red-500 text-sm mt-1">{errors.page.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200 mb-1">Tag *</label>
          <input
            {...register("tag", { required: "Tag is required" })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors?.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Section Title *</label>
          <input
            {...register("heading_title", { required: "Tag is required" })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors?.heading_title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.heading_title.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Paragraph *</label>
          <textarea
            {...register("paragraph", { required: "Tag is required" })}
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors?.paragraph && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paragraph.message}
            </p>
          )}
        </div>
      </div>

      <Section
        title="Montage"
        colIndex={0}
        allowBonus
        register={register}
        fieldArray={montage}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <Section
        title="Other Agencies"
        colIndex={1}
        register={register}
        fieldArray={agencies}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <Section
        title="Freelancers"
        colIndex={2}
        register={register}
        fieldArray={freelancers}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <div className=" flex justify-end w-full col-span-3 gap-5">
        <button
          className="py-2 px-4 border cursor-pointer border-cyan-500 rounded-lg"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-[#1FB5DD] text-white hover:bg-[#17A6CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer "
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
