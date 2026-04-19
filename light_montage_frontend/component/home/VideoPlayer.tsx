"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useState } from "react";

const VideoPlayer = ({
  link,
  thumbnail,
  className,
}: {
  link: string;
  thumbnail: string;
  className?: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`${className} aspect-video rounded-lg overflow-hidden relative`}>
      
      {/* Custom thumbnail overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={thumbnail}
            alt="Intro video thumbnail"
            fill
            priority
            className="object-cover"
          />
          {/* Play button — design unchanged */}
          <button className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-[2px] st group">
            <Play
              fill="#fff"
              className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
            />
          </button>
        </div>
      )}

      <ReactPlayer
        url={link}
        width="100%"
        height="100%"
        controls
        playsinline
        playing={isPlaying}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default VideoPlayer;