"use client";

import useWorks from "@/hook/useWorks";
import React from "react";
import Image from "next/image";
import VideoPlayer from "./PrettyPlayer";

interface Work {
  id: string;
  video_link?: string;
  thumbnail?: string;
  title?: string;
  type?: string;
}

interface DynamicWorkContentProps {
  tabKey: string;
}

const DynamicWorkContent: React.FC<DynamicWorkContentProps> = ({ tabKey }) => {
  const { data, isLoading } = useWorks(tabKey);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle no data state
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>No works available.</p>
      </div>
    );
  }

  // Helper: Convert Shorts URL to standard YouTube watch URL
  const normalizeYouTubeUrl = (url: string) =>
    url.replace("youtube.com/shorts/", "youtube.com/watch?v=");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-white">
      {data.map((dt: Work, index: number) => {
        if (dt.type === "graphic") {
          return (
            <div
              key={dt.id || index}
              className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-[348px] w-full h-full max-h-[216px] rounded-[13px]"
            >
              {/* Title */}
              {dt.title && (
                <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                  {dt.title}
                </p>
              )}

              {/* Thumbnail */}
              {dt.thumbnail ? (
                <Image
                  src={dt.thumbnail}
                  alt={dt.title || "Graphic work"}
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
          // Handle video type
          const normalizedUrl = dt.video_link
            ? normalizeYouTubeUrl(dt.video_link)
            : "";

          return (
            <div
              key={dt.id || index}
              className="relative aspect-video max-w-[348px] w-full h-full max-h-[216px] rounded-[13px] overflow-hidden"
            >
              {/* Type Label */}
              {dt.type && (
                <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                  {dt.title}
                </p>
              )}

              {/* Video Player */}
              {normalizedUrl ? (
                <VideoPlayer
                  youtubeUrl={normalizedUrl}
                  thumbnail={dt.thumbnail}
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-700 w-full h-full rounded-[13px]">
                  <p>No video link</p>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicWorkContent;
