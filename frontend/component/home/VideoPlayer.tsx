"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "@/component/share/LazyReactPlayer";
import { useState } from "react";
import { getSafeImageSrc } from "@/utils/media";
import { useVideoPlayback } from "@/component/share/VideoPlaybackProvider";

const VideoPlayer = ({
  link,
  thumbnail,
  className,
}: {
  link: string;
  thumbnail: string;
  className?: string;
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isHoverPreview, setIsHoverPreview] = useState(false);
  const [isManualPlayback, setIsManualPlayback] = useState(false);
  const { isPlaying, containerRef, play, pause } = useVideoPlayback();

  const handleMouseEnter = () => {
    setIsHoverPreview(true);
    setHasStarted(true);
    play();
  };

  const handleMouseLeave = () => {
    setIsHoverPreview(false);

    // Keep an intentionally started video playing after the pointer leaves.
    // Hover-only previews are stopped and reset to the thumbnail.
    if (!isManualPlayback) {
      pause();
      setHasStarted(false);
    }
  };

  const handleManualIntent = () => {
    setIsManualPlayback(true);
    setIsHoverPreview(false);
  };

  const handleManualPlay = () => {
    handleManualIntent();
    setHasStarted(true);
    play();
  };

  return (
    <div
      ref={containerRef}
      className={`${className} aspect-video rounded-lg overflow-hidden relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleManualIntent}
    >

      {!hasStarted && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleManualPlay}
        >
          <Image
            src={getSafeImageSrc(thumbnail)}
            alt="Intro video thumbnail"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 410px"
            className="object-cover"
          />
          <button className="md:w-16 w-14 md:h-10 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center lg:rounded-xl rounded-lg text-white backdrop-blur-[2px] st group">
            <Play
              fill="#fff"
              className="group-hover:scale-105 size-4 md:size-6 active:scale-90 duration-200 ease-in-out"
            />
          </button>
        </div>
      )}

      {hasStarted && (
        <ReactPlayer
          url={link}
          width="100%"
          height="100%"
          controls
          playsinline
          playing={isPlaying}
          muted={isHoverPreview && !isManualPlayback}
          onPlay={play}
          onPause={pause}
          onEnded={() => {
            pause();
            setHasStarted(false);
            setIsHoverPreview(false);
            setIsManualPlayback(false);
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
