"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/lib/constants";

export const ENTRANCE_TOTAL_S = 1.35;

export function VulciraLogoEntrance({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"construction" | "primary" | "exit">(
    "construction"
  );

  const skip = useMemo(() => {
    if (prefersReducedMotion) return true;
    try {
      return sessionStorage.getItem("vulcira-entrance-done") === "1";
    } catch {
      return false;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (skip) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const t1 = window.setTimeout(() => setPhase("primary"), 520);
    const t2 = window.setTimeout(() => setPhase("exit"), 920);
    const t3 = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("vulcira-entrance-done", "1");
      } catch {
        /* ignore */
      }
      onComplete?.();
    }, 1320);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [skip, onComplete]);

  if (skip || !visible) return null;

  return (
    <motion.div
      className="logo-entrance pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{
        duration: phase === "exit" ? 0.45 : 0,
        ease: EASING,
      }}
      aria-hidden
    >
      <div className="logo-entrance__frame relative h-[min(62vw,340px)] w-[min(62vw,340px)]">
        <motion.img
          src="/brand/reveal-construction.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain logo-entrance__construction"
          initial={{ opacity: 0, filter: "invert(1) contrast(1.1)" }}
          animate={{
            opacity: phase === "construction" ? 1 : 0,
            filter:
              phase === "construction"
                ? "invert(1) contrast(2.4) brightness(0.95)"
                : "invert(1) contrast(1.1)",
          }}
          transition={{ duration: 0.42, ease: EASING }}
        />
        <motion.img
          src="/brand/reveal-symbol.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0, scale: 0.992, filter: "invert(1)" }}
          animate={{
            opacity: phase !== "construction" ? 1 : 0,
            scale: phase === "primary" || phase === "exit" ? 1 : 0.992,
            filter: "invert(1) brightness(1.02)",
          }}
          transition={{ duration: 0.48, ease: EASING }}
        />
      </div>
    </motion.div>
  );
}