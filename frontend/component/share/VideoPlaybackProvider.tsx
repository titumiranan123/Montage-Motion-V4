'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useId,
  useState,
  type ReactNode,
} from 'react';

interface VideoPlaybackContextValue {
  activeVideoId: string | null;
  play: (videoId: string) => void;
  pause: (videoId: string) => void;
  pauseAll: () => void;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextValue | null>(null);

export function VideoPlaybackProvider({ children }: { children: ReactNode }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const play = useCallback((videoId: string) => {
    setActiveVideoId(videoId);
  }, []);

  const pause = useCallback((videoId: string) => {
    setActiveVideoId((currentId) => (currentId === videoId ? null : currentId));
  }, []);

  const pauseAll = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', pauseAll);
    window.addEventListener('blur', pauseAll);
    window.addEventListener('pagehide', pauseAll);

    return () => {
      document.removeEventListener('visibilitychange', pauseAll);
      window.removeEventListener('blur', pauseAll);
      window.removeEventListener('pagehide', pauseAll);
    };
  }, [pauseAll]);

  const value = useMemo(
    () => ({ activeVideoId, play, pause, pauseAll }),
    [activeVideoId, pause, pauseAll, play],
  );

  return (
    <VideoPlaybackContext.Provider value={value}>
      {children}
    </VideoPlaybackContext.Provider>
  );
}

interface UseVideoPlaybackOptions {
  autoPlay?: boolean;
}

export function useVideoPlayback(
  videoId?: string,
  { autoPlay = false }: UseVideoPlaybackOptions = {},
) {
  const context = useContext(VideoPlaybackContext);
  if (!context) {
    throw new Error('useVideoPlayback must be used inside VideoPlaybackProvider');
  }

  const generatedId = useId();
  const playerId = videoId ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const { play: startPlayback, pause: stopPlayback } = context;
  const isPlaying = context.activeVideoId === playerId;

  const play = useCallback(() => startPlayback(playerId), [playerId, startPlayback]);
  const pause = useCallback(() => stopPlayback(playerId), [playerId, stopPlayback]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlay) startPlayback(playerId);
          return;
        }

        stopPlayback(playerId);
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoPlay, playerId, startPlayback, stopPlayback]);

  return {
    playerId,
    isPlaying,
    containerRef,
    play,
    pause,
  };
}
