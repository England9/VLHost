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

/** Shipped look — update PRESET_ID when this changes to rebake visitors’ saved sliders. */
export const DEFAULT_LIGHTING: LightingControls = {
  brightness: 2.05,
  contrast: 1.4,
  saturate: 1.3,
  litMix: 1,
  maskScale: 128,
  maskOffsetX: 0,
  maskOffsetY: 0,
  invertMask: true,
  motionEnabled: true,
  motionScale: 1.35,
  windSpeed: 0.7,
  shadowOpacity: 0,
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
const PRESET_ID = "perfect-invert-v1";

type StoredLighting = LightingControls & { __presetId?: string };

export function loadLightingControls(): LightingControls {
  if (typeof window === "undefined") return { ...DEFAULT_LIGHTING };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_LIGHTING };
    const parsed = JSON.parse(raw) as StoredLighting;
    if (parsed.__presetId !== PRESET_ID) {
      saveLightingControls({ ...DEFAULT_LIGHTING });
      return { ...DEFAULT_LIGHTING };
    }
    const { __presetId: _preset, ...rest } = parsed;
    return { ...DEFAULT_LIGHTING, ...rest };
  } catch {
    return { ...DEFAULT_LIGHTING };
  }
}

export function saveLightingControls(controls: LightingControls) {
  try {
    const payload: StoredLighting = { ...controls, __presetId: PRESET_ID };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export const DEV_SHADOW_MENU_UNLOCK = "DEV_SHADOW_MENU";

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