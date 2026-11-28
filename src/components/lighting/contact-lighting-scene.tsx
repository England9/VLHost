"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";

export function ContactLightingScene() {
  return (
    <div className="contact-plate pointer-events-none absolute inset-0 overflow-hidden">
      <DualExposurePlate
        photoSrc={LIGHTING_ASSETS.contact}
        photoClass="contact-photo"
        plateClass="contact-plate-inner"
        fetchPriority="high"
        flipMask
      />
    </div>
  );
}