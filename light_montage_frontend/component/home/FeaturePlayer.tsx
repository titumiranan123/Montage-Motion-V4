"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "plyr-react/plyr.css";
import type { SourceInfo, Options as PlyrOptions } from "plyr";
import type Plyr from "plyr";

const PlyrComponent = dynamic(() => import("plyr-react"), { ssr: false });

interface Props {
  youtubeUrl: string;
  thumbnail?: string;
}

export default function FeaturePlayer({ youtubeUrl, thumbnail }: Props) {
  const plyrRef = useRef<{ plyr: Plyr } | null>(null);

  const source: SourceInfo = {
    type: "video",
    sources: [
      {
        src: youtubeUrl,
        provider: "html5",
      },
      // {
      //   src: "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/full%20length.mp4",
      //   provider: "html5",
      // },
    ],
    poster: thumbnail,
  };

  const options: PlyrOptions = {
    controls: [
      "play-large",
      "play",
      "current-time",
      "progress",
      "duration",
      "mute",
      "volume",
      "fullscreen",
    ],
    resetOnEnd: false,
    hideControls: true,
    clickToPlay: true,
  };

  // Fix for tab switching - recalculate player size
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && plyrRef.current?.plyr) {
        // Force player to recalculate its dimensions
        setTimeout(() => {
          if (plyrRef.current?.plyr) {
            // Trigger a resize event
            window.dispatchEvent(new Event("resize"));
          }
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also handle when container becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && plyrRef.current?.plyr) {
            window.dispatchEvent(new Event("resize"));
          }
        });
      },
      { threshold: 0.1 }
    );

    const videoContainer = document.querySelector(".plyr");
    if (videoContainer) {
      observer.observe(videoContainer);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (videoContainer) {
        observer.unobserve(videoContainer);
      }
    };
  }, []);

  return (
    <div className="feature-player-wrapper">
      <noscript>
        <video
          controls
          poster={thumbnail}
          style={{
            width: "100%",
            height: "100%",
            background: "#000",
            objectFit: "cover",
          }}
        ></video>
      </noscript>
      <PlyrComponent ref={plyrRef} source={source} options={options} />
      <style jsx global>{`
        .video-player-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }

        /* Ensure video maintains aspect ratio */

        // .plyr__video-wrapper {
        //   background: #000;
        // }

        .plyr video {
          object-fit: contain;
        }

        :root {
          --plyr-color-main: #2b6ab2;
        }

        /* Center play button */
        .plyr--video .plyr__control--overlaid {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(8px);
          width: 68px !important;
          height: 48px !important;
          border-radius: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          transition: all 0.3s ease !important;
          border: none !important;
        }

        .plyr--video .plyr__control--overlaid:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        .plyr__control--overlaid svg {
          display: block !important;
          margin: 0 auto !important;
          width: 24px !important;
          height: 24px !important;
          fill: white !important;
        }

        /* Volume slider positioning */
        .plyr--video .plyr__controls .plyr__volume {
          position: relative;
        }

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

        .plyr--video .plyr__controls .plyr__volume:hover input[type="range"],
        .plyr--video
          .plyr__controls
          .plyr__volume:focus-within
          input[type="range"] {
          opacity: 1;
          pointer-events: auto;
        }

        /* Keep controls visible, only hide when user is inactive */
        .plyr__controls {
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        /* Hide controls during playback after 2 seconds of inactivity */
        .plyr--playing.plyr--hide-controls .plyr__controls {
          opacity: 0;
        }

        /* Always show on hover */
        .plyr:hover .plyr__controls {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
