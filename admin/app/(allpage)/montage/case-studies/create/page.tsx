/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import ImageUploader from "@/component/ImageUploader";

type CaseType = "client_success" | "product" | "research" | "business";
type StatusType = "draft" | "published" | "archived";

interface FormData {
  slug: string;
  type: CaseType;
  status: StatusType;
  title: string;
  description: string;
  image_url: string;
  image_alt: string;
  client_name: string;
  client_logo: string;
  client_industry: string;
  client_domain: string;
  client_employees: number | undefined;
  client_desc: string;
  challenge_intro: string;
  solution_intro: string;
  outcome_desc: string;
  outcome_video: string;
  meta_title: string;
  meta_desc: string;
  meta_keywords: string;
  calendly_url: string;
  tag_slugs: string[];
  client_tags: string[];
  hero_stats: { value: string; label: string }[];
  metrics: { value: string; label: string; sub: string }[];
  challenge_items: { title: string; desc: string }[];
  solution_phases: { phase: string; time_range: string; desc: string }[];
  testimonials: {
    quote: string;
    name: string;
    role: string;
    avatar_url: string;
  }[];
}

const defaultFormData: FormData = {
  slug: "",
  type: "client_success",
  status: "draft",
  title: "",
  description: "",
  image_url: "",
  image_alt: "",
  client_name: "",
  client_logo: "",
  client_industry: "",
  client_domain: "",
  client_employees: undefined,
  client_desc: "",
  challenge_intro: "",
  solution_intro: "",
  outcome_desc: "",
  outcome_video: "",
  meta_title: "",
  meta_desc: "",
  meta_keywords: "",
  calendly_url: "",
  tag_slugs: [],
  client_tags: [],
  hero_stats: [{ value: "", label: "" }],
  metrics: [{ value: "", label: "", sub: "" }],
  challenge_items: [{ title: "", desc: "" }],
  solution_phases: [{ phase: "", time_range: "", desc: "" }],
  testimonials: [{ quote: "", name: "", role: "", avatar_url: "" }],
};

const steps = [
  { id: 1, name: "Header & Meta" },
  { id: 2, name: "Client Info" },
  { id: 3, name: "Challenge, Solution & Results" },
];

const typeOptions: { id: CaseType; title: string; desc: string }[] = [
  {
    id: "client_success",
    title: "Client Success",
    desc: "Real client outcomes",
  },
  { id: "product", title: "Product", desc: "Feature deep-dive" },
  { id: "research", title: "Research", desc: "Data-backed study" },
  { id: "business", title: "Business", desc: "Problem & solution" },
];

// ── Required fields per step ──────────────────────────────────────────────────
// Step 1
const STEP1_FIELDS: (keyof FormData)[] = [
  "title",
  "slug",
  "description",
  "image_url",
  "image_alt",
  "meta_title",
  "meta_desc",
  "meta_keywords",
  "calendly_url",
];
// Step 2
const STEP2_FIELDS: (keyof FormData)[] = [
  "client_name",
  "client_logo",
  "client_industry",
  "client_domain",
  "client_employees",
  "client_desc",
];
// Step 3
const STEP3_FIELDS: (keyof FormData)[] = [
  "challenge_intro",
  "solution_intro",
  "outcome_desc",
];

const inp =
  "w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]";
const inpSm =
  "w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-[13px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd]";
const inpErr = "border-red-500 focus:border-red-500 focus:ring-red-500";
const lbl =
  "block text-[11px] font-semibold text-[#7a8899] uppercase tracking-[.08em] mb-2";
const errMsg = "text-[11px] text-red-400 mt-1";
const trashBtn =
  "w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all shrink-0";
const addBtn =
  "w-full flex items-center justify-center gap-2 border border-dashed border-[#1fb5dd]/40 text-[#1fb5dd] py-3 rounded-xl text-[12px] font-medium hover:bg-[#1fb5dd]/10 transition-all";
