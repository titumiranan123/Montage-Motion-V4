"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import ReactPlayer from "@/component/share/LazyReactPlayer";
import { useVideoPlayback } from "@/component/share/VideoPlaybackProvider";
import { getSafeImageSrc } from "@/utils/media";
import styles from "./PodcastSlider.module.css";

interface PodcastMedia {
  id?: string;
  image_url?: string | null;
  video_url?: string | null;
  alt?: string | null;
  title?: string | null;
}

type VideoMedia = PodcastMedia & { video_url: string };
type PlaybackMode = "preview" | "manual" | null;

function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default function PodcastSlider({ data }: { data?: PodcastMedia[] | null }) {
  const items = (Array.isArray(data) ? data : []).filter(
    (item): item is VideoMedia => Boolean(item && item.video_url?.trim()),
  );

  if (!items.length) {
    return <p className="py-12 text-center text-gray-500">Videos coming soon.</p>;
  }

  // Reset selection and player state even when replacement media has the same count.
  return <ResponsivePodcastCarousel key={JSON.stringify(items)} items={items} />;
}

function ResponsivePodcastCarousel({ items }: { items: VideoMedia[] }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  // A breakpoint switch tears down the old player instead of leaving hidden audio.
  return <PodcastCarousel key={isMobile ? "mobile" : "desktop"} items={items} isMobile={isMobile} />;
}

