/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id?: string | number;
  [key: string]: any;
};

type Props = {
  data: Testimonial[];
  scrollDirection : string
};

const CARD_WIDTH_MD = 410;
const CARD_WIDTH_SM = 300;
const GAP = 24;
const SPEED = 0.6;

const Imageslider: React.FC<Props> = ({ data ,scrollDirection = "left"}) => {
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_MD);

  const x = useMotionValue(0);
  const baseX = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);

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

  useEffect(() => {
    const startX = -totalWidth;
    baseX.current = startX;
    x.set(startX);
  }, [totalWidth]);

useAnimationFrame((t, delta) => {
  if (isHovered.current || isDragging.current) return;

  const step = SPEED * (delta / 16.67);
  baseX.current += scrollDirection === "right" ? step : -step;

  if (baseX.current < -totalWidth * 2) baseX.current += totalWidth;
  if (baseX.current > 0) baseX.current -= totalWidth;

  x.set(baseX.current);
});

  const onDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
    baseX.current = x.get();

    if (baseX.current < -totalWidth * 2) {
      baseX.current += totalWidth;
      x.set(baseX.current);
    }
    if (baseX.current > 0) {
      baseX.current -= totalWidth;
      x.set(baseX.current);
    }
  }, [x, totalWidth]);

  const scrollBy = (dir: "prev" | "next") => {
    const distance = (cardWidth + GAP) * (dir === "next" ? -1 : 1);
    const target = baseX.current + distance;
    animate(x, target, {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => {
        baseX.current = v;
      },
    });
  };

  if (!data?.length) return null;

  return (
    <div className="relative w-full max-w-full">
    
   

      {/* Slider */}
      <div
        className="relative overflow-hidden max-w-487.5 mx-auto"
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
        }}
      >
        <motion.div
          className="flex gap-6 px-5 w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -totalWidth * 2, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={onDragEnd}
          onDrag={() => {
            baseX.current = x.get();
          }}
        >
          {tripled.map((team, idx) => (
            <div
              key={idx}
              style={{ width: cardWidth }}
              className="shrink-0"
            >
              <Image
                src={team?.image}
                alt={team?.alt}
                width={cardWidth}
                height={265}
                draggable={false}          // drag conflict ঠেকাবে
                className="rounded-lg object-cover aspect-video w-full h-auto select-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
   <button
        onClick={() => scrollBy("prev")}
        aria-label="Previous slide"
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          hidden items-center justify-center
          w-9 h-9 rounded-full
          bg-white/80 backdrop-blur-sm
          border border-[#1fb5dd]
          shadow-md
          transition
          hover:bg-[#1fb5dd]/10
          active:scale-95
        "
      >
        <ChevronLeft className="text-[#1fb5dd]" size={20} />
      </button>
      {/* → Next Button — সব স্ক্রিনে দেখাবে */}
      <button
        onClick={() => scrollBy("next")}
        aria-label="Next slide"
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          hidden items-center justify-center
          w-9 h-9 rounded-full
          bg-white/80 backdrop-blur-sm
          border border-[#1fb5dd]
          shadow-md
          transition
          hover:bg-[#1fb5dd]/10
          active:scale-95
        "
      >
        <ChevronRight className="text-[#1fb5dd]" size={20} />
      </button>
    </div>
  );
};

export default Imageslider;