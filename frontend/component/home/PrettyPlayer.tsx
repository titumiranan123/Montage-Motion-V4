"use client";

import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import type { SourceInfo, Options as PlyrOptions } from "plyr";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

interface Props {
  youtubeUrl: string;
  thumbnail?: string;
}

export default function VideoPlayer({ youtubeUrl, thumbnail }: Props) {
  const source: SourceInfo = {
    type: "video",
    sources: [
      {
        src: "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/full%20length.mp4",
        provider: "html5",
      },
    ],
    poster: thumbnail,
  };

  const options: PlyrOptions = {
    controls: [
      "play-large",
      "current-time",
      "progress",
      "duration",
      "mute",
      "volume",
      "play",
      // "duration"
      "fullscreen",
    ],
  };

  return (
    <div>
      <Plyr source={source} options={options} />
      <style jsx global>{`
        :root {
          --plyr-color-main: #2b6ab2; /* Purple progress bar */
        }

        /* ✅ Keep the big play button perfectly centered */
        .plyr--video .plyr__control--overlaid {
          position: absolute !important;
          top: 44% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: #00000033 !important;
          backdrop-filter: blur(8px);
          width: 60px !important;
          height: 40px !important;
          border-radius: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          line-height: 0 !important;
          transition: all 0.3s ease !important;
        }

        .plyr--video .plyr__control--overlaid:hover {
          background: red !important;
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        /* 🧩 SVG perfectly centered & scaled */
        .plyr__control--overlaid svg {
          display: block !important;
          margin: 0 auto !important;
          width: 20px !important;
          height: 20px !important;
          fill: white !important;
        }

        /* Hide by default */
        .plyr--video .plyr__controls .plyr__volume input[type="range"] {
          position: absolute;
          bottom: 75px;
          right: -48px;
          transform: rotate(-90deg);
          transform-origin: center bottom;
          width: 120px;
          height: 34px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
          z-index: 20;
        }

        /* Show on hover/focus */
        .plyr--video .plyr__controls .plyr__volume:hover input[type="range"],
        .plyr--video
          .plyr__controls
          .plyr__volume:focus-within
          input[type="range"],
        .plyr--video .plyr__controls .plyr__volume:hover::after,
        .plyr--video .plyr__controls .plyr__volume:focus-within::after {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
