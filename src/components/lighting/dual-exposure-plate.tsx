"use client";

import type { CSSProperties } from "react";
import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { useLightingControls } from "@/hooks/use-lighting-controls";

type DualExposurePlateProps = {
  photoSrc: string;
  photoClass: string;
  plateClass: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Horizontally mirrored foliage / sun masks (contact page). */
  flipMask?: boolean;
};

export function DualExposurePlate({
  photoSrc,
  photoClass,
  plateClass,
  fetchPriority,
  flipMask = false,
}: DualExposurePlateProps) {
  const { controls } = useLightingControls();
  const foliageUrl = flipMask
    ? LIGHTING_ASSETS.foliageFlip
    : LIGHTING_ASSETS.foliage;
  const foliage = `url(${foliageUrl})`;
  const stacks = Math.min(8, Math.max(1, Math.round(controls.shadowStacks)));

  return (
    <div
      className={`dual-exposure-plate ${plateClass}`}
      data-mask-flip={flipMask ? "1" : "0"}
      style={
        flipMask
          ? ({
              "--foliage-texture": `url(${LIGHTING_ASSETS.foliageFlip})`,
              "--sun-reveal-mask": `url(${LIGHTING_ASSETS.sunRevealFlip})`,
            } as CSSProperties)
          : undefined
      }
    >
      <div className="dapple-unify" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          className={`dual-base ${photoClass}`}
          fetchPriority={fetchPriority}
          decoding="async"
        />

        <div className="dapple-orient">
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
          <div className="shadow-stack">
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
      </div>
    </div>
  );
}