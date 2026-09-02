"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SinglePricePlan from "./SingleCareerpost";
import CareerPageForm from "./Careerform";
import { ICareerPage } from "./Careerform";
import { api_url } from "@/hook/Apiurl";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

const CareerWrapper = ({ data }: { data: ICareerPage | null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [serviceData, setInitialServiceData] = useState<ICareerPage | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const deleteCareerPage = async () => {
    if (!data?.type) return;
    const result = await Swal.fire({
      title: "Delete career page?",
      text: "This will permanently remove the career page and all job posts.",
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
      await api_url.delete(`/api/jobpost/${data.type}`);
      toast.success("Career page deleted successfully");
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete career page");
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex w-full flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Career Page
            </h1>
            <p className="text-gray-400">
              Manage job postings and career information
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {data && (
              <>
                <button
                  onClick={() => {
                    setInitialServiceData(data);
                    setIsModalOpent(true);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Pencil size={17} />
                  Edit Career Page
                </button>
                <button
                  onClick={deleteCareerPage}
                  className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Trash2 size={17} />
                  Delete Career Page
                </button>
              </>
            )}
            {/* Add New Button */}
            <button
              onClick={() => {
                setInitialServiceData(null);
                setIsModalOpent(true);
              }}
              className="bg-[#1FB5DD]    text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Job Post
            </button>
          </div>
        </div>
      </div>
      <div>
        {data ? (
          <SinglePricePlan data={data} key={data?.id} />
        ) : (
          <p className="rounded-lg border border-dashed border-gray-600 p-8 text-center text-gray-400">
            No career page found.
          </p>
        )}

      </div>
      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(!isOpenModal)}
          className="w-screen
        h-screen flex justify-center items-center fixed inset-0 bg-black/60 backdrop-blur-2xl"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CareerPageForm
              initialData={serviceData ?? undefined}
              setOpen={setIsModalOpent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerWrapper;
