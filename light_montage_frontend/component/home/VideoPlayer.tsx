"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  link,
  thumbnail,
  className,
}: {
  link: string;
  thumbnail: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} aspect-video rounded-lg overflow-hidden relative`}
    >
      <ReactPlayer
        url={link}
        width="100%"
        height="100%"
        controls
        playsinline
        playIcon={
          <button className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-[2px]  st group">
            <Play
              fill="#fff"
              className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
            />
          </button>
        }
        light={
          <Image
            src={thumbnail}
            alt="Intro video thumbnail"
            fill
            priority
            className="object-cover"
          />
        }
      />
    </div>
  );
};

export default VideoPlayer;
