/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api_url } from "@/hook/Apiurl";
import StoryForm from "./Processform";
import StroySlider from "./Storyslider";

const Storywrapper = ({ data }: { data?: any }) => {
  const [storyData, setInitialServiceData] = useState<any | null>(null);
  const [isOpenModal, setIsModalOpent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const deleteStory = async () => {
    if (!data?.id) return;
    if (!window.confirm("Delete this story section and all story steps?")) return;

    try {
      await api_url.delete(`/api/our-story/${data.id}`);
      toast.success("Our Story section deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete story section");
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
          <h1 className="text-2xl md:text-3xl font-bold">Our Story Section</h1>
          <p className="text-gray-400">Manage the about story section</p>
        </div>
        <button
          onClick={() => openForm(data ?? null)}
          className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Add Story Step
        </button>
      </div>

      {data ? (
        <>
          <StroySlider data={data} />
          <div className="flex gap-3 mt-10">
            <button
              onClick={() => openForm(data)}
              className="bg-[#1FB5DD] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Edit Story
            </button>
            <button
              onClick={deleteStory}
              className="border border-red-500 text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Delete Section
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No story section found. Add the first story step to create it.
        </div>
      )}

      {isOpenModal && (
        <div
          style={{ zIndex: 99 }}
          onClick={() => setIsModalOpent(false)}
          className="w-screen h-full flex justify-center items-center fixed inset-0 bg-black/30 backdrop-blur-2xl"
        >
          <div onClick={(event) => event.stopPropagation()}>
            <StoryForm
              initialData={storyData}
              setIsModalOpent={setIsModalOpent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Storywrapper;
