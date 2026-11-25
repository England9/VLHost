"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";
import { EASING } from "@/lib/constants";

export function WaitlistLightingScene({
  delayShift = 0,
}: {
  delayShift?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="waitlist-plate pointer-events-none absolute inset-0 overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 1 + delayShift,
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