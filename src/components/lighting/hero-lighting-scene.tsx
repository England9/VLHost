"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";
import { EASING } from "@/lib/constants";

export function HeroLightingScene({ delayShift = 0 }: { delayShift?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-plate pointer-events-none absolute inset-0 overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 0.7 + delayShift,
        duration: 1.1,
        ease: EASING,
      }}
    >
      <DualExposurePlate
        photoSrc={LIGHTING_ASSETS.hero}
        photoClass="hero-photo"
        plateClass="hero-plate-inner"
        fetchPriority="high"
      />
    </motion.div>
  );
}