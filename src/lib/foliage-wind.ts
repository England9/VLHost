/** Wind samples for layered foliage — incommensurate periods avoid obvious loops */

export type FoliageWindVars = {
  wx1: string;
  wy1: string;
  wr1: string;
  wx2: string;
  wy2: string;
  wr2: string;
  wx3: string;
  wy3: string;
  wr3: string;
  wx4: string;
  wy4: string;
  wr4: string;
};

const STATIC: FoliageWindVars = {
  wx1: "0px",
  wy1: "0px",
  wr1: "0deg",
  wx2: "0px",
  wy2: "0px",
  wr2: "0deg",
  wx3: "0px",
  wy3: "0px",
  wr3: "0deg",
  wx4: "0px",
  wy4: "0px",
  wr4: "0deg",
};

function px(n: number) {
  return `${n.toFixed(2)}px`;
}

function deg(n: number) {
  return `${n.toFixed(3)}deg`;
}

/** Soft gust envelope — occasional slightly stronger breeze */
function gust(t: number): number {
  const slow = Math.sin(t * 0.073) * 0.5 + 0.5;
  const ripple = Math.sin(t * 0.19 + 1.3) * Math.sin(t * 0.041 + 0.6);
  return 0.88 + slow * 0.08 + Math.max(0, ripple) * 0.1;
}

function branchLayer(t: number, g: number, phase: number) {
  const x =
    (Math.sin(t * 0.17 + phase) * 6 +
      Math.sin(t * 0.089 + phase * 1.3) * 3.5 +
      Math.sin(t * 0.031 + phase) * 1.2) *
    g;
  const y =
    (Math.cos(t * 0.14 + phase * 0.7) * 4 +
      Math.sin(t * 0.22 + phase) * 2.2) *
    g;
  const r =
    (Math.sin(t * 0.12 + phase) * 0.35 +
      Math.sin(t * 0.36 + phase * 0.4) * 0.18) *
    g;
  return { x, y, r };
}

function leafLayer(t: number, g: number, phase: number) {
  const x =
    (Math.sin(t * 0.31 + phase) * 11 +
      Math.sin(t * 0.53 + phase * 2) * 5 +
      Math.sin(t * 0.67 + phase) * 2.5) *
    g;
  const y =
    (Math.sin(t * 0.27 + phase * 1.1) * 7 +
      Math.cos(t * 0.45 + phase) * 3.5) *
    g;
  const r =
    (Math.sin(t * 0.38 + phase) * 0.55 +
      Math.sin(t * 0.71 + phase) * 0.22) *
    g;
  return { x, y, r };
}

export function computeFoliageWind(t: number): FoliageWindVars {
  const g = gust(t);
  const b1 = branchLayer(t, g, 0);
  const l1 = leafLayer(t, g, 0.4);
  const b2 = branchLayer(t, g * 0.95, 2.1);
  const l2 = leafLayer(t, g * 1.02, 2.8);

  return {
    wx1: px(b1.x),
    wy1: px(b1.y),
    wr1: deg(b1.r),
    wx2: px(l1.x),
    wy2: px(l1.y),
    wr2: deg(l1.r),
    wx3: px(b2.x),
    wy3: px(b2.y),
    wr3: deg(b2.r),
    wx4: px(l2.x),
    wy4: px(l2.y),
    wr4: deg(l2.r),
  };
}

export function staticFoliageWind(): FoliageWindVars {
  return STATIC;
}

export const LIGHTING_ASSETS = {
  hero: "/lighting/vulcira_layers/hero-clean.webp",
  waitlist: "/lighting/vulcira_layers/waitlist-clean.webp",
  foliage: "/lighting/vulcira_layers/foliage-shadow.webp",
  heroMask: "/lighting/vulcira_layers/hero-shadow-mask.png",
} as const;

/** Match hero `<img>` object-position at breakpoints */
export const HERO_OBJECT_POSITION = {
  default: "68% center",
  md: "72% 20%",
} as const;