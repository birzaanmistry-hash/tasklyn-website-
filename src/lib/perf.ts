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

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
