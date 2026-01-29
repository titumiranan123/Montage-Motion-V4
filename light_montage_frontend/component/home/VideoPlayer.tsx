"use client";
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
    <div className={`${className} aspect-video rounded-lg overflow-hidden`}>
      <ReactPlayer
        url={link}
        playing={false}
        light={thumbnail}
        width={"100%"}
        height={"100%"}
        controls={true}
        playIcon={
          <div className="flex items-center justify-center w-[68px] h-12">
            <Image
              src="/assets/icon/playsmall.png"
              width={68}
              height={48}
              alt="Play"
              className=""
              priority
            />
          </div>
        }
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              showinfo: 0,
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
