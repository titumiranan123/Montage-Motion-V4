/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

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
import ReactPlayer from "react-player";

export default function PodcastSlider({ data }: { data: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [videoReady, setVideoReady] = useState<boolean[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const playerRefs = useRef<any[]>([]);
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

  // Initialize video ready state - only update if len changes
  useEffect(() => {
    setVideoReady(new Array(len).fill(false));
  }, [len]);

  // 🧩 Compute layout dynamically
  const computeLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cw = container.clientWidth;
    const ch = container.clientHeight;

    const maxW = 688;
    const minW = 260;
    const baseW = Math.max(minW, Math.min(maxW, Math.floor(cw * 0.85)));
    const baseH = Math.floor(baseW * (9 / 16));

    const maxHeight = ch * 0.9;
    const adjustedBaseH = Math.min(baseH, maxHeight);
    const adjustedBaseW = Math.floor(adjustedBaseH * (16 / 9));

    const sideScaleX = 240 / 688;
    const sideScaleY = 143 / 387;
    const k = adjustedBaseW / 688;

    layoutRef.current = {
      baseW: adjustedBaseW,
      baseH: adjustedBaseH,
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
  }, []);

  // 🧠 GSAP setters cache
  const settersRef = useRef<{
    x: Array<ReturnType<typeof gsap.quickTo>>;
    y: Array<ReturnType<typeof gsap.quickTo>>;
    scaleX: Array<ReturnType<typeof gsap.quickTo>>;
    scaleY: Array<ReturnType<typeof gsap.quickTo>>;
    opacity: Array<ReturnType<typeof gsap.quickTo>>;
    rotateY: Array<ReturnType<typeof gsap.quickTo>>;
  } | null>(null);

  const ensureSetters = useCallback(() => {
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

    if (s.x.length > len) {
      s.x.length = len;
      s.y.length = len;
      s.scaleX.length = len;
      s.scaleY.length = len;
      s.opacity.length = len;
      s.rotateY.length = len;
    }

    for (let i = 0; i < len; i++) {
      const el = slidesRef.current[i];
      if (!el) continue;

      gsap.set(el, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        rotateY: 0,
      });

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
  }, [len]);

  // 🧭 Position slides
  const positionSlides = useCallback(
    (idx: number) => {
      if (!isInitialized || len === 0) return;

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

      if (containerRef.current) {
        gsap.set(containerRef.current, { x: 0, y: 0 });
      }
    },
    [len, ensureSetters, isInitialized],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((p) => p + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((p) => p - 1);
  }, []);

  const handleSlideClick = useCallback(
    (index: number) => {
      if (len === 0) return;
      const safe = ((index % len) + len) % len;
      const center = ((currentIndex % len) + len) % len;

      if (safe === center) {
        setIsPlaying((prev) => !prev);
      } else {
        setIsPlaying(false);
        setCurrentIndex((p) => p + (safe - center));

        setTimeout(() => {
          setIsPlaying(true);
        }, 600);
      }
    },
    [currentIndex, len],
  );

  const handleVideoReady = useCallback((index: number) => {
    setVideoReady((prev) => {
      const newReady = [...prev];
      newReady[index] = true;
      return newReady;
    });
  }, []);

  const handleVideoPlay = useCallback(() => {
    playerRefs.current.forEach((player, index) => {
      if (player && index !== ((currentIndex % len) + len) % len) {
        try {
          player.getInternalPlayer()?.pause();
        } catch (e) {
          // Silent fail
        }
      }
    });
  }, [currentIndex, len]);

  // 🧩 Initialize and setup draggable - only once
  useLayoutEffect(() => {
    if (!containerRef.current || len === 0) return;

    const init = () => {
      computeLayout();
      positionSlides(0);
      setIsInitialized(true);
    };

    const timeoutId = setTimeout(init, 100);

    const ro = new ResizeObserver(() => {
      computeLayout();
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    const proxy = document.createElement("div");
    proxyRef.current = proxy;

    let startX = 0;

    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    draggableRef.current = Draggable.create(proxy, {
      type: "x",
      trigger: containerRef.current,
      inertia: true,
      onPress: function () {
        startX = this.x;
        setIsPlaying(false);
      },
      onDragStart: function () {
        isDraggingRef.current = true;
      },
      onDrag: function () {
        const dragProgress = this.x / (layoutRef.current.baseW * 0.5);
        if (Math.abs(dragProgress) > 0.1) {
          const centerIndex = ((currentIndex % len) + len) % len;
          const centerSlide = slidesRef.current[centerIndex];
          if (centerSlide) {
            gsap.to(centerSlide, {
              scale: 0.95,
              duration: 0.2,
            });
          }
        }
      },
      onDragEnd: function () {
        const dragDistance = this.x - startX;
        gsap.set(proxy, { x: 0, y: 0 });

        slidesRef.current.forEach((slide) => {
          if (slide) {
            gsap.to(slide, {
              scale: 1,
              duration: 0.3,
            });
          }
        });

        const threshold = Math.max(60, layoutRef.current.baseW * 0.12);
        if (Math.abs(dragDistance) > threshold) {
          setIsPlaying(false);
          if (dragDistance < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }

        isDraggingRef.current = false;
      },
    })[0];

    return () => {
      clearTimeout(timeoutId);
      ro.disconnect();
      draggableRef.current?.kill();
      draggableRef.current = null;
      proxyRef.current = null;
    };
  }, [len, nextSlide, prevSlide, computeLayout]);

  // Update slides when currentIndex changes
  useEffect(() => {
    if (isInitialized) {
      positionSlides(currentIndex);
    }
  }, [currentIndex, isInitialized, positionSlides]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      computeLayout();
      if (isInitialized) {
        positionSlides(currentIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeLayout, positionSlides, isInitialized, currentIndex]);

  // Handle video state
  useEffect(() => {
    if (len === 0) return;

    playerRefs.current.forEach((player, index) => {
      if (player && index !== ((currentIndex % len) + len) % len) {
        try {
          player.getInternalPlayer()?.pause();
        } catch (e) {
          // Silent fail
        }
      }
    });

    if (isPlaying) {
      const currentPlayer =
        playerRefs.current[((currentIndex % len) + len) % len];
      if (currentPlayer && videoReady[((currentIndex % len) + len) % len]) {
        setTimeout(() => {
          currentPlayer
            .getInternalPlayer()
            ?.play()
            .catch((e: any) => {
              // Silent fail
            });
        }, 100);
      }
    }
  }, [currentIndex, isPlaying, len, videoReady]);

  const safeCurrentIndex = useMemo(
    () => ((currentIndex % len) + len) % len,
    [currentIndex, len],
  );

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="w-full px-2 sm:px-4">
        <div
          ref={containerRef}
          className="relative h-[260px] sm:h-80 md:h-[400px] lg:h-[460px] xl:h-[480px] cursor-grab active:cursor-grabbing touch-none"
          style={{ perspective: "2000px" }}
        >
          <div className="relative h-full flex items-center justify-center">
            {data.map((item, index) => {
              const isCenterSlide = safeCurrentIndex === index;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                  }}
                  onClick={() => handleSlideClick(index)}
                  className="absolute cursor-pointer select-none touch-none"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="relative overflow-hidden bg-black rounded-[20px]"
                    style={{
                      width: layoutRef.current.baseW,
                      height: layoutRef.current.baseH,
                    }}
                  >
                    <ReactPlayer
                      url={item?.video_url}
                      light={item?.image_url}
                      playIcon={
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-2">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      }
                      ref={(player) => {
                        playerRefs.current[index] = player;
                      }}
                      playing={isCenterSlide && isPlaying}
                      controls={true}
                      width="100%"
                      height="100%"
                      style={{
                        pointerEvents: isDraggingRef.current ? "none" : "auto",
                      }}
                      onReady={() => handleVideoReady(index)}
                      onPlay={handleVideoPlay}
                      onPause={() => {
                        if (isCenterSlide) {
                          setIsPlaying(false);
                        }
                      }}
                      onEnded={() => {
                        if (isCenterSlide) {
                          setIsPlaying(false);
                        }
                      }}
                      config={{
                        youtube: {
                          playerVars: {
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                          },
                        },
                      }}
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
