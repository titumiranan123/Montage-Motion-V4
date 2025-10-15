"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Sharpen Your Skills on Impactful Projects",
    description:
      "Collaborate with diverse, growth-focused client teams and a world-class squad. Your work here will directly shape the success of major client campaigns.",
    image: "/assets/podcast/process.png",
  },
  {
    title: "Talent Trumps Geography",
    description:
      "We’ve turned the best talent, not the closest desk. If you don’t live near one of our physical hubs, you’re still in! We hire remote scorers with brand-new, top-grade equipment.",
    image: "/assets/podcast/greatpodcast.png",
  },
  {
    title: "Forge Meaningful Connections",
    description:
      "Join our remote team for engaging IR Talks, virtual team-building events, and fun interactive sessions. We’re always connected even in a creative flow.",
    image: "/assets/podcast/process.png",
  },
  {
    title: "Build a True Career Trajectory",
    description:
      "We invest in full-time, long-term opportunities for top talent. This isn’t just a job; it’s a foundation for a lasting career where you’ll have a clear path for advancement.",
    image: "/assets/podcast/greatpodcast.png",
  },
  {
    title: "Keep Growing",
    description:
      "Get feedback, mentorship, and ever-bigger challenges as you prove yourself.",
    image: "/assets/podcast/process.png",
  },
];

export default function GsapImageSlide() {
  const containerRef = useRef<HTMLDivElement>(null);

  // track + draggable bits
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const count = slides.length;

  // ---------- Helpers (TOP → BOTTOM) ----------
  const setToIndex = (index: number, animate = true) => {
    const track = trackRef.current;
    const handle = handleRef.current;
    const fill = fillRef.current;
    if (!track || !handle || !fill) return;

    const rect = track.getBoundingClientRect();
    const trackH = rect.height;
    const handleH = handle.offsetHeight || 16;

    // t: 0 at top, 1 at bottom
    const t = count <= 1 ? 0 : gsap.utils.clamp(0, 1, index / (count - 1));
    const y = t * (trackH - handleH);

    const apply = (obj: Element, props: gsap.TweenVars) =>
      animate
        ? gsap.to(obj, { ...props, duration: 0.18, ease: "power2.out" })
        : gsap.set(obj, props);

    apply(handle, { y });
    apply(fill, { height: `${t * 100}%` });
  };

  const getNearestIndexFromClientY = (clientY: number) => {
    const track = trackRef.current!;
    const rect = track.getBoundingClientRect();
    const yFromTop = clientY - rect.top;
    const t = gsap.utils.clamp(0, 1, yFromTop / rect.height); // 0 top → 1 bottom
    return Math.round(t * (count - 1));
  };

  // ---------- DRAG: snap on release (image changes on snap) ----------
  useEffect(() => {
    const track = trackRef.current;
    const handle = handleRef.current;
    const fill = fillRef.current;
    if (!track || !handle || !fill) return;

    // init
    setToIndex(0, false);

    // kill previous
    draggableRef.current?.kill();

    draggableRef.current = Draggable.create(handle, {
      type: "y",
      bounds: track,
      onDrag: function () {
        // live preview of fill only (no image change while dragging)
        const minY = this.minY ?? 0;
        const maxY = this.maxY ?? 0;
        const clampedY = gsap.utils.clamp(minY, maxY, this.y);
        const t = (clampedY - minY) / (maxY - minY || 1); // 0 top → 1 bottom
        gsap.set(fill, { height: `${gsap.utils.clamp(0, 1, t) * 100}%` });
      },
      onRelease: function () {
        const minY = this.minY ?? 0;
        const maxY = this.maxY ?? 0;
        const clampedY = gsap.utils.clamp(minY, maxY, this.y);
        const t = (clampedY - minY) / (maxY - minY || 1);
        const snappedIndex = Math.round(
          gsap.utils.clamp(0, 1, t) * (count - 1)
        );
        setActiveIndex(snappedIndex);
        setToIndex(snappedIndex, true);

        // tiny pulse for feel
        gsap.fromTo(
          handle,
          { scale: 0.95 },
          { scale: 1, duration: 0.15, ease: "power2.out" }
        );
      },
    })[0];

    const onResize = () => setToIndex(activeIndex, false);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      draggableRef.current?.kill();
      draggableRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // ---------- Click on track / marker ----------
  const onTrackClick = (e: React.MouseEvent) => {
    const idx = getNearestIndexFromClientY(e.clientY);
    setActiveIndex(idx);
    setToIndex(idx, true);
  };

  const pctFromIndex = (i: number) =>
    count <= 1 ? 0 : (i / (count - 1)) * 100;

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen overflow-hidden bg-[#0a0a0a] text-white container sectionGap"
    >
      {/* LEFT: IMAGES (change only when index snaps) */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden rounded-xl">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* MIDDLE: “beam” slider with discrete points (TOP → BOTTOM) */}
      <div className="relative w-[24px] mx-6 flex items-center justify-center select-none">
        <div
          ref={trackRef}
          className="relative h-[80%] w-[4px] rounded-full bg-[#0b0b0b] shadow-[inset_0_0_6px_rgba(0,0,0,0.8)] overflow-visible cursor-pointer"
          onClick={onTrackClick}
        >
          {/* backdrop glow */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[12px] h-full rounded-full bg-gradient-to-b from-blue-500/25 via-blue-500/20 to-transparent blur-[8px]" />
          {/* center beam */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[2px] h-full rounded-full bg-gradient-to-b from-blue-400/40 via-blue-400/25 to-blue-400/10" />

          {/* markers (clickable) */}
          {slides.map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 -translate-x-1/2 w-[18px] h-[12px] rounded-full transition-colors ${
                i <= activeIndex ? "bg-blue-500/35" : "bg-blue-900/25"
              } shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]`}
              style={{ top: `${pctFromIndex(i)}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
                setToIndex(i, true);
              }}
              title={`Slide ${i + 1}`}
            />
          ))}

          {/* glow fill (TOP → DOWN) */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[12px] rounded-b-full bg-blue-500/30 blur-[10px]"
            style={{ height: `${pctFromIndex(activeIndex)}%` }}
          />
          {/* bright core fill */}
          <div
            ref={fillRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-b-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.75)]"
            style={{ height: `${pctFromIndex(activeIndex)}%` }}
          />

          {/* handle (cap) */}
          <div
            ref={handleRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full bg-gradient-to-b from-blue-300 to-blue-500 shadow-[0_8px_18px_rgba(59,130,246,0.55),0_0_10px_rgba(59,130,246,0.8)] ring-1 ring-white/20"
            aria-label="Image progress handle"
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col"></div>
    </section>
  );
}
