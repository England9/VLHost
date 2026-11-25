"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";

export { ENTRANCE_TOTAL_S } from "@/lib/intro-timing";

const REVEAL_SVG = "/brand/reveal-white.svg";

export function VulciraLogoEntrance() {
  const prefersReducedMotion = useReducedMotion();
  const svgHostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setMounted(true);
    fetch(REVEAL_SVG)
      .then((r) => r.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    const fadeAt = window.setTimeout(() => setFading(true), 1480);
    return () => window.clearTimeout(fadeAt);
  }, [mounted, prefersReducedMotion]);

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

  if (prefersReducedMotion || !mounted) return null;

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? 0.55 : 0, ease: EASING }}
      onAnimationComplete={() => {
        if (fading) setMounted(false);
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