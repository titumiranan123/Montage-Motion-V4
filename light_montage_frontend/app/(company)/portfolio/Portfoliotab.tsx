/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Portfoliotab = ({ tab, types }: { tab: string; types: any }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTabClick = (href: string) => {
    if (!isDragging) {
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

  const tabConfig = types ?? [];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`glassShadow bg-white/40 backdrop-blur-2xl
        max-w-[594px] h-[75px]
          flex justify-start items-center
          mx-auto rounded-[12px]
          mt-5 transition-all duration-300
          overflow-x-auto 
          px-3 gap-2
          scroll-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <button
        onClick={() => handleTabClick("all")}
        className={`py-2 px-3 text-(--text-primary) opensans font-medium text-[14px]
      rounded-[12px]  whitespace-nowrap h-[51px]
      ${tab === "all" || tab === undefined ? "btn-color px-6 font-semibold" : ""}`}
      >
        All
      </button>
      {tabConfig?.slice(1)?.map((tb: any) => (
        <button
          key={tb?.service_type}
          onClick={() => handleTabClick(tb?.service_type)}
          className={`py-2 px-3 text-(--text-primary) opensans font-medium text-[14px]
      rounded-[12px] whitespace-nowrap h-[51px]
      ${tab === tb?.service_type ? "btn-color font-semibold" : ""}`}
        >
          {tb?.service_title}
        </button>
      ))}
    </div>
  );
};

export default Portfoliotab;
