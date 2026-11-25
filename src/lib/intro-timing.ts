/** Logo SMIL ~1.45s; exit zoom + fade ~0.95s */
export const LOGO_EXIT_START_S = 1.48;
export const LOGO_EXIT_DURATION_S = 0.95;
export const ENTRANCE_TOTAL_S = LOGO_EXIT_START_S + LOGO_EXIT_DURATION_S;
export const HERO_HANDOFF_S = 1.28;

export function heroRevealDelay(prefersReducedMotion: boolean | null): number {
  if (prefersReducedMotion) return 0;
  return HERO_HANDOFF_S;
}