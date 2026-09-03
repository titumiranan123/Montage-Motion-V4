"use client";

import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "@/component/share/LazyReactPlayer";
import { useVideoPlayback } from "@/component/share/VideoPlaybackProvider";
import { getSafeImageSrc } from "@/utils/media";

interface Props {
  video_link: string;
  thumbnail: string;
}

export const Videoplayer: React.FC<Props> = ({ video_link, thumbnail }) => {
  const { isPlaying, containerRef, play, pause } = useVideoPlayback();
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div ref={containerRef} className="relative lg:max-w-285.75 mx-auto lg:h-160.75 rounded-[31px] w-full h-full aspect-video bg-black overhidden  mt-7 lg:mt-16">
      {!hasStarted ? (
        <button
          type="button"
          aria-label="Play video"
          className="absolute inset-0 cursor-pointer"
          onClick={() => {
            setHasStarted(true);
            play();
          }}
        >
          <Image
            src={getSafeImageSrc(thumbnail)}
            alt="Video thumbnail"
            fill
            sizes="(max-width: 767px) 100vw, 1143px"
            className="object-cover"
          />
          <Image
            src="/assets/playbutton.png"
            width={80}
            height={80}
            alt=""
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      ) : (
        <ReactPlayer
          src={video_link}
          playing={isPlaying}
          onPlay={play}
          onPause={pause}
          onEnded={pause}
          width="100%"
          height="100%"
          controls
        />
      )}

      {/* Fallback for when JS is disabled */}
      <noscript>
        <div className="relative lg:w-198.5 mx-auto lg:h-111 w-full h-full aspect-video bg-slate-500 overhidden rounded-[39px] mt-7 lg:mt-16 flex justify-center items-center animate-pulse duration-100">
          <Image
            src="/assets/playbutton.png"
            width={80}
            height={80}
            alt="Play"
            className="z-10"
          />
        </div>
      </noscript>
    </div>
  );
};

export default Videoplayer;
