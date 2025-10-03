"use client";

import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

interface Props {
  video_link: string;
  thumbnail: string;
}

export const Videoplayer: React.FC<Props> = ({ video_link, thumbnail }) => {
  return (
    <div className="relative lg:w-[794px] mx-auto lg:h-[444px] w-full h-full aspect-video bg-black overhidden rounded-[39px] mt-7 lg:mt-16">
      <ReactPlayer
        src={video_link}
        playing={false}
        light={thumbnail}
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
      />

      {/* Fallback for when JS is disabled */}
      <noscript>
        <div className="relative lg:w-[794px] mx-auto lg:h-[444px] w-full h-full aspect-video bg-slate-500 overhidden rounded-[39px] mt-7 lg:mt-16 flex justify-center items-center animate-pulse duration-100">
          <Image
            src="/assets/playbutton.png"
            width={80}
            height={80}
            alt="Play"
            className="z-10"
            priority
          />
        </div>
      </noscript>
    </div>
  );
};

export default Videoplayer;
