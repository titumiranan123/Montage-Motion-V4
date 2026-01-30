"use client";

import {
  useForm,
  useFieldArray,
  FieldArrayWithId,
  UseFormRegister,
} from "react-hook-form";
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
};

const Section = ({
  title,
  colIndex,
  allowBonus,
  register,
  fieldArray,
  watch,
  setValue,
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
        <div className="w-[250px] overflow-hidden">
          <label className="block text-gray-200 mb-1">Image</label>

          <ImageUploader
            value={watch(`columns.${colIndex}.image`)}
            onChange={(url) => setValue(`columns.${colIndex}.image`, url)}
            className="w-[250px]! h-[80px]!"
          />
        </div>
      )}

      {/* Items */}
      {items.map((entry) => (
        <div key={entry.index} className="flex gap-2">
          <input
            {...register(`columns.${colIndex}.entries.${entry.index}.text`)}
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
      ))}

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

export default function ComparisonForm({ data }: { data: any }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
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
        </div>

        <div>
          <label className="block text-gray-200 mb-1">Tag</label>
          <input
            {...register("tag")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Section Title</label>
          <input
            {...register("heading_title")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Paragraph</label>
          <textarea
            {...register("paragraph")}
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
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
      />
      <Section
        title="Other Agencies"
        colIndex={1}
        register={register}
        fieldArray={agencies}
        setValue={setValue}
        watch={watch}
      />
      <Section
        title="Freelancers"
        colIndex={2}
        register={register}
        fieldArray={freelancers}
        setValue={setValue}
        watch={watch}
      />

      <button
        type="submit"
        className="w-64 bg-[#11bafd] col-span-3 text-white px-6 py-3 rounded-lg"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
