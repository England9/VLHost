"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";
import {
  dismissIntroCover,
  finishIntroCover,
} from "@/components/brand/intro-cover";

export { ENTRANCE_TOTAL_S, HERO_HANDOFF_S } from "@/lib/intro-timing";

const REVEAL_SVG = "/brand/reveal-white.svg";

export function VulciraLogoEntrance({
  onFinished,
}: {
  onFinished?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const svgHostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(false);
      finishIntroCover();
      onFinished?.();
      return;
    }
    fetch(REVEAL_SVG)
      .then((r) => r.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
    const fadeAt = window.setTimeout(() => setFading(true), 1480);
    return () => window.clearTimeout(fadeAt);
  }, [prefersReducedMotion, onFinished]);

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

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? 0.55 : 0, ease: EASING }}
      onAnimationComplete={() => {
        if (!fading) return;
        setActive(false);
        finishIntroCover();
        onFinished?.();
      }}
      aria-hidden
    >
      <div
        className="logo-entrance__frame w-[min(68vw,360px)] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        ref={svgHostRef}
      >
        {svgMarkup ? (
          <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        ) : null}
      </div>
    </motion.div>
  );
}