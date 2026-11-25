"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

/**
 * Each motion group shares one transform — warm sun (inverse foliage mask)
 * plus multiply shadow from the same foliage texture.
 */
export function FoliageLightingLayers() {
  const foliage = `url(${LIGHTING_ASSETS.foliage})`;
  return (
    <>
      <div className="foliage-motion foliage-motion--a" aria-hidden>
        <div className="foliage-sun" />
        <div
          className="foliage-shade"
          style={{ backgroundImage: foliage }}
        />
      </div>
      <div className="foliage-motion foliage-motion--b" aria-hidden>
        <div className="foliage-sun foliage-sun--b" />
        <div
          className="foliage-shade foliage-shade--b"
          style={{ backgroundImage: foliage }}
        />
      </div>
    </>
  );
}

/** @deprecated use FoliageLightingLayers */
export const FoliageShadowLayers = FoliageLightingLayers;