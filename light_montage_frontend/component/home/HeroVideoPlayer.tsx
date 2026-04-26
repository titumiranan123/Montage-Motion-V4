"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
const HeroVideoPlayer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div
      className=" lg:mt-10 mt-8 overflow-hidden max-w-7xl mx-auto rounded-[40px] bg-black relative aspect-video w-full "
    >{/* Custom thumbnail overlay */}
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
          <button className="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-[2px] st group">
            <Play
              fill="#fff"
              className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
            />
          </button>
        </div>
      )}

      <ReactPlayer
        url={video_url}
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
export default HeroVideoPlayer;
