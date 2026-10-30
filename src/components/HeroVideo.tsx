"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export default function HeroVideo({
  src,
  poster,
  className,
  buttonClassName,
  labels,
}: {
  src: string;
  poster: string;
  className?: string;
  buttonClassName?: string;
  labels: { pause: string; play: string };
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduced;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => setUserPaused(true));
  }, [paused]);

  return (
    <>
      <video
        ref={video}
        className={className}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setUserPaused(!paused)}
      >
        {paused ? labels.play : labels.pause}
      </button>
    </>
  );
}
