"use client";
import useWorks from "@/hook/useWorks";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Work {
  id: string;
  video_link: string;
  thumbnail?: string;
  title?: string;
}

interface DynamicWorkContentProps {
  tabKey: string;
}

const DynamicWorkContent: React.FC<DynamicWorkContentProps> = ({ tabKey }) => {
  const { data, isLoading } = useWorks(tabKey);
  const [playingStates, setPlayingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const playerRefs = useRef<{ [key: string]: any | null }>({});

  const handlePlayPause = (id: string) => {
    setPlayingStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSeek = (id: string, value: number) => {
    const player = playerRefs.current[id];
    if (player) {
      player.seekTo(value / 100); // 0-1 scale
      setProgress((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-white flex items-center justify-center">
        <p>No works available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-white">
      {data.map((dt: Work, index: number) => {
        const videoId = dt.id || `work-${index}`;
        const isPlaying = playingStates[videoId] || false;
        const currentProgress = progress[videoId] || 0;

        return (
          <div
            key={videoId}
            className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Video Player */}
            <div className="aspect-video">
              <ReactPlayer
                ref={(ref) => {
                  playerRefs.current[videoId] = ref;
                }}
                src={dt.video_link}
                playing={isPlaying}
                controls={false}
                width="100%"
                height="100%"
              />
            </div>

            {/* Custom Controls */}
            <div className="p-4 bg-gray-900">
              {/* Title */}
              {dt.title && (
                <h3 className="text-sm font-semibold mb-2 truncate">
                  {dt.title}
                </h3>
              )}

              {/* Play/Pause Button */}
              <button
                onClick={() => handlePlayPause(videoId)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicWorkContent;
