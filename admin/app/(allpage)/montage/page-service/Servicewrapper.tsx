/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api_url } from "@/hook/Apiurl";
import ServiceForm from "./Serviceform";
import SingleService from "./SingleService";
import { ServiceFilter } from "@/utils/Servicefilter";
import { Plus } from "lucide-react";

const Servicewrapper = ({ data }: { data?: any[]; page?: string }) => {
  const [serviceData, setInitialServiceData] = useState<any | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);
  const router = useRouter();
  const section = data?.[0];

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const deleteSection = async () => {
    if (!section?.id) return;
    if (!window.confirm("Delete this service section and all services?")) return;

    try {
      await api_url.delete(`/api/our-service/${section.id}`);
      toast.success("Service section deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete service section");
    }
  };

  const openForm = (initialData: any | null) => {
    setInitialServiceData(initialData);
    setIsModalOpent(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Pages Service</h1>
          <p className="text-gray-400">Manage and showcase every service page</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <ServiceFilter slice={1} />
          <button
            onClick={() => openForm(section ?? null)}
            className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>
      </div>

      {section ? (
        <>
          <SingleService data={section} />
          <div className="flex gap-3 mt-10">
            <button
              onClick={() => openForm(section)}
              className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Edit Services
            </button>
            <button
              onClick={deleteSection}
              className="border border-red-500 text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Delete Section
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No service section found for this page.
        </div>
      )}

      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(false)}
          className="w-screen h-screen flex justify-center items-center fixed inset-0 bg-black/60 backdrop-blur-2xl"
        >
          <div onClick={(event) => event.stopPropagation()}>
            <ServiceForm
              initialData={serviceData}
              setIsModalOpent={setIsModalOpent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicewrapper;
