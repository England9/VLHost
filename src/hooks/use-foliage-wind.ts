"use client";

import { useEffect, useRef } from "react";
import {
  computeFoliageWind,
  reducedMotionFoliageWind,
  type FoliageWindVars,
} from "@/lib/foliage-wind";
import type { LightingControls } from "@/lib/lighting-controls";
import { controlsToCssVars } from "@/lib/lighting-controls";

function applyWindMask(el: HTMLElement, vars: FoliageWindVars, scale: number) {
  const parsePx = (s: string) => parseFloat(s) * scale;
  el.style.setProperty("--mx", `${parsePx(vars.wx1)}px`);
  el.style.setProperty("--my", `${parsePx(vars.wy1)}px`);
  el.style.setProperty("--mx2", `${parsePx(vars.wx2)}px`);
  el.style.setProperty("--my2", `${parsePx(vars.wy2)}px`);
}

function applyControls(el: HTMLElement, controls: LightingControls) {
  const vars = controlsToCssVars(controls);
  for (const [k, v] of Object.entries(vars)) {
    el.style.setProperty(k, v);
  }
  el.dataset.invertMask = controls.invertMask ? "1" : "0";
  el.dataset.devMode = controls.devMode ? "1" : "0";
}

export function useFoliageWind(
  enabled: boolean,
  active: boolean,
  controls: LightingControls
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const ampRef = useRef(1);
  const controlsRef = useRef(controls);
  controlsRef.current = controls;

  useEffect(() => {
    const updateAmp = () => {
      const w = window.innerWidth;
      if (w < 480) ampRef.current = 0.62;
      else if (w < 768) ampRef.current = 0.78;
      else ampRef.current = 1;
    };
    updateAmp();
    window.addEventListener("resize", updateAmp, { passive: true });
    return () => window.removeEventListener("resize", updateAmp);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    applyControls(el, controls);
  }, [controls]);

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
      pausedRef.current = document.hidden;
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

    applyControls(el, controlsRef.current);

    const holdStatic = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      el.style.setProperty("--mx2", "0px");
      el.style.setProperty("--my2", "0px");
    };

    if (!enabled || !controlsRef.current.motionEnabled) {
      if (!enabled) holdStatic();
      return;
    }

    if (!active) {
      holdStatic();
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
      const t =
        ((now - start) / 1000) * controlsRef.current.windSpeed;
      const vars = computeFoliageWind(t, ampRef.current);
      applyWindMask(
        el,
        vars,
        controlsRef.current.motionScale * ampRef.current
      );
    };

    holdStatic();
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [enabled, active, controls.motionEnabled]);

  return rootRef;
}