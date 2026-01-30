"use client";
import { ServiceFilter } from "@/utils/Servicefilter";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import IndustryFormPage from "./Industriesform";

const Industrieswrapper = ({ data }: { data: any }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [initialData, setExistingData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Only push "home" if no ?page param exists
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);
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
              setIsModalOpen(true);
            }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add FAQ Section
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          setExistingData(data);
          setIsModalOpen(true);
        }}
        className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg mt-5"
      >
        Update Faq
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center">
          <IndustryFormPage />
        </div>
      )}
    </div>
  );
};

export default Industrieswrapper;
