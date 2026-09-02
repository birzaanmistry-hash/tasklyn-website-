/**
 * The scroll choreography.
 *
 * The whole page is one continuous camera move through a single 3D object.
 * Everything - DOM copy, Core behaviour, lighting - reads its state from the
 * same normalised scroll value (0 at the top of the hero, 1 at the CTA), so
 * nothing can drift out of sync with anything else.
 */

export type Beat = {
  id: string;
  /** Scroll range this beat owns, normalised across the whole document. */
  from: number;
  to: number;
  /** How many viewport heights of scroll length this beat is given. */
  vh: number;
};

/**
 * Beat lengths are authored in viewport heights and normalised at module load,
 * so re-timing a section means editing one number, not eleven ranges.
 */
const RAW: Array<Omit<Beat, "from" | "to">> = [
  { id: "hero", vh: 1.0 },
  { id: "capabilities", vh: 2.3 },
  { id: "fragment", vh: 1.9 },
  { id: "rewire", vh: 1.6 },
  { id: "layers", vh: 2.4 },
  { id: "agents", vh: 2.3 },
  { id: "live", vh: 1.8 },
  { id: "industries", vh: 2.0 },
  { id: "infinite", vh: 2.6 },
  { id: "process", vh: 2.0 },
  { id: "kinetic", vh: 1.6 },
  { id: "cta", vh: 1.6 },
];

const TOTAL_VH = RAW.reduce((a, b) => a + b.vh, 0);

export const BEATS: Beat[] = (() => {
  let acc = 0;
  return RAW.map((b) => {
    const from = acc / TOTAL_VH;
    acc += b.vh;
    return { ...b, from, to: acc / TOTAL_VH };
  });
})();

export const TOTAL_SCROLL_VH = TOTAL_VH;

const BEAT_INDEX = new Map(BEATS.map((b) => [b.id, b]));

export const beat = (id: string): Beat => {
  const found = BEAT_INDEX.get(id);
  if (!found) throw new Error(`Unknown beat: ${id}`);
  return found;
};

/**
 * Re-derive every beat's scroll range from where its section actually sits.
 *
 * The viewport-height table above is the authored layout, and on a desktop it
 * is exactly what ends up in the document. On a phone the sections carry their
 * content in normal flow and grow taller than the table predicts, so the ranges
 * have to come from the DOM or the Core would fall out of step with the copy
 * sitting on top of it.
 */
export function measureBeats(root: HTMLElement, viewportHeight: number) {
  const range = Math.max(1, root.offsetHeight - viewportHeight);
  const rootTop = root.getBoundingClientRect().top + window.scrollY;

  for (const b of BEATS) {
    const el = root.querySelector<HTMLElement>(`[data-beat="${b.id}"]`);
    if (!el) continue;

    const top = el.getBoundingClientRect().top + window.scrollY - rootTop;
    const height = el.offsetHeight;

    // A beat owns the viewport for exactly the span its section occupies in the
    // document. Ranges must be contiguous: subtracting a viewport from each
    // end leaves a dead gap between every pair of beats where nothing is on
    // screen at all.
    b.from = clamp01(top / range);
    b.to = clamp01((top + height) / range);
  }

  // The last beat always runs to the end, so nothing is stranded past it.
  const last = BEATS[BEATS.length - 1];
  if (last) last.to = 1;
}

/* ------------------------------------------------------------------ */
/*  math                                                               */
/* ------------------------------------------------------------------ */

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Progress through a beat, 0 before it and 1 after it. */
export const progress = (scroll: number, id: string) => {
  const b = beat(id);
  return clamp01((scroll - b.from) / (b.to - b.from));
};

/**
 * A 0 -> 1 -> 0 window over a beat.
 *
 * The two fades are independent so the first beat can open already at full
 * opacity (fadeIn 0) and the last can hold right to the end (fadeOut 0),
 * instead of the page starting and finishing on an invisible section.
 */
export const window01 = (
  scroll: number,
  from: number,
  to: number,
  fadeIn = 0.14,
  fadeOut = 0.14
) => {
  const span = to - from || 1;
  const t = (scroll - from) / span;
  if (t < -0.002 || t > 1.002) return 0;

  const tc = clamp01(t);
  const a = fadeIn <= 0 ? 1 : clamp01(tc / fadeIn);
  const b = fadeOut <= 0 ? 1 : clamp01((1 - tc) / fadeOut);
  return Math.min(a, b);
};

export const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/** Slow in, slow out. The house easing for camera moves. */
export const easeCine = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/* ------------------------------------------------------------------ */
/*  camera path                                                        */
/* ------------------------------------------------------------------ */

export type CamKey = {
  /** Beat this key is anchored to, and how far through that beat it sits. */
  beat: string;
  at: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  /** Extra roll in radians. Small amounts stop the frame feeling locked. */
  roll?: number;
};

