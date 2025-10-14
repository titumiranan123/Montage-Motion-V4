"use client";
import useWorks from "@/hook/useWorks";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "./PrettyPlayer";

interface Work {
  id: string;
  video_link: string;
  thumbnail?: string;
  title?: string;
}

interface DynamicWorkContentProps {
  tabKey: string;
}

const DynamicWorkContent: React.FC<DynamicWorkContentProps> = ({ tabKey }) => {
  const { data, isLoading } = useWorks(tabKey);
  if (isLoading) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>No works available.</p>
      </div>
    );
  }
  function normalizeYouTubeUrl(url: string) {
    return url.replace("youtube.com/shorts/", "youtube.com/watch?v=");
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-white">
      {data?.map((dt: any, index: number) => {
        if (dt?.type === "main") {
          return (
            <div
              key={index}
              className="relative  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-video max-w-[348px] w-full h-full max-h-[216px] rounded-[13px] border-none"
            >
              <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-1 top-1 text-white bg-[#00000066]">
                {dt.title}
              </p>
              {/* Video Player */}
              <VideoPlayer
                youtubeUrl={
                  "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/shortmotionge.mp4"
                }
                thumbnail={data?.thumbnail}
              />
            </div>
          );
        } else if (dt?.type === "shorts") {
          const url = normalizeYouTubeUrl(
            "https://youtube.com/shorts/fVOfNKN1Azw?si=2NGGZegcgOrkIi_D"
          );
          return (
            <div className="">
              <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-1 top-1 text-white bg-[#00000066]">
                {dt.type}
              </p>
              <VideoPlayer youtubeUrl={url} thumbnail={data?.thumbnail} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicWorkContent;
