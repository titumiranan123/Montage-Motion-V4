"use client";
import { Play } from "lucide-react";
import React, { useRef, useState } from "react";

interface MarqueeItem {
  image_url: string;
  video_url: string;
  alt?: string;
}

interface VerticalMarqueeSliderProps {
  data: MarqueeItem[];
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
}

const VerticalMarqueeSlider: React.FC<VerticalMarqueeSliderProps> = ({
  data,
  speed = 30,
  pauseOnHover = true,
}) => {
  const [pausedColumns, setPausedColumns] = useState<Set<number>>(new Set());

  const togglePause = (columnIndex: number, isPaused: boolean) => {
    setPausedColumns((prev) => {
      const newSet = new Set(prev);
      if (isPaused) {
        newSet.add(columnIndex);
      } else {
        newSet.delete(columnIndex);
      }
      return newSet;
    });
  };

  if (!data || data.length === 0) {
    return null;
  }

  // Calculate animation duration based on speed
  const itemHeight = 228 + 20; // image height + gap
  const animationDuration = (data.length * itemHeight) / speed;

  const renderMarqueeColumn = (direction: "up" | "down", key: number) => {
    const isColumnPaused = pausedColumns.has(key);
    return (
      <div
        key={key}
        className="relative h-[500px] overflow-hidden"
        onMouseEnter={pauseOnHover ? () => togglePause(key, true) : undefined}
        onMouseLeave={pauseOnHover ? () => togglePause(key, false) : undefined}
      >
        <div
          className={`flex flex-col gap-5 ${isColumnPaused ? "animate-pause" : ""}`}
          style={{
            animation: `marquee-${direction} ${animationDuration}s linear infinite`,
          }}
        >
          {/* Original items */}
          {data.map((item, idx) => (
            <div
              key={`${key}-${idx}`}
              className=" aspect-9/16 bg-black rounded-lg overflow-hidden"
            >
              <VideoPlayer src={item.video_url} />
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee-up {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }

          @keyframes marquee-down {
            0% {
              transform: translateY(-50%);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-pause {
            animation-play-state: paused !important;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className=" flex gap-3 ">
      {/* First Column - Up */}
      {renderMarqueeColumn("up", 0)}

      {/* Second Column - Down */}
      {renderMarqueeColumn("down", 1)}

      {/* Third Column - Up */}
      <div className="lg:block hidden">{renderMarqueeColumn("up", 2)}</div>
    </div>
  );
};

export default VerticalMarqueeSlider;

function VideoPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  return (
    <div className="relative w-full aspect-9/16  rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onClick={handleVideoClick}
      />

      {/* Play/Pause Icon - Center এ */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity"
        onClick={handleVideoClick}
      >
        <div
          className={`transition-all w-[45px] h-8 bg-white/10 backdrop-blur-xs flex justify-center items-center rounded-lg ${isPlaying ? "opacity-0" : "opacity-100 hover:opacity-80"}`}
        >
          <Play size={21} className="text-white drop-shadow-lg fill-white" />
        </div>
      </div>
    </div>
  );
}
