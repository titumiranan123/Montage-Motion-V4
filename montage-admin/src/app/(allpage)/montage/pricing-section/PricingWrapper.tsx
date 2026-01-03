"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PricingForm from "./Pricingform";
import SinglePricePlan from "./SinglePricePlan";

const PricingWrapper = ({ data }: { data: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [serviceData, setInitialServiceData] = useState<any | null>(null);
  const [isOpenModal, setIsModalOpent] = useState<any | null>(null);

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
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex w-full flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Services Pricing
            </h1>
            <p className="text-gray-400">
              Manage and showcase every page Pricing section
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              onChange={(e) => {
                router.push(`?page=${e.target.value}`);
              }}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-2"
            >
              {[
                "home",
                "shorts",
                "talkinghead",
                "podcast",
                "thumbnail",
                "saas",
                "about",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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
      </div>
      <div>
        <SinglePricePlan data={data} key={data?.id} />

        <button
          onClick={() => {
            setInitialServiceData(data);
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
      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(!isOpenModal)}
          className="w-screen
        h-screen flex justify-center items-center fixed inset-0 bg-black/60 backdrop-blur-2xl"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PricingForm initialData={serviceData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingWrapper;
