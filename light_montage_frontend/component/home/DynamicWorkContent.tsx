/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

import VideoPlayer from "./VideoPlayer";

interface DynamicWorkContentProps {
  data: any;
}

const DynamicWorkContent: React.FC<DynamicWorkContentProps> = async ({
  data,
}) => {
  // Handle no data state
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-(--text-primary) flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">No works available</p>
          <p className="text-sm text-gray-500 mb-6">
            Video content coming soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 max-w-7xl mx-auto">
      {data?.map((work: any, idx: number) => {
        if (work?.type === "shortsreels-editing") {
          return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
              className=""
            >
              <VideoPlayer
                thumbnail={work?.thumbnail}
                link={work?.video_link}
                className="aspect-9/16! "
              />
            </div>
          );
        } else if (work.video_link === "" || work.video_link === null) {
          return (
            <div
              data-aos="fade-up"
              data-aos-delay={200 + idx * 100}
              key={work.id || idx}
              className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-[410px] w-full h-full max-h-[308px] rounded-[13px]"
            >
              {/* Title */}
              {work.title && (
                <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                  {work.title}
                </p>
              )}

              {/* Thumbnail */}
              {work.thumbnail ? (
                <Image
                  src={work.thumbnail}
                  alt={work.title || "Graphic work"}
                  width={348}
                  height={216}
                  className="rounded-[13px] object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-700 w-full h-full rounded-[13px]">
                  <p>No thumbnail</p>
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
              className=" rounded-lg   overflow-hidden"
            >
              <VideoPlayer
                thumbnail={work?.thumbnail}
                link={work?.video_link}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicWorkContent;
