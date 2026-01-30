"use client";
import { FaqForm } from "@/component/faqs/Faqform";
import { api_url } from "@/hook/Apiurl";
import { IFaqSection } from "@/interface/interface";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import PageFaqSection from "./PagefaqSection";
import { ServiceFilter } from "@/utils/Servicefilter";

const FaqWrapper = ({ data }: any) => {
  const [existingData, setExistingData] = useState<IFaqSection | undefined>();
  const [isItemOpen, setItemOpen] = useState(false);

  const handleSubmit = async (data: IFaqSection) => {
    try {
      const url = data.id ? `/api/faq/${data.id}` : "/api/faq";

      data.id ? await api_url.patch(url, data) : await api_url.post(url, data);

      setItemOpen(false);

      Swal.fire({
        title: data.id ? "FAQ section updated!" : "FAQ section created!",
        icon: "success",
        background: "#1f2937",
        color: "#fff",
      });
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
    <div className="text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">FAQ Dashboard</h1>
          <p className="text-gray-400">Manage your FAQs</p>
        </div>

        <div className="flex items-center gap-4">
          <ServiceFilter />
          {/* Add section */}
          <button
            onClick={() => {
              setExistingData(undefined);
              setItemOpen(true);
            }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add FAQ Section
          </button>
        </div>
      </div>

      <PageFaqSection data={data} />
      <button
        onClick={() => {
          setExistingData(data);
          setItemOpen(true);
        }}
        className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg mt-5"
      >
        Update Faq
      </button>
      {/* Modal */}
      {isItemOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center p-4 z-50 overflow-y-auto">
          <FaqForm
            initialData={existingData}
            onSubmit={handleSubmit}
            onCancel={() => setItemOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FaqWrapper;
