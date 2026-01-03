"use client";
import React, { useState } from "react";
import BrandimageFrom from "./BrandimageFrom";

const Brandwrapper = () => {
  const [initialValue, setInitialServiceData] = useState<any | null>();
  const [isOpenModal, setIsModalOpent] = useState<any | null>(null);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold ">
            Brand Image Section
          </h1>
          <p className="text-gray-400">
            Manage and showcase every service brand Image
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
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
            Add Brand
          </button>
        </div>
      </div>
      {isOpenModal && (
        <div
          style={{ zIndex: 201 }}
          className="fixed inset-0 bg-black/10 backdrop-blur-2xl bg-opacity-50 flex justify-center items-center p-8 "
        >
          <BrandimageFrom
            initialValue={initialValue}
            onClose={() => setIsModalOpent(false)}
          />
        </div>
      )}
    </>
  );
};

export default Brandwrapper;
