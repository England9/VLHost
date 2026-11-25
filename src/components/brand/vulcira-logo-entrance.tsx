"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";

export const ENTRANCE_TOTAL_S = 1.35;
const LOGO_SRC = "/brand/reveal-symbol.png";

export function VulciraLogoEntrance({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [phase, setPhase] = useState<"construction" | "primary" | "exit">(
    "construction"
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }
    setPlay(true);
  }, [prefersReducedMotion, onComplete]);

  useEffect(() => {
    if (!play) return;

    const t1 = window.setTimeout(() => setPhase("primary"), 500);
    const t2 = window.setTimeout(() => setPhase("exit"), 880);
    const t3 = window.setTimeout(() => {
      setPlay(false);
      onComplete?.();
    }, ENTRANCE_TOTAL_S * 1000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [play, onComplete]);

  if (!play) return null;

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{
        duration: phase === "exit" ? 0.48 : 0,
        ease: EASING,
      }}
      aria-hidden
    >
      <div className="logo-entrance__frame relative h-[min(72vw,380px)] w-[min(72vw,380px)]">
        <motion.img
          src={LOGO_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0, filter: "invert(1) contrast(3) brightness(0.88)" }}
          animate={{
            opacity: phase === "construction" ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: EASING }}
        />
        <motion.img
          src={LOGO_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0, scale: 0.988 }}
          animate={{
            opacity: phase !== "construction" ? 1 : 0,
            scale: 1,
            filter: "invert(1) contrast(1.05) brightness(1.02)",
          }}
          transition={{ duration: 0.5, ease: EASING }}
        />
      </div>
    </motion.div>
  );
}