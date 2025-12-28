"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

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

function StorySlider({ activeIndexs }: { activeIndexs: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // track + draggable bits
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);

  const [activeIndex, setActiveIndex] = useState(activeIndexs ?? 0);
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
    <div
      ref={containerRef}
      data-aos="fade-up"
      data-aos-delay={400}
      className="relative flex w-full overflow-hidden h-[594px] text-white lg:mt-10 mt-8  "
    >
      {/* LEFT: IMAGES (change only when index snaps) */}
      <div className=" w-full relative flex items-center justify-center overflow-hidden rounded-xl">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute max-w-[510px] max-h-[594px] w-full h-full inset-0 transition-opacity duration-500 ease-in-out rounded-[13px] ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={510}
              height={594}
              className="object-cover max-w-[510px] max-h-[594px] w-full h-full rounded-[13px]"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* MIDDLE: “beam” slider with discrete points (TOP → BOTTOM) */}
      <div className="relative w-6 lg:flex hidden  lg:mx-4  items-center justify-center select-none">
        <div
          ref={trackRef}
          className="relative h-full w-6 rounded-full  overflow-visible cursor-pointer"
          onClick={onTrackClick}
        >
          {/* center beam */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(49, 95, 172, 0.2) 0.02%, #315FAC 21.38%, rgba(49, 95, 172, 0.2) 100%)",
            }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-2.5 h-full rounded-[25px] "
          />

          {/* markers (clickable) */}
          {slides.map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full transition-colors ${
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
          {/* <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[12px] rounded-b-full bg-blue-500/30 blur-[10px]"
              style={{ height: `${pctFromIndex(activeIndex)}%` }}
            /> */}
          {/* bright core fill */}
          <div
            ref={fillRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 rounded-b-full bg-[gradient-to-b "
            style={{ height: `${pctFromIndex(activeIndex)}%` }}
          />

          {/* handle (cap) */}
          <div
            ref={handleRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[18px] h-[38px] rounded-[25px] bg-[#2B6AB2]   ring-white/20"
            aria-label="Image progress handle"
          />
        </div>
      </div>
    </div>
  );
}

export default StorySlider;
