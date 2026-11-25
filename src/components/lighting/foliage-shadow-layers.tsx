"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

/** Two multiply shadow passes — branch + finer leaf texture */
export function FoliageShadowLayers() {
  const bg = `url(${LIGHTING_ASSETS.foliage})`;
  return (
    <>
      <div
        className="foliage-layer foliage-layer--branch"
        style={{ backgroundImage: bg }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--leaf"
        style={{ backgroundImage: bg }}
        aria-hidden
      />
    </>
  );
}