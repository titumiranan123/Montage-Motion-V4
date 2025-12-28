"use client";
import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAlltype from "@/hook/useALLtype";

const HomeProjectTab = () => {
  const { type } = useAlltype();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tabConfig = [...type];
  const defaultTab = searchParams.get("tab") || "home";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tabId: string) => {
    if (!isDragging) {
      setActiveTab(tabId);
      router.push(`?tab=${tabId}`, { scroll: false });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="
          flex gap-3 lg:gap-6 pb-2 w-full 
          justify-start lg:justify-start items-center 
          max-h-[79px] rounded-lg p-3 
          mx-auto  
          overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
          hover:scrollbar-thumb-gray-500
          mt-8 glassShadow  bg-white/40  backdrop-blur-2xl max-w-[594px]
          cursor-grab select-none
        "
      style={{ scrollbarWidth: "thin" }}
    >
      {tabConfig?.slice(1)?.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab?.service_type)}
          className={`py-2 px-2 md:px-4 text-(--text-primary) opensans font-semibold md:text-[16px] text-[13px] rounded-lg transition-colors whitespace-nowrap h-[51px] pointer-events-auto ${
            activeTab === tab?.service_type ? "btn-color " : ""
          }`}
        >
          {tab?.service_title}
        </button>
      ))}
    </div>
  );
};

export default HomeProjectTab;
