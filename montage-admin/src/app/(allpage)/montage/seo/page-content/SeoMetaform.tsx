"use client";

import { useForm, Controller } from "react-hook-form";
import { FiAlertCircle, FiSave } from "react-icons/fi";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { api_url } from "@/hook/Apiurl";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// ✅ Monaco Editor (no SSR)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface SeoMeta {
  id?: number;
  page_name:
    | "home"
    | "podcast"
    | "shorts"
    | "talking"
    | "saas"
    | "thumbnail"
    | "portfolio"
    | "career"
    | "contact"
    | "about"
    | "blog"
    | "terms"
    | "privacy"
    | "refund";
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  canonical_url?: string;
  meta_robots?:
    | "index, follow"
    | "noindex, nofollow"
    | "index, nofollow"
    | "noindex, follow";
  twitter_card_type: string;
  schema?: string;
}

interface SeoMetaFormProps {
  initialData?: Partial<SeoMeta>;
  token: string;
}

const SeoMetaForm: React.FC<SeoMetaFormProps> = ({ initialData, token }) => {
  console.log(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SeoMeta>({
    defaultValues: {
      page_name: initialData?.page_name ?? "home",
      meta_title: initialData?.meta_title ?? "",
      meta_description: initialData?.meta_description ?? "",
      meta_keywords: initialData?.meta_keywords ?? "",
      canonical_url: initialData?.canonical_url ?? "",
      meta_robots: initialData?.meta_robots ?? "index, follow",
      twitter_card_type:
        initialData?.twitter_card_type ?? "summary_large_image",
      schema: initialData?.schema ?? "",
    },
  });
  const router = useRouter();
  const pages = watch("page_name");
  useEffect(() => {
    if (pages ?? initialData?.page_name) {
      router.push(`?page_name=${pages ?? initialData?.page_name}`, {
        scroll: false,
      });
    }
  }, [pages, initialData?.page_name]);
  useEffect(() => {
    if (initialData) {
      setValue("meta_title", initialData.meta_title ?? "");
      setValue("meta_description", initialData.meta_description ?? "");
      setValue("meta_keywords", initialData.meta_keywords ?? "");
      setValue("canonical_url", initialData.canonical_url ?? "");
      setValue("meta_robots", initialData.meta_robots ?? "index, follow"); // default applied
      setValue(
        "twitter_card_type",
        initialData.twitter_card_type ?? "summary_large_image"
      );
      setValue("schema", initialData.schema ?? "");
    }
  }, [initialData]);

  const [titleLength, setTitleLength] = useState(
    initialData?.meta_title?.length || 0
  );
  const [descLength, setDescLength] = useState(
    initialData?.meta_description?.length || 0
  );

  const pageOptions: SeoMeta["page_name"][] = [
    "home",
    "podcast",
    "shorts",
    "talking",
    "saas",
    "thumbnail",
    "portfolio",
    "career",
    "contact",
    "about",
    "blog",
    "terms",
    "privacy",
    "refund",
  ];

  const robotsOptions: SeoMeta["meta_robots"][] = [
    "index, follow",
    "noindex, nofollow",
    "index, nofollow",
    "noindex, follow",
  ];

  const twitterCardOptions = [
    "summary",
    "summary_large_image",
    "app",
    "player",
  ];

  // ✅ Validate JSON
  // ✅ Fix: support undefined safely
  const validateJSON = (value?: string) => {
    if (!value || !value.trim()) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      toast.error("Invalid JSON in schema");
      return false;
    }
  };
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await api_url.post(`/api/seo`, data);

      if (res.status === 200) {
        setIsSubmitting(false);
        Swal.fire({
          title: res.data.message,
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#6366f1",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };
  return (
    <div
      className={`max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ${inter.className}`}
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1FB5DD] to-[#4FFFD0] bg-clip-text text-transparent mb-8 tracking-tight">
        Page SEO Content Editor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Page name & Robots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Page Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Page Name <span className="text-[#4FFFD0]">*</span>
            </label>
            <Controller
              name="page_name"
              control={control}
              rules={{ required: "Page name is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#1FB5DD]/40 transition"
                >
                  {pageOptions.map((p) => (
                    <option key={p} value={p}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.page_name && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.page_name.message}
              </p>
            )}
          </div>

          {/* Robots */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Meta Robots
            </label>
            <Controller
              name="meta_robots"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition"
                >
                  {robotsOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Meta Title <span className="text-[#4FFFD0]">*</span>
          </label>
          <input
            type="text"
            {...register("meta_title", {
              required: "Meta title is required",
            })}
            onChange={(e) => setTitleLength(e.target.value.length)}
            className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition"
            placeholder="Enter meta title (max 60 characters)"
          />
          <div className="mt-1 flex justify-between text-sm text-gray-400">
            {errors.meta_title && (
              <span className="text-red-400 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />{" "}
                {errors.meta_title.message}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Meta Description <span className="text-[#4FFFD0]">*</span>
          </label>
          <textarea
            rows={6}
            {...register("meta_description", {
              required: "Meta description is required",
            })}
            onChange={(e) => setDescLength(e.target.value.length)}
            className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition resize-y"
            placeholder="Enter meta description (max 160 characters)"
          />
          <div className="mt-1 flex justify-between text-sm text-gray-400">
            {errors.meta_description && (
              <span className="text-red-400 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />{" "}
                {errors.meta_description.message}
              </span>
            )}
          </div>
        </div>

        {/* Keywords + Canonical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              {...register("meta_keywords")}
              className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              {...register("canonical_url")}
              className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition"
              placeholder="https://example.com/page"
            />
          </div>
        </div>

        {/* Twitter Card */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Twitter Card Type
          </label>
          <Controller
            name="twitter_card_type"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 bg-[#0D0D0D] border border-[#1FB5DD]/40 text-gray-200 rounded-xl focus:ring-4 focus:ring-[#4FFFD0]/40 transition"
              >
                {twitterCardOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace("_", " ")}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* ✅ SCHEMA JSON EDITOR */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Schema (JSON-LD)
          </label>
          <Controller
            name="schema"
            control={control}
            rules={{ validate: validateJSON }}
            render={({ field }) => (
              <div className="border border-[#1FB5DD]/40 rounded-xl overflow-hidden">
                <MonacoEditor
                  height="300px"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={field.value}
                  onChange={(val) => setValue("schema", val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    formatOnPaste: true,
                    formatOnType: true,
                    padding: { top: 12, bottom: 12 }, // ✅ Added padding
                  }}
                />
              </div>
            )}
          />
          <p className="mt-2 text-sm text-gray-400">
            Enter valid JSON-LD schema markup for structured data.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1FB5DD] to-[#4FFFD0] text-black font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 disabled:opacity-50 ${
              isSubmitting ? "animate-pulse" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-black"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiSave className="w-5 h-5" /> Save SEO Metadata
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeoMetaForm;
