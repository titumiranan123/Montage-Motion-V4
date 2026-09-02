/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ServiceFilter } from "@/utils/Servicefilter";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import InsightSectionForm from "./InsightFrom";
import PodcastInsight from "./PodcastInsight";

const ComparisonWrapper = ({ data }: { data: any }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [initialData, setExistingData] = useState<any | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Only push "home" if no ?page param exists
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const deleteInsight = async () => {
    if (!data?.id || !window.confirm("Delete this insight section and all steps?")) {
      return;
    }

    try {
      await api_url.delete(`/api/insight/${data.id}`);
      toast.success("Insight section deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete insight section");
    }
  };

  const openForm = (formData?: any) => {
    setExistingData(formData);
    setIsModalOpen(true);
  };

  return (
    <div className="text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Insight Dashboard</h1>
          <p className="text-gray-400">Manage the insight section and podcast steps</p>
        </div>

        <div className="flex items-center gap-4">
          <ServiceFilter />
          <button
            onClick={() => openForm()}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            {data ? "Add New Insight" : "Add Insight Section"}
          </button>
        </div>
      </div>

      {data ? (
        <>
          <PodcastInsight data={data} />
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => openForm(data)}
              className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
            >
              Edit Insight
            </button>
            <button
              onClick={deleteInsight}
              className="border border-red-500 text-red-400 py-2 px-6 rounded-lg"
            >
              Delete Section
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No insight section found for this page. Add the first insight section to create it.
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center"
        >
          <div className="rounded-lg" onClick={(e) => e.stopPropagation()}>
            <InsightSectionForm
              defaultValues={initialData}
              onCancel={() => setIsModalOpen(false)}
              onSaved={() => {
                setIsModalOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonWrapper;
