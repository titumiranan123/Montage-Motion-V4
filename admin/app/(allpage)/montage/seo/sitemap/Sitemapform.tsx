"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { useState } from "react";
import { api_url } from "@/hook/Apiurl";
import { useRouter } from "next/navigation";

// Load Monaco editor dynamically
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface SitemapFormData {
  sitemap_xml: string;
}

const Sitemapform = ({ data }: { data?: string | null }) => {
  const { control, handleSubmit } = useForm<SitemapFormData>({
    defaultValues: {
      sitemap_xml: data ?? ``,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateXml = (value: string) => {
    if (!value.trim()) return true;
    const document = new DOMParser().parseFromString(value, "application/xml");
    return !document.querySelector("parsererror") || "Enter valid XML content";
  };

  // Submit Handler
  const onSubmit = async (formData: SitemapFormData) => {
    try {
      setIsSubmitting(true);
      const sitemapXml = formData.sitemap_xml.replace(/\r\n/g, "\n");
      if (!validateXml(sitemapXml)) {
        toast.error("Enter valid XML content before saving");
        return;
      }
      const res = await api_url.post(
        "/api/sitemap",
        { sitemap_xml: sitemapXml },
      );

      if (res.status === 200) {
        toast.success(res.data?.message ?? "Sitemap saved successfully");
        router.refresh();
      }
    } catch (error: unknown) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not save sitemap.xml");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl bg-[#0A0A0A] rounded-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold bg-[#1FB5DD] bg-clip-text text-transparent mb-8 tracking-tight">
        Sitemap.xml Editor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* XML Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Sitemap XML Content
          </label>
          <Controller
            name="sitemap_xml"
            control={control}
            rules={{ validate: validateXml }}
            render={({ field }) => (
              <div className="border border-[#1FB5DD]/40 rounded-xl overflow-hidden">
                <MonacoEditor
                  height="400px"
                  defaultLanguage="xml"
                  theme="vs-dark"
                  value={field.value}
                  onChange={(val) => field.onChange(val ?? "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 12, bottom: 12 },
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              </div>
            )}
          />
          <p className="mt-2 text-sm text-gray-400">
            Paste or edit your sitemap XML here.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-full bg-[#1FB5DD] text-black font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 disabled:opacity-50 ${
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
                <FiSave className="w-5 h-5" /> Save Sitemap XML
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sitemapform;
