"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import VideoPlayer from "@/component/home/PrettyPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

type Layout = {
  baseW: number; // slide base width
  baseH: number; // slide base height
  stepX: number; // spacing between slides
  sideX: number; // side slide x offset
  sideY: number; // side slide y offset (±)
  sideScaleX: number; // scaleX for side slides
  sideScaleY: number; // scaleY for side slides
  offscreenX: number; // far hidden x offset
};

export default function PodcastSldder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const draggableRef = useRef<Draggable | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);

  // Anim feel
  const EASE = "power4.out";
  const DUR = 1.0;

  // data
  const data = [
    {
      image: "/assets/podcast/header-1.png",
      title: "Tech Talk",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
    },
    {
      image: "/assets/podcast/header-2.png",
      title: "Business Insights",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
    },
    {
      image: "/assets/podcast/header-3.png",
      title: "Creative Minds",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
    },
    {
      image: "/assets/podcast/header-4.png",
      title: "Future Vision",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
    },
  ];
  const len = data.length;

  // Responsive layout values
  const layoutRef = useRef<Layout>({
    baseW: 688,
    baseH: 387,
    stepX: 520,
    sideX: 500,
    sideY: 60,
    // Side thumbnail scale relative to base (kept from your original look)
    sideScaleX: 211 / 688,
    sideScaleY: 185 / 387,
    offscreenX: 1500,
  });

  // Recompute layout based on container width (16:9 base, scale offsets)
  const computeLayout = () => {
    const container = containerRef.current;
    const cw = container ? container.clientWidth : 768;

    // Cap max slide width and pad for small screens
    const maxW = 688; // desktop cap
    const minW = 260; // very small phones
    const baseW = Math.max(minW, Math.min(maxW, Math.floor(cw * 0.85)));
    const baseH = Math.floor(baseW * (9 / 16)); // 16:9-ish

    // Scale factors relative to the original desktop values
    const k = baseW / 688;

    layoutRef.current = {
      baseW,
      baseH,
      stepX: 520 * k, // spacing
      sideX: 500 * k, // side slide x
      sideY: Math.max(20, 60 * k), // side slide y with floor to keep slight tilt
      sideScaleX: 211 / 688, // keep visual proportion
      sideScaleY: 185 / 387,
      offscreenX: 1500 * k, // hidden far off
    };

    // Update inner fixed sizes immediately (no tween)
    slidesRef.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${layoutRef.current.baseW}px`;
      el.style.height = `${layoutRef.current.baseH}px`;
    });
  };

  // quickTo setters
  const settersRef = useRef<{
    x: Array<ReturnType<typeof gsap.quickTo>>;
    y: Array<ReturnType<typeof gsap.quickTo>>;
    scaleX: Array<ReturnType<typeof gsap.quickTo>>;
    scaleY: Array<ReturnType<typeof gsap.quickTo>>;
    opacity: Array<ReturnType<typeof gsap.quickTo>>;
    rotateY: Array<ReturnType<typeof gsap.quickTo>>;
  } | null>(null);

  // Init base styles once
  useEffect(() => {
    slidesRef.current.forEach((el) => {
      if (!el) return;
      el.style.transformOrigin = "50% 50%";
      el.style.backfaceVisibility = "hidden";
      el.style.willChange = "transform, opacity";
      (el.style as any).contain = "layout paint style";
    });
    gsap.config({ autoSleep: 60 });
  }, []);

  // Build quickTo setters lazily
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
        s.x[i] = gsap.quickTo(el, "x", {
          duration: DUR,
          ease: EASE,
          force3D: true,
          autoRound: false,
        });
      if (!s.y[i])
        s.y[i] = gsap.quickTo(el, "y", {
          duration: DUR,
          ease: EASE,
          force3D: true,
          autoRound: false,
        });
      if (!s.scaleX[i])
        s.scaleX[i] = gsap.quickTo(el, "scaleX", {
          duration: DUR,
          ease: EASE,
          force3D: true,
          autoRound: false,
        });
      if (!s.scaleY[i])
        s.scaleY[i] = gsap.quickTo(el, "scaleY", {
          duration: DUR,
          ease: EASE,
          force3D: true,
          autoRound: false,
        });
      if (!s.opacity[i])
        s.opacity[i] = gsap.quickTo(el, "opacity", {
          duration: DUR,
          ease: EASE,
          autoRound: false,
        });
      if (!s.rotateY[i])
        s.rotateY[i] = gsap.quickTo(el, "rotateY", {
          duration: DUR,
          ease: EASE,
          force3D: true,
          autoRound: false,
        });
    }
  };

  // Positioner (responsive)
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
        // center
        x = 0;
        y = 0;
        scaleX = 1;
        scaleY = 1;
        opacity = 1;
        rotateY = 0;
        zIndex = 30;
      } else if (Math.abs(rel) <= 1.25) {
        // sides
        const dir = rel > 0 ? 1 : -1;
        x = dir * L.sideX;
        y = dir > 0 ? -L.sideY : L.sideY;
        scaleX = L.sideScaleX;
        scaleY = L.sideScaleY;
        opacity = 0.86;
        rotateY = dir * -18;
        zIndex = 20;
      } else {
        // far hidden
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
  };

  // Autoplay
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      if (!isDraggingRef.current && !isPlaying) {
        setCurrentIndex((p) => p + 1);
      }
    }, 3000);
  };

  const goToSlide = (index: number) => {
    stopAutoplay();
    const safe = ((index % len) + len) % len;
    const curMod = ((currentIndex % len) + len) % len;
    const delta = safe - curMod;
    setCurrentIndex((p) => p + delta);
    startAutoplay();
  };
  const nextSlide = () => setCurrentIndex((p) => p + 1);
  const prevSlide = () => setCurrentIndex((p) => p - 1);

  const handleSlideClick = (index: number) => {
    const safe = ((index % len) + len) % len;
    const center = ((currentIndex % len) + len) % len;
    if (safe === center) {
      setIsPlaying(true);
      stopAutoplay();
    } else {
      goToSlide(safe);
    }
  };

  // Draggable via proxy (no container movement)
  useEffect(() => {
    if (!containerRef.current) return;

    // initial layout
    computeLayout();

    // resize observer for responsiveness
    const ro = new ResizeObserver(() => {
      computeLayout();
      // reapply transforms after size change
      positionSlides(currentIndex);
    });
    ro.observe(containerRef.current);

    // proxy draggable
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
        stopAutoplay();
        startX = this.x;
      },
      onDragEnd: function () {
        const dragDistance = this.x - startX;
        gsap.set(proxy, { x: 0, y: 0 });

        // threshold relative to slide width (responsive)
        const threshold = Math.max(60, layoutRef.current.baseW * 0.12);
        if (Math.abs(dragDistance) > threshold) {
          dragDistance < 0 ? nextSlide() : prevSlide();
        }

        isDraggingRef.current = false;
        if (!isPlaying) startAutoplay();
      },
    })[0];

    startAutoplay();

    return () => {
      ro.disconnect();
      if (draggableRef.current) draggableRef.current.kill();
      draggableRef.current = null;
      stopAutoplay();
      proxyRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // drive layout on index change
  useEffect(() => {
    positionSlides(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="w-full px-2 sm:px-4">
        <div
          ref={containerRef}
          className="relative h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] xl:h-[480px] cursor-grab active:cursor-grabbing"
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
                    // responsive width/height are applied dynamically via computeLayout()
                  }}
                >
                  {/* inner fixed box; parent scale controls visual size */}
                  <div
                    className="relative rounded-[22px] sm:rounded-[26px] md:rounded-[28px] lg:rounded-[31.63px] overflow-hidden"
                    style={{
                      width: layoutRef.current.baseW,
                      height: layoutRef.current.baseH,
                    }}
                  >
                    <VideoPlayer
                      youtubeUrl={isCenterSlide && isPlaying ? item.link : ""}
                      thumbnail={item.image}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional controls (hidden by default) */}
        <div className="hidden justify-center gap-3 mt-6 sm:mt-8">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                ((currentIndex % len) + len) % len === index
                  ? "w-10 bg-purple-500"
                  : "w-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="hidden justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
