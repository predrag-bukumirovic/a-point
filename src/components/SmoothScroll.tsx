"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export default function SmoothScroll() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    }

    const show = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      for (const entry of entries) {
        const ready =
          observer === full
            ? entry.intersectionRatio >= 0.99
            : entry.isIntersecting;
        if (!ready) continue;
        entry.target.classList.add("is-in");
        early.unobserve(entry.target);
        full.unobserve(entry.target);
      }
    };
    const early = new IntersectionObserver(show, {
      rootMargin: "0px 0px -22% 0px",
    });
    const full = new IntersectionObserver(show, { threshold: 0.99 });
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      early.observe(el);
      full.observe(el);
    });

    return () => {
      early.disconnect();
      full.disconnect();
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
