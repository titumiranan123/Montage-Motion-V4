"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

const Blogtab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("cat") || "all";
  const [activeTab, setActiveTab] = useState(currentTab);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTabClick = (href: string) => {
    if (!isDragging) {
      setActiveTab(href);
      const newUrl = `?cat=${href}`;
      router.replace(newUrl);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const tabConfig = [
    {
      title: "All",
      href: "all",
    },
    {
      title: "Video Editing",
      href: "video-editing",
    },
    {
      title: "Content Marketing",
      href: "content-marketing",
    },
    {
      title: "Design & Branding",
      href: "design-branding",
    },
    {
      title: "Social Media Trends",
      href: "social-media-trends",
    },
    {
      title: "Podcasting Tips",
      href: "podcasting-tips",
    },
    {
      title: "Case Studies",
      href: "case-studies",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`flex mx-auto h-[75px] justify-start lg:justify-start items-center gap-6 pb-2 max-w-[1002px] rounded-[12px] py-[11px] px-9 bg-white/40 backdrop-blur-md flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 mt-5 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {tabConfig.map((tab) => (
        <button
          key={tab.href}
          onClick={() => handleTabClick(tab.href)}
          onMouseDown={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
          className={`py-2 px-5 text-center h-[51px] font-normal text-[16px] rounded-[12px] transition-all whitespace-nowrap select-none ${
            activeTab === tab.href
              ? "bg-blue-500 text-white font-semibold shadow-lg"
              : "bg-white/20 text-gray-700 hover:bg-white/30"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Blogtab;
