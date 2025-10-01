"use client";
import React, { useState, useRef } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
  thumb?: string;
  uniqueId?: string;
}

interface MutedStates {
  [key: string]: boolean;
}

interface VideoRefs {
  [key: string]: HTMLVideoElement | null;
}

const VerticalMarqueeSlider: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<MutedStates>({});
  const videoRefs = useRef<VideoRefs>({});

  // Sample media items
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400",
    },
    {
      id: 2,
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumb:
        "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400",
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400",
    },
    {
      id: 4,
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumb:
        "https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400",
    },
    {
      id: 5,
      type: "image",
      url: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=400",
    },
    {
      id: 6,
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumb:
        "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=400",
    },
    {
      id: 7,
      type: "image",
      url: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=400",
    },
    {
      id: 8,
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumb:
        "https://images.unsplash.com/photo-1682687220866-c856f566f1bd?w=400",
    },
    {
      id: 9,
      type: "image",
      url: "https://images.unsplash.com/photo-1682687218982-6c5e35b07ba8?w=400",
    },
    {
      id: 10,
      type: "video",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumb:
        "https://images.unsplash.com/photo-1682687221073-7c16f6d786fc?w=400",
    },
  ];

  // Duplicate for seamless loop
  const duplicatedItems: MediaItem[] = [...mediaItems, ...mediaItems];

  // Split into 3 columns
  const columns: MediaItem[][] = [[], [], []];
  duplicatedItems.forEach((item, idx) => {
    columns[idx % 3].push({ ...item, uniqueId: `${item.id}-${idx}` });
  });

  const handleMediaClick = (item: MediaItem): void => {
    if (item.type === "video" && item.uniqueId) {
      const videoKey = item.uniqueId;

      if (playingVideo === videoKey) {
        // Pause current video
        if (videoRefs.current[videoKey]) {
          videoRefs.current[videoKey]?.pause();
        }
        setPlayingVideo(null);
      } else {
        // Stop previous video
        if (playingVideo && videoRefs.current[playingVideo]) {
          videoRefs.current[playingVideo]?.pause();
          if (videoRefs.current[playingVideo]) {
            videoRefs.current[playingVideo]!.currentTime = 0;
          }
        }
        // Play new video
        setPlayingVideo(videoKey);
        setTimeout(() => {
          if (videoRefs.current[videoKey]) {
            videoRefs.current[videoKey]?.play();
          }
        }, 100);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent, videoKey: string): void => {
    e.stopPropagation();
    const video = videoRefs.current[videoKey];
    if (video) {
      video.muted = !video.muted;
      setMutedStates((prev) => ({ ...prev, [videoKey]: video.muted }));
    }
  };

  const renderMediaCard = (item: MediaItem, colorTheme: string) => {
    const ringColor =
      colorTheme === "purple"
        ? "ring-purple-500"
        : colorTheme === "pink"
        ? "ring-pink-500"
        : "ring-blue-500";
    const shadowColor =
      colorTheme === "purple"
        ? "hover:shadow-purple-500/50"
        : colorTheme === "pink"
        ? "hover:shadow-pink-500/50"
        : "hover:shadow-blue-500/50";
    const playIconColor =
      colorTheme === "purple"
        ? "text-purple-600 fill-purple-600"
        : colorTheme === "pink"
        ? "text-pink-600 fill-pink-600"
        : "text-blue-600 fill-blue-600";

    return (
      <div
        key={item.uniqueId}
        onClick={() => handleMediaClick(item)}
        className={`relative w-[172px] h-[229px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-300 flex-shrink-0 ${
          playingVideo === item.uniqueId
            ? `scale-105 ring-4 ${ringColor}`
            : `hover:scale-105 ${shadowColor}`
        }`}
      >
        {item.type === "video" && playingVideo === item.uniqueId ? (
          <>
            <video
              ref={(el) => {
                if (item.uniqueId) {
                  videoRefs.current[item.uniqueId] = el;
                }
              }}
              src={item.url}
              className="w-full h-full object-cover"
              loop
              muted={mutedStates[item.uniqueId!] !== false}
            />
            <button
              onClick={(e) => toggleMute(e, item.uniqueId!)}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all z-10"
            >
              {mutedStates[item.uniqueId!] !== false ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </>
        ) : (
          <>
            <img
              src={item.type === "video" ? item.thumb : item.url}
              alt={`Media ${item.id}`}
              className="w-full h-full object-cover"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all">
                <div className="bg-white/90 p-4 rounded-full">
                  <Play className={`w-8 h-8 ${playIconColor}`} />
                </div>
              </div>
            )}
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-end items-center gap-4 md:px-8 px-2">
        {/* Column 1 - Moving Down */}
        <div className="relative h-full overflow-hidden">
          <div
            className="flex flex-col gap-4 py-4"
            style={{
              animation: playingVideo
                ? "none"
                : "scrollDown 30s linear infinite",
            }}
          >
            {columns[0].map((item) => renderMediaCard(item, "purple"))}
          </div>
        </div>

        {/* Column 2 - Moving Up */}
        <div className="relative h-full overflow-hidden">
          <div
            className="flex flex-col gap-4 py-4"
            style={{
              animation: playingVideo ? "none" : "scrollUp 35s linear infinite",
            }}
          >
            {columns[1].map((item) => renderMediaCard(item, "pink"))}
          </div>
        </div>

        {/* Column 3 - Moving Down */}
        <div className="relative h-full overflow-hidden md:block hidden">
          <div
            className="flex flex-col gap-4 py-4"
            style={{
              animation: playingVideo
                ? "none"
                : "scrollDown 40s linear infinite",
            }}
          >
            {columns[2].map((item) => renderMediaCard(item, "blue"))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalMarqueeSlider;
