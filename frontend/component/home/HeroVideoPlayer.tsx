"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import { getSafeImageSrc } from "@/utils/media";

const HeroVideoPlayer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(Boolean(video_url));
  const [hasStarted, setHasStarted] = useState(Boolean(video_url));

  return (
    <div className="lg:mt-10 mt-8 overflow-hidden max-w-7xl mx-auto rounded-[40px] bg-black relative aspect-video w-full">
      
      {!hasStarted && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => {
            setHasStarted(true);
            setIsPlaying(true);
          }}
        >
          <Image
            src={getSafeImageSrc(thumbnail)}
            alt="Intro video thumbnail"
            fill
            priority
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
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasStarted(false); // show thumbnail again after the video ends
          }}
        />
      )}
    </div>
  );
};

export default HeroVideoPlayer;
