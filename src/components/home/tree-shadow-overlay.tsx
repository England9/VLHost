"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TreeShadowOverlayProps {
  visible?: boolean;
  className?: string;
  revealDelay?: number;
  /** Darker on hero photo, softer on sand panel */
  variant?: "hero" | "panel";
}

function LeafCluster({ className }: { className?: string }) {
  return (
  <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M60 8c-8 12-22 18-28 32-4 10-2 24 8 34 6 6 14 10 20 16 4-14 12-26 10-42-2-16-2-32-10-40zm-34 52c-12 8-20 22-18 38 2 14 12 26 24 32 8-12 14-26 12-40-2-12-10-22-18-30zm68 0c-8 8-16 18-18 30-2 14 4 28 12 40 12-6 22-18 24-32 2-16-6-30-18-38z"
      />
      <path
        fill="currentColor"
        opacity="0.55"
        d="M42 98c-6 14-4 30 6 42 8-10 10-24 8-38-2-8-8-6-14-4zm36 0c-2 14 0 28 8 38 10-12 12-28 6-42-6-2-12-4-14 4z"
      />
    </svg>
  );
}

export function TreeShadowOverlay({
  visible = true,
  className = "",
  revealDelay = 1,
  variant = "hero",
}: TreeShadowOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const tone =
    variant === "hero"
      ? "text-black/[0.18]"
      : "text-black/[0.14]";

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        delay: prefersReducedMotion ? 0 : revealDelay,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={`absolute inset-[-35%] ${tone} leaf-shadow-drift ${prefersReducedMotion ? "" : ""}`}
        style={
          prefersReducedMotion
            ? undefined
            : { animationDuration: variant === "hero" ? "26s" : "32s" }
        }
      >
        <LeafCluster className="absolute left-[2%] top-[5%] h-32 w-24 -rotate-12 opacity-90 blur-[1.5px]" />
        <LeafCluster className="absolute left-[12%] top-[18%] h-28 w-20 rotate-6 opacity-70 blur-[1px]" />
        <LeafCluster className="absolute left-[4%] top-[38%] h-36 w-28 -rotate-3 opacity-80 blur-[2px]" />
        <LeafCluster className="absolute left-[18%] top-[52%] h-24 w-16 rotate-12 opacity-60 blur-[1px]" />
        <LeafCluster className="absolute left-[6%] top-[68%] h-28 w-20 -rotate-8 opacity-75 blur-[1.5px]" />
        <LeafCluster className="absolute left-[22%] top-[8%] h-20 w-14 rotate-20 opacity-50 blur-[0.5px]" />
      </div>

      <div
        className={`absolute inset-[-30%] ${tone} leaf-shadow-drift-alt`}
        style={
          prefersReducedMotion
            ? { opacity: 0.85 }
            : { animationDuration: variant === "hero" ? "34s" : "40s" }
        }
      >
        <LeafCluster className="absolute left-[8%] top-[12%] h-24 w-16 -rotate-6 opacity-65 blur-[1px]" />
        <LeafCluster className="absolute left-[14%] top-[42%] h-32 w-24 rotate-3 opacity-55 blur-[2px]" />
        <LeafCluster className="absolute left-[3%] top-[58%] h-22 w-16 -rotate-15 opacity-70 blur-[1px]" />
        <LeafCluster className="absolute left-[20%] top-[72%] h-28 w-20 rotate-8 opacity-50 blur-[1.5px]" />
      </div>

      {/* Fine fronds — reads as filigree through leaves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full leaf-shadow-drift-slow opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2" className={tone}>
          <path
            strokeLinecap="round"
            d="M40 0 Q55 120 35 240 M48 20 Q70 140 52 260 M32 40 Q20 160 38 280"
            opacity="0.35"
          />
          <path
            strokeLinecap="round"
            d="M120 80 Q100 200 115 320 M108 100 Q85 220 102 340"
            opacity="0.25"
          />
        </g>
      </svg>
    </motion.div>
  );
}