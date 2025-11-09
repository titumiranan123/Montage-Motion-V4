"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import VideoPlayer from "@/component/home/PrettyPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

type Layout = {
  baseW: number;
  baseH: number;
  stepX: number;
  sideX: number;
  sideY: number;
  sideScaleX: number;
  sideScaleY: number;
  offscreenX: number;
};

export default function PodcastSlider({ data }: { data: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isDraggingRef = useRef(false);
  const draggableRef = useRef<Draggable | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);

  const EASE = "power4.out";
  const DUR = 1.0;
  const len = data?.length ?? 0;

  const layoutRef = useRef<Layout>({
    baseW: 688,
    baseH: 387,
    stepX: 520,
    sideX: 500,
    sideY: 60,
    sideScaleX: 240 / 688,
    sideScaleY: 143 / 387,
    offscreenX: 1500,
  });

  // 🧩 Compute layout dynamically and fix transform after measurement
  const computeLayout = () => {
    const container = containerRef.current;
    const cw = container ? container.clientWidth : 768;

    const maxW = 688;
    const minW = 260;
    const baseW = Math.max(minW, Math.min(maxW, Math.floor(cw * 0.85)));
    const baseH = Math.floor(baseW * (9 / 16));

    const sideScaleX = 240 / 688;
    const sideScaleY = 143 / 387;
    const k = baseW / 688;

    layoutRef.current = {
      baseW,
      baseH,
      stepX: 520 * k,
      sideX: 500 * k,
      sideY: Math.max(20, 60 * k),
      sideScaleX,
      sideScaleY,
      offscreenX: 1500 * k,
    };

    slidesRef.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${layoutRef.current.baseW}px`;
      el.style.height = `${layoutRef.current.baseH}px`;
    });

    // 🩵 Re-apply transforms
    requestAnimationFrame(() => positionSlides(currentIndex));
  };

  // 🧠 GSAP setters cache
  const settersRef = useRef<{
    x: Array<ReturnType<typeof gsap.quickTo>>;
    y: Array<ReturnType<typeof gsap.quickTo>>;
    scaleX: Array<ReturnType<typeof gsap.quickTo>>;
    scaleY: Array<ReturnType<typeof gsap.quickTo>>;
    opacity: Array<ReturnType<typeof gsap.quickTo>>;
    rotateY: Array<ReturnType<typeof gsap.quickTo>>;
  } | null>(null);

  const ensureSetters = () => {
    if (!settersRef.current) {
      settersRef.current = {
        x: [],
        y: [],
        scaleX: [],
        scaleY: [],
        opacity: [],
        rotateY: [],
      };
    }
    const s = settersRef.current!;
    for (let i = 0; i < len; i++) {
      const el = slidesRef.current[i];
      if (!el) continue;
      if (!s.x[i])
        s.x[i] = gsap.quickTo(el, "x", { duration: DUR, ease: EASE });
      if (!s.y[i])
        s.y[i] = gsap.quickTo(el, "y", { duration: DUR, ease: EASE });
      if (!s.scaleX[i])
        s.scaleX[i] = gsap.quickTo(el, "scaleX", { duration: DUR, ease: EASE });
      if (!s.scaleY[i])
        s.scaleY[i] = gsap.quickTo(el, "scaleY", { duration: DUR, ease: EASE });
      if (!s.opacity[i])
        s.opacity[i] = gsap.quickTo(el, "opacity", {
          duration: DUR,
          ease: EASE,
        });
      if (!s.rotateY[i])
        s.rotateY[i] = gsap.quickTo(el, "rotateY", {
          duration: DUR,
          ease: EASE,
        });
    }
  };

  // 🧭 Position slides based on current index
  const positionSlides = (idx: number) => {
    ensureSetters();
    const s = settersRef.current!;
    const L = layoutRef.current;

    for (let i = 0; i < len; i++) {
      const slide = slidesRef.current[i];
      if (!slide) continue;

      let rel = i - (idx % len);
      if (rel > len / 2) rel -= len;
      if (rel < -len / 2) rel += len;

      let x = rel * L.stepX;
      let y = 0;
      let scaleX = 0.001;
      let scaleY = 0.001;
      let opacity = 0;
      let rotateY = 0;
      let zIndex = 0;

      if (Math.abs(rel) < 0.25) {
        x = 0;
        y = 0;
        scaleX = 1;
        scaleY = 1;
        opacity = 1;
        rotateY = 0;
        zIndex = 30;
      } else if (Math.abs(rel) <= 1.25) {
        const dir = rel > 0 ? 1 : -1;
        x = dir * L.sideX;
        y = dir > 0 ? -L.sideY : L.sideY;
        scaleX = L.sideScaleX;
        scaleY = L.sideScaleY;
        opacity = 0.86;
        rotateY = dir * -18;
        zIndex = 20;
      } else {
        const dir = rel > 0 ? 1 : -1;
        x = dir * L.offscreenX;
        y = 0;
        scaleX = 0.001;
        scaleY = 0.001;
        opacity = 0;
        rotateY = 0;
        zIndex = 0;
      }

      slide.style.zIndex = String(zIndex);
      s.x[i](x);
      s.y[i](y);
      s.scaleX[i](scaleX);
      s.scaleY[i](scaleY);
      s.opacity[i](opacity);
      s.rotateY[i](rotateY);
    }

    // 🩵 Force reset of container transform to avoid initial shift
    gsap.set(containerRef.current, { x: 0 });
  };

  const nextSlide = () => setCurrentIndex((p) => p + 1);
  const prevSlide = () => setCurrentIndex((p) => p - 1);

  const handleSlideClick = (index: number) => {
    const safe = ((index % len) + len) % len;
    const center = ((currentIndex % len) + len) % len;
    if (safe === center) setIsPlaying(true);
    else setCurrentIndex((p) => p + (safe - center));
  };

  // 🧩 Initialize once DOM is ready
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    computeLayout();
    positionSlides(0); // ✅ force initial alignment

    const ro = new ResizeObserver(() => computeLayout());
    if (containerRef.current) ro.observe(containerRef.current);

    // draggable proxy
    const proxy = document.createElement("div");
    proxyRef.current = proxy;
    let startX = 0;

    if (draggableRef.current) draggableRef.current.kill();
    draggableRef.current = Draggable.create(proxy, {
      type: "x",
      trigger: containerRef.current,
      inertia: true,
      onDragStart: function () {
        isDraggingRef.current = true;
        startX = this.x;
      },
      onDragEnd: function () {
        const dragDistance = this.x - startX;
        gsap.set(proxy, { x: 0, y: 0 });
        const threshold = Math.max(60, layoutRef.current.baseW * 0.12);
        if (Math.abs(dragDistance) > threshold) {
          dragDistance < 0 ? nextSlide() : prevSlide();
        }
        isDraggingRef.current = false;
      },
    })[0];

    return () => {
      ro.disconnect();
      draggableRef.current?.kill();
      draggableRef.current = null;
      proxyRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    positionSlides(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="w-full px-2 sm:px-4">
        <div
          ref={containerRef}
          className="relative h-[260px] sm:h-[320px] md:h-[400px] lg:h-[460px] xl:h-[480px] cursor-grab active:cursor-grabbing"
          style={{ perspective: "2000px" }}
        >
          <div className="relative h-full flex items-center justify-center">
            {data.map((item, index) => {
              const isCenterSlide =
                ((currentIndex % len) + len) % len === index;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                  }}
                  onClick={() => handleSlideClick(index)}
                  className="absolute cursor-pointer select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className="relative overflow-hidden bg-black rounded-[20px]"
                    style={{
                      width: layoutRef.current.baseW,
                      height: layoutRef.current.baseH,
                    }}
                  >
                    <VideoPlayer
                      youtubeUrl={
                        isCenterSlide && isPlaying ? item.video_url : ""
                      }
                      thumbnail={item.image_url}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
