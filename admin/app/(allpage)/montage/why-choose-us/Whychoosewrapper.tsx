"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api_url } from "@/hook/Apiurl";
import { ServiceFilter } from "@/utils/Servicefilter";
import Whychooseusform from "./Whychooseusform";
import SingleWhyChooseus from "./SingleWhyChooseus";
import { whychooseus_Section } from "./types";

const Whychoosewrapper = ({ data }: { data?: whychooseus_Section[] }) => {
  const [serviceData, setInitialServiceData] = useState<whychooseus_Section | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);
  const router = useRouter();
  const sections = data ?? [];

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const deleteSection = async (id: string) => {
    if (!window.confirm("Delete this Why Choose Us section and all cards?")) return;

    try {
      await api_url.delete(`/api/why-choose-us/${id}`);
      toast.success("Why Choose Us section deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete section");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Pages Why Choose Us</h1>
          <p className="text-gray-400">
            Manage and showcase every page why choose us section
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <ServiceFilter slice={0} />
          <button
            onClick={() => {
              setInitialServiceData(null);
              setIsModalOpent(true);
            }}
            className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            Add Why Choose Us
          </button>
        </div>
      </div>

      {sections.length > 0 ? (
        sections.map((section) => (
          <div key={section.id ?? section.type}>
            <SingleWhyChooseus data={section} />
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => {
                  setInitialServiceData(section);
                  setIsModalOpent(true);
                }}
                className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Edit Why Choose Us
              </button>
              <button
                onClick={() => section.id && deleteSection(section.id)}
                className="border border-red-500 text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No Why Choose Us section found for this page.
        </div>
      )}

      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(false)}
          className="w-screen h-screen flex justify-center items-center fixed inset-0 bg-black/60 backdrop-blur-2xl"
        >
          <div onClick={(event) => event.stopPropagation()}>
            <Whychooseusform
              initialData={serviceData}
              setIsModalOpent={setIsModalOpent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Whychoosewrapper;
