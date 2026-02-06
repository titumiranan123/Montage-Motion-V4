"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
const HeroVideoPlayer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  return (
    <div
      className="
        lg:mt-10 mt-8
        overflow-hidden
        max-w-7xl
        mx-auto
        
        rounded-[40px]
        bg-black relative aspect-video w-full
      "
    >
      <ReactPlayer
        url={video_url}
        playing={false}
        light={
          <Image
            src={thumbnail}
            fill
            alt=" "
            className="w-full h-full aspect-video"
          />
        }
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
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              controls: 1,
              fs: 0,
            },
          },
        }}
        className="absolute top-0 left-0"
      />
      <ReactPlayer
        url={video_url}
        width="100%"
        height="100%"
        controls
        light={thumbnail} // ✅ শুধু URL
        playIcon={
          <div className="flex items-center justify-center w-full h-full">
            <Play className="text-red-500 w-16 h-16" />
          </div>
        }
      />
    </div>
  );
};
export default HeroVideoPlayer;
