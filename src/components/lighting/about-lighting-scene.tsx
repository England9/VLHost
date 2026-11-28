"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";

export function AboutLightingScene() {
  return (
    <div className="about-plate pointer-events-none absolute inset-0 overflow-hidden">
      <DualExposurePlate
        photoSrc={LIGHTING_ASSETS.about}
        photoClass="about-photo"
        plateClass="about-plate-inner"
        fetchPriority="high"
        flipMask
      />
    </div>
  );
}
