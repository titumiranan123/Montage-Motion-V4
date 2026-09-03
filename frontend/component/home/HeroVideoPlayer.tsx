"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "@/component/share/LazyReactPlayer";
import { getSafeImageSrc } from "@/utils/media";
import { useVideoPlayback } from "@/component/share/VideoPlaybackProvider";

const HeroVideoPlayer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  const [hasEnded, setHasEnded] = useState(false);
  const hasStarted = Boolean(video_url) && !hasEnded;
  const { isPlaying, containerRef, play, pause } = useVideoPlayback(undefined, {
    autoPlay: Boolean(video_url),
  });

  return (
    <div ref={containerRef} className="lg:mt-10 mt-8 overflow-hidden max-w-7xl mx-auto rounded-[40px] bg-black relative aspect-video w-full">
      
      {!hasStarted && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => {
            setHasEnded(false);
            play();
          }}
        >
          <Image
            src={getSafeImageSrc(thumbnail)}
            alt="Intro video thumbnail"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <button className="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-[2px] st group">
            <Play
              fill="#fff"
              className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
            />
          </button>
        </div>
      )}

      {hasStarted && video_url && (
        <ReactPlayer
          url={video_url}
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
            setHasEnded(true); // show thumbnail again after the video ends
          }}
        />
      )}
    </div>
  );
};

export default HeroVideoPlayer;
