/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { api_url } from "@/hook/Apiurl";
import { ServiceFilter } from "@/utils/Servicefilter";
import ProcessForm from "./Processform";
import SingleProcess from "./SingleProcess";

const Processwrapper = ({ data }: { data?: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processData, setInitialServiceData] = useState<any | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("?page=home");
    }
  }, [router, searchParams]);

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const deleteProcess = async () => {
    if (!data?.id) return;
    if (!window.confirm("Delete this process section and all steps?")) return;

    try {
      await api_url.delete(`/api/process/${data.id}`);
      toast.success("Process section deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete process section");
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
          <h1 className="text-2xl md:text-3xl font-bold">Process Section</h1>
          <p className="text-gray-400">Manage and showcase the service process</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <ServiceFilter slice={0} />
          <button
            onClick={() => openForm(data ?? null)}
            className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            Add Process Step
          </button>
        </div>
      </div>

      {data ? (
        <>
          <SingleProcess data={data} />
          <div className="flex gap-3 mt-10">
            <button
              onClick={() => openForm(data)}
              className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Edit Process
            </button>
            <button
              onClick={deleteProcess}
              className="border border-red-500 text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Delete Section
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No process section found. Add the first process step to create it.
        </div>
      )}

      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(false)}
          className="w-screen h-full flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-2xl"
        >
          <div onClick={(event) => event.stopPropagation()}>
            <ProcessForm
              initialData={processData}
              setIsModalOpent={setIsModalOpent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Processwrapper;
