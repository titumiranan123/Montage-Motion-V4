/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { IPageHeader } from "./header.types";
import HeaderForm from "./Headerform";

import Image from "next/image";
import ReactPlayer from "react-player";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceFilter } from "@/utils/Servicefilter";

const Homewrapper = ({ initialData }: { initialData: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.push("?page=home");
    }
  }, [router, searchParams]);
  const [editData, setEditData] = useState<IPageHeader>(initialData);
  const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Header</h1>
          <p className="text-gray-400">Manage Home and Landing Page Headers</p>
        </div>

        <div className="flex mt-5 flex-col sm:flex-row gap-5 md:gap-3 w-full md:w-auto">
          <ServiceFilter slice={0} />

          <button
            onClick={() => {
              setEditData(initialData);
              setHeaderModalOpen(true);
            }}
            className="bg-[#1FB5DD] hover:bg-[#1FA4C0] text-white font-medium py-2 px-4 rounded-lg transition"
          >
            + Add Header
          </button>
        </div>
      </div>
      {initialData?.map((header: IPageHeader, idx: number) => (
        <div
          key={idx}
          className="relative w-full overflow-hidden py-10 border-b border-gray-800"
          style={{
            backgroundImage: "url(/assets/logobackgourd.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            backgroundSize: "contain",
          }}
        >
          {/* Header Title & Description */}
          <div className="max-w-200 mx-auto mt-10 text-center">
            <h1 className="text-[21px] md:text-[45px] lg:text-[64px] font-bold leading-tight uppercase">
              {header?.page_title || "No Title"}
            </h1>
            <p className="text-[#E4E8F7] text-sm md:text-base mt-4">
              {header?.page_subtitle || "No Subtitle"}
            </p>
            {header?.description && (
              <p className="text-gray-400 text-sm md:text-base mt-3">
                {header?.description}
              </p>
            )}
          </div>

          {/* Dynamic Media Items */}
          <div className="flex justify-center items-center flex-wrap gap-6 lg:mt-20 mt-10">
            {header?.media?.length ? (
              header?.media?.map((media, i) => (
                <div
                  key={i}
                  className="mx-auto rounded-xl overflow-hidden bg-gray-900 lg:w-150 w-full aspect-video relative"
                >
                  {media?.video_url ? (
                    <ReactPlayer
                      url={media?.video_url}
                      playing={false}
                      light={media?.image_url}
                      playIcon={
                        <Image
                          src="/assets/playbutton.png"
                          width={80}
                          height={80}
                          alt="Play"
                          className="z-10"
                          priority
                        />
                      }
                      width="100%"
                      height="100%"
                      controls
                      config={{
                        youtube: {
                          playerVars: {
                            modestbranding: 1,
                            rel: 0,
                            controls: 1,
                            fs: 0,
                          },
                        },
                      }}
                      className="absolute top-0 left-0"
                    />
                  ) : media?.image_url ? (
                    <Image
                      src={media?.image_url}
                      alt={media?.alt || "Media image"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Media
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-20 w-full col-span-2">
                No Media Found
              </div>
            )}
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => {
                setEditData(header);
                setHeaderModalOpen(true);
              }}
              className="bg-[#1FB5DD] hover:bg-[#1FA4C0] text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Edit Header
            </button>
          </div>
        </div>
      ))}
      {isHeaderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-7xl bg-black border border-gray-700 rounded-lg relative my-10">
            <button
              onClick={() => setHeaderModalOpen(false)}
              className="absolute top-4 right-4 text-3xl text-white hover:text-gray-400"
            >
              &times;
            </button>

            {/* ✅ The Correct Form Component */}
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
