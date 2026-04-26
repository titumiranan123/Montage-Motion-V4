/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

type Testimonial = {
  id?: string | number;
  [key: string]: any;
};

type Props = {
  data: Testimonial[];
};

const CARD_WIDTH_MD = 410;
const CARD_WIDTH_SM = 300;
const GAP = 24;
const SPEED = 0.6;

type CardProps = {
  testimonial: Testimonial;
  cardWidth: number;
  isDragging: React.MutableRefObject<boolean>;
  onOpen: (t: Testimonial) => void;
};

const TestimonialCard: React.FC<CardProps> = ({
  testimonial,
  cardWidth,
  isDragging,
  onOpen,
}) => {
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      style={{ flexShrink: 0, width: cardWidth }}
      className="mx-auto md:p-6 p-1 rounded-3xl flex flex-col gap-4 glassShadow bg-white/40 backdrop-blur-2xl cursor-pointer select-none"
      onPointerDown={(e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!pointerDownPos.current) return;

        const dx = e.clientX - pointerDownPos.current.x;
        const dy = e.clientY - pointerDownPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        pointerDownPos.current = null;

        if (dist < 8 && !isDragging.current) {
          onOpen(testimonial);
        }
      }}
      onPointerCancel={() => {
        pointerDownPos.current = null;
      }}
    >
      <div className="aspect-9/16 rounded-[13px] overflow-hidden relative group">
        {testimonial?.thumbnail ? (
          <Image
            src={testimonial.thumbnail}
            alt={`${testimonial.name} thumbnail`}
            fill
            className="object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-black/60" />
        )}
        <div className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-sm pointer-events-none">
          <Play fill="#fff" />
        </div>
      </div>

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
};

const VideoTestimonialSwiper: React.FC<Props> = ({ data }) => {
  const [modalTestimonial, setModalTestimonial] = useState<Testimonial | null>(null);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_MD);

  const x = useMotionValue(0);
  const baseX = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);

  //  3 copy — মাঝেরটা দিয়ে শুরু
  const tripled = [...data, ...data, ...data];
  const totalWidth = data.length * (cardWidth + GAP);

  useEffect(() => {
    const update = () => {
      setCardWidth(window.innerWidth >= 768 ? CARD_WIDTH_MD : CARD_WIDTH_SM);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  //  মাঝের copy তে শুরু করো
  useEffect(() => {
    const startX = -totalWidth;
    baseX.current = startX;
    x.set(startX);
  }, [totalWidth]);

  useAnimationFrame((_, delta) => {
    if (isHovered.current || isDragging.current || modalTestimonial) return;
    baseX.current -= SPEED * (delta / 16.67);

    //  seamless loop — মাঝের copy এর বাইরে গেলে reset
    if (baseX.current < -totalWidth * 2) {
      baseX.current += totalWidth;
    }
    if (baseX.current > 0) {
      baseX.current -= totalWidth;
    }
    x.set(baseX.current);
  });

  const onDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
    baseX.current = x.get();

    //  drag এও bounds check
    if (baseX.current < -totalWidth * 2) {
      baseX.current += totalWidth;
      x.set(baseX.current);
    }
    if (baseX.current > 0) {
      baseX.current -= totalWidth;
      x.set(baseX.current);
    }
  }, [x, totalWidth]);

  useEffect(() => {
    document.body.style.overflow = modalTestimonial ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalTestimonial]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalTestimonial(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollBy = (dir: "prev" | "next") => {
    const distance = (cardWidth + GAP) * (dir === "next" ? -1 : 1);
    const target = baseX.current + distance;
    animate(x, target, {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => { baseX.current = v; },
    });
  };

  if (!data?.length) return null;

  return (
    <>
      {modalTestimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalTestimonial(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalTestimonial(null)}
              className="absolute top-0 -right-10 text-white hover:text-gray-300 transition z-10"
            >
              <X size={28} />
            </button>
            <div className="aspect-9/16 rounded-2xl overflow-hidden bg-black">
              <ReactPlayer
                url={modalTestimonial.video_message}
                playing
                height="100%"
                width="100%"
                controls
                playsinline
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
      >
        <motion.div
          className="flex gap-6 px-5 w-max"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -totalWidth * 2, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={onDragEnd}
          onDrag={() => { baseX.current = x.get(); }}
        >
          {tripled.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id ?? idx}-${idx}`}
              testimonial={data[idx % data.length]}
              cardWidth={cardWidth}
              isDragging={isDragging}
              onOpen={setModalTestimonial}
            />
          ))}
        </motion.div>

        <button
          onClick={() => scrollBy("prev")}
          className="absolute md:flex hidden items-center justify-center -left-14 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition hover:bg-[#1fb5dd]/10"
        >
          <ChevronLeft className="text-[#1fb5dd]" size={22} />
        </button>
        <button
          onClick={() => scrollBy("next")}
          className="absolute md:flex hidden items-center justify-center -right-14 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition hover:bg-[#1fb5dd]/10"
        >
          <ChevronRight className="text-[#1fb5dd]" size={22} />
        </button>
      </div>
    </>
  );
};

export default VideoTestimonialSwiper;