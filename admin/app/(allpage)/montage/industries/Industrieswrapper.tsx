"use client";
import { ServiceFilter } from "@/utils/Servicefilter";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import IndustryFormPage from "./Industriesform";
import IndustryWeWork from "./IndustryWork";

const Industrieswrapper = ({ data }: { data: any }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [initialData, setExistingData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);
  return (
    <div className="text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Industries Section</h1>
          <p className="text-gray-400">Manage your Indeustries Section</p>
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
            Add Industries Section
          </button>
        </div>
      </div>
      <IndustryWeWork data={data} />
      <button
        onClick={() => {
          setExistingData(data);
          setIsModalOpen(true);
        }}
        className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg mt-5"
      >
        Update Industries
      </button>
      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex justify-center items-center max-w-5xl"
          >
            <IndustryFormPage data={data} setOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Industrieswrapper;
