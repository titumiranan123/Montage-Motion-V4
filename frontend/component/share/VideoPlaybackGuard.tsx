'use client';

import { useEffect } from 'react';

export default function VideoPlaybackGuard() {
  useEffect(() => {
    const observedVideos = new WeakSet<HTMLVideoElement>();
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold: [0, 0.1] },
    );

    const observeVideos = (root: ParentNode = document) => {
      root.querySelectorAll('video').forEach((video) => {
        if (observedVideos.has(video)) return;
        observedVideos.add(video);
        visibilityObserver.observe(video);
      });
    };

    const pauseOtherVideos = (event: Event) => {
      const activeVideo = event.target;
      if (!(activeVideo instanceof HTMLVideoElement)) return;

      document.querySelectorAll('video').forEach((video) => {
        if (video !== activeVideo && !video.paused) video.pause();
      });
    };

    const pauseAllVideos = () => {
      document.querySelectorAll('video').forEach((video) => {
        if (!video.paused) video.pause();
      });
    };

    const mutationObserver = new MutationObserver(() => observeVideos());

    observeVideos();
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('play', pauseOtherVideos, true);
    document.addEventListener('visibilitychange', pauseAllVideos);
    window.addEventListener('blur', pauseAllVideos);
    window.addEventListener('pagehide', pauseAllVideos);

    return () => {
      mutationObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('play', pauseOtherVideos, true);
      document.removeEventListener('visibilitychange', pauseAllVideos);
      window.removeEventListener('blur', pauseAllVideos);
      window.removeEventListener('pagehide', pauseAllVideos);
    };
  }, []);

  return null;
}
