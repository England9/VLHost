/**
 * Mask motion vectors — foliage texture slides; photographs stay fixed.
 */

export type FoliageWindVars = {
  wx1: string;
  wy1: string;
  wx2: string;
  wy2: string;
};

type LayerProfile = {
  speed: number;
  phase: number;
  ampX: number;
  ampY: number;
};

const LAYERS: LayerProfile[] = [
  { speed: 0.76, phase: 0, ampX: 0.88, ampY: 0.82 },
  { speed: 1.06, phase: 2.12, ampX: 1, ampY: 0.94 },
];

const DESKTOP_X = 54;
const DESKTOP_Y = 38;

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function windEnvelope(t: number): number {
  return (
    0.95 +
    Math.sin(t * 0.43) * 0.04 +
    Math.sin(t * 0.2 + 1.05) * 0.025
  );
}

function layerMotion(
  t: number,
  profile: LayerProfile,
  envelope: number,
  ampScale: number
) {
  const tm = t * profile.speed;
  const ph = profile.phase;
  const g = envelope;

  const x =
    (Math.sin(tm * 0.57 + ph) * 29 +
      Math.sin(tm * 0.93 + ph * 1.05) * 16) *
    profile.ampX *
    g *
    ampScale;

  const y =
    (Math.cos(tm * 0.51 + ph * 0.86) * 21 +
      Math.sin(tm * 0.87 + ph) * 11) *
    profile.ampY *
    g *
    ampScale;

  return {
    x: (x / 53) * DESKTOP_X,
    y: (y / 38) * DESKTOP_Y,
  };
}

export function computeFoliageWind(
  t: number,
  ampScale = 1
): FoliageWindVars {
  const envelope = windEnvelope(t);
  const m1 = layerMotion(t, LAYERS[0], envelope, ampScale);
  const m2 = layerMotion(t, LAYERS[1], envelope, ampScale * 1.02);
  return {
    wx1: px(m1.x),
    wy1: px(m1.y),
    wx2: px(m2.x),
    wy2: px(m2.y),
  };
}

export function reducedMotionFoliageWind(): FoliageWindVars {
  const m1 = layerMotion(3.2, LAYERS[0], 0.96, 0.48);
  const m2 = layerMotion(4.5, LAYERS[1], 0.94, 0.5);
  return {
    wx1: px(m1.x),
    wy1: px(m1.y),
    wx2: px(m2.x),
    wy2: px(m2.y),
  };
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
  sunReveal: "/lighting/vulcira_layers/foliage-sun-reveal.webp",
} as const;