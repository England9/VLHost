"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { FoliageLightingLayers } from "@/components/lighting/foliage-shadow-layers";
import { EASING } from "@/lib/constants";

export function HeroLightingScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hero-plate pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: prefersReducedMotion ? 0 : 0.7,
          duration: 1.1,
          ease: EASING,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LIGHTING_ASSETS.hero}
          alt=""
          className="hero-photo absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <motion.div
        className="hero-lighting-field"
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: prefersReducedMotion ? 0 : 1,
          duration: 0.9,
          ease: EASING,
        }}
      >
        <FoliageLightingLayers />
      </motion.div>
    </div>
  );
}