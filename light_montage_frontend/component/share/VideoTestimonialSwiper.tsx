/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

type Testimonial = {
  id?: string | number;
  [key: string]: any;
};

type Props = {
  data: Testimonial[];
};

const VideoTestimonialSwiper: React.FC<Props> = ({ data }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const isPaused = useRef(false);
  const isVideoPlaying = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // কোন card এ play pressed — index track
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const doubled = [...(data ?? []), ...(data ?? [])];

  // ── Auto-scroll ─────────────────────────────────────────────
  const startAnimation = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    startAnimation();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [startAnimation]);

  const pauseAnim = () => { isPaused.current = true; };
  const resumeAnim = () => {
    if (!isDragging.current && !isVideoPlaying.current) isPaused.current = false;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    isPaused.current = true;
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!isVideoPlaying.current) isPaused.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    dragStart.current = {
      x: e.touches[0].pageX,
      scrollLeft: trackRef.current?.scrollLeft ?? 0,
    };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    trackRef.current.scrollLeft =
      dragStart.current.scrollLeft - (e.touches[0].pageX - dragStart.current.x);
  };
  const onTouchEnd = () => {
    if (!isVideoPlaying.current) isPaused.current = false;
  };

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    isPaused.current = true;
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 320;
    const distance = cardWidth + 24;
    const start = el.scrollLeft;
    const diff = dir === "next" ? distance : -distance;
    const duration = 400;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.scrollLeft = start + diff * ease(progress);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft < 0) el.scrollLeft += half;
        if (!isVideoPlaying.current) isPaused.current = false;
      }
    };
    requestAnimationFrame(animateScroll);
  };

  if (!data?.length) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 px-5 overflow-x-auto overflow-y-hidden"
        style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={pauseAnim}
        onMouseLeave={() => { resumeAnim(); stopDrag(); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <style>{`div::-webkit-scrollbar{display:none}`}</style>

        {doubled.map((testimonial, idx) => {
          const isClone = idx >= data.length;
          const isPlaying = playingIdx === idx;

          return (
            <div
              key={`${testimonial.id ?? idx}-${idx}`}
              data-card
              style={{ flexShrink: 0, pointerEvents: isClone ? "none" : "auto" }}
              className="md:w-102.5 w-75 mx-auto md:p-6 p-1 rounded-3xl flex flex-col gap-4 glassShadow bg-white/40 backdrop-blur-2xl"
            >
              <div className="md:w-[355.67px]  aspect-9/16 rounded-[13px] overflow-hidden relative">
                
                {/* ── Custom thumbnail overlay — ReactPlayer light mode bypass ── */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => {
                      setPlayingIdx(idx);
                      isVideoPlaying.current = true;
                      isPaused.current = true;
                    }}
                  >
                    {/* Thumbnail image */}
                    {testimonial?.thumbnail ? (
                      <Image
                        src={testimonial.thumbnail}
                        alt={`${testimonial.name} thumbnail`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-black/60" />
                    )}

                    {/* Play button */}
                    <button  aria-label={`Play video testimonial from ${testimonial.name}`}  className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-sm st group">
                      <Play
                        fill="#fff"
                        className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
                      />
                    </button>
                  </div>
                )}

                {/* ReactPlayer — light=false, playing=true যখন clicked */}
                <ReactPlayer
                  url={testimonial.video_message}
                  playing={isPlaying}
                  height="100%"
                  width="100%"
                  controls
                  onPlay={() => {
                    isVideoPlaying.current = true;
                    isPaused.current = true;
                  }}
                  onPause={() => {
                    isVideoPlaying.current = false;
                    isPaused.current = false;
                    setPlayingIdx(null);
                  }}
                  onEnded={() => {
                    isVideoPlaying.current = false;
                    isPaused.current = false;
                    setPlayingIdx(null);
                  }}
                />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mt-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}'s profile`}
                    className="object-cover"
                    width={64}
                    height={64}
                    priority
                  />
                </div>
                <div className="text-(--text-primary)">
                  <h3 className="text-[20px] font-bold leading-tight poppins">
                    {testimonial.name}
                  </h3>
                  <p className="text-[14px] font-normal opensans">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("prev")}
        aria-label="Previous slide"
        className="absolute md:flex hidden items-center justify-center -left-14 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd]  shadow-md p-3 rounded-full border transition hover:bg-[#1fb5dd]/10"
      >
        <ChevronLeft className="text-[#1fb5dd]" size={22} />
      </button>

      <button
        onClick={() => scroll("next")}
        aria-label="Next slide"
        className="absolute md:flex hidden items-center justify-center -right-14 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd]  shadow-md p-3 rounded-full border transition hover:bg-[#1fb5dd]/10"
      >
        <ChevronRight className="text-[#1fb5dd]" size={22} />
      </button>
    </div>
  );
};

export default VideoTestimonialSwiper;