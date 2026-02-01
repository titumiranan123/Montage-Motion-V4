"use client";
import { FaqForm } from "@/component/faqs/Faqform";
import { api_url } from "@/hook/Apiurl";
import { IFaqSection } from "@/interface/interface";
import React, { useState } from "react";
import Swal from "sweetalert2";
import PageFaqSection from "./PagefaqSection";
import { ServiceFilter } from "@/utils/Servicefilter";

const FaqWrapper = ({ data }: any) => {
  const [existingData, setExistingData] = useState<IFaqSection | undefined>();
  const [isItemOpen, setItemOpen] = useState(false);
  console.log("data", data);
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

      {data ? (
        <PageFaqSection data={data} />
      ) : (
        <div className="text-center p-8 border border-dashed border-gray-700 rounded-lg bg-gray-900/50">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium mt-4 mb-2">
              No FAQ Sections Found
            </h3>
            <p className="text-sm">You haven't created any FAQ sections yet.</p>
          </div>
          <button
            onClick={() => {
              setExistingData(undefined);
              setItemOpen(true);
            }}
            className="bg-[#1FB5DD] hover:bg-[#1a9fc4] text-white py-2 px-6 rounded-lg transition-colors"
          >
            + Add First FAQ Section
          </button>
        </div>
      )}
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
        <div className="fixed h-screen inset-0 bg-black/10 backdrop-blur-sm flex justify-center p-4 z-50 overflow-y-auto">
          <div className="flex justify-center items-center">
            <FaqForm initialData={existingData} onCancel={setItemOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqWrapper;
