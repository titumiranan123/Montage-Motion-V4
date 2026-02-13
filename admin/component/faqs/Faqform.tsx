/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
import { IFaqItem, IFaqSection } from "@/interface/interface";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import ImageUploader from "../ImageUploader";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { api_url } from "@/hook/Apiurl";

interface FaqFormProps {
  initialData?: IFaqSection;
  onCancel: (p: boolean) => void;
}

export const FaqForm = ({ initialData, onCancel }: FaqFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
  const router = useRouter();
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
  const onSubmit = async (data: IFaqSection) => {
    try {
      const url = data.id ? `/api/faq/${data.id}` : "/api/faq";

      const res = data.id
        ? await api_url.patch(url, data)
        : await api_url.post(url, data);
      if (res.status === 201 || res.status === 200) {
        onCancel(false);
        router.refresh();
        Swal.fire({
          title: data.id ? "FAQ section updated!" : "FAQ section created!",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || "Failed to save",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-slate-900 lg:w-200 p-5 rounded-2xl text-white h-137.5 overflow-y-auto"
    >
      {/* Section Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-3">
          <label className="text-sm text-gray-300">Page Type*</label>
          <ServiceTypeSelect
            value={watch("type")}
            onChange={(v) => setValue("type", v)}
          />
          {errors.type && (
            <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <label className=" text-sm text-gray-300 ">Section Tag *</label>
          <input
            {...register("section_tag", {
              required: "Section tag is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.section_tag && (
            <p className="text-red-400 text-sm mt-1">
              {errors.section_tag.message}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-3 col-span-2">
          <label className=" text-sm text-gray-300 ">Section Title *</label>
          <input
            {...register("section_title", {
              required: "Section title is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.section_title && (
            <p className="text-red-400 text-sm mt-1">
              {errors.section_title.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-1">
            Section Description*
          </label>
          <textarea
            {...register("section_description", {
              required: "Section description is required",
              minLength: {
                value: 20,
                message: "Description should be at least 20 characters",
              },
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400 min-h-30"
          />
          {errors.section_description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.section_description.message}
            </p>
          )}
        </div>
        {/* contact information  */}
        <div className="col-span-2 text-2xl">Contact Information</div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Heading*
          </label>
          <input
            {...register("contact_heading", {
              required: "Contact heading is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_heading && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_heading.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Description *
          </label>
          <input
            {...register("contact_description", {
              required: "Contact description is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_description.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Name *</label>
          <input
            {...register("contact_name", {
              required: "Contact name is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Designation *
          </label>
          <input
            {...register("contact_position", {
              required: "Contact position is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_position && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_position.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Link *
          </label>
          <input
            {...register("contact_link", {
              required: "Contact link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_link && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_link.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Alt *
          </label>
          <input
            {...register("contact_alt", {
              required: "Contact alt is required",
            })}
            className="w-full p-2 rounded-md text-white border border-slate-400"
          />
          {errors.contact_alt && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_alt.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Contact Image*
          </label>
          <ImageUploader
            value={watch("contact_image")}
            onChange={(url) => setValue(`contact_image`, url)}
          />
          {errors.contact_image && (
            <p className="text-red-400 text-sm mt-1">
              {errors.contact_image.message}
            </p>
          )}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg text-gray-300">FAQ Items</h3>
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
              {...register(`faqs.${index}.question`, {
                required: "FAQ question is required",
              })}
              placeholder="Question"
              className="w-full p-2 rounded-md text-white border border-slate-400 mb-2"
            />
            {errors.faqs?.[index]?.question && (
              <p className="text-red-400 text-sm mb-2">
                {errors.faqs[index].question.message}
              </p>
            )}

            <textarea
              {...register(`faqs.${index}.answer`, {
                required: "FAQ answer is required",
                minLength: {
                  value: 10,
                  message: "Answer should be at least 10 characters",
                },
              })}
              placeholder="Answer"
              className="w-full p-2 rounded-md text-white border border-slate-400 min-h-20"
            />
            {errors.faqs?.[index]?.answer && (
              <p className="text-red-400 text-sm mt-1">
                {errors.faqs[index].answer.message}
              </p>
            )}

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
        {fields.length === 0 && (
          <p className="text-red-400 text-sm mb-2">
            At least one FAQ item is required
          </p>
        )}
        <button
          type="button"
          onClick={addFaqItem}
          className="flex items-center bg-[#1FB5DD] px-3 py-2 rounded-md"
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => onCancel(false)}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 flex items-center gap-3 justify-center w-44 bg-[#1FB5DD] rounded-md disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving ...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};
