"use client";

import { useEffect, useRef } from "react";
import {
  computeFoliageWind,
  reducedMotionFoliageWind,
  type FoliageWindVars,
} from "@/lib/foliage-wind";
import type { LightingControls } from "@/lib/lighting-controls";
import { controlsToCssVars } from "@/lib/lighting-controls";
import { applyDappleViewport } from "@/lib/dapple-viewport";

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
  applyDappleViewport(el, controls.maskScale);
}

export function useFoliageWind(
  enabled: boolean,
  active: boolean,
  controls: LightingControls
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const controlsRef = useRef(controls);
  controlsRef.current = controls;

  useEffect(() => {
    const sync = () => {
      const el = rootRef.current;
      if (el) applyDappleViewport(el, controlsRef.current.maskScale);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    window.addEventListener("orientationchange", sync);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
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

    if (!controlsRef.current.motionEnabled) {
      holdStatic();
      return;
    }

    if (!enabled) {
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
      if (now - lastUpdate < 16) return;
      lastUpdate = now;
      const t =
        ((now - start) / 1000) * controlsRef.current.windSpeed;
      const vars = computeFoliageWind(t, 1);
      applyWindMask(el, vars, controlsRef.current.motionScale);
    };

    applyWindMask(el, computeFoliageWind(0, 1), 0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [enabled, active, controls.motionEnabled]);

  return rootRef;
}