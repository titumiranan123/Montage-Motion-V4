"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
import { IFaqItem, IFaqSection } from "@/interface/interface";
import { CategorySelectComponent } from "@/utils/CategorySelectComponent";

interface FaqFormProps {
  initialData?: IFaqSection;
  onSubmit: (data: IFaqSection) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const FaqForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: FaqFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IFaqSection>({
    defaultValues: initialData || {
      section_tag: "",
      section_title: "",
      section_description: "",
      contact_image: "",
      contact_heading: "",
      is_active: true,
      faqs: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "faqs",
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const addFaqItem = () => {
    const newItem: IFaqItem = {
      id: Date.now().toString(),
      question: "",
      answer: "",
      is_visible: true,
      sort_order: fields.length + 1,
    };
    append(newItem);
  };

  const reOrder = () => {
    fields.forEach((_, idx) => {
      setValue(`faqs.${idx}.sort_order`, idx + 1);
    });
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
      reOrder();
    }
  };

  const moveItemDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
      reOrder();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-slate-900 lg:w-[800px] p-5 rounded-2xl text-white h-[550px] overflow-y-auto"
    >
      {/* Section Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-300">Section Tag*</label>
          <CategorySelectComponent
            value={watch("section_tag")}
            onChange={(v) => setValue("section_tag", v)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Section Title*
          </label>
          <input
            {...register("section_title", { required: "Required" })}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-1">
            Section Description*
          </label>
          <textarea
            {...register("section_description", { required: "Required" })}
            className="w-full p-2 rounded-md text-black min-h-[80px]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Heading*
          </label>
          <input
            {...register("contact_heading", { required: "Required" })}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Image*
          </label>
          <input
            {...register("contact_image", { required: "Required" })}
            className="w-full p-2 rounded-md text-black"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg text-gray-300">FAQ Items</h3>
          <button
            type="button"
            onClick={addFaqItem}
            className="flex items-center bg-[#1FB5DD] px-3 py-2 rounded-md"
          >
            <FaPlus className="mr-2" /> Add Item
          </button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-300 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-300">FAQ {index + 1}</h4>
              <div className="flex gap-2">
                <button onClick={() => moveItemUp(index)} type="button">
                  <FaArrowUp />
                </button>
                <button onClick={() => moveItemDown(index)} type="button">
                  <FaArrowDown />
                </button>
                <button onClick={() => remove(index)} type="button">
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>

            <input
              {...register(`faqs.${index}.question`, { required: true })}
              placeholder="Question"
              className="w-full p-2 rounded-md text-black mb-2"
            />

            <textarea
              {...register(`faqs.${index}.answer`, { required: true })}
              placeholder="Answer"
              className="w-full p-2 rounded-md text-black min-h-[80px]"
            />

            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                {...register(`faqs.${index}.is_visible`)}
                className="mr-2"
              />
              <span className="text-gray-300">Visible</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-[#1FB5DD] rounded-md"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
