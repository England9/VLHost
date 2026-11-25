/**
 * Two synchronized foliage motion groups — each drives a sun + shadow pair
 * (same transform). Smooth envelope, ~35–55px drift.
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

const LAYERS: LayerProfile[] = [
  {
    speed: 0.76,
    phase: 0,
    ampX: 0.88,
    ampY: 0.82,
    ampR: 0.8,
    deform: 0.022,
  },
  {
    speed: 1.06,
    phase: 2.12,
    ampX: 1,
    ampY: 0.94,
    ampR: 1,
    deform: 0.026,
  },
];

const DESKTOP_X = 54;
const DESKTOP_Y = 38;
const DESKTOP_R = 2.5;

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function deg(n: number) {
  return `${n.toFixed(3)}deg`;
}

function num(n: number) {
  return n.toFixed(4);
}

function windEnvelope(t: number): number {
  return (
    0.95 +
    Math.sin(t * 0.43) * 0.04 +
    Math.sin(t * 0.2 + 1.05) * 0.025 +
    Math.sin(t * 0.61 + 2.2) * 0.016
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
      Math.sin(tm * 0.93 + ph * 1.05) * 16 +
      Math.sin(tm * 1.39 + ph * 0.52) * 8) *
    profile.ampX *
    g *
    ampScale;

  const y =
    (Math.cos(tm * 0.51 + ph * 0.86) * 21 +
      Math.sin(tm * 0.87 + ph) * 11 +
      Math.sin(tm * 1.24 + ph * 1.22) * 6) *
    profile.ampY *
    g *
    ampScale;

  const r =
    (Math.sin(tm * 0.64 + ph) * 1.28 +
      Math.sin(tm * 1.16 + ph * 0.52) * 0.74) *
    profile.ampR *
    g;

  const d = profile.deform * g;
  const sx =
    1 +
    Math.sin(tm * 0.75 + ph) * d +
    Math.sin(tm * 1.3 + ph) * d * 0.46;
  const sy =
    1 +
    Math.cos(tm * 0.82 + ph) * d * 0.9 +
    Math.sin(tm * 1.19 + ph * 0.62) * d * 0.4;

  return {
    x: (x / 53) * DESKTOP_X,
    y: (y / 38) * DESKTOP_Y,
    r: (r / 2) * DESKTOP_R,
    sx,
    sy,
  };
}

function toVars(
  m: ReturnType<typeof layerMotion>,
  n: 1 | 2
): FoliageWindVars {
  const keys = n === 1 ? ["wx1", "wy1", "wr1", "wsx1", "wsy1"] : ["wx2", "wy2", "wr2", "wsx2", "wsy2"];
  const vals = [px(m.x), px(m.y), deg(m.r), num(m.sx), num(m.sy)];
  return Object.fromEntries(keys.map((k, i) => [k, vals[i]])) as FoliageWindVars;
}

export function computeFoliageWind(
  t: number,
  ampScale = 1
): FoliageWindVars {
  const envelope = windEnvelope(t);
  const m1 = layerMotion(t, LAYERS[0], envelope, ampScale);
  const m2 = layerMotion(t, LAYERS[1], envelope, ampScale * 1.02);
  return { ...toVars(m1, 1), ...toVars(m2, 2) };
}

export function reducedMotionFoliageWind(): FoliageWindVars {
  const m1 = layerMotion(3.2, LAYERS[0], 0.96, 0.48);
  const m2 = layerMotion(4.5, LAYERS[1], 0.94, 0.5);
  return { ...toVars(m1, 1), ...toVars(m2, 2) };
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
} as const;