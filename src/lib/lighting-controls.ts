export type LightingControls = {
  brightness: number;
  contrast: number;
  saturate: number;
  /** How much of the illuminated exposure blends through */
  litMix: number;
  maskScale: number;
  maskOffsetX: number;
  maskOffsetY: number;
  /** If true, foliage dark = lit visible (flip when polarity looks wrong) */
  invertMask: boolean;
  motionEnabled: boolean;
  motionScale: number;
  windSpeed: number;
  /** Optional multiply shadow on top of composite */
  shadowOpacity: number;
  secondaryLayerMix: number;
};

export const DEFAULT_LIGHTING: LightingControls = {
  brightness: 2.05,
  contrast: 1.14,
  saturate: 1.06,
  litMix: 1,
  maskScale: 128,
  maskOffsetX: 0,
  maskOffsetY: 0,
  invertMask: false,
  motionEnabled: false,
  motionScale: 1,
  windSpeed: 1,
  shadowOpacity: 0.08,
  secondaryLayerMix: 0.55,
};

const STORAGE_KEY = "vulcira-lighting-controls";

export function loadLightingControls(): LightingControls {
  if (typeof window === "undefined") return DEFAULT_LIGHTING;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_LIGHTING };
    return { ...DEFAULT_LIGHTING, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_LIGHTING };
  }
}

export function saveLightingControls(controls: LightingControls) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
  } catch {
    /* ignore */
  }
}

export function controlsToCssVars(c: LightingControls): Record<string, string> {
  return {
    "--lit-brightness": String(c.brightness),
    "--lit-contrast": String(c.contrast),
    "--lit-saturate": String(c.saturate),
    "--lit-mix": String(c.litMix),
    "--mask-scale": `${c.maskScale}%`,
    "--mask-ox": `${c.maskOffsetX}px`,
    "--mask-oy": `${c.maskOffsetY}px`,
    "--shadow-op": String(c.shadowOpacity),
    "--layer-b-mix": String(c.secondaryLayerMix),
  };
}