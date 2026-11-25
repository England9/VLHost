/** Logo SVG ~1.45s; hero crossfade begins before overlay lifts */
export const ENTRANCE_TOTAL_S = 2.03;
export const HERO_HANDOFF_S = 1.28;
export const UI_REVEAL_S = 1.85;

export function heroRevealDelay(prefersReducedMotion: boolean | null): number {
  if (prefersReducedMotion) return 0;
  return HERO_HANDOFF_S;
}