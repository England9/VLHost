"use client";

import { useState } from "react";
import {
  DEFAULT_LIGHTING,
  type LightingControls,
} from "@/lib/lighting-controls";

type Props = {
  controls: LightingControls;
  onChange: (patch: Partial<LightingControls>) => void;
  onReset: () => void;
};

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const display = format ? format(value) : value.toFixed(2);
  return (
    <label className="flex flex-col gap-1 text-[10px] tracking-wide text-white/90">
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-white/65">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full accent-[#e8c89a]"
      />
    </label>
  );
}

export function LightingControlPanel({ controls, onChange, onReset }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] max-h-[min(88vh,640px)] w-[min(calc(100vw-2rem),320px)] font-sans text-xs shadow-2xl"
      role="region"
      aria-label="Lighting controls"
    >
      <div className="overflow-hidden rounded-lg border border-white/15 bg-[#141210]/92 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-white/10 px-3 py-2.5 text-left text-[10px] tracking-[0.2em] text-white/95 uppercase"
        >
          Lighting
          <span className="text-white/50">{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className="max-h-[70vh] space-y-3 overflow-y-auto p-3">
            <p className="text-[9px] leading-relaxed text-white/55">
              Dual exposure: ambient base + filtered copy revealed through
              foliage-sun-reveal mask (gaps = sunlight). Motion moves mask only.
            </p>

            <SliderRow
              label="Sun brightness"
              value={controls.brightness}
              min={1}
              max={2.4}
              step={0.01}
              onChange={(v) => onChange({ brightness: v })}
            />
            <SliderRow
              label="Sun contrast"
              value={controls.contrast}
              min={0.9}
              max={1.4}
              step={0.01}
              onChange={(v) => onChange({ contrast: v })}
            />
            <SliderRow
              label="Sun saturate"
              value={controls.saturate}
              min={0.9}
              max={1.3}
              step={0.01}
              onChange={(v) => onChange({ saturate: v })}
            />
            <SliderRow
              label="Lit mix"
              value={controls.litMix}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => onChange({ litMix: v })}
            />
            <SliderRow
              label="Mask scale"
              value={controls.maskScale}
              min={95}
              max={160}
              step={1}
              format={(v) => `${v}%`}
              onChange={(v) => onChange({ maskScale: v })}
            />
            <SliderRow
              label="Mask offset X"
              value={controls.maskOffsetX}
              min={-120}
              max={120}
              step={1}
              format={(v) => `${v}px`}
              onChange={(v) => onChange({ maskOffsetX: v })}
            />
            <SliderRow
              label="Mask offset Y"
              value={controls.maskOffsetY}
              min={-120}
              max={120}
              step={1}
              format={(v) => `${v}px`}
              onChange={(v) => onChange({ maskOffsetY: v })}
            />
            <SliderRow
              label="2nd dapple layer"
              value={controls.secondaryLayerMix}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => onChange({ secondaryLayerMix: v })}
            />
            <SliderRow
              label="Shadow multiply"
              value={controls.shadowOpacity}
              min={0}
              max={0.45}
              step={0.01}
              onChange={(v) => onChange({ shadowOpacity: v })}
            />
            <SliderRow
              label="Motion amount"
              value={controls.motionScale}
              min={0}
              max={2}
              step={0.05}
              onChange={(v) => onChange({ motionScale: v })}
            />
            <SliderRow
              label="Wind speed"
              value={controls.windSpeed}
              min={0.2}
              max={2}
              step={0.05}
              onChange={(v) => onChange({ windSpeed: v })}
            />

            <div className="flex flex-wrap gap-2 pt-1">
              <Toggle
                label="Motion"
                on={controls.motionEnabled}
                onChange={(v) => onChange({ motionEnabled: v })}
              />
              <Toggle
                label="Invert mask"
                on={controls.invertMask}
                onChange={(v) => onChange({ invertMask: v })}
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onReset}
                className="flex-1 rounded border border-white/20 py-2 text-[10px] tracking-wider text-white/80 hover:bg-white/5"
              >
                Reset defaults
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    brightness: DEFAULT_LIGHTING.brightness,
                    litMix: 1,
                    motionEnabled: false,
                  })
                }
                className="flex-1 rounded bg-[#e8c89a]/20 py-2 text-[10px] tracking-wider text-[#f5e6d3]"
              >
                Static test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`rounded border px-2.5 py-1.5 text-[9px] tracking-wider uppercase ${
        on
          ? "border-[#e8c89a]/50 bg-[#e8c89a]/15 text-[#f5e6d3]"
          : "border-white/20 text-white/60"
      }`}
    >
      {label}: {on ? "on" : "off"}
    </button>
  );
}