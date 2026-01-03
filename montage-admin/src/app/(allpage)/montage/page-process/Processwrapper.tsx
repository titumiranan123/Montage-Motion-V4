"use client";
import React, { useEffect, useState } from "react";
import ProcessForm from "./Processform";
import SingleProcess from "./SingleProcess";
import { useRouter, useSearchParams } from "next/navigation";
import { CategorySelectComponent } from "@/utils/CategorySelectComponent";

const Processwrapper = ({ data }: { data: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Only push "home" if no ?page param exists
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);
  const [ProcessData, setInitialServiceData] = useState<any | null>(null);
  const [isOpenModal, setIsModalOpent] = useState<any | null>(null);
  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isOpenModal) {
      // Disable scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      // Cleanup: reset overflow when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold ">Process Section</h1>
          <p className="text-gray-400">
            Manage and showcase every service process
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <CategorySelectComponent />
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
            Add Service
          </button>
        </div>
      </div>
      <div>
        {data.map((dt: any) => (
          <div>
            <SingleProcess data={dt} />
            <button
              onClick={() => {
                setInitialServiceData(dt);
                setIsModalOpent(true);
              }}
              className="bg-[#1FB5DD] mt-10   text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
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
              Edit Service
            </button>
          </div>
        ))}
      </div>
      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(false)}
          className="w-screen
        h-full flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-2xl"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ProcessForm initialData={ProcessData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Processwrapper;
