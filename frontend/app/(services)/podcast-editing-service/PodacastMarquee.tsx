"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PodacastMarquee: React.FC = () => {
  const data = [
    {
      icon: "/assets/podcast/marquee/icon-2.png",
      width: 140,
      height: 140,
      alt: "icon-2",
    },
    {
      icon: "/assets/podcast/marquee/icon-3.png",
      width: 140,
      height: 140,
      alt: "icon-3",
    },
    {
      icon: "/assets/podcast/marquee/icon-4.png",
      width: 140,
      height: 140,
      alt: "icon-4",
    },
    {
      icon: "/assets/podcast/marquee/icon-5.png",
      width: 140,
      height: 140,
      alt: "icon-5",
    },
    {
      icon: "/assets/podcast/marquee/icon-6.png",
      width: 140,
      height: 140,
      alt: "icon-6",
    },
    {
      icon: "/assets/podcast/marquee/icon-7.png",
      width: 140,
      height: 140,
      alt: "icon-7",
    },
    {
      icon: "/assets/podcast/marquee/icon-8.png",
      width: 140,
      height: 140,
      alt: "icon-8",
    },
    {
      icon: "/assets/podcast/marquee/icon-9.png",
      width: 140,
      height: 140,
      alt: "icon-9",
    },
    {
      icon: "/assets/podcast/marquee/piaggio.png",
      width: 140,
      height: 140,
      alt: "piaggio",
    },
    {
      icon: "/assets/podcast/marquee/icon-10.jpg",
      width: 140,
      height: 140,
      alt: "icon-10",
    },
  ];

  return (
    <div className="relative container w-full flex flex-col gap-3  py-6 overflow-hidden">
      {/* Left & Right Gradient Shadows */}
      <div
        style={{
          background:
            "linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
        }}
        className="pointer-events-none absolute right-0 top-0 h-full lg:w-[328px]  z-10"
      />
      <div
        style={{
          background:
            "linear-gradient(-270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
        }}
        className="pointer-events-none absolute   left-0 top-0 h-full lg:w-[328px]   z-10"
      />

      <Marquee gradient={false} speed={100} pauseOnHover={true}>
        {data.map((item, idx) => (
          <div key={idx} className="mx-6 flex-shrink-0">
            <Image
              src={item.icon}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
      <Marquee
        gradient={false}
        speed={100}
        pauseOnHover={true}
        direction={"right"}
      >
        {data.map((item, idx) => (
          <div key={idx} className="mx-6 flex-shrink-0">
            <Image
              src={item.icon}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PodacastMarquee;
