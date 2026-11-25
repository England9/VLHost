/**
 * Two-layer foliage wind — multiply shadows only; fixed opacity, minimal blur.
 * Desktop displacement ~30–60px, rotation ~1–3°, ~7–14s character.
 */

export type FoliageWindVars = {
  wx1: string;
  wy1: string;
  wr1: string;
  wsx1: string;
  wsy1: string;
  wx2: string;
  wy2: string;
  wr2: string;
  wsx2: string;
  wsy2: string;
};

type LayerProfile = {
  speed: number;
  phase: number;
  ampX: number;
  ampY: number;
  ampR: number;
  deform: number;
};

const BRANCH: LayerProfile = {
  speed: 0.72,
  phase: 0,
  ampX: 0.82,
  ampY: 0.78,
  ampR: 0.75,
  deform: 0.022,
};

const LEAF: LayerProfile = {
  speed: 1.05,
  phase: 2.15,
  ampX: 1,
  ampY: 0.92,
  ampR: 1,
  deform: 0.028,
};

const DESKTOP_X = 48;
const DESKTOP_Y = 32;
const DESKTOP_R = 2.1;

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function deg(n: number) {
  return `${n.toFixed(3)}deg`;
}

function num(n: number) {
  return n.toFixed(4);
}

/** Gentle gusts — subtle, not smoke-like surges */
function windEnvelope(t: number): number {
  const slow = 0.92 + Math.sin(t * 0.48) * 0.05;
  const gust = 1 + Math.pow(Math.max(0, Math.sin(t * 0.55 + Math.sin(t * 0.17))), 2) * 0.18;
  return slow * gust;
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
    (Math.sin(tm * 0.55 + ph) * 26 +
      Math.sin(tm * 0.92 + ph * 1.1) * 14 +
      Math.sin(tm * 1.38 + ph * 0.5) * 7) *
    profile.ampX *
    g *
    ampScale;

  const y =
    (Math.cos(tm * 0.51 + ph * 0.8) * 18 +
      Math.sin(tm * 0.86 + ph) * 10 +
      Math.sin(tm * 1.22 + ph * 1.3) * 5) *
    profile.ampY *
    g *
    ampScale;

  const r =
    (Math.sin(tm * 0.62 + ph) * 1.1 +
      Math.sin(tm * 1.15 + ph * 0.6) * 0.65) *
    profile.ampR *
    g;

  const d = profile.deform * g;
  const sx = 1 + Math.sin(tm * 0.74 + ph) * d + Math.sin(tm * 1.28 + ph) * d * 0.45;
  const sy = 1 + Math.cos(tm * 0.81 + ph) * d * 0.9 + Math.sin(tm * 1.18 + ph * 0.7) * d * 0.4;

  return {
    x: (x / 47) * DESKTOP_X,
    y: (y / 33) * DESKTOP_Y,
    r: (r / 1.75) * DESKTOP_R,
    sx,
    sy,
  };
}

export function computeFoliageWind(
  t: number,
  ampScale = 1
): FoliageWindVars {
  const envelope = windEnvelope(t);
  const m1 = layerMotion(t, BRANCH, envelope, ampScale);
  const m2 = layerMotion(t, LEAF, envelope, ampScale * 1.02);

  return {
    wx1: px(m1.x),
    wy1: px(m1.y),
    wr1: deg(m1.r),
    wsx1: num(m1.sx),
    wsy1: num(m1.sy),
    wx2: px(m2.x),
    wy2: px(m2.y),
    wr2: deg(m2.r),
    wsx2: num(m2.sx),
    wsy2: num(m2.sy),
  };
}

export function reducedMotionFoliageWind(): FoliageWindVars {
  const m1 = layerMotion(3.4, BRANCH, 0.94, 0.4);
  const m2 = layerMotion(4.6, LEAF, 0.92, 0.42);
  return {
    wx1: px(m1.x),
    wy1: px(m1.y),
    wr1: deg(m1.r),
    wsx1: num(m1.sx),
    wsy1: num(m1.sy),
    wx2: px(m2.x),
    wy2: px(m2.y),
    wr2: deg(m2.r),
    wsx2: num(m2.sx),
    wsy2: num(m2.sy),
  };
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
  /** Feathered mask — allows soft shadows on jacket, hair, and face */
  heroMask: "/lighting/vulcira_layers/hero-shadow-mask-soft.png",
} as const;