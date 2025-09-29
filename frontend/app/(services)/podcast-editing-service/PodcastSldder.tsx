"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import ReactPlayer from "react-player";
import Image from "next/image";

// Register GSAP plugin
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
      let scale = 0.5;
      let opacity = 0.4;
      let zIndex = 1;
      let y = 0;
      let rotateY = 0;

      if (absPos === 0) {
        x = 0;
        scale = 1;
        opacity = 1;
        zIndex = 30;
        y = 0;
        rotateY = 0;
      } else if (absPos === 1 || absPos === data.length - 1) {
        const direction = absPos === 1 ? 1 : -1;
        x = direction * 500;
        scale = 0.4;
        opacity = 0.5;
        zIndex = 20;
        y = direction === 1 ? -120 : 120;
        rotateY = direction * -20;
      } else {
        const direction = diff > 0 ? 1 : -1;
        x = direction * 1500;
        scale = 0;
        opacity = 0;
        zIndex = 0;
        y = 0;
        rotateY = 0;
      }

      gsap.to(slide, {
        x: x,
        y: y,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        rotateY: rotateY,
        duration: 0.8,
        ease: "power2.out",
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

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

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

  const handleVideoEnd = () => {
    setIsPlaying(false);
    startAutoplay();
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
          duration: 0.3,
          onComplete: () => {
            isDraggingRef.current = false;
            if (!isPlaying) {
              startAutoplay();
            }
          },
        });
      },
    })[0];

    startAutoplay();

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
      stopAutoplay();
    };
  }, []);

  useEffect(() => {
    positionSlides(currentIndex);

    if (currentIndex < 0) {
      setTimeout(() => setCurrentIndex(data.length - 1), 800);
    } else if (currentIndex >= data.length * 2) {
      setTimeout(() => setCurrentIndex(data.length), 800);
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
            {infiniteData.map((item, index) => {
              const isCenterSlide =
                currentIndex % data.length === index % data.length;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                  }}
                  onClick={() => handleSlideClick(index)}
                  className="absolute w-[688px] h-[412px] bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {isCenterSlide && isPlaying ? (
                    <ReactPlayer
                      src={item.link}
                      light={
                        <Image
                          src={item.image}
                          alt=""
                          width={688}
                          height={411}
                        />
                      }
                      playing={false}
                      controls={true}
                      width="100%"
                      height="100%"
                      onEnded={handleVideoEnd}
                      onPause={() => {
                        setIsPlaying(false);
                        startAutoplay();
                      }}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <ReactPlayer
                        src={item.link}
                        playing={false}
                        light={
                          <Image
                            src={item.image}
                            alt=""
                            width={688}
                            height={411}
                          />
                        }
                        width="100%"
                        height="100%"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 text-white font-bold text-xl pointer-events-none">
                        {item.title}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className=" justify-center gap-3 mt-12 hidden">
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

        <div className="hidden justify-center  gap-4 mt-8">
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
