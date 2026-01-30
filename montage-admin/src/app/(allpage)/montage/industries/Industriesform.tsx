"use client";

import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { api_url } from "@/hook/Apiurl";
import ImageUploader from "@/component/ImageUploader";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";

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
  heading_title?: string;
  paragraph?: string;
  tabs: TabForm[];
};

/* ================= COMPONENT ================= */

export default function IndustryFormPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IndustryForm>({
    defaultValues: {
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
      <h2 className="text-2xl text-white">Create / Update Industry Section</h2>

      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-200 mb-1">Page</label>
          <ServiceTypeSelect
            value={watch("page")}
            onChange={(val) => setValue("page", val)}
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-1">Tag</label>
          <input
            {...register("tag", { required: true })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 mb-1">Heading Title</label>
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

          <input
            {...register(`tabs.${tabIndex}.tab_key`)}
            placeholder="Tab Key"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            {...register(`tabs.${tabIndex}.title`)}
            placeholder="Title"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <textarea
            {...register(`tabs.${tabIndex}.description`)}
            placeholder="Description"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg h-28"
          />

          <ImageUploader
            value={watch(`tabs.${tabIndex}.image`)}
            onChange={(url) => setValue(`tabs.${tabIndex}.image`, url)}
          />

          <input
            type="number"
            {...register(`tabs.${tabIndex}.position`, {
              valueAsNumber: true,
            })}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
            placeholder="Position"
          />

          <input
            {...register(`tabs.${tabIndex}.cta.label`)}
            placeholder="CTA Label"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            {...register(`tabs.${tabIndex}.cta.link`)}
            placeholder="CTA Link"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />

          {/* ================= OFFER POINTS ================= */}
          <OfferPoints
            control={control}
            register={register}
            tabIndex={tabIndex}
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
    </form>
  );
}

/* ================= OFFER POINTS COMPONENT ================= */

function OfferPoints({
  control,
  register,
  tabIndex,
}: {
  control: any;
  register: any;
  tabIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tabs.${tabIndex}.offer_points`,
  });

  return (
    <div className="space-y-2">
      <h4 className="text-white">Offer Points</h4>

      {fields.map((_, index) => (
        <div key={index} className="flex gap-2">
          <input
            {...register(`tabs.${tabIndex}.offer_points.${index}.text`)}
            className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg"
            placeholder={`Point ${index + 1}`}
          />
          <input
            type="number"
            {...register(`tabs.${tabIndex}.offer_points.${index}.position`, {
              valueAsNumber: true,
            })}
            className="w-24 p-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          <button type="button" onClick={() => remove(index)}>
            ❌
          </button>
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
