/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
const serviceShortNames: Record<string, string> = {
  home: "Home",
  "thumbnail-design": "Thumbnail",
  "shortsreels-editing": "Shorts/Reels",
  "saas-explainer": "SaaS",
  "podcast-video-editing": "Podcast",
  "talking-head-video-editing": "Talking-head",
  "promo-video-editing": "Promo",
};
const HomeTab = ({
  types,
  setActiveTab,
  activeTab,
}: {
  types: any;
  activeTab: string;
  setActiveTab: (p: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!activeTab) {
      setActiveTab(types?.[1]?.service_type);
      // router.replace(`?cat=${types?.[1]?.service_type}`, {
      //   scroll: false,
      // });
    }
  }, [activeTab, setActiveTab, types]);

  const handleTabClick = (href: string) => {
    if (!isDragging) {
      setActiveTab(href);
      // router.replace(`?cat=${href}`, { scroll: false });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const tabConfig = types ?? [];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`glassShadow bg-white/40 backdrop-blur-2xl
        sm:max-w-148.5 max-w-full h-18.75
        flex justify-start lg:justify-center items-center
        mx-auto rounded-[12px]
        mt-5 transition-all duration-300
        overflow-x-auto px-3 gap-2
        scroll-horizontal ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {tabConfig?.slice(1)?.map((tb: any, idx: number) => (
        <button
          key={idx}
          onClick={() => handleTabClick(tb?.service_type)}
          className={`py-2 px-3 opensans font-medium text-[14px]
            rounded-[12px] whitespace-nowrap h-12.75
            ${activeTab === tb?.service_type ? "btn-color font-semibold" : ""}`}
        >
          {serviceShortNames[tb?.service_type] ?? tb?.service_title}
        </button>
      ))}
    </div>
  );
};

export default HomeTab;
