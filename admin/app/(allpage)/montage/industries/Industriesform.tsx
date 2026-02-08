/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { api_url } from "@/hook/Apiurl";
import ImageUploader from "@/component/ImageUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { X } from "lucide-react";

/* ================= TYPES ================= */

type OfferPoint = {
  text: string;
  position: number;
};

type TabForm = {
  tab_key: string;
  title: string;
  description: string;
  image: string;
  position: number;
  cta: {
    label: string;
    link: string;
  };
  offer_points: OfferPoint[];
};

type IndustryForm = {
  page: string;
  tag: string;
  heading_title: string;
  paragraph: string;
  tabs: TabForm[];
};

/* ================= COMPONENT ================= */

export default function IndustryFormPage({
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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IndustryForm>({
    defaultValues: data ?? {
      page: "",
      tag: "",
      heading_title: "",
      paragraph: "",
      tabs: [
        {
          tab_key: "",
          title: "",
          description: "",
          image: "",
          position: 1,
          cta: { label: "", link: "" },
          offer_points: [{ text: "", position: 1 }],
        },
      ],
    },
  });

  /* ================= TABS ================= */
  const {
    fields: tabFields,
    append: addTab,
    remove: removeTab,
  } = useFieldArray({
    control,
    name: "tabs",
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: IndustryForm) => {
    try {
      const res = await api_url.post("/api/industries", data);
      if (res.status === 200 || res.status === 201) {
        setOpen(false);
        toast.success("Saved successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Validation or server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 h-[70vh] bg-slate-900 w-full max-w-5xl overflow-y-scroll p-5"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-white">
          Create / Update Industry Section
        </h2>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <X className="text-red-500" />
        </button>
      </div>

      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-200 mb-1">Page *</label>
          <ServiceTypeSelect
            value={watch("page")}
            onChange={(val) => setValue("page", val, { shouldValidate: true })}
          />
          {errors.page && (
            <p className="text-red-400 text-sm mt-1">{errors.page.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200 mb-1">Tag *</label>
          <input
            {...register("tag", { required: "Tag is required" })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors.tag && (
            <p className="text-red-400 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Heading Title *</label>
          <input
            {...register("heading_title", {
              required: "Heading title is required",
            })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors.heading_title && (
            <p className="text-red-400 text-sm mt-1">
              {errors.heading_title.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Paragraph *</label>
          <textarea
            {...register("paragraph", {
              required: "Paragraph is required",
              minLength: {
                value: 20,
                message: "Paragraph should be at least 20 characters",
              },
            })}
            rows={4}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          {errors.paragraph && (
            <p className="text-red-400 text-sm mt-1">
              {errors.paragraph.message}
            </p>
          )}
        </div>
      </div>

      {/* ================= TABS ================= */}
      {tabFields.map((tab, tabIndex) => (
        <div
          key={tab.id}
          className="border border-slate-700 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl text-white">Tab #{tabIndex + 1}</h3>
            {tabFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeTab(tabIndex)}
                className="text-red-400"
              >
                ❌ Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Tab Key *</label>
            <input
              {...register(`tabs.${tabIndex}.tab_key`, {
                required: "Tab key is required",
              })}
              placeholder="Tab Key"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            {errors.tabs?.[tabIndex]?.tab_key && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].tab_key.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Title *</label>
            <input
              {...register(`tabs.${tabIndex}.title`, {
                required: "Title is required",
              })}
              placeholder="Title"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            {errors.tabs?.[tabIndex]?.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Description *</label>
            <textarea
              {...register(`tabs.${tabIndex}.description`, {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description should be at least 50 characters",
                },
              })}
              placeholder="Description"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg h-28"
            />
            {errors.tabs?.[tabIndex]?.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Image *</label>
            <ImageUploader
              value={watch(`tabs.${tabIndex}.image`)}
              onChange={(url) =>
                setValue(`tabs.${tabIndex}.image`, url, {
                  shouldValidate: true,
                })
              }
            />
            <input
              type="text"
              {...register(`tabs.${tabIndex}.image`, {
                required: "Image is required",
              })}
            />
            {errors.tabs?.[tabIndex]?.image && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].image.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">CTA Label *</label>
            <input
              {...register(`tabs.${tabIndex}.cta.label`, {
                required: "CTA label is required",
              })}
              placeholder="CTA Label"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            {errors.tabs?.[tabIndex]?.cta?.label && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].cta.label.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-200 mb-1">CTA Link *</label>
            <input
              {...register(`tabs.${tabIndex}.cta.link`, {
                required: "CTA link is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message:
                    "Please enter a valid URL starting with http:// or https://",
                },
              })}
              placeholder="CTA Link"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
            {errors.tabs?.[tabIndex]?.cta?.link && (
              <p className="text-red-400 text-sm mt-1">
                {errors.tabs[tabIndex].cta.link.message}
              </p>
            )}
          </div>

          {/* ================= OFFER POINTS ================= */}
          <OfferPoints
            control={control}
            register={register}
            tabIndex={tabIndex}
            errors={errors}
          />
        </div>
      ))}

      {/* ================= ADD TAB ================= */}
      <button
        type="button"
        onClick={() =>
          addTab({
            tab_key: "",
            title: "",
            description: "",
            image: "",
            position: tabFields.length + 1,
            cta: { label: "", link: "" },
            offer_points: [{ text: "", position: 1 }],
          })
        }
        className="text-green-400"
      >
        ➕ Add New Tab
      </button>

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

/* ================= OFFER POINTS COMPONENT ================= */

function OfferPoints({
  control,
  register,
  tabIndex,
  errors,
}: {
  control: any;
  register: any;
  tabIndex: number;
  errors: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tabs.${tabIndex}.offer_points`,
  });

  return (
    <div className="space-y-2">
      <h4 className="text-white">Offer Points *</h4>
      {fields.length === 0 && (
        <p className="text-red-400 text-sm">
          At least one offer point is required
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <input
                {...register(`tabs.${tabIndex}.offer_points.${index}.text`, {
                  required: "Offer point text is required",
                })}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
                placeholder={`Point ${index + 1}`}
              />
              {errors.tabs?.[tabIndex]?.offer_points?.[index]?.text && (
                <p className="text-red-400 text-sm">
                  {errors.tabs[tabIndex].offer_points[index].text.message}
                </p>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-3 text-red-400"
              >
                ❌
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ text: "", position: fields.length + 1 })}
        className="text-blue-400"
      >
        ➕ Add Point
      </button>
    </div>
  );
}
