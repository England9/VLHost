"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";

type DualExposurePlateProps = {
  photoSrc: string;
  photoClass: string;
  plateClass: string;
  fetchPriority?: "high" | "low" | "auto";
};

/** Ambient base + filtered exposures; only mask-position animates. */
export function DualExposurePlate({
  photoSrc,
  photoClass,
  plateClass,
  fetchPriority,
}: DualExposurePlateProps) {
  const foliage = `url(${LIGHTING_ASSETS.foliage})`;

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

      <div
        className="foliage-shadow-pass"
        style={{ backgroundImage: foliage }}
        aria-hidden
      />
    </div>
  );
}