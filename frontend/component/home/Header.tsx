"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import TurstedBy from "./TurstedBy";
import Link from "next/link";
import ReactPlayer from "@/component/share/LazyReactPlayer";
import Image from "next/image";
import { Play } from "lucide-react";
import { getSafeHref, getSafeImageSrc } from "@/utils/media";
import { useVideoPlayback } from "@/component/share/VideoPlaybackProvider";

const Header: React.FC<{ data: any }> = ({ data }) => {
  const videoUrl = data?.media?.[0]?.video_url;
  const [hasEnded, setHasEnded] = useState(false);
  const hasStarted = Boolean(videoUrl) && !hasEnded;
  const { isPlaying, containerRef, play, pause } = useVideoPlayback(undefined, {
    autoPlay: Boolean(videoUrl),
  });

  return (
    <div className="flex lg:pt-30 pt-34 flex-col justify-center items-center relative py-10 lg:gap-4 gap-4 px-2">
      {/* header content */}
      <div className="flex z-20 justify-center items-center flex-col lg:pt-10 pt-10 max-w-195 mx-auto">
        <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center items-center">
          <TurstedBy isCenter={true} />
        </div>
        <h1
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:text-[70px] text-[40px] leading-[110%] font-medium text-(--text-primary) poppins text-center lg:mt-5 mt-4"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-secondary) text-[14px] font-normal md:text-[16px] opensans text-center leading-[150%] mt-6"
        >
          {data?.description}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="w-full flex justify-center items-center md:flex-row flex-col gap-3 mt-10 px-4 md:px-0"
        >
          <Link
            target="_blank"
            href={getSafeHref(data?.cta_primary_link)}
            className="md:w-38.75 w-full h-14 btn-color py-4 px-5 rounded-[12px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out"
          >
            Start a Project
          </Link>
          <Link
            target="_blank"
            href={`/portfolio`}
            className="md:w-38.75 w-full h-14 btn-secondary text-textPrimary py-4 px-5 rounded-[12px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out bg-white/20 glassShadow backdrop-blur-[2px]"
          >
            View Work
          </Link>
        </div>
      </div>

      <div ref={containerRef} className="lg:mt-10 mt-8 max-w-7xl mx-auto lg:rounded-[40px]  rounded-2xl relative aspect-video w-full overflow-hidden">

  {/* Thumbnail */}
  {!hasStarted && (
    <div
      className="absolute inset-0 z-10 cursor-pointer"
      onClick={() => {
        setHasEnded(false);
        play();
      }}
    >
      <Image
        src={getSafeImageSrc(data?.media?.[0]?.image_url)}
        alt="Intro video thumbnail"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <button className="md:w-16 w-14 md:h-10 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center lg:rounded-xl rounded-lg text-white backdrop-blur-[2px] st group">
        <Play
          fill="#fff"
          className="group-hover:scale-105 size-4 md:size-6 active:scale-90 duration-200 ease-in-out"
        />
      </button>
    </div>
  )}

  {hasStarted && videoUrl && (
    <ReactPlayer
      url={videoUrl}
      width="100%"
      height="100%"
      controls
      playsinline
      playing={isPlaying}
      muted
      onPlay={play}
      onPause={pause}
      onEnded={() => {
        pause();
        setHasEnded(true);
      }}
    />
  )}
</div>
    </div>
  );
};

export default Header;
