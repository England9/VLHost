/**
 * Three-layer foliage wind — multiply compositing, fixed opacity in CSS.
 * Smooth envelope (no flash), ~35–55px drift, ~10–12s motion character.
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
  wx3: string;
  wy3: string;
  wr3: string;
  wsx3: string;
  wsy3: string;
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
    speed: 0.78,
    phase: 0,
    ampX: 0.85,
    ampY: 0.8,
    ampR: 0.78,
    deform: 0.024,
  },
  {
    speed: 1.08,
    phase: 2.05,
    ampX: 1,
    ampY: 0.94,
    ampR: 1,
    deform: 0.03,
  },
  {
    speed: 0.92,
    phase: 4.35,
    ampX: 0.9,
    ampY: 0.86,
    ampR: 0.88,
    deform: 0.026,
  },
];

const DESKTOP_X = 52;
const DESKTOP_Y = 36;
const DESKTOP_R = 2.4;

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function deg(n: number) {
  return `${n.toFixed(3)}deg`;
}

function num(n: number) {
  return n.toFixed(4);
}

/** Smooth envelope — no sharp gust spikes that read as flashing */
function windEnvelope(t: number): number {
  return (
    0.94 +
    Math.sin(t * 0.44) * 0.045 +
    Math.sin(t * 0.21 + 1.1) * 0.028 +
    Math.sin(t * 0.63 + 2.3) * 0.018
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
    (Math.sin(tm * 0.58 + ph) * 28 +
      Math.sin(tm * 0.94 + ph * 1.05) * 16 +
      Math.sin(tm * 1.41 + ph * 0.55) * 8) *
    profile.ampX *
    g *
    ampScale;

  const y =
    (Math.cos(tm * 0.52 + ph * 0.85) * 20 +
      Math.sin(tm * 0.88 + ph) * 11 +
      Math.sin(tm * 1.26 + ph * 1.25) * 6) *
    profile.ampY *
    g *
    ampScale;

  const r =
    (Math.sin(tm * 0.65 + ph) * 1.25 +
      Math.sin(tm * 1.18 + ph * 0.55) * 0.72) *
    profile.ampR *
    g;

  const d = profile.deform * g;
  const sx =
    1 +
    Math.sin(tm * 0.76 + ph) * d +
    Math.sin(tm * 1.32 + ph) * d * 0.48;
  const sy =
    1 +
    Math.cos(tm * 0.83 + ph) * d * 0.92 +
    Math.sin(tm * 1.2 + ph * 0.65) * d * 0.42;

  return {
    x: (x / 52) * DESKTOP_X,
    y: (y / 37) * DESKTOP_Y,
    r: (r / 1.95) * DESKTOP_R,
    sx,
    sy,
  };
}

function toVars(
  m: ReturnType<typeof layerMotion>,
  n: 1 | 2 | 3
): Partial<FoliageWindVars> {
  const p = String(n) as "1" | "2" | "3";
  return {
    [`wx${p}`]: px(m.x),
    [`wy${p}`]: px(m.y),
    [`wr${p}`]: deg(m.r),
    [`wsx${p}`]: num(m.sx),
    [`wsy${p}`]: num(m.sy),
  } as Partial<FoliageWindVars>;
}

export function computeFoliageWind(
  t: number,
  ampScale = 1
): FoliageWindVars {
  const envelope = windEnvelope(t);
  const m1 = layerMotion(t, LAYERS[0], envelope, ampScale);
  const m2 = layerMotion(t, LAYERS[1], envelope, ampScale * 1.03);
  const m3 = layerMotion(t, LAYERS[2], envelope, ampScale * 0.97);

  return {
    ...toVars(m1, 1),
    ...toVars(m2, 2),
    ...toVars(m3, 3),
  } as FoliageWindVars;
}

export function reducedMotionFoliageWind(): FoliageWindVars {
  const m1 = layerMotion(3.2, LAYERS[0], 0.96, 0.45);
  const m2 = layerMotion(4.4, LAYERS[1], 0.94, 0.48);
  const m3 = layerMotion(5.1, LAYERS[2], 0.95, 0.46);
  return {
    ...toVars(m1, 1),
    ...toVars(m2, 2),
    ...toVars(m3, 3),
  } as FoliageWindVars;
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
} as const;