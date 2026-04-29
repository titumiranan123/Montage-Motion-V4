/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import CaseStudiesCard from "./CaseStudiesCard";


interface CaseStudiesCarouselProps {
  data: any;
}

export default function CaseStudiesCarousel({ data }: CaseStudiesCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);
  const lockedRef = useRef(false);
  const total = data.length;

  // ── Navigation ─────────────────
  const goTo = useCallback(
    (idx: number) => {
      if (animatingRef.current) return;
      const next = Math.max(0, Math.min(total - 1, idx));
      if (next === current) return;

      animatingRef.current = true;
      setCurrent(next);
      setTimeout(() => {
        animatingRef.current = false;
      }, 420);
    },
    [current, total]
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      goTo(current + dir);
    },
    [current, goTo]
  );

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isInView = useCallback((): boolean => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= window.innerHeight;
  }, []);

  // ── Wheel ──────────────
  useEffect(() => {
    const acc = { v: 0 };

    const handler = (e: WheelEvent) => {
      if (!isInView()) return;

      acc.v += e.deltaY;

      if (Math.abs(acc.v) > 60 && !lockedRef.current) {
        const dir = acc.v > 0 ? 1 : -1;
        const next = current + dir;

        if (next >= 0 && next < total) {
          e.preventDefault();
          go(dir as 1 | -1);
          lockedRef.current = true;
          acc.v = 0;
          setTimeout(() => {
            lockedRef.current = false;
          }, 650);
        } else {
          // Edge reached — let natural scroll resume
          acc.v = 0;
        }
      }
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [current, go, total, isInView]);

  // ── Touch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let startY = 0;

    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onMove = (e: TouchEvent) => {
      if (!isInView()) return;

      const dy = startY - e.touches[0].clientY;

      if (Math.abs(dy) > 40 && !lockedRef.current) {
        const dir = dy > 0 ? 1 : -1;
        const next = current + dir;

        if (next >= 0 && next < total) {
          go(dir as 1 | -1);
          lockedRef.current = true;
          setTimeout(() => {
            lockedRef.current = false;
          }, 650);
          startY = e.touches[0].clientY;
        }
      }
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
    };
  }, [current, go, total, isInView]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isInView()) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, isInView]);

  // ── Render ─────────────────────────────────────────────────────────────────
  /*
   * Layout strategy:
   *  • The outer <section> height = 100vh * total  so the page has enough
   *    scroll distance to "consume" all cards before releasing.
   *  • The inner sticky div is 100vh, giving us the sticky viewport.
   *  • Cards are absolutely centred inside the sticky viewport.
   */
  return (
    <section
      ref={sectionRef}
      style={{ height: `${total * 100}vh`, position: "relative" }}
      aria-label="Case studies carousel"
      className="sectionarea"
    >
      {/* ── Sticky viewport ── */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── Cards ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          role="list"
        >
          {data.map((item:any, i:number) => {
            const offset = i - current;
            const isActive = offset === 0;
            const tx = offset * 860; // horizontal stagger for "stack" feel
            // const opacity = isActive ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.15);
            // const scale = isActive ? 1 : 0.93 - Math.abs(offset) * 0.02;
            const scale = 1;
            // const zIndex = total - Math.abs(offset);

            return (
              <div
                key={item.slug}
                role="listitem"
                aria-hidden={!isActive}
                style={{
                  position: "absolute",
                  width: 840,
                //   maxWidth: "calc(100vw - 32px)",
                  top: "50%",
                  left: "33%",
                  transform: `
                    translate(-50%, -50%)
                    translateX(${tx}px)
                    scale(${scale})
                  `,
                  transition:
                    "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s cubic-bezier(.4,0,.2,1)",
                //   transform: `
                //     translate(-50%, -50%)
                //     translateX(${tx}px)
                //     scale(${scale})
                //   `,
                //   transition:
                //     "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s cubic-bezier(.4,0,.2,1)",
                //   opacity,
                  borderRadius: 16,
                  border: "1px solid #e8e8e8",
                  background: "#fff",
                  overflow: "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                //   zIndex,
                //   boxShadow: isActive
                //     ? "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
                //     : "0 4px 16px rgba(0,0,0,0.04)",
                  willChange: "transform, opacity",
                }}
              >
                <CaseStudiesCard {...item} />
              </div>
            );
          })}
        </div>

        {/* ── Dot indicators ── */}
        <nav
          aria-label="Carousel navigation"
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            zIndex: 100,
          }}
        >
          {data.map((item:any, i:number) => (
            <button
              key={item.slug}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                background: i === current ? "#111" : "#ccc",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s",
              }}
            />
          ))}
        </nav>

      </div>
    </section>
  );
}

// ── Arrow button shared style helper ──────────────────────────────────────
