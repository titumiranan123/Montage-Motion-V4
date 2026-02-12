/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

interface MarqueeItem {
  image_url: string;
  video_url: string;
  alt?: string;
}

interface VerticalMarqueeSliderProps {
  data: MarqueeItem[];
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
  type: string;
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
        className="relative h-[500px] md:h-[600px] overflow-y-hidden"
        onMouseEnter={pauseOnHover ? () => togglePause(key, true) : undefined}
        onMouseLeave={pauseOnHover ? () => togglePause(key, false) : undefined}
      >
        <div
          className={`flex flex-col items-stretch gap-1 sm:gap-4 md:gap-5 ${isColumnPaused ? "animate-pause" : ""}`}
          style={{
            animation: `marquee-${direction} ${animationDuration}s linear infinite`,
          }}
        >
          {/* Original items */}
          {data.map((item, idx) => {
            return (
              <>
                {item.video_url === "" || item.video_url === null ? (
                  <div
                    key={idx}
                    className="relative w-38  sm:w-64 overflow-hidden rounded-lg md:w-52 h-20 xs:h-24 sm:h-32 md:h-[132px] mx-auto"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.alt || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="w-[152px] sm:w-[171px] sm:h-[228px] md:w-[171px] h-[270px] md:h-[228px] overflow-hidden rounded-lg"
                  >
                    <ReactPlayer
                      url={item?.video_url}
                      playing={false}
                      light={<img src={item.image_url} alt="" />}
                      width={"100%"}
                      height={"100%"}
                      controls={true}
                      playIcon={
                        <div className="flex items-center justify-center w-12 xs:w-14 sm:w-16 md:w-[68px] h-8 xs:h-10 sm:h-12 md:h-12">
                          <Image
                            src="/assets/icon/playsmall.png"
                            width={68}
                            height={48}
                            alt="Play"
                            className="w-full h-full"
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
                )}
              </>
            );
          })}
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
    <div
      className={`flex justify-center items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-3 w-full ${
        data?.[0]?.video_url
          ? "max-w-md md:max-w-[513px]"
          : "max-w-md md:max-w-[468px]"
      }`}
    >
      {/* First Column - Up */}
      <div className="shrink-0">{renderMarqueeColumn("up", 0)}</div>

      {/* Second Column - Down */}
      <div className="shrink-0">{renderMarqueeColumn("down", 1)}</div>

      {/* Third Column - Up - Hidden on mobile and tablet */}
      {data?.[0]?.video_url && (
        <div className="hidden md:block shrink-0">
          {renderMarqueeColumn("up", 2)}
        </div>
      )}
    </div>
  );
};

export default VerticalMarqueeSlider;
