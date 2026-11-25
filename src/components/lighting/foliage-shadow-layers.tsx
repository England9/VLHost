"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

export function FoliageShadowLayers() {
  const bg = `url(${LIGHTING_ASSETS.foliage})`;
  return (
    <>
      <div
        className="foliage-layer foliage-layer--a"
        style={{ backgroundImage: bg }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--b"
        style={{ backgroundImage: bg }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--c"
        style={{ backgroundImage: bg }}
        aria-hidden
      />
    </>
  );
}