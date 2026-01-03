"use client";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const HeadervideoPlayer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mt-20 mx-auto px-4">
      <div
        style={{ width: "1280px" }}
        className="rounded-[40px] overflow-hidden aspect-video relative bg-black"
      >
        <ReactPlayer
          light={thumbnail}
          src={video_url}
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
    </div>
  );
};

export default HeadervideoPlayer;
