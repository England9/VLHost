"use client";

import { useEffect } from "react";

/** Removes the SSR intro veil once React has mounted (see layout + globals). */
export function IntroCoverTeardown() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.documentElement.dataset.intro = "done";
      document.getElementById("vulcira-intro-cover")?.remove();
    }
  }, []);

  return null;
}

export function dismissIntroCover() {
  document.documentElement.dataset.intro = "active";
  document.getElementById("vulcira-intro-cover")?.remove();
}

export function finishIntroCover() {
  document.documentElement.dataset.intro = "done";
}