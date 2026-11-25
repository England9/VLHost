"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";
import { EASING } from "@/lib/constants";
import { introContentDelay } from "@/lib/intro-timing";

export function WaitlistLightingScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="waitlist-plate pointer-events-none absolute inset-0 overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: introContentDelay(prefersReducedMotion, 1),
        duration: 0.9,
        ease: EASING,
      }}
    >
      <DualExposurePlate
        photoSrc={LIGHTING_ASSETS.waitlist}
        photoClass="waitlist-photo"
        plateClass="waitlist-plate-inner"
      />
    </motion.div>
  );
}