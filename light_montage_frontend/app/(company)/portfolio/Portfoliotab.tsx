/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Portfoliotab = ({ tab, types }: { tab: string; types: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("cat") || tab || "talkinghead";
  const [activeTab, setActiveTab] = useState(currentTab);

  /** 🔹 Drag scroll states (same as Blogtab) */
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /** 🔹 Tab click (blocked during drag) */
  const handleTabClick = (href: string) => {
    if (!isDragging) {
      setActiveTab(href);
      router.replace(`?cat=${href}`);
    }
  };

  /** 🔹 Mouse drag handlers */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  /** 🔹 Keep URL in sync */
  useEffect(() => {
    router.replace(`?cat=${activeTab}`);
  }, [activeTab, router]);

  const tabConfig = types ?? [];

  return (
    <div data-aos="fade-up" data-aos-delay={400} className="px-3">
      {/* styles unchanged */}
      <style>
        {`
        .searchbg{
          background: linear-gradient(250.64deg, rgba(51, 87, 163, 0.5) 0%, rgba(51, 87, 163, 0) 50%, rgba(51, 87, 163, 0.5) 100%);
        }
        
        `}
      </style>

      {/* 🔹 Tabs with Blogtab drag behavior */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`glassShadow tabScroll bg-white/40 backdrop-blur-2xl group max-w-[594px] h-[75px]
          flex justify-left items-center scroll-hide mx-auto rounded-[12px] p-px mt-5
          transition-all duration-300 overflow-x-scroll px-3 flex-nowrap
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {tabConfig?.slice(1)?.map((tab: any) => (
          <button
            key={tab?.service_type}
            onClick={() => handleTabClick(tab?.service_type)}
            onMouseDown={(e) => {
              if (isDragging) e.preventDefault();
            }}
            className={`py-2 px-3 text-(--text-primary) opensans font-medium text-[14px]
              rounded-[12px] text-center transition-colors whitespace-nowrap h-[51px]
              ${
                activeTab === tab?.service_type ? "btn-color font-semibold" : ""
              }`}
          >
            {tab?.service_title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Portfoliotab;
