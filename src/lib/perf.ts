"use client";

import type { Tier } from "./store";

/**
 * Device tiering. The Core is the same object on every device; only its
 * resolution changes. Nothing is removed that carries meaning, so the mobile
 * composition still reads as the same machine.
 */
export function detectTier(): Tier {
  if (typeof window === "undefined") return "mid";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 820;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  // A WebGL2 context is the floor for the shader work the Core does.
  let webgl2 = false;
  try {
    const c = document.createElement("canvas");
    webgl2 = !!c.getContext("webgl2");
  } catch {
    webgl2 = false;
  }

  if (!webgl2) return "low";
  if (coarse || narrow) return cores >= 6 && mem >= 4 ? "mid" : "low";
  if (cores <= 4 || mem <= 4) return "mid";
  return "high";
}

export type Budget = {
  points: number;
  nodes: number;
  struts: number;
  paths: number;
  shells: number;
  dpr: [number, number];
  bloom: boolean;
};

export const BUDGET: Record<Tier, Budget> = {
  high: { points: 42000, nodes: 128, struts: 1700, paths: 190, shells: 5, dpr: [1, 1.8], bloom: true },
  mid: { points: 17000, nodes: 84, struts: 900, paths: 120, shells: 4, dpr: [1, 1.4], bloom: true },
  low: { points: 6000, nodes: 48, struts: 420, paths: 64, shells: 3, dpr: [1, 1.15], bloom: false },
};

/**
 * Text pages (services, team, contact, privacy, terms) show the Core as a faint
 * backdrop behind a ~93% opaque reading scrim. Rendering the full home-page
 * scene there bought nothing visible and cost several seconds of main-thread
 * time on a phone, so those pages get a deliberately small one: a fraction of
 * the points, no nested shells, no strata, one device pixel per CSS pixel.
 *
 * There is no "low" entry. On a low-tier device these pages skip the Core
 * entirely and show the plain dark ground, which is the right trade for a page
 * whose job is to be read.
 */
export const AMBIENT_BUDGET: Record<Exclude<Tier, "low">, Budget> = {
  high: { points: 7000, nodes: 40, struts: 600, paths: 60, shells: 0, dpr: [1, 1], bloom: false },
  mid: { points: 4500, nodes: 28, struts: 360, paths: 36, shells: 0, dpr: [1, 1], bloom: false },
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
