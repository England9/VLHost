"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { FoliageShadowLayers } from "@/components/lighting/foliage-shadow-layers";
import { EASING } from "@/lib/constants";

export function WaitlistLightingScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="waitlist-plate pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" initial={false} animate={{ opacity: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LIGHTING_ASSETS.waitlist}
          alt=""
          className="waitlist-photo absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
        />
      </motion.div>
      <motion.div
        className="waitlist-shadow-field"
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: prefersReducedMotion ? 0 : 1,
          duration: 0.9,
          ease: EASING,
        }}
      >
        <FoliageShadowLayers />
      </motion.div>
    </div>
  );
}