"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";

/** Kit reveal is 1.45s — brief hold, then crossfade */
export const ENTRANCE_TOTAL_S = 1.92;

const REVEAL_SVG = "/brand/reveal-white.svg";
export function VulciraLogoEntrance({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const svgHostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }
    setActive(true);
    fetch(REVEAL_SVG)
      .then((r) => r.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
  }, [prefersReducedMotion, onComplete]);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    const fadeAt = window.setTimeout(() => setFading(true), 1520);
    const doneAt = window.setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, ENTRANCE_TOTAL_S * 1000);

    return () => {
      window.clearTimeout(fadeAt);
      window.clearTimeout(doneAt);
    };
  }, [active, prefersReducedMotion, onComplete]);

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

  if (!active) return null;

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? 0.42 : 0, ease: EASING }}
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