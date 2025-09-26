'use client'
import { useEffect } from "react";
import Lenis from "lenis";
import 'lenis/dist/lenis.css'
const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Smoothness level
      easing: (t) => 1 - Math.pow(1 - t, 3), // Ease-out effect
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
