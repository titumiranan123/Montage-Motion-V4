/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const HomeTab = ({ types }: { types: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cat = searchParams.get("cat");

  /* ✅ FIRST LOAD: set default query */
  useEffect(() => {
    if (!cat) {
      router.replace(`?cat=${types?.[1]?.service_type}`, {
        scroll: false,
      });
    }
  }, [cat, router, types]);

  const handleTabClick = (href: string) => {
    if (!isDragging) {
      router.replace(`?cat=${href}`, { scroll: false });
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
        max-w-148.5 h-18.75
        flex justify-start items-center
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
            ${cat === tb?.service_type ? "btn-color font-semibold" : ""}`}
        >
          {tb?.service_title}
        </button>
      ))}
    </div>
  );
};

export default HomeTab;
