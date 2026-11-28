"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";
import { EASING } from "@/lib/constants";
import { heroRevealDelay } from "@/lib/intro-timing";
import { hasPlayedIntro } from "@/components/brand/intro-cover";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function HeroLightingScene() {
  const prefersReducedMotion = useReducedMotion();
  const skipIntro = useSyncExternalStore(
    subscribe,
    hasPlayedIntro,
    () => false
  );
  const heroDelay = heroRevealDelay(prefersReducedMotion, skipIntro);

  return (
    <motion.div
      className="hero-plate pointer-events-none absolute inset-0 overflow-hidden"
      initial={prefersReducedMotion || skipIntro ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: heroDelay,
        duration: skipIntro ? 0.35 : 0.9,
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
