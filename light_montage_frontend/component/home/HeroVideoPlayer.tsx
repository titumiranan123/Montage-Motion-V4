"use client";
import Image from "next/image";
import React, { useState } from "react";
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
    <div className="lg:rounded-[40px] rounded-[20px] xl:w-7xl lg:w-[958px] sm:w-150 w-[320px] h-full overflow-hidden aspect-video relative bg-black ">
      <ReactPlayer
        light={thumbnail}
        url={video_url}
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playIcon={
          <div className="w-[70px] rounded-lg bg-black/20 flex justify-center items-center backdrop-blur-sm h-12 hover:bg-black/40 transition-colors cursor-pointer">
            <Image
              src={"/assets/icon/palyicon.png"}
              width={22}
              height={22}
              alt="playicon"
            />
          </div>
        }
        controls
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
    </div>
  );
};
export default HeroVideoPlayer;
