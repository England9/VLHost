"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";
import { EASING } from "@/lib/constants";
import { heroRevealDelay } from "@/lib/intro-timing";

export function HeroLightingScene() {
  const prefersReducedMotion = useReducedMotion();
  const heroDelay = heroRevealDelay(prefersReducedMotion);

  return (
    <motion.div
      className="hero-plate pointer-events-none absolute inset-0 overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: heroDelay,
        duration: 0.9,
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