"use client";
import { FaqForm } from "@/component/faqs/Faqform";
import { api_url } from "@/hook/Apiurl";
import { IFaqSection } from "@/interface/interface";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const FaqWrapper = ({ data }: any) => {
  const [isHasChange, setHasChanges] = useState(false);
  const [existingData, setExistingData] = useState<IFaqSection | undefined>();
  const [isItemOpen, setItemOpen] = useState(false);
  /** save sort_order */
  //   const savePositions = async () => {
  //     const payload = tapes.map((item, index) => ({
  //       id: item.id,
  //       sort_order: index + 1,
  //     }));

  //     try {
  //       await api_url.put("/api/faqitem/positions", payload);

  //       Swal.fire({
  //         title: "Positions updated!",
  //         icon: "success",
  //         background: "#1f2937",
  //         color: "#fff",
  //         confirmButtonColor: "#6366f1",
  //       });
  //       setHasChanges(false);
  //     } catch (err: any) {
  //       Swal.fire({
  //         title: "Failed!",
  //         text: err?.response?.data?.message || "Something went wrong",
  //         icon: "error",
  //         background: "#1f2937",
  //         color: "#fff",
  //       });
  //     }
  //   };

  /** create / update section */
  const handleSubmit = async (data: IFaqSection) => {
    try {
      const url = data.id ? `/api/faq-section/${data.id}` : "/api/faq-section";

      data.id ? await api_url.patch(url, data) : await api_url.post(url, data);

      setItemOpen(false);

      Swal.fire({
        title: data.id ? "FAQ section updated!" : "FAQ section created!",
        icon: "success",
        background: "#1f2937",
        color: "#fff",
      });
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || "Failed to save",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };
  return (
    <div className="text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">FAQ Dashboard</h1>
          <p className="text-gray-400">Manage your FAQs</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Add section */}
          <button
            onClick={() => {
              setExistingData(undefined);
              setItemOpen(true);
            }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add FAQ Section
          </button>

          {isHasChange && (
            <button
              //   onClick={savePositions}
              className="bg-[#1FB5DD] py-2 px-4 rounded-lg"
            >
              Save Positions
            </button>
          )}
        </div>
      </div>

      {/* Sections */}
      {data.length ? (
        data.map((section: any) => (
          <div key={section.id} className="mb-16 mt-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold">{section.section_title}</h1>
              <p className="text-gray-400">{section.section_description}</p>
            </div>

            <div className="space-y-4 mt-16">
              {/* {tapes
                .filter((item) => item.faq_section_id === section.id)
                .map((item, index) => (
                  <Accordion key={item.id} item={item} index={index} />
                ))} */}
            </div>

            <div className="flex gap-4 justify-center mt-10">
              <button
                onClick={() => {
                  setExistingData(section);
                  setItemOpen(true);
                }}
                className="border py-2 px-4 rounded-lg text-[#1FB5DD]"
              >
                Edit Section
              </button>

              <button
                onClick={() => setItemOpen(true)}
                className="border py-2 px-4 rounded-lg text-[#1FB5DD] flex items-center gap-1"
              >
                <FaPlus /> Add FAQ Item
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-300">No FAQs found</div>
      )}

      {/* Modal */}
      {isItemOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center p-4 z-50 overflow-y-auto">
          <FaqForm
            initialData={existingData}
            onSubmit={handleSubmit}
            onCancel={() => setItemOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FaqWrapper;
