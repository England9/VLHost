export type LightingControls = {
  brightness: number;
  contrast: number;
  saturate: number;
  litMix: number;
  maskScale: number;
  maskOffsetX: number;
  maskOffsetY: number;
  invertMask: boolean;
  motionEnabled: boolean;
  motionScale: number;
  windSpeed: number;
  shadowOpacity: number;
  secondaryLayerMix: number;
  /** Extra shadow lab: free placement, stack, rotation */
  devMode: boolean;
  shadowUnlinkWind: boolean;
  shadowDevX: number;
  shadowDevY: number;
  shadowDevRotate: number;
  shadowDevScale: number;
  /** Stacked multiply passes (1–8) */
  shadowStacks: number;
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
  devMode: false,
  shadowUnlinkWind: true,
  shadowDevX: 0,
  shadowDevY: 0,
  shadowDevRotate: 0,
  shadowDevScale: 1,
  shadowStacks: 1,
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
    "--shadow-wind-x": c.shadowUnlinkWind ? "0px" : "var(--mx)",
    "--shadow-wind-y": c.shadowUnlinkWind ? "0px" : "var(--my)",
    "--shadow-dev-x": `${c.shadowDevX}px`,
    "--shadow-dev-y": `${c.shadowDevY}px`,
    "--shadow-dev-rot": `${c.shadowDevRotate}deg`,
    "--shadow-dev-scale": String(c.shadowDevScale),
    "--shadow-texture-scale": `${c.maskScale * c.shadowDevScale}%`,
  };
}