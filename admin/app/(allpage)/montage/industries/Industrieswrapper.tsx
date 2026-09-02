/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ServiceFilter } from "@/utils/Servicefilter";
import { api_url } from "@/hook/Apiurl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const deleteSection = async () => {
    if (!data?.section_id) return;
    if (!window.confirm("Delete this industries section and all of its tabs?")) return;

    try {
      await api_url.delete(`/api/industries/${data.section_id}`);
      toast.success("Industries section deleted");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete industries section");
    }
  };

  return (
    <div className="text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Industries Section</h1>
          <p className="text-gray-400">Manage your Industries Section</p>
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
      {data ? (
        <>
          <IndustryWeWork data={data} />
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => {
                setExistingData(data);
                setIsModalOpen(true);
              }}
              className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
            >
              Update Industries
            </button>
            <button
              onClick={deleteSection}
              className="border border-red-500 text-red-400 py-2 px-6 rounded-lg"
            >
              Delete Industries
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No industries section found for this page.
        </div>
      )}
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
            <IndustryFormPage data={initialData} setOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Industrieswrapper;
