"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

interface FoliageShadowLayersProps {
  /** Hero uses deeper stacks; waitlist slightly lighter */
  variant: "hero" | "waitlist";
}

export function FoliageShadowLayers({ variant }: FoliageShadowLayersProps) {
  const isHero = variant === "hero";
  const primaryOpacity = isHero ? 0.42 : 0.38;
  const secondaryOpacity = isHero ? 0.28 : 0.24;

  return (
  <>
      <div
        className="foliage-layer foliage-layer--branch"
        style={{
          backgroundImage: `url(${LIGHTING_ASSETS.foliage})`,
          opacity: primaryOpacity,
        }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--leaf"
        style={{
          backgroundImage: `url(${LIGHTING_ASSETS.foliage})`,
          opacity: secondaryOpacity,
        }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--branch-alt"
        style={{
          backgroundImage: `url(${LIGHTING_ASSETS.foliage})`,
          opacity: isHero ? 0.22 : 0.2,
        }}
        aria-hidden
      />
      <div
        className="foliage-layer foliage-layer--leaf-alt"
        style={{
          backgroundImage: `url(${LIGHTING_ASSETS.foliage})`,
          opacity: isHero ? 0.18 : 0.16,
        }}
        aria-hidden
      />
    </>
  );
}