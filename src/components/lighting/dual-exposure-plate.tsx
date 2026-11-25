"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { useLightingControls } from "@/hooks/use-lighting-controls";

type DualExposurePlateProps = {
  photoSrc: string;
  photoClass: string;
  plateClass: string;
  fetchPriority?: "high" | "low" | "auto";
};

export function DualExposurePlate({
  photoSrc,
  photoClass,
  plateClass,
  fetchPriority,
}: DualExposurePlateProps) {
  const { controls } = useLightingControls();
  const foliage = `url(${LIGHTING_ASSETS.foliage})`;
  const stacks = Math.min(8, Math.max(1, Math.round(controls.shadowStacks)));

  return (
    <div className={`dual-exposure-plate ${plateClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        className={`dual-base ${photoClass}`}
        fetchPriority={fetchPriority}
        decoding="async"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        className={`dual-lit dual-lit--primary ${photoClass}`}
        decoding="async"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        className={`dual-lit dual-lit--secondary ${photoClass}`}
        decoding="async"
      />

      <div className="shadow-stack" aria-hidden>
        {Array.from({ length: stacks }).map((_, i) => (
          <div
            key={i}
            className="foliage-shadow-pass"
            style={{ backgroundImage: foliage }}
            data-stack={i}
          />
        ))}
      </div>
    </div>
  );
}