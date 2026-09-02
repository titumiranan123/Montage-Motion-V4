"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { api_url } from "@/hook/Apiurl";
import { ServiceFilter } from "@/utils/Servicefilter";
import { IPageHeader } from "./header.types";
import HeaderForm from "./Headerform";

const Homewrapper = ({ initialData }: { initialData?: IPageHeader[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const headers = initialData ?? [];
  const [editData, setEditData] = useState<IPageHeader | undefined>(headers[0]);
  const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);

  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace("?page=home");
    }
  }, [router, searchParams]);

  const deleteHeader = async (id: string) => {
    if (!window.confirm("Delete this header and all media?")) return;

    try {
      await api_url.delete(`/api/header/${id}`);
      toast.success("Header deleted");
      router.refresh();
    } catch (error) {
      const response = (error as { response?: { data?: { message?: string } } })
        .response;
      console.error(error);
      toast.error(response?.data?.message ?? "Could not delete header");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Header</h1>
          <p className="text-gray-400">Manage home and landing page headers</p>
        </div>

        <div className="flex mt-5 flex-col sm:flex-row gap-5 md:gap-3 w-full md:w-auto">
          <ServiceFilter
            slice={0}
            others={[{ service_title: "About", service_type: "about" }]}
          />
          <button
            onClick={() => {
              setEditData(headers[0]);
              setHeaderModalOpen(true);
            }}
            className="bg-[#1FB5DD] hover:bg-[#1FA4C0] text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {headers.length ? "Edit Header" : "+ Add Header"}
          </button>
        </div>
      </div>

      {headers.length ? (
        headers.map((header) => (
          <div
            key={header.id ?? header.type}
            className="admin-brand-glow relative w-full overflow-hidden py-10 border-b border-gray-800"
          >
            <div className="max-w-200 mx-auto mt-10 text-center">
              <h1 className="text-[21px] md:text-[45px] lg:text-[64px] font-bold leading-tight uppercase">
                {header.page_title || "No Title"}
              </h1>
              <p className="text-[#E4E8F7] text-sm md:text-base mt-4">
                {header.page_subtitle || "No Subtitle"}
              </p>
              {header.description && (
                <p className="text-gray-400 text-sm md:text-base mt-3">
                  {header.description}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center flex-wrap gap-6 lg:mt-20 mt-10">
              {header.media?.length ? (
                header.media.map((media) => (
                  <div
                    key={media.id ?? media.image_url}
                    className="mx-auto rounded-xl overflow-hidden bg-gray-900 lg:w-150 w-full aspect-video relative"
                  >
                    {media.video_url ? (
                      <ReactPlayer
                        url={media.video_url}
                        playing={false}
                        light={
                          <Image
                            src={media.image_url}
                            fill
                            alt={media.alt}
                            className="w-full h-full aspect-video"
                          />
                        }
                        playIcon={
                          <Image
                            src="/assets/playbutton.png"
                            width={80}
                            height={80}
                            alt="Play"
                            className="z-10"
                          />
                        }
                        width="100%"
                        height="100%"
                        controls
                        className="absolute top-0 left-0"
                      />
                    ) : (
                      <Image
                        src={media.image_url}
                        alt={media.alt || "Media image"}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-20 w-full">
                  No media found.
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setEditData(header);
                  setHeaderModalOpen(true);
                }}
                className="bg-[#1FB5DD] hover:bg-[#1FA4C0] text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Edit Header
              </button>
              {header.id && (
                <button
                  onClick={() => deleteHeader(header.id!)}
                  className="border border-red-500 text-red-400 font-medium py-2 px-4 rounded-lg transition"
                >
                  Delete Header
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
          No header found for this page.
        </div>
      )}

      {isHeaderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-7xl bg-black border border-gray-700 rounded-lg relative my-10">
            <button
              onClick={() => setHeaderModalOpen(false)}
              className="absolute top-4 right-4 text-3xl text-white hover:text-gray-400"
            >
              &times;
            </button>
            <HeaderForm
              defaultValues={editData}
              onCancel={() => setHeaderModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Homewrapper;
