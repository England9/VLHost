"use client";

import { useEffect } from "react";

/** Never remove #vulcira-intro-cover from the DOM — React owns it in layout. */
export function IntroCoverTeardown() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.documentElement.dataset.intro = "done";
    }
  }, []);

  return null;
}

export function dismissIntroCover() {
  document.documentElement.dataset.intro = "active";
}

export function finishIntroCover() {
  document.documentElement.dataset.intro = "done";
}
