"use client";
import React from "react";
import Image from "next/image";

interface MarqueeItem {
  image_url: string;
  alt?: string;
}

const VerticalMarqueeColumn: React.FC<{
  data: MarqueeItem[];
  direction: "up" | "down";
  speed: number;
  showGradient: boolean;
  gradientHeight: number;
  gradientColor: string;
}> = ({
  data,
  direction,
  speed,
  showGradient,
  gradientHeight,
  gradientColor,
}) => {
  return (
    <div className="relative h-full w-[171px] overflow-hidden group">
      {/* Gradient overlays */}
      {showGradient && (
        <>
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: `${gradientHeight}px`,
              background: `linear-gradient(to bottom, ${gradientColor} 0%, transparent 100%)`,
            }}
          />
          {/* <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: `${gradientHeight}px`,
              background:
                "linear-gradient(161.24deg, rgba(0, 0, 0, 0) 24.82%, #000000 86.61%)",
              backdropFilter: `blur(29.299999237060547px)`,
            }}
          /> */}
        </>
      )}

      {/* Scrolling content */}
      <div
        className="flex flex-col gap-5 group-hover:[animation-play-state:paused]"
        style={{
          animation: `scroll${
            direction === "up" ? "Up" : "Down"
          } ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate data for seamless loop */}
        {[...data, ...data].map((item, idx) => (
          <div key={idx} className="w-[171px] h-[228px] flex-shrink-0">
            <Image
              src={item.image_url}
              alt={item.alt || `Image ${idx + 1}`}
              width={171}
              height={228}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Verticalheader: React.FC<any> = ({ data, speed = 30 }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-screen  overflow-hidden">
      <div className="flex justify-center items-center gap-4  h-full relative">
        <div className="gradient-overlay absolute z-10 bottom-0 right-0 w-full blur-2xl"></div>
        <div className="gradient-overlay1 absolute z-10 top-0 right-0 w-full blur-2xl "></div>

        <style>{`
          .gradient-overlay {
           
            width: 100%;
            height: 285px;
            background: linear-gradient(161.24deg, rgba(0, 0, 0, 0) 4.82%, #000000 78.14%);
           
          }
          .gradient-overlay1 {
          
            width: 100%;
            height: 285px;
            background: linear-gradient(161.24deg, rgba(0, 0, 0, 0) 4.82%, #000000 86.61%);

            
          }
        `}</style>

        {/* First Column - Up */}
        <VerticalMarqueeColumn
          data={data}
          direction="up"
          speed={speed}
          showGradient={true}
          gradientHeight={150}
          gradientColor="rgba(0, 0, 0, 0.9)"
        />

        {/* Second Column - Down */}
        <VerticalMarqueeColumn
          data={data}
          direction="down"
          speed={speed}
          showGradient={true}
          gradientHeight={150}
          gradientColor="rgba(0, 0, 0, 1)"
        />
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Verticalheader;
