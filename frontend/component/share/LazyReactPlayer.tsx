"use client";

import dynamic from "next/dynamic";

// The provider integrations are loaded only after a visitor asks to play a video.
const LazyReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

export default LazyReactPlayer;
