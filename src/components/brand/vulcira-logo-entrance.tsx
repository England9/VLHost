"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";
import {
  dismissIntroCover,
  finishIntroCover,
} from "@/components/brand/intro-cover";
import {
  LOGO_EXIT_DURATION_S,
  LOGO_EXIT_START_S,
} from "@/lib/intro-timing";

export { ENTRANCE_TOTAL_S, HERO_HANDOFF_S } from "@/lib/intro-timing";

const REVEAL_SVG = "/brand/reveal-white.svg";

export function VulciraLogoEntrance({
  onHandoff,
  onFinished,
}: {
  /** Fires when exit zoom/fade begins — page chrome should already be visible. */
  onHandoff?: () => void;
  onFinished?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const svgHostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);
  const handoffCalledRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(false);
      finishIntroCover();
      onHandoff?.();
      onFinished?.();
      return;
    }
    fetch(REVEAL_SVG)
      .then((r) => r.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
    const fadeAt = window.setTimeout(
      () => setFading(true),
      LOGO_EXIT_START_S * 1000
    );
    return () => window.clearTimeout(fadeAt);
  }, [prefersReducedMotion, onHandoff, onFinished]);

  useEffect(() => {
    if (!fading || handoffCalledRef.current) return;
    handoffCalledRef.current = true;
    onHandoff?.();
  }, [fading, onHandoff]);

  useLayoutEffect(() => {
    if (!active || prefersReducedMotion || !svgMarkup) return;
    dismissIntroCover();
  }, [active, prefersReducedMotion, svgMarkup]);

  useEffect(() => {
    if (!svgMarkup || !svgHostRef.current) return;
    const svg = svgHostRef.current.querySelector("svg");
    if (!svg) return;
    try {
      const el = svg as SVGSVGElement & {
        setCurrentTime?: (t: number) => void;
        unpauseAnimations?: () => void;
      };
      el.setCurrentTime?.(0);
      el.unpauseAnimations?.();
    } catch {
      /* ignore */
    }
  }, [svgMarkup]);

  if (!active || prefersReducedMotion) return null;

  const exitEase = EASING;

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{
        duration: fading ? LOGO_EXIT_DURATION_S : 0,
        ease: exitEase,
      }}
      onAnimationComplete={() => {
        if (!fading) return;
        setActive(false);
        finishIntroCover();
        onFinished?.();
      }}
      aria-hidden
    >
      <motion.div
        className="logo-entrance__frame w-[min(68vw,360px)] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        ref={svgHostRef}
        initial={{ opacity: 1, scale: 1 }}
        animate={
          fading
            ? { opacity: 0, scale: 1.14, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: LOGO_EXIT_DURATION_S,
          ease: exitEase,
        }}
      >
        {svgMarkup ? (
          <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        ) : null}
      </motion.div>
    </motion.div>
  );
}