"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { useState } from "react";
import { api_url } from "@/hook/Apiurl";

// Dynamically load Monaco Editor
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface RobotsTxtFormData {
  robots_txt: string;
}

const RobotsTxtForm = ({ data }: any) => {
  const { control, handleSubmit, setValue } = useForm<RobotsTxtFormData>({
    defaultValues: {
      robots_txt: data?.content ?? "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit Handler
  const onSubmit = async (data: RobotsTxtFormData) => {
    try {
      setIsSubmitting(true);

      const res = await api_url.post("/api/robots", {
        robotTxt: data.robots_txt,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Robots file saved successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1FB5DD] to-[#4FFFD0] bg-clip-text text-transparent mb-8 tracking-tight">
        Robots.txt Editor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Robots.txt Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Robots.txt Content
          </label>
          <Controller
            name="robots_txt"
            control={control}
            render={({ field }) => (
              <div className="border border-[#1FB5DD]/40 rounded-xl overflow-hidden">
                <MonacoEditor
                  height="350px"
                  defaultLanguage="plaintext"
                  theme="vs-dark"
                  value={field.value}
                  onChange={(val) => setValue("robots_txt", val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 12, bottom: 12 },
                    scrollBeyondLastLine: false,
                    formatOnPaste: true,
                  }}
                />
              </div>
            )}
          />
          <p className="mt-2 text-sm text-gray-400">
            Define crawl permissions, sitemap URLs, and user-agent rules.
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
                <FiSave className="w-5 h-5" /> Save Robots.txt
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RobotsTxtForm;