const card =
  "bg-[#151b24]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 shadow-xl";

export default function CreateCaseStudyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const heroStats = useFieldArray({ control, name: "hero_stats" });
  const metrics = useFieldArray({ control, name: "metrics" });
  const challengeItems = useFieldArray({ control, name: "challenge_items" });
  const solutionPhases = useFieldArray({ control, name: "solution_phases" });
  const testimonials = useFieldArray({ control, name: "testimonials" });

  // ── Step validation ─────────────────────────────────────────────────────────
  const validateStep = async (stepFields: (keyof FormData)[]) => {
    const results = await trigger(stepFields as any);
    return results;
  };

  const goTo = (s: number) => {
    setCurrentStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async (nextStep: number, fields: (keyof FormData)[]) => {
    const valid = await validateStep(fields);
    if (valid) goTo(nextStep);
  };

  const toggleTag = (arr: "tag_slugs" | "client_tags", tag: string) => {
    const cur = getValues(arr);
    setValue(
      arr,
      cur.includes(tag) ? cur.filter((t: string) => t !== tag) : [...cur, tag],
      { shouldValidate: true },
    );
  };

  const addCustomTag = (inputId: string, arr: "tag_slugs" | "client_tags") => {
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    const v = el?.value.trim();
    if (!v) return;
    const cur = getValues(arr);
    if (!cur.includes(v)) setValue(arr, [...cur, v], { shouldValidate: true });
    if (el) el.value = "";
  };

  const onSubmit = async (data: FormData) => {
    // Validate step 3 fields before submit
    const valid = await validateStep(STEP3_FIELDS);
    if (!valid) return;

    const clean = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === "" ? undefined : v]),
    );
    setIsSubmitting(true);
    try {
      await api_url.post("/api/case-studies", clean);
      toast.success("Published!");
    } catch {
      toast.error("Failed to publish");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchType = watch("type");
  const watchStatus = watch("status");
  const watchTags = watch("tag_slugs");
  const watchCtags = watch("client_tags");

  const show = (s: number) => (currentStep === s ? "block" : "hidden");

  // ── Helper: combine base class + error class ────────────────────────────────
  const field = (base: string, hasError: boolean) =>
    `${base} ${hasError ? inpErr : ""}`;

  const CardHeader = ({
    emoji,
    title,
    sub,
  }: {
    emoji: string;
    title: string;
    sub: string;
  }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1fb5dd] to-[#0d8eb0] flex items-center justify-center shadow-lg shadow-[#1fb5dd]/20">
        <span className="text-white text-lg">{emoji}</span>
      </div>
      <div>
        <h2 className="font-semibold text-white text-lg">{title}</h2>
        <p className="text-[12px] text-[#7a8899]">{sub}</p>
      </div>
    </div>
  );

  const Section = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-5 bg-linear-to-b from-[#1fb5dd] to-[#0d8eb0] rounded-full" />
      <h3 className="text-[13px] font-semibold text-white">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e14] via-[#0f141c] to-[#0a0e14] text-[#e8edf5]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-white mb-1">
            Create Case Study
          </h1>
          <p className="text-[14px] text-[#7a8899]">
            Auto-saves to browser storage.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-10">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#1c2534]" />
          <div className="relative flex justify-between">
            {steps.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => s.id < currentStep && goTo(s.id)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${
                    s.id < currentStep
                      ? "bg-[#1fb5dd] text-white"
                      : s.id === currentStep
                        ? "bg-[#1fb5dd] text-white ring-4 ring-[#1fb5dd]/30 scale-110"
                        : "bg-[#1c2534] text-[#7a8899] border border-[#2a3545]"
                  }`}
                >
                  {s.id < currentStep ? <CheckCircle size={16} /> : s.id}
                </div>
                <span
                  className={`text-[11px] text-center ${s.id === currentStep ? "text-[#1fb5dd]" : "text-[#7a8899]"}`}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── STEP 1 ── */}
          <div className={show(1)}>
            <div className={card}>
              <CardHeader
                emoji="📝"
                title="Header & Metadata"
                sub="Title, slug, description and type"
              />

              {/* Type */}
              <div className="mb-6">
                <label className={lbl}>
                  Type <span className="text-[#1fb5dd]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={watchType}
                    onChange={(e) =>
                      setValue("type", e.target.value as CaseType, {
                        shouldValidate: true,
                      })
                    }
                    className="w-full bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 pr-10 text-[14px] text-[#e8edf5] outline-none transition-all focus:border-[#1fb5dd] focus:ring-1 focus:ring-[#1fb5dd] appearance-none cursor-pointer"
                  >
                    {typeOptions.map((t) => (
                      <option
                        key={t.id}
                        value={t.id}
                        className="bg-[#1c2534] text-[#e8edf5]"
                      >
                        {t.title} — {t.desc}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8899]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={lbl}>
                    Title <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.title)}
                    placeholder="How We Helped"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className={errMsg}>{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className={lbl}>
                  Slug <span className="text-[#1fb5dd]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#7a8899] font-mono">
                    /case-study/
                  </span>
                  <input
                    className={`${field(inp, !!errors.slug)} pl-28 font-mono`}
                    placeholder="technova-saas-3x"
                    {...register("slug", {
                      required: "Slug is required",
                      onChange: (e) => {
                        e.target.value = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-");
                      },
                    })}
                  />
                </div>
                {errors.slug && <p className={errMsg}>{errors.slug.message}</p>}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className={lbl}>
                  Description <span className="text-[#1fb5dd]">*</span>
                </label>
                <textarea
                  rows={3}
                  className={`${field(inp, !!errors.description)} resize-vertical`}
                  placeholder="A deep dive into..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <p className={errMsg}>{errors.description.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-right text-[11px] text-[#7a8899]">
                    {watch("description")?.length ?? 0} / 200
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <ImageUploader
                    title="Image URL *"
                    onChange={(url: string) => {
                      setValue("image_url", url, { shouldValidate: true });
                    }}
                    value={watch("image_url")}
                  />
                  {/* hidden input so RHF tracks it */}
                  <input
                    type="hidden"
                    {...register("image_url", {
                      required: "Image URL is required",
                    })}
                  />
                  {errors.image_url && (
                    <p className={errMsg}>{errors.image_url.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Image Alt <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.image_alt)}
                    placeholder="Alt text"
                    {...register("image_alt", {
                      required: "Image alt is required",
                    })}
                  />
                  {errors.image_alt && (
                    <p className={errMsg}>{errors.image_alt.message}</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className={lbl}>Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    "saas",
                    "growth",
                    "marketing",
                    "b2b",
                    "startup",
                    "fintech",
                    "ecommerce",
                  ].map((t) => (
                    <span
                      key={t}
                      onClick={() => toggleTag("tag_slugs", t)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${watchTags.includes(t) ? "bg-[#1fb5dd] text-white" : "bg-[#1fb5dd]/10 text-[#1fb5dd] hover:bg-[#1fb5dd]/20"}`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    id="customTag"
                    type="text"
                    placeholder="Custom tag..."
                    className="flex-1 max-w-48 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none focus:border-[#1fb5dd]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag("customTag", "tag_slugs");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addCustomTag("customTag", "tag_slugs")}
                    className="border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-4 py-2 rounded-xl text-[13px] hover:border-white/20 hover:text-white transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* SEO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={lbl}>
                    Meta Title <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.meta_title)}
                    placeholder="SEO title..."
                    {...register("meta_title", {
                      required: "Meta title is required",
                    })}
                  />
                  {errors.meta_title && (
                    <p className={errMsg}>{errors.meta_title.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Meta Keywords <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.meta_keywords)}
                    placeholder="saas, growth..."
                    {...register("meta_keywords", {
                      required: "Meta keywords are required",
                    })}
                  />
                  {errors.meta_keywords && (
                    <p className={errMsg}>{errors.meta_keywords.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Calendly URL <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.calendly_url)}
                    placeholder="https://calendly.com/..."
                    {...register("calendly_url", {
                      required: "Calendly URL is required",
                    })}
                  />
                  {errors.calendly_url && (
                    <p className={errMsg}>{errors.calendly_url.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className={lbl}>
                  Meta Description <span className="text-[#1fb5dd]">*</span>
                </label>
                <textarea
                  rows={2}
                  className={`${field(inp, !!errors.meta_desc)} resize-vertical`}
                  placeholder="SEO description..."
                  {...register("meta_desc", {
                    required: "Meta description is required",
                  })}
                />
                {errors.meta_desc && (
                  <p className={errMsg}>{errors.meta_desc.message}</p>
                )}
              </div>

              {/* Nav */}
              <div className="flex justify-end mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  type="button"
                  onClick={() => handleNext(2, STEP1_FIELDS)}
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ── STEP 2 ── */}
          <div className={show(2)}>
            <div className={card}>
              <CardHeader
                emoji="🏢"
                title="Client Info"
                sub="Company details and tags"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={lbl}>
                    Client Name <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.client_name)}
                    placeholder="TechNova Inc."
                    {...register("client_name", {
                      required: "Client name is required",
                    })}
                  />
                  {errors.client_name && (
                    <p className={errMsg}>{errors.client_name.message}</p>
                  )}
                </div>
                <div>
                  <ImageUploader
                    title="Logo URL *"
                    onChange={(url: string) =>
                      setValue("client_logo", url, { shouldValidate: true })
                    }
                    value={watch("client_logo")}
                  />
                  <input
                    type="hidden"
                    {...register("client_logo", {
                      required: "Client logo is required",
                    })}
                  />
                  {errors.client_logo && (
                    <p className={errMsg}>{errors.client_logo.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Industry <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.client_industry)}
                    placeholder="B2B SaaS"
                    {...register("client_industry", {
                      required: "Industry is required",
                    })}
                  />
                  {errors.client_industry && (
                    <p className={errMsg}>{errors.client_industry.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Domain <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.client_domain)}
                    placeholder="Project Management"
                    {...register("client_domain", {
                      required: "Domain is required",
                    })}
                  />
                  {errors.client_domain && (
                    <p className={errMsg}>{errors.client_domain.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Employees <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    type="number"
                    className={field(inp, !!errors.client_employees)}
                    placeholder="45"
                    {...register("client_employees", {
                      required: "Employee count is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Must be at least 1" },
                    })}
                  />
                  {errors.client_employees && (
                    <p className={errMsg}>{errors.client_employees.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className={lbl}>
                  Client Description <span className="text-[#1fb5dd]">*</span>
                </label>
                <textarea
                  rows={3}
                  className={`${field(inp, !!errors.client_desc)} resize-vertical`}
                  placeholder="About the client..."
                  {...register("client_desc", {
                    required: "Client description is required",
                  })}
                />
                {errors.client_desc && (
                  <p className={errMsg}>{errors.client_desc.message}</p>
                )}
              </div>

              <div>
                <label className={lbl}>Client Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["b2b", "b2c", "enterprise", "startup", "smb"].map((t) => (
                    <span
                      key={t}
                      onClick={() => toggleTag("client_tags", t)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${watchCtags.includes(t) ? "bg-[#1fb5dd] text-white" : "bg-[#1fb5dd]/10 text-[#1fb5dd] hover:bg-[#1fb5dd]/20"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    id="customCtag"
                    type="text"
                    placeholder="Custom tag..."
                    className="flex-1 max-w-48 bg-[#1c2534] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-[14px] text-[#e8edf5] outline-none focus:border-[#1fb5dd]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag("customCtag", "client_tags");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addCustomTag("customCtag", "client_tags")}
                    className="border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-4 py-2 rounded-xl text-[13px] hover:border-white/20 hover:text-white transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Nav */}
              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="flex items-center gap-2 border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNext(3, STEP2_FIELDS)}
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-8 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ── STEP 3 ── */}
          <div className={show(3)}>
            <div className={card}>
              <CardHeader
                emoji="🎯"
                title="Challenge, Solution & Results"
                sub="Problem, approach, stats and testimonials"
              />

              {/* Challenge */}
              <div className="mb-8">
                <Section title="Challenge" />
                <div className="mb-3">
                  <label className={lbl}>
                    Intro <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.challenge_intro)}
                    placeholder="TechNova faced three compounding problems..."
                    {...register("challenge_intro", {
                      required: "Challenge intro is required",
                    })}
                  />
                  {errors.challenge_intro && (
                    <p className={errMsg}>{errors.challenge_intro.message}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {challengeItems.fields.map((f, i) => (
                    <div
                      key={f.id}
                      className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4"
                    >
                      <div className="flex gap-3 mb-3">
                        <div className="flex-1">
                          <input
                            className={`${field(inpSm, !!errors.challenge_items?.[i]?.title)} flex-1 w-full`}
                            placeholder="Challenge title *"
                            {...register(`challenge_items.${i}.title`, {
                              required: "Title required",
                            })}
                          />
                          {errors.challenge_items?.[i]?.title && (
                            <p className={errMsg}>
                              {errors.challenge_items[i]?.title?.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => challengeItems.remove(i)}
                          className={trashBtn}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input
                        className={field(
                          inpSm,
                          !!errors.challenge_items?.[i]?.desc,
                        )}
                        placeholder="Description *"
                        {...register(`challenge_items.${i}.desc`, {
                          required: "Description required",
                        })}
                      />
                      {errors.challenge_items?.[i]?.desc && (
                        <p className={errMsg}>
                          {errors.challenge_items[i]?.desc?.message}
                        </p>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      challengeItems.append({ title: "", desc: "" })
                    }
                    className={addBtn}
                  >
                    <Plus size={14} /> Add Challenge Item
                  </button>
                </div>
              </div>

              {/* Solution */}
              <div className="mb-8">
                <Section title="Solution" />
                <div className="mb-3">
                  <label className={lbl}>
                    Intro <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.solution_intro)}
                    placeholder="We deployed a three-phase intervention..."
                    {...register("solution_intro", {
                      required: "Solution intro is required",
                    })}
                  />
                  {errors.solution_intro && (
                    <p className={errMsg}>{errors.solution_intro.message}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {solutionPhases.fields.map((f, i) => (
                    <div
                      key={f.id}
                      className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <input
                            className={field(
                              inpSm,
                              !!errors.solution_phases?.[i]?.phase,
                            )}
                            placeholder="Phase (e.g. Diagnose) *"
                            {...register(`solution_phases.${i}.phase`, {
                              required: "Phase required",
                            })}
                          />
                          {errors.solution_phases?.[i]?.phase && (
                            <p className={errMsg}>
                              {errors.solution_phases[i]?.phase?.message}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input
                              className={field(
                                inpSm,
                                !!errors.solution_phases?.[i]?.time_range,
                              )}
                              placeholder="Weeks 1-6 *"
                              {...register(`solution_phases.${i}.time_range`, {
                                required: "Time range required",
                              })}
                            />
                            {errors.solution_phases?.[i]?.time_range && (
                              <p className={errMsg}>
                                {errors.solution_phases[i]?.time_range?.message}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => solutionPhases.remove(i)}
                            className={trashBtn}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <input
                        className={field(
                          inpSm,
                          !!errors.solution_phases?.[i]?.desc,
                        )}
                        placeholder="Description *"
                        {...register(`solution_phases.${i}.desc`, {
                          required: "Description required",
                        })}
                      />
                      {errors.solution_phases?.[i]?.desc && (
                        <p className={errMsg}>
                          {errors.solution_phases[i]?.desc?.message}
                        </p>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      solutionPhases.append({
                        phase: "",
                        time_range: "",
                        desc: "",
                      })
                    }
                    className={addBtn}
                  >
                    <Plus size={14} /> Add Phase
                  </button>
                </div>
              </div>

              {/* Hero Stats */}
              <div className="mb-8">
                <Section title="Hero Stats" />
                <div className="space-y-2">
                  {heroStats.fields.map((f, i) => (
                    <div
                      key={f.id}
                      className="grid grid-cols-[1fr,1fr,40px] gap-2"
                    >
                      <div>
                        <input
                          className={field(
                            inpSm,
                            !!errors.hero_stats?.[i]?.value,
                          )}
                          placeholder="3× *"
                          {...register(`hero_stats.${i}.value`, {
                            required: "Value required",
                          })}
                        />
                        {errors.hero_stats?.[i]?.value && (
                          <p className={errMsg}>
                            {errors.hero_stats[i]?.value?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          className={field(
                            inpSm,
                            !!errors.hero_stats?.[i]?.label,
                          )}
                          placeholder="ARR Growth *"
                          {...register(`hero_stats.${i}.label`, {
                            required: "Label required",
                          })}
                        />
                        {errors.hero_stats?.[i]?.label && (
                          <p className={errMsg}>
                            {errors.hero_stats[i]?.label?.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => heroStats.remove(i)}
                        className={trashBtn}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => heroStats.append({ value: "", label: "" })}
                    className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline"
                  >
                    <Plus size={12} /> Add Stat
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-8">
                <Section title="Metrics" />
                <div className="space-y-2">
                  {metrics.fields.map((f, i) => (
                    <div
                      key={f.id}
                      className="grid grid-cols-[1fr,1fr,1.5fr,40px] gap-2"
                    >
                      <div>
                        <input
                          className={field(inpSm, !!errors.metrics?.[i]?.value)}
                          placeholder="$2.4M *"
                          {...register(`metrics.${i}.value`, {
                            required: "Value required",
                          })}
                        />
                        {errors.metrics?.[i]?.value && (
                          <p className={errMsg}>
                            {errors.metrics[i]?.value?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          className={field(inpSm, !!errors.metrics?.[i]?.label)}
                          placeholder="Annual Revenue *"
                          {...register(`metrics.${i}.label`, {
                            required: "Label required",
                          })}
                        />
                        {errors.metrics?.[i]?.label && (
                          <p className={errMsg}>
                            {errors.metrics[i]?.label?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          className={field(inpSm, !!errors.metrics?.[i]?.sub)}
                          placeholder="up from $800K *"
                          {...register(`metrics.${i}.sub`, {
                            required: "Sub required",
                          })}
                        />
                        {errors.metrics?.[i]?.sub && (
                          <p className={errMsg}>
                            {errors.metrics[i]?.sub?.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => metrics.remove(i)}
                        className={trashBtn}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      metrics.append({ value: "", label: "", sub: "" })
                    }
                    className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline"
                  >
                    <Plus size={12} /> Add Metric
                  </button>
                </div>
              </div>

              {/* Outcome */}
              <div className="mb-8">
                <Section title="Outcome" />
                <div className="mb-3">
                  <label className={lbl}>
                    Description <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className={`${field(inp, !!errors.outcome_desc)} resize-vertical`}
                    placeholder="By end of Q2 2025, TechNova crossed $2.4M ARR..."
                    {...register("outcome_desc", {
                      required: "Outcome description is required",
                    })}
                  />
                  {errors.outcome_desc && (
                    <p className={errMsg}>{errors.outcome_desc.message}</p>
                  )}
                </div>
                <div>
                  <label className={lbl}>
                    Video URL <span className="text-[#1fb5dd]">*</span>
                  </label>
                  <input
                    className={field(inp, !!errors.outcome_video)}
                    placeholder="https://youtu.be/..."
                    {...register("outcome_video", {
                      required: "Outcome video URL is required",
                    })}
                  />
                  {errors.outcome_video && (
                    <p className={errMsg}>{errors.outcome_video.message}</p>
                  )}
                </div>
              </div>

              {/* Testimonials */}
              <div className="mb-8">
                <Section title="Testimonials" />
                {testimonials.fields.map((f, i) => (
                  <div
                    key={f.id}
                    className="bg-[#1c2534]/50 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 mb-3"
                  >
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <input
                          className={field(
                            inpSm,
                            !!errors.testimonials?.[i]?.name,
                          )}
                          placeholder="Ayaan Khan *"
                          {...register(`testimonials.${i}.name`, {
                            required: "Name required",
                          })}
                        />
                        {errors.testimonials?.[i]?.name && (
                          <p className={errMsg}>
                            {errors.testimonials[i]?.name?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          className={field(
                            inpSm,
                            !!errors.testimonials?.[i]?.role,
                          )}
                          placeholder="CEO, TechNova *"
                          {...register(`testimonials.${i}.role`, {
                            required: "Role required",
                          })}
                        />
                        {errors.testimonials?.[i]?.role && (
                          <p className={errMsg}>
                            {errors.testimonials[i]?.role?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <ImageUploader
                          title="Avatar URL *"
                          onChange={(url: string) =>
                            setValue(`testimonials.${i}.avatar_url`, url, {
                              shouldValidate: true,
                            })
                          }
                          value={watch(`testimonials.${i}.avatar_url`)}
                        />
                        <input
                          type="hidden"
                          {...register(`testimonials.${i}.avatar_url`, {
                            required: "Avatar required",
                          })}
                        />
                        {errors.testimonials?.[i]?.avatar_url && (
                          <p className={errMsg}>
                            {errors.testimonials[i]?.avatar_url?.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => testimonials.remove(i)}
                        className={trashBtn}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      className={`${field(inpSm, !!errors.testimonials?.[i]?.quote)} w-full resize-vertical`}
                      placeholder="Working with this team was... *"
                      {...register(`testimonials.${i}.quote`, {
                        required: "Quote required",
                      })}
                    />
                    {errors.testimonials?.[i]?.quote && (
                      <p className={errMsg}>
                        {errors.testimonials[i]?.quote?.message}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    testimonials.append({
                      quote: "",
                      name: "",
                      role: "",
                      avatar_url: "",
                    })
                  }
                  className="text-[#1fb5dd] text-[12px] flex items-center gap-1 hover:underline"
                >
                  <Plus size={12} /> Add Testimonial
                </button>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className={lbl}>Status</label>
                <div className="flex gap-2">
                  {(["draft", "published", "archived"] as StatusType[]).map(
                    (s) => (
                      <div
                        key={s}
                        onClick={() =>
                          setValue("status", s, { shouldValidate: true })
                        }
                        className={`cursor-pointer px-4 py-2 rounded-full border text-[12px] font-medium transition-all capitalize
                      ${
                        watchStatus === s
                          ? s === "published"
                            ? "bg-green-500/20 border-green-500/50 text-green-400"
                            : s === "archived"
                              ? "bg-red-500/20 border-red-500/50 text-red-400"
                              : "bg-gray-500/20 border-gray-500/50 text-gray-400"
                          : "border-[rgba(255,255,255,0.08)] text-[#7a8899] hover:border-white/20"
                      }`}
                      >
                        {s}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Nav */}
              <div className="flex justify-between mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  className="flex items-center gap-2 border border-[rgba(255,255,255,0.08)] text-[#7a8899] px-6 py-2.5 rounded-xl text-[14px] hover:border-white/20 hover:text-[#e8edf5] transition-all"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-linear-to-r from-[#1fb5dd] to-[#0d8eb0] text-white px-10 py-2.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-[#1fb5dd]/30 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? "Publishing..." : "Publish"}{" "}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
