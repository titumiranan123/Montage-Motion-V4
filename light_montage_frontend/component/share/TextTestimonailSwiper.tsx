/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useCallback } from "react";
import TestimonialMessagecard from "./TextTestimonial";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  data: any[];
};

const TextTestimonialSwiper: React.FC<Props> = ({ data }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const doubled = [...(data ?? []), ...(data ?? [])];

  // ── Auto-scroll ─────────────────────────────────────────────
  const startAnimation = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused.current && el) {
        el.scrollLeft -= 0.6;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
        // const half = el.scrollWidth / 2;
        // if (el.scrollLeft >= half) {
        //   el.scrollLeft -= half;
        // }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    startAnimation();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [startAnimation]);

  // ── Hover pause ─────────────────────────────────────────────
  const pauseAnim = () => { isPaused.current = true; };
  const resumeAnim = () => { if (!isDragging.current) isPaused.current = false; };

  // ── Drag ────────────────────────────────────────────────────
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
    const dx = e.pageX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    isPaused.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  // ── Touch ───────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    dragStart.current = {
      x: e.touches[0].pageX,
      scrollLeft: trackRef.current?.scrollLeft ?? 0,
    };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = e.touches[0].pageX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };
  const onTouchEnd = () => { isPaused.current = false; };

  // ── Prev / Next — animation বন্ধ রেখে manually scroll ──────
  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;

    // animation pause করো
    isPaused.current = true;

    const cardWidth =
      el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 320;
    const distance = cardWidth + 24;
    const target = el.scrollLeft + (dir === "next" ? distance : -distance);

    // manually smooth scroll (behavior:"smooth" + rAF conflict এড়াতে)
    const start = el.scrollLeft;
    const diff = target - start;
    const duration = 400; // ms
    let startTime: number | null = null;

    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + diff * ease(progress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
    
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft < 0) el.scrollLeft += half;
        isPaused.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  if (!data?.length) return null;

  return (
    <div className="mt-5 relative">
      <div
        ref={trackRef}
        className="flex gap-6 px-2  relative overflow-x-auto overflow-y-hidden"
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

        {doubled.map((testimonial, idx) => (
          <div
            key={`${testimonial.id ?? idx}-${idx}`}
            data-card
            style={{ flexShrink: 0 }}
          >
            <TestimonialMessagecard
              testimonial={testimonial}
              idx={idx % data.length}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next */}
     
        <button
          onClick={() => scroll("prev")}
         aria-label="Previous slide"
        className="absolute md:flex hidden items-center justify-center -left-12 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-1 w-10 h-10 rounded-full border transition"
      >
        <ChevronLeft className="text-[#1fb5dd]" size={24} />
      </button>
        <button
          onClick={() => scroll("next")}
              aria-label="Next slide"
        className="absolute md:flex hidden items-center justify-center -right-14 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-1 w-10 h-10 rounded-full border transition"
      >
        <ChevronRight className="text-[#1fb5dd]" size={24} />
      </button>
    </div>
  );
};

export default TextTestimonialSwiper;