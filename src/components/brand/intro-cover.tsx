"use client";

import { useEffect } from "react";

const INTRO_SESSION_KEY = "vulcira-intro-played";

/** Never remove #vulcira-intro-cover from the DOM — React owns it in layout. */
export function IntroCoverTeardown() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || hasPlayedIntro()) {
      document.documentElement.dataset.intro = "done";
    }
  }, []);

  return null;
}

export function hasPlayedIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function dismissIntroCover() {
  document.documentElement.dataset.intro = "active";
}

export function finishIntroCover() {
  document.documentElement.dataset.intro = "done";
  markIntroPlayed();
}
