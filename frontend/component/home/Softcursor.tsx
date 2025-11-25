"use client";
import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const move = (e: any) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    // hover detection for .card
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => setShowGlow(true));
      card.addEventListener("mouseleave", () => setShowGlow(false));
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => setShowGlow(true));
        card.removeEventListener("mouseleave", () => setShowGlow(false));
      });
    };
  }, []);

  return (
    <>
      {showGlow && (
        <div
          className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9999] bg-indigo-400/90 blur-3xl transition-transform duration-100"
          style={{
            transform: `translate(${pos.x - 64}px, ${pos.y - 64}px)`,
          }}
        ></div>
      )}
    </>
  );
}
