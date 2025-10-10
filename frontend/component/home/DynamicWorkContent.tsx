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

        return (
          <div
            key={index}
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
          </div>
        );
      })}
    </div>
  );
};

export default DynamicWorkContent;
