"use client";

import React, { useState } from "react";
import TestimonialMessagecard from "./TestimonialMessagecard";
import Shortcard from "./Shortcard";
import TestimonialForm from "./TestimonialForm";
import { ServiceFilter } from "@/utils/Servicefilter";
interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  thumbnail: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type: string;
}
const TestimonialWrapper = ({ data }: { data: any }) => {
  const [isTestimonial, setTestimonial] = useState(false);
  const [editData, setEditData] = useState<ITestimonial | null>(null);
  const [activeFilter, setActiveFilter] = useState({
    category: "message",
  });

  // Filter testimonials by type
  const filteredData = data?.filter(
    (item: any) => item?.category === activeFilter?.category,
  );

  return (
    <div className="min-h-screen  text-gray-100 p-4 md:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Testimonial Gallery
            </h1>
            <p className="text-gray-400">
              Manage and showcase client testimonials
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Filter Buttons */}
            <div className="flex gap-5 me-5 overflow-x-auto pb-2">
              <ServiceFilter />
              <select
                className="bg-black text-white border rounded-lg px-1"
                onClick={(e: any) =>
                  setActiveFilter((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                {["message", "video_message"].map((type) => (
                  <option key={type} value={`${type}`}>
                    {type?.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Add New Button */}
            <button
              onClick={() => {
                setEditData(null);
                setTestimonial(true);
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
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          {filteredData?.length > 0 ? (
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2 gap-6 mx-auto max-w-[1000px]">
              {filteredData?.map((testimonial: ITestimonial) =>
                testimonial?.category !== "message" ? (
                  <Shortcard
                    key={testimonial?.id}
                    data={testimonial}
                    setEditData={setEditData}
                    setTestimonial={setTestimonial}
                  />
                ) : (
                  <TestimonialMessagecard
                    key={testimonial?.id}
                    testimonial={testimonial}
                    setEditData={setEditData}
                    setTestimonial={setTestimonial}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-800 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-300 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-500 mb-4">
                Try changing your filters or add a new testimonial
              </p>
              <button
                onClick={() => {
                  setEditData(null);
                  setTestimonial(true);
                }}
                className="bg-[#1FB5DD]    text-white font-medium py-2 px-6 rounded-lg"
              >
                Add Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {isTestimonial && (
          <div className="fixed inset-0  backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto w-full ">
            <TestimonialForm
              initialData={editData}
              onCancel={() => setTestimonial(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialWrapper;
