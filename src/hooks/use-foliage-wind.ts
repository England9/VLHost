"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  computeFoliageWind,
  type FoliageWindVars,
} from "@/lib/foliage-wind";
import type { LightingControls } from "@/lib/lighting-controls";
import { controlsToCssVars } from "@/lib/lighting-controls";
import { applyDappleViewport } from "@/lib/dapple-viewport";

/** Ease wind/mask motion in so dapples don't snap into place. */
const WIND_RAMP_S = 1.35;

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

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

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    applyControls(el, controlsRef.current);
  }, []);

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
      const elapsed = (now - start) / 1000;
      const ramp = smoothstep(elapsed / WIND_RAMP_S);
      const t = elapsed * controlsRef.current.windSpeed;
      const vars = computeFoliageWind(t, 1);
      applyWindMask(el, vars, controlsRef.current.motionScale * ramp);
    };

    holdStatic();
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [enabled, active, controls.motionEnabled]);

  return rootRef;
}
