/**
 * Layered foliage wind — incommensurate frequencies, gust envelope,
 * per-layer speed/phase. Desktop displacement targets ~40–70px; ~8–14s motion.
 */

export type FoliageWindVars = {
  wx1: string;
  wy1: string;
  wr1: string;
  wsx1: string;
  wsy1: string;
  op1: string;
  blur1: string;
  wx2: string;
  wy2: string;
  wr2: string;
  wsx2: string;
  wsy2: string;
  op2: string;
  blur2: string;
  wx3: string;
  wy3: string;
  wr3: string;
  wsx3: string;
  wsy3: string;
  op3: string;
  blur3: string;
  wx4: string;
  wy4: string;
  wr4: string;
  wsx4: string;
  wsy4: string;
  op4: string;
  blur4: string;
};

type LayerProfile = {
  id: number;
  /** Local time multiplier — higher = faster leaf layer */
  speed: number;
  phase: number;
  ampX: number;
  ampY: number;
  ampR: number;
  baseOp: number;
  baseBlur: number;
  deform: number;
};

const LAYER_PROFILES: LayerProfile[] = [
  {
    id: 1,
    speed: 0.88,
    phase: 0,
    ampX: 0.78,
    ampY: 0.72,
    ampR: 0.85,
    baseOp: 0.46,
    baseBlur: 0.45,
    deform: 0.032,
  },
  {
    id: 2,
    speed: 1.28,
    phase: 1.7,
    ampX: 1,
    ampY: 0.95,
    ampR: 1.1,
    baseOp: 0.34,
    baseBlur: 0.18,
    deform: 0.045,
  },
  {
    id: 3,
    speed: 1.05,
    phase: 3.4,
    ampX: 0.86,
    ampY: 0.8,
    ampR: 0.95,
    baseOp: 0.26,
    baseBlur: 0.95,
    deform: 0.028,
  },
  {
    id: 4,
    speed: 1.52,
    phase: 5.1,
    ampX: 0.92,
    ampY: 0.88,
    ampR: 1.05,
    baseOp: 0.22,
    baseBlur: 0.28,
    deform: 0.05,
  },
];

const DESKTOP_X = 58;
const DESKTOP_Y = 38;
const DESKTOP_R = 3.2;

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function deg(n: number) {
  return `${n.toFixed(3)}deg`;
}

function num(n: number, d = 3) {
  return n.toFixed(d);
}

/** Gusts with calm valleys — stronger bursts, then ease back */
function windEnvelope(t: number): number {
  const breathe = 0.86 + Math.sin(t * 0.52) * 0.07;
  const ripple = Math.sin(t * 0.91 + 0.8) * Math.sin(t * 0.37 + 1.2);
  const gustPulse = Math.pow(
    Math.max(0, Math.sin(t * 0.68 + Math.sin(t * 0.19) * 1.4)),
    2.4
  );
  const gust = 1 + gustPulse * 0.42 + Math.max(0, ripple) * 0.14;
  return breathe * gust;
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
    (Math.sin(tm * 0.64 + ph) * 32 +
      Math.sin(tm * 1.08 + ph * 1.2) * 20 +
      Math.sin(tm * 1.74 + ph * 0.6) * 11 +
      Math.sin(tm * 2.35 + ph) * 6) *
    profile.ampX *
    g *
    ampScale;

  const y =
    (Math.cos(tm * 0.58 + ph * 0.9) * 22 +
      Math.sin(tm * 1.02 + ph) * 14 +
      Math.sin(tm * 1.65 + ph * 1.4) * 8) *
    profile.ampY *
    g *
    ampScale;

  const r =
    (Math.sin(tm * 0.71 + ph) * 1.65 +
      Math.sin(tm * 1.38 + ph * 0.5) * 1.05 +
      Math.sin(tm * 2.1 + ph) * 0.55) *
    profile.ampR *
    g;

  const d = profile.deform * g;
  const sx =
    1 +
    Math.sin(tm * 0.82 + ph) * d +
    Math.sin(tm * 1.55 + ph * 0.7) * d * 0.65;
  const sy =
    1 +
    Math.cos(tm * 0.94 + ph * 1.1) * d * 1.05 +
    Math.sin(tm * 1.42 + ph) * d * 0.55;

  const opMod =
    0.88 +
    Math.sin(tm * 0.77 + ph) * 0.08 +
    Math.sin(tm * 1.33 + ph) * 0.05 * g;
  const op = profile.baseOp * opMod;

  const blur =
    profile.baseBlur +
    Math.sin(tm * 0.68 + ph) * 0.35 +
    Math.sin(tm * 1.44 + ph) * 0.22;

  return {
    x: (x / 55) * DESKTOP_X,
    y: (y / 36) * DESKTOP_Y,
    r: (r / 2.2) * DESKTOP_R,
    sx,
    sy,
    op: Math.min(0.58, Math.max(0.14, op)),
    blur: Math.min(1.8, Math.max(0.08, blur)),
  };
}

function varsForLayer(
  prefix: 1 | 2 | 3 | 4,
  m: ReturnType<typeof layerMotion>
): Partial<FoliageWindVars> {
  const p = String(prefix) as "1" | "2" | "3" | "4";
  return {
    [`wx${p}`]: px(m.x),
    [`wy${p}`]: px(m.y),
    [`wr${p}`]: deg(m.r),
    [`wsx${p}`]: num(m.sx),
    [`wsy${p}`]: num(m.sy),
    [`op${p}`]: num(m.op, 2),
    [`blur${p}`]: px(m.blur),
  } as Partial<FoliageWindVars>;
}

export function computeFoliageWind(
  t: number,
  ampScale = 1
): FoliageWindVars {
  const envelope = windEnvelope(t);
  const m1 = layerMotion(t, LAYER_PROFILES[0], envelope, ampScale);
  const m2 = layerMotion(t, LAYER_PROFILES[1], envelope, ampScale);
  const m3 = layerMotion(t, LAYER_PROFILES[2], envelope, ampScale);
  const m4 = layerMotion(t, LAYER_PROFILES[3], envelope, ampScale);

  return {
    ...varsForLayer(1, m1),
    ...varsForLayer(2, m2),
    ...varsForLayer(3, m3),
    ...varsForLayer(4, m4),
  } as FoliageWindVars;
}

export function staticFoliageWind(): FoliageWindVars {
  return computeFoliageWind(0, 0);
}

/** Mid-strength static frame for reduced motion */
export function reducedMotionFoliageWind(): FoliageWindVars {
  const m = layerMotion(4.2, LAYER_PROFILES[0], 0.95, 0.35);
  const m2 = layerMotion(5.1, LAYER_PROFILES[1], 0.92, 0.38);
  const m3 = layerMotion(3.8, LAYER_PROFILES[2], 0.9, 0.32);
  const m4 = layerMotion(6.0, LAYER_PROFILES[3], 0.93, 0.36);
  return {
    ...varsForLayer(1, m),
    ...varsForLayer(2, m2),
    ...varsForLayer(3, m3),
    ...varsForLayer(4, m4),
  } as FoliageWindVars;
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
  heroMask: "/lighting/vulcira_layers/hero-shadow-mask.png",
} as const;