function PodcastCarousel({ items, isMobile }: { items: VideoMedia[]; isMobile: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<PlaybackMode>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  // A ready-time muted -> unmuted transition overrides YouTube's saved mute
  // preference when the visitor explicitly requests playback with sound.
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isPlaying, containerRef, play, pause } = useVideoPlayback();
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const lastDragRef = useRef(0);
  const gestureRef = useRef<{
    id: number;
    x: number;
    y: number;
    distance: number;
    dragging: boolean;
  } | null>(null);
  const count = items.length;
  const activeItem = items[currentIndex];
  const isPreview = mode === "preview";
  const playerMounted = mode === "manual" || (isPreview && isPlaying);
  const labelFor = (item: VideoMedia, index: number) =>
    item.title?.trim() || item.alt?.trim() || `Podcast video ${index + 1}`;

  const positionSlides = useCallback((index: number, animate = true) => {
    const stage = stageRef.current;
    if (!stage) return;

    const mobile = stage.clientWidth < 640;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = slidesRef.current[0]?.offsetWidth ?? 0;
    const sideScale = 240 / 688;
    const sideX = width * (1 + sideScale) / 2 + 24;
    const sideY = width * 60 / 688;

    slidesRef.current.forEach((slide, slideIndex) => {
      if (!slide) return;
      let relative = (slideIndex - index + count) % count;
      if (relative > count / 2) relative -= count;
      const center = relative === 0;
      const side = !mobile && Math.abs(relative) === 1;
      const visible = center || side;
      slide.style.zIndex = center ? "30" : side ? "20" : "0";
      slide.style.pointerEvents = visible ? "auto" : "none";
      // Preserve rounded corners at the smaller side-card scale.
      slide.style.borderRadius = `${center ? 20 : 12 / sideScale}px`;
      const target = {
        xPercent: -50,
        yPercent: -50,
        x: center ? 0 : Math.sign(relative) * sideX,
        y: side ? -Math.sign(relative) * sideY : 0,
        scale: center ? 1 : sideScale,
        rotationY: side ? -Math.sign(relative) * 8 : 0,
        autoAlpha: visible ? 1 : 0,
        overwrite: true,
      };
      if (animate && !reducedMotion) {
        gsap.to(slide, { ...target, duration: 0.45, ease: "power3.out" });
      } else {
        gsap.set(slide, target);
      }
    });
  }, [count]);

  useLayoutEffect(() => {
    activeIndexRef.current = currentIndex;
    if (!isMobile) positionSlides(currentIndex);
  }, [currentIndex, isMobile, positionSlides]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const slides = slidesRef.current.filter((slide) => slide !== null);
    const update = () => positionSlides(activeIndexRef.current, false);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionPreference.addEventListener("change", update);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", update);
      gsap.killTweensOf(slides);
    };
  }, [isMobile, positionSlides]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let inViewport = false;
    const updateVisibility = () => setIsVisible(inViewport && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.1 });
    observer.observe(container);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    // Never rotate away while a visitor is watching or has paused a video.
    if (isMobile && isVisible && !reducedMotion && mode !== "manual") {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [swiper, isMobile, isVisible, reducedMotion, mode]);

  useEffect(() => () => pause(), [pause]);

  const selectSlide = (index: number, startPlayback = false) => {
    pause();
    setIsPlayerReady(false);
    setHasError(false);
    setMode(startPlayback ? "manual" : null);
    const nextIndex = (index + count) % count;
    setCurrentIndex(nextIndex);
    if (isMobile && swiper && !swiper.destroyed && swiper.activeIndex !== nextIndex) {
      swiper.slideTo(nextIndex);
    }
    if (startPlayback) play();
  };

  const startWithSound = () => {
    if (!playerMounted) setIsPlayerReady(false);
    setHasError(false);
    setMode("manual");
    play();
  };

  const startPreview = (event: PointerEvent<HTMLDivElement>) => {
    if (
      isMobile || event.pointerType !== "mouse" || mode === "manual" || hasError ||
      gestureRef.current?.dragging ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    setIsPlayerReady(false);
    setMode("preview");
    play();
  };

  const stopPreview = () => {
    if (mode === "preview") {
      pause();
      setIsPlayerReady(false);
      setMode(null);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      count < 2 || !event.isPrimary || event.button !== 0 ||
      (event.target as HTMLElement).closest("[data-player]")
    ) return;
    gestureRef.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      distance: 0, dragging: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gestureRef.current = null;
        return;
      }
      if (Math.abs(dx) < 8) return;
      gesture.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      pause();
      setMode(null);
    }
    gesture.distance = dx;
    const center = slidesRef.current[activeIndexRef.current];
    if (center) {
      gsap.killTweensOf(center);
      gsap.set(center, { x: Math.max(-80, Math.min(80, dx * 0.3)) });
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || gesture.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!gesture.dragging) return;
    lastDragRef.current = Date.now();
    const threshold = Math.max(40, (slidesRef.current[currentIndex]?.offsetWidth ?? 0) * 0.12);
    if (!cancelled && Math.abs(gesture.distance) >= threshold) {
      selectSlide(currentIndex + (gesture.distance < 0 ? 1 : -1));
    } else {
      // Short or cancelled drags must restore every card's actual layout.
      positionSlides(currentIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("[data-player]")) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      selectSlide(event.key === "Home" ? 0 : count - 1);
    }
  };

  const renderSlide = (item: VideoMedia, index: number) => {
    let relative = (index - currentIndex + count) % count;
    if (relative > count / 2) relative -= count;
    const center = index === currentIndex;
    const nearby = isMobile ? center : Math.abs(relative) <= 1;
    const label = labelFor(item, index);
    return (
      <div
        key={item.id || item.video_url}
        ref={isMobile ? undefined : (element) => { slidesRef.current[index] = element; }}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${count}: ${label}`}
        aria-hidden={!nearby}
        data-center={center}
        className={isMobile ? styles.mobileCard : `${styles.slide} ${!center ? styles.side : ""}`}
        onPointerEnter={!isMobile && center ? startPreview : undefined}
        onPointerLeave={!isMobile && center ? stopPreview : undefined}
      >
        <Image
          src={getSafeImageSrc(item.image_url)}
          alt={label}
          fill
          sizes={center ? "(max-width: 767px) 100vw, 688px" : "240px"}
          loading={center ? "eager" : "lazy"}
          draggable={false}
          className="object-cover"
        />
        {center && playerMounted && !hasError && (
          <div data-player className={`absolute inset-0 ${isPreview ? "pointer-events-none" : ""}`}>
            <ReactPlayer
              key={item.id || item.video_url}
              url={item.video_url}
              playing={isPlaying}
              muted={!isPlayerReady || isPreview}
              volume={1}
              controls={!isPreview}
              playsinline
              width="100%"
              height="100%"
              onReady={() => setIsPlayerReady(true)}
              onPlay={play}
              onPause={pause}
              onEnded={() => { pause(); setMode(null); }}
              onError={() => { pause(); setMode(null); setHasError(true); }}
              config={{ youtube: { playerVars: { rel: 0 } } }}
            />
          </div>
        )}
        {(!center || mode !== "manual" || hasError) && (
          <button
            type="button"
            tabIndex={nearby ? 0 : -1}
            className={styles.posterButton}
            aria-label={center ? `Play ${label} with sound` : `Select and play ${label} with sound`}
            onClick={() => center ? startWithSound() : selectSlide(index, true)}
          >
            <span className={styles.playIcon}><Play fill="currentColor" aria-hidden="true" /></span>
            {center && isPreview && <span className={styles.previewLabel}>Play with sound</span>}
          </button>
        )}
        {center && hasError && (
          <div role="alert" className={styles.error}>
            <p>This video could not be loaded.</p>
            <button type="button" onClick={startWithSound}>Try again</button>
            <a href={activeItem.video_url} target="_blank" rel="noopener noreferrer">Open video</a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Podcast video showcase"
      className={styles.carousel}
      onKeyDown={handleKeyDown}
      onClickCapture={(event) => {
        if (Date.now() - lastDragRef.current < 250) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      {isMobile ? (
        <Swiper
          className={styles.mobileSwiper}
          modules={[A11y, Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          speed={reducedMotion ? 0 : 450}
          initialSlide={currentIndex}
          rewind
          watchOverflow
          pagination={count > 1 ? { clickable: true } : false}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          onSwiper={setSwiper}
          onSlideChange={(instance) => selectSlide(instance.activeIndex)}
          noSwipingSelector="[data-player]"
          a11y={{ paginationBulletMessage: "Go to podcast video {{index}}" }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id || item.video_url}>
              {renderSlide(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div
          ref={stageRef}
          className={styles.stage}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => finishDrag(event)}
          onPointerCancel={(event) => finishDrag(event, true)}
        >
          {items.map(renderSlide)}
        </div>
      )}
    </div>
  );
}