/**
 * Hand-authored keys, anchored to beats rather than to absolute scroll values.
 * Re-timing or inserting a section changes the beat table and every camera key
 * follows automatically, instead of eleven magic numbers falling out of sync.
 *
 * Distances are deliberately uneven: near passes at the live-execution beat,
 * long throws at the typographic beats. Even spacing is what makes a camera
 * move feel like a screensaver.
 */
export const CAMERA_PATH: CamKey[] = [
  { beat: "hero", at: 0, pos: [0, 0.5, 17.5], look: [0, 0, 0], fov: 38 },
  { beat: "hero", at: 1, pos: [1.6, 0.9, 15.0], look: [0, 0, 0], fov: 40, roll: 0.01 },

  // Capabilities: the Core moves to the right of frame and holds still, so the
  // plain-language column on the left is never fighting it for attention.
  { beat: "capabilities", at: 0.45, pos: [1.2, 0.2, 12.6], look: [-2.6, 0, 0], fov: 40 },
  { beat: "capabilities", at: 1, pos: [2.4, 0.9, 13.4], look: [-2.2, 0, 0], fov: 42 },

  // Fragmentation: the camera drifts off-axis, as if losing its grip.
  { beat: "fragment", at: 0.65, pos: [6.4, 1.8, 13.4], look: [1.1, -0.2, 0], fov: 46, roll: 0.035 },

  // Rewire: it settles, squares up, comes closer. Order returns.
  { beat: "rewire", at: 0.6, pos: [0.4, 0.2, 10.6], look: [0, 0, 0], fov: 40 },

  // Layers: drop below the equator to read the strata edge-on.
  { beat: "layers", at: 0.6, pos: [7.2, -4.2, 7.8], look: [1.4, -0.4, 0], fov: 44, roll: -0.02 },

  // Agents: swing round the far side, close.
  { beat: "agents", at: 0.5, pos: [-7.1, 1.4, 6.6], look: [-1.2, 0.2, 0], fov: 42, roll: 0.015 },

  // Live execution: inside the shell. Everything passes the lens fast.
  { beat: "live", at: 0.55, pos: [0, 0.3, 3.8], look: [0, 0, -1.4], fov: 62 },

  // Industries: back out to a legible whole-object read.
  { beat: "industries", at: 0.5, pos: [1.4, 1.9, 11.4], look: [-1.6, 0, 0], fov: 40 },

  // Infinite: dead centre, lens wide, falling in.
  { beat: "infinite", at: 0.5, pos: [0, 0, 5.4], look: [0, 0, 0], fov: 68 },

  // Process: emerge, high and wide.
  { beat: "process", at: 0.5, pos: [-4.4, 3.4, 14.2], look: [0, 0.4, 0], fov: 42, roll: -0.012 },

  // Kinetic type: long throw, Core small and quiet behind the words.
  { beat: "kinetic", at: 0.5, pos: [0, 0, 22], look: [0, 0, 0], fov: 34 },

  // Final approach.
  { beat: "cta", at: 1, pos: [0, 0, 8.2], look: [0, 0, 0], fov: 38 },
];

/** Absolute scroll position of a camera key, derived from the beat table. */
const keyT = (k: CamKey) => {
  const b = beat(k.beat);
  return b.from + (b.to - b.from) * k.at;
};

/** Catmull-Rom through the keys, so the path has no visible corners. */
export function sampleCamera(t: number) {
  const p = clamp01(t);
  const keys = CAMERA_PATH;

  let i = 0;
  while (i < keys.length - 2 && p > keyT(keys[i + 1])) i++;

  const k0 = keys[Math.max(0, i - 1)];
  const k1 = keys[i];
  const k2 = keys[Math.min(keys.length - 1, i + 1)];
  const k3 = keys[Math.min(keys.length - 1, i + 2)];

  const t1 = keyT(k1);
  const t2 = keyT(k2);
  const span = t2 - t1 || 1;
  const local = easeCine(clamp01((p - t1) / span));

  const cr = (a: number, b: number, c: number, d: number, u: number) => {
    const u2 = u * u;
    const u3 = u2 * u;
    return (
      0.5 *
      (2 * b +
        (-a + c) * u +
        (2 * a - 5 * b + 4 * c - d) * u2 +
        (-a + 3 * b - 3 * c + d) * u3)
    );
  };

  const axis = (sel: 0 | 1 | 2, key: "pos" | "look") =>
    cr(k0[key][sel], k1[key][sel], k2[key][sel], k3[key][sel], local);

  return {
    px: axis(0, "pos"),
    py: axis(1, "pos"),
    pz: axis(2, "pos"),
    lx: axis(0, "look"),
    ly: axis(1, "look"),
    lz: axis(2, "look"),
    fov: cr(k0.fov, k1.fov, k2.fov, k3.fov, local),
    roll: cr(k0.roll ?? 0, k1.roll ?? 0, k2.roll ?? 0, k3.roll ?? 0, local),
  };
}
