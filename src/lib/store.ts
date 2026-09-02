"use client";

import { useSyncExternalStore } from "react";

/**
 * Continuous values (scroll, pointer) live on a plain mutable object, never in
 * React state. The render loop reads them every frame; putting them in state
 * would re-render the tree 60 times a second and collapse on mobile.
 */
export const frame = {
  /** Normalised document scroll, 0 at the top of the hero, 1 at the CTA. */
  scroll: 0,
  /** Signed scroll velocity, used to stretch the Core under fast flicks. */
  velocity: 0,
  /** Pointer in clip space, -1..1. */
  px: 0,
  py: 0,
  /** Eased pointer, so the Core lags the cursor instead of snapping to it. */
  ex: 0,
  ey: 0,
  /** 0 when the pointer has left the window or never arrived (touch). */
  presence: 0,
  /** Intro timeline progress, 0..1. Drives the Core during the opening. */
  intro: 0,
  /** Extra energy injected by hovering a CTA or an agent node. */
  charge: 0,
  /** Continuous recursion depth for the infinite-Core beat. */
  depth: 0,
  /** Seconds, accumulated by the render loop rather than Date.now(). */
  time: 0,
};

/* ------------------------------------------------------------------ */
/*  discrete state - small, changes rarely, safe for React             */
/* ------------------------------------------------------------------ */

export type Phase = "boot" | "intro" | "live";

type Snapshot = {
  phase: Phase;
  /** True once the renderer exists and the Core can draw its first frame. */
  coreReady: boolean;
  agent: string | null;
  industry: string;
  reduced: boolean;
  tier: Tier;
};

export type Tier = "high" | "mid" | "low";

let snap: Snapshot = {
  phase: "boot",
  coreReady: false,
  agent: null,
  industry: "ecommerce",
  reduced: false,
  tier: "high",
};

const listeners = new Set<() => void>();

const emit = () => {
  for (const l of listeners) l();
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

const getSnapshot = () => snap;
const getServerSnapshot = () => snap;

export function setState(patch: Partial<Snapshot>) {
  let changed = false;
  for (const k of Object.keys(patch) as Array<keyof Snapshot>) {
    if (snap[k] !== patch[k]) {
      changed = true;
      break;
    }
  }
  if (!changed) return;
  snap = { ...snap, ...patch };
  emit();
}

export function useAppState(): Snapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Read state outside React (render loop, event handlers). */
export const readState = () => snap;
