"use client";

import { useEffect, useRef } from "react";
import {
  computeFoliageWind,
  staticFoliageWind,
  type FoliageWindVars,
} from "@/lib/foliage-wind";

const VAR_KEYS: (keyof FoliageWindVars)[] = [
  "wx1",
  "wy1",
  "wr1",
  "wx2",
  "wy2",
  "wr2",
  "wx3",
  "wy3",
  "wr3",
  "wx4",
  "wy4",
  "wr4",
];

function applyVars(el: HTMLElement, vars: FoliageWindVars) {
  for (const key of VAR_KEYS) {
    el.style.setProperty(`--${key}`, vars[key]);
  }
}

export function useFoliageWind(enabled: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { rootMargin: "80px", threshold: 0.02 }
    );
    observer.observe(el);

    const onVisibility = () => {
      if (document.hidden) pausedRef.current = true;
      else pausedRef.current = false;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (!enabled) {
      applyVars(el, staticFoliageWind());
      return;
    }

    let frame = 0;
    const start = performance.now();
    let lastUpdate = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden || pausedRef.current) return;
      if (now - lastUpdate < 32) return;
      lastUpdate = now;
      const t = (now - start) / 1000;
      applyVars(el, computeFoliageWind(t));
    };

    applyVars(el, computeFoliageWind(0));
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return rootRef;
}