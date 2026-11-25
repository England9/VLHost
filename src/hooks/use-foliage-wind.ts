"use client";

import { useEffect, useRef } from "react";
import {
  computeFoliageWind,
  reducedMotionFoliageWind,
  type FoliageWindVars,
} from "@/lib/foliage-wind";

const VAR_KEYS: (keyof FoliageWindVars)[] = [
  "wx1",
  "wy1",
  "wr1",
  "wsx1",
  "wsy1",
  "op1",
  "blur1",
  "wx2",
  "wy2",
  "wr2",
  "wsx2",
  "wsy2",
  "op2",
  "blur2",
  "wx3",
  "wy3",
  "wr3",
  "wsx3",
  "wsy3",
  "op3",
  "blur3",
  "wx4",
  "wy4",
  "wr4",
  "wsx4",
  "wsy4",
  "op4",
  "blur4",
];

function applyVars(el: HTMLElement, vars: FoliageWindVars) {
  for (const key of VAR_KEYS) {
    el.style.setProperty(`--${key}`, vars[key]);
  }
}

function mobileAmpScale(): number {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 480) return 0.55;
  if (w < 768) return 0.68;
  return 1;
}

export function useFoliageWind(enabled: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const ampRef = useRef(1);

  useEffect(() => {
    const updateAmp = () => {
      ampRef.current = mobileAmpScale();
    };
    updateAmp();
    window.addEventListener("resize", updateAmp, { passive: true });
    return () => window.removeEventListener("resize", updateAmp);
  }, []);

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
      applyVars(el, reducedMotionFoliageWind());
      return;
    }

    let frame = 0;
    const start = performance.now();
    let lastUpdate = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden || pausedRef.current) return;
      const interval = ampRef.current < 1 ? 32 : 16;
      if (now - lastUpdate < interval) return;
      lastUpdate = now;
      const t = (now - start) / 1000;
      applyVars(el, computeFoliageWind(t, ampRef.current));
    };

    applyVars(el, computeFoliageWind(0, ampRef.current));
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return rootRef;
}