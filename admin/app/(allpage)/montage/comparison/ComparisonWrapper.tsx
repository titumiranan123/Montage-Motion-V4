/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ServiceFilter } from "@/utils/Servicefilter";
import React, { useEffect, useState } from "react";
import ComparisonForm from "./ComparisonForm";
import { useRouter, useSearchParams } from "next/navigation";
import ComparisonCards from "./PriceComparison";
import { api_url } from "@/hook/Apiurl";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ComparisonWrapper = ({ data }: { data: any }) => {
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
          <h1 className="text-4xl font-bold">Comparison Dashboard</h1>
          <p className="text-gray-400">Manage your pricing comparison</p>
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
            Add Comparison Section
          </button>
        </div>
      </div>
      {data ? (
        <>
          <ComparisonCards data={data} />
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => {
                setExistingData(data);
                setIsModalOpen(true);
              }}
              className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
            >
              Update Comparison
            </button>
            <button
              onClick={async () => {
                const result = await Swal.fire({
                  title: "Delete comparison?",
                  text: "This will permanently remove this comparison and all its columns.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ef4444",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "Delete",
                  cancelButtonText: "Keep",
                  background: "#1f2937",
                  color: "#fff",
                });

                if (!result.isConfirmed) return;

                try {
                  await api_url.delete(`/api/comparison/${data.id}`);
                  toast.success("Comparison deleted successfully");
                  router.refresh();
                } catch (error: any) {
                  toast.error(error?.response?.data?.message || "Failed to delete comparison");
                }
              }}
              className="border border-red-500 text-red-400 py-2 px-6 rounded-lg"
            >
              Delete Comparison
            </button>
          </div>
        </>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-600 p-8 text-center text-gray-400">
          No comparison section found for this page.
        </p>
      )}
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center">
          <ComparisonForm data={initialData} setOpen={setIsModalOpen} />
        </div>
      )}
    </div>
  );
};

export default ComparisonWrapper;
