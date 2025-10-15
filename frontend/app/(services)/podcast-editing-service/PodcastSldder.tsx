"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import ReactPlayer from "react-player";
import Image from "next/image";
import VideoPlayer from "@/component/home/PrettyPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function PodcastSldder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<any>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<any>(null);
  const isDraggingRef = useRef<any>(false);
  const draggableRef = useRef<any>(null);

  // ✨ Smooth timing constants
  const TWEEN_EASE = "power3.out";
  const TWEEN_DUR = 0.7; // short + snappy; finishes before 3s autoplay step

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

  const infiniteData = [...data];

  const positionSlides = (index: any) => {
    slidesRef.current.forEach((slide: any, i: number) => {
      if (!slide) return;

      const diff = i - (index + data.length);
      const absPos = ((diff % data.length) + data.length) % data.length;

      let x = 0;
      let y = 0;
      let opacity = 0.4;
      let zIndex = 1;
      let rotateY = 0;
      let width = 688;
      let height = 387;
      let borderRadius = 31;

      if (absPos === 0) {
        // Center slide
        x = 0;
        y = 0;
        opacity = 1;
        zIndex = 30;
        rotateY = 0;
        width = 688;
        height = 387;
        borderRadius = 31;
      } else if (absPos === 1 || absPos === data.length - 1) {
        // Left and right slides
        const direction = absPos === 1 ? 1 : -1;
        x = direction * 500;
        y = direction === 1 ? -60 : 60;
        opacity = 0.8;
        zIndex = 20;
        rotateY = direction * -20;
        width = 211;
        height = 185;
        borderRadius = 31;
      } else {
        // Hidden slides
        const direction = diff > 0 ? 1 : -1;
        x = direction * 1500;
        opacity = 0;
        zIndex = 0;
        width = 0;
        height = 0;
      }

      // 💫 Smooth, conflict-free tween
      gsap.killTweensOf(slide);
      gsap.to(slide, {
        x,
        y,
        opacity,
        zIndex,
        rotateY,
        width,
        height,
        borderRadius,
        duration: TWEEN_DUR,
        ease: TWEEN_EASE,
        overwrite: "auto",
        // no delay → immediate, fluid response
      });
    });
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!isDraggingRef.current && !isPlaying) {
        nextSlide();
      }
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const goToSlide = (index: number) => {
    stopAutoplay();
    const actualIndex = ((index % data.length) + data.length) % data.length;
    setCurrentIndex(actualIndex + data.length);
    startAutoplay();
  };

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  const handleSlideClick = (index: number) => {
    const originalIndex = index % data.length;
    const centerIndex = currentIndex % data.length;

    if (originalIndex === centerIndex) {
      setIsPlaying(true);
      stopAutoplay();
    } else {
      goToSlide(originalIndex);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let startX = 0;

    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    draggableRef.current = Draggable.create(containerRef.current, {
      type: "x",
      inertia: true,
      bounds: { minX: -500, maxX: 500 },
      onDragStart: function () {
        isDraggingRef.current = true;
        stopAutoplay();
        startX = this.x;
      },
      onDragEnd: function () {
        const dragDistance = this.x - startX;

        if (Math.abs(dragDistance) > 80) {
          if (dragDistance < 0) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            setCurrentIndex((prev) => prev - 1);
          }
        }

        gsap.to(containerRef.current, {
          x: 0,
          duration: 0.35,
          ease: TWEEN_EASE,
          onComplete: () => {
            isDraggingRef.current = false;
            if (!isPlaying) startAutoplay();
          },
        });
      },
    })[0];

    startAutoplay();

    return () => {
      if (draggableRef.current) draggableRef.current.kill();
      stopAutoplay();
    };
  }, []);

  useEffect(() => {
    positionSlides(currentIndex);

    // Keep your wrap logic, but sync with tween duration for seamless jump
    if (currentIndex < 0) {
      setTimeout(() => setCurrentIndex(data.length - 1), TWEEN_DUR * 1000);
    } else if (currentIndex >= data.length * 2) {
      setTimeout(() => setCurrentIndex(data.length), TWEEN_DUR * 1000);
    }
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="w-full px-4">
        <div
          ref={containerRef}
          className="relative h-[411px] cursor-grab active:cursor-grabbing"
          style={{ perspective: "2000px" }}
        >
          <div className="relative h-full flex items-center justify-center">
            {infiniteData?.map((item, index) => {
              const isCenterSlide =
                currentIndex % data?.length === index % data?.length;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                    if (el) {
                      // tiny perf hint for smoother transforms
                      (el.style as any).willChange =
                        "transform, opacity, width, height";
                    }
                  }}
                  onClick={() => handleSlideClick(index)}
                  className="absolute cursor-pointer select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {isCenterSlide && isPlaying ? (
                    <div className="w-[688px] h-[387px] rounded-[31.63px] overflow-hidden bg-red-500">
                      <VideoPlayer youtubeUrl="" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <VideoPlayer youtubeUrl="" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="justify-center gap-3 mt-12 hidden">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex % data.length === index
                  ? "w-12 bg-purple-500"
                  : "w-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="hidden justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all"
          >
            <svg
              className="w-6 h-6"
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
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all"
          >
            <svg
              className="w-6 h-6"
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
