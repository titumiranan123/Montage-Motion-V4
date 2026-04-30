/* eslint-disable @next/next/no-img-element */
"use client";
import { Play } from "lucide-react";
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
  speed?: number;
  pauseOnHover?: boolean;
  type: string;
}

// ── Popup Modal ──────────────────────────────────────────
const VideoPopup = ({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose} // background click এ close
    >
      <div
        className="relative w-[90vw] max-w-3xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-30 text-white text-3xl font-bold z-10 hover:text-gray-300"
        >
          ✕
        </button>
        <div className={"aspect-9/16 max-w-100 w-full mx-auto rounded-lg overflow-hidden "}>

          <ReactPlayer
            className={"aspect-9/16"}
            url={url}
            playing={true}
            width="100%"
            height="100%"
            controls={true}
            playsinline
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
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────
const VerticalMarqueeSlider: React.FC<VerticalMarqueeSliderProps> = ({
  data,
  speed = 30,
  pauseOnHover = true,
}) => {
  const [pausedColumns, setPausedColumns] = useState<Set<number>>(new Set());
  const [popupUrl, setPopupUrl] = useState<string | null>(null); // popup 
const doubled = [...data, ...data]
  const togglePause = (columnIndex: number, isPaused: boolean) => {
    setPausedColumns((prev) => {
      const newSet = new Set(prev);
      if (isPaused) newSet.add(columnIndex);
      else newSet.delete(columnIndex);
      return newSet;
    });
  };

  if (!data || data.length === 0) return null;

  const itemHeight = 228 + 20;
  const animationDuration = (data.length * itemHeight) / speed;

  const renderMarqueeColumn = (direction: "up" | "down", colKey: number) => {
    const isColumnPaused = pausedColumns.has(colKey);

    return (
      <div
        key={colKey}
        className="relative h-125 md:h-150 overflow-y-hidden"
        onMouseEnter={pauseOnHover ? () => togglePause(colKey, true) : undefined}
        onMouseLeave={pauseOnHover ? () => togglePause(colKey, false) : undefined}
      >
        <div
          className={`flex flex-col items-stretch gap-1 sm:gap-4 md:gap-5 ${isColumnPaused ? "animate-pause" : ""}`}
          style={{
            animation: `marquee-${direction} ${animationDuration}s linear infinite`,
          }}
        >
          {doubled.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.video_url === "" || item.video_url === null ? (
                // ── Image only ──────────────────────────────
                <div className="relative w-38 sm:w-64 overflow-hidden rounded-lg md:w-52 h-20 xs:h-24 sm:h-32 md:h-33 mx-auto">
                  <Image
                    src={item.image_url}
                    alt={item.alt || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                // ── Video thumbnail (popup trigger) ──────────
                <div
                  className="w-38 sm:w-42.75 sm:h-57 md:w-42.75 h-67.5 md:h-57 overflow-hidden rounded-lg relative cursor-pointer"
                  onClick={() => setPopupUrl(item.video_url)} // popup open
                >
                  <img
                    src={item.image_url}
                    alt={item.alt || ""}
                    className="w-full h-full object-cover"
                  />
                  {/* Play icon */}
                  <button className=" w-14  h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  rounded-lg  text-white backdrop-blur-[2px] st group">
                    <Play
                      fill="#fff"
                      className="group-hover:scale-105 size-4  active:scale-90 duration-200 ease-in-out"
                    />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes marquee-down {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .animate-pause {
            animation-play-state: paused !important;
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      {/* Video Popup */}
      {popupUrl && (
        <VideoPopup url={popupUrl} onClose={() => setPopupUrl(null)} />
      )}

      <div
        className={`flex justify-center items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-3 w-full ${data?.[0]?.video_url
          ? "max-w-md md:max-w-128.25"
          : "max-w-md md:max-w-117"
          }`}
      >
        <div className="shrink-0">{renderMarqueeColumn("up", 0)}</div>
        <div className="shrink-0">{renderMarqueeColumn("down", 1)}</div>
        {data?.[0]?.video_url && (
          <div className="hidden md:block shrink-0">
            {renderMarqueeColumn("up", 2)}
          </div>
        )}
      </div>
    </>
  );
};

export default VerticalMarqueeSlider;