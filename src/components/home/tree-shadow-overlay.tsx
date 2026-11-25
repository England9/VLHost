"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TreeShadowOverlayProps {
  visible?: boolean;
  className?: string;
  revealDelay?: number;
}

export function TreeShadowOverlay({
  visible = true,
  className = "",
  revealDelay = 1,
}: TreeShadowOverlayProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        delay: prefersReducedMotion ? 0 : revealDelay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="absolute inset-[-20%] tree-shadow-layer"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 18, -12, 8, 0],
                y: [0, -10, 6, -4, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        <div className="absolute left-[-5%] top-[8%] h-[55%] w-[48%] rounded-[45%] bg-black/22 blur-[42px]" />
        <div className="absolute left-[8%] top-[22%] h-[38%] w-[32%] rounded-[40%] bg-black/18 blur-[36px]" />
        <div className="absolute left-[2%] top-[48%] h-[42%] w-[36%] rounded-[50%] bg-black/16 blur-[40px]" />
        <div className="absolute left-[18%] top-[60%] h-[28%] w-[22%] rounded-[35%] bg-black/12 blur-[28px]" />
        <div className="absolute left-[-2%] bottom-[10%] h-[35%] w-[40%] rounded-[42%] bg-black/20 blur-[38px]" />
      </motion.div>
      <motion.div
        className="absolute inset-[-15%] tree-shadow-layer-secondary"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -14, 10, -6, 0],
                y: [0, 8, -12, 5, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 34,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        <div className="absolute left-[4%] top-[5%] h-[30%] w-[28%] rounded-[38%] bg-black/10 blur-[32px]" />
        <div className="absolute left-[12%] top-[35%] h-[45%] w-[30%] rounded-[44%] bg-black/14 blur-[34px]" />
      </motion.div>
    </motion.div>
  );
}