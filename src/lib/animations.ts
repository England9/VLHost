import { EASING, DURATION } from "./constants";

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASING },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.normal, ease: EASING },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.normal, ease: EASING },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const imageReveal = {
  initial: { scale: 1.08, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.normal, ease: EASING },
};

export const hoverRefine = {
  whileHover: { opacity: 0.85 },
  transition: { duration: DURATION.fast, ease: EASING },
};
