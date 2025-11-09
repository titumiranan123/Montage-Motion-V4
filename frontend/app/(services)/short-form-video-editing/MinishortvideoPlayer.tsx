"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "plyr-react/plyr.css";
import type { SourceInfo, Options as PlyrOptions } from "plyr";
import type Plyr from "plyr";

const PlyrComponent = dynamic(() => import("plyr-react"), { ssr: false });

interface Props {
  videoUrl: string;
  thumbnail?: string;
}

export default function MinishortvideoPlayer({ videoUrl, thumbnail }: Props) {
  const plyrRef = useRef<{ plyr: Plyr } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const source: SourceInfo = {
    type: "video",
    sources: [
      {
        src: videoUrl,
        provider: "html5",
      },
    ],
    poster: thumbnail,
  };

  const options: PlyrOptions = {
    controls: [
      "play-large",
      "play",
      //   "current-time",
      "progress",
      //   "duration",
      //   "mute",
      "volume",
      "fullscreen",
    ],
    resetOnEnd: false,
    hideControls: true,
    clickToPlay: true,
    fullscreen: { enabled: true, fallback: true, iosNative: false },
  };

  // Fix for tab switching and proper sizing
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && plyrRef.current?.plyr) {
        setTimeout(() => {
          if (plyrRef.current?.plyr && containerRef.current) {
            // Force recalculation
            const event = new Event("resize");
            window.dispatchEvent(event);
          }
        }, 100);
      }
    };

    const handleResize = () => {
      if (plyrRef.current?.plyr && containerRef.current) {
        // Ensure proper dimensions
        const container = containerRef.current;
        const video = container.querySelector("video");
        if (video) {
          video.style.objectFit = "contain";
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    // Initial setup
    setTimeout(handleResize, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleResize();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="short-video-wrapper">
      <div className="short-video-container" ref={containerRef}>
        <noscript>
          <video
            controls
            poster={thumbnail}
            style={{
              width: "100%",
              height: "100%",
              background: "#000",
              objectFit: "contain",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </noscript>
        <PlyrComponent ref={plyrRef} source={source} options={options} />
      </div>
      <style jsx global>{`
        .short-video-wrapper {
          display: inline-block;
          width: 172px;
          max-width: 100%;
        }

        .short-video-container {
          position: relative;
          width: 172px;
          height: 228px;
          max-width: 100%;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* Force exact dimensions */
        .short-video-container .plyr {
          width: 171px !important;
          height: 228px !important;
          max-width: 100%;
        }

        .short-video-container .plyr__video-wrapper {
          width: 171px !important;
          height: 228px !important;
          background: #000;
        }

        .short-video-container .plyr__video-wrapper video {
          width: 171px !important;
          height: 228px !important;
          object-fit: contain !important;
        }

        /* Poster image */
        .short-video-container .plyr__poster {
          background-size: contain !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
        }

        :root {
          --plyr-color-main: #2b6ab2;
        }

        /* Center play button for short videos */
        .short-video-container .plyr--video .plyr__control--overlaid {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(8px);
          width: 48px !important;
          height: 38px !important;
          border-radius: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          transition: all 0.3s ease !important;
          border: none !important;
        }

        .short-video-container .plyr--video .plyr__control--overlaid:hover {
          background: rgba(43, 106, 178, 0.9) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        .short-video-container .plyr__control--overlaid svg {
          display: block !important;
          margin: 0 auto !important;
          // margin-left: 22px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 22px !important;
          height: 22px !important;
          fill: white !important;
        }

        /* Volume slider positioning for short video */
        .short-video-container .plyr--video .plyr__controls .plyr__volume {
          position: relative;
        }

        .short-video-container
          .plyr--video
          .plyr__controls
          .plyr__volume
          input[type="range"] {
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

        .short-video-container
          .plyr--video
          .plyr__controls
          .plyr__volume:hover
          input[type="range"],
        .short-video-container
          .plyr--video
          .plyr__controls
          .plyr__volume:focus-within
          input[type="range"] {
          opacity: 1;
          pointer-events: auto;
        }

        /* Keep controls visible */
        .short-video-container .plyr__controls {
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .short-video-container
          .plyr--playing.plyr--hide-controls
          .plyr__controls {
          opacity: 0;
        }

        .short-video-container .plyr:hover .plyr__controls {
          opacity: 1 !important;
        }

        /* Responsive for mobile */
        @media (max-width: 430px) {
          .short-video-wrapper {
            width: 100%;
          }

          .short-video-container {
            width: 100%;
            height: auto;
            aspect-ratio: 9 / 16;
            border-radius: 0;
          }

          .short-video-container .plyr,
          .short-video-container .plyr__video-wrapper,
          .short-video-container .plyr__video-wrapper video {
            width: 100% !important;
            height: auto !important;
          }
        }

        /* Fix for grid/flex layouts */
        @media (min-width: 431px) {
          .short-video-wrapper {
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
