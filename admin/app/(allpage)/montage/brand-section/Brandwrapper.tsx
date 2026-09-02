"use client";

import React, { useState } from "react";
import { ServiceFilter } from "@/utils/Servicefilter";
import BrandimageFrom, { IBrandImage } from "./BrandimageFrom";
import Brandcard, { BrandCardData } from "./Brandcard";

const Brandwrapper = ({ data }: { data: BrandCardData[] }) => {
  const [initialValue, setInitialServiceData] = useState<IBrandImage | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Brand Image Section</h1>
          <p className="text-gray-400">Manage and showcase service brand images</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <ServiceFilter />
          <button
            onClick={() => {
              setInitialServiceData(null);
              setIsModalOpent(true);
            }}
            className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            Add Brand Image
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="flex w-full flex-wrap gap-8 items-center">
          {data.map((image) => (
            <Brandcard
              key={image.id}
              dt={image}
              onEdit={(selected) => {
                setInitialServiceData(selected);
                setIsModalOpent(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No brand images found for this page.
        </div>
      )}

      {isOpenModal && (
        <div
          style={{ zIndex: 201 }}
          onClick={() => setIsModalOpent(false)}
          className="fixed inset-0 bg-black/10 backdrop-blur-2xl bg-opacity-50 flex justify-center items-center p-8"
        >
          <div onClick={(event) => event.stopPropagation()} className="w-full">
            <BrandimageFrom
              initialValue={initialValue}
              onClose={() => setIsModalOpent(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Brandwrapper;
