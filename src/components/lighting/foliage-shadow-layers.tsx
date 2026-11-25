"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

interface FoliageShadowLayersProps {
  variant?: "hero" | "waitlist";
}

export function FoliageShadowLayers({ variant }: FoliageShadowLayersProps) {
  return (
    <>
      <div
        className="foliage-layer foliage-layer--branch"
        style={{
          backgroundImage: `url(${LIGHTING_ASSETS.foliage})`,
        }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--leaf"
        style={{ backgroundImage: `url(${LIGHTING_ASSETS.foliage})` }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--branch-alt"
        style={{ backgroundImage: `url(${LIGHTING_ASSETS.foliage})` }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--leaf-alt"
        style={{ backgroundImage: `url(${LIGHTING_ASSETS.foliage})` }}
        aria-hidden
      />
    </>
  );
}