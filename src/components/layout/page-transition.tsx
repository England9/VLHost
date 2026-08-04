"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "@/lib/constants";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.normal,
        ease: EASING,
      }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
