"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Heading from "@/component/share/Headering";
import Image from "next/image";

import Gradientcard from "@/component/share/Gradientcard";
import StorySlider from "../about-us/StorySlider";

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

function WhyjoinMontagemotion() {
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
    <section className="sectionGap container">
      <Heading
        subtitle="From humble beginnings to a growing creative powerhouse — discover how Montage Motion started, evolved, and where we’re headed next."
        tag="Our Story"
        title="Our Story in Motion"
      />
      <div className="lg:mt-10 mt-8 flex justify-between lg:flex-row flex-col items-center gap-7">
        <div className="lg:w-1/2 w-full">
          <StorySlider />
        </div>
        <div className=" text-[#E4E8F7] flex flex-col gap-4 lg:w-1/2 w-full">
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              Where we Began
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              Montage Motion started with a passion for storytelling throught
              video. What began as a small editingteam foucsed on helpoing
              creators polish their content quickly became a creative hub where
              ideas turned into impactful visuals.
            </p>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              How we Began
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              As demand grew, so did we. From video editing, we expanded into
              advertising, graphic design, and custom website development. Our
              team grew into a powerhouse of 12+ specialists, delivering
              projects for creators, businesses, and brands across industries.
            </p>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              Where we're Going
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              The future is bold. Montage Motion is on a mission to become a
              global creative partner for content creators and brands, pushing
              the boundaries of short-form video, marketing visuals, and digital
              storytelling. We’re building towards innovation, scale, and impact
              that inspires millions.
            </p>
          </Gradientcard>
        </div>
      </div>
    </section>
  );
}

export default WhyjoinMontagemotion;
