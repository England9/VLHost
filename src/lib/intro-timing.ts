/** Logo SVG ~1.45s; hero fades in underneath before overlay lifts */
export const ENTRANCE_TOTAL_S = 1.92;
export const HERO_HANDOFF_S = 1.28;

export function introContentDelay(
  prefersReducedMotion: boolean | null,
  beat: number
): number {
  return prefersReducedMotion ? beat : ENTRANCE_TOTAL_S + beat;
}

export function heroRevealDelay(prefersReducedMotion: boolean | null): number {
  if (prefersReducedMotion) return 0.7;
  return HERO_HANDOFF_S;
}