import * as THREE from "three";
import type { Budget } from "./perf";
import { AGENTS } from "./content";

/**
 * Procedural geometry for the Tasklyn Core.
 *
 * The Core is a lattice engine: concentric geodesic shells of machined struts,
 * a volumetric point mass held inside them, node modules seated on the shell,
 * and stepped pathways that climb between shells carrying packets of work.
 *
 * The step is the brand motif. The Tasklyn mark is an ascending staircase, so
 * nothing inside the Core travels in a straight diagonal: it climbs in risers
 * and runs, the way the logo does.
 */

export const CORE_RADIUS = 4.35;
export const STRATA_COUNT = 4;

/** Deterministic PRNG so the Core is identical on every load and every device. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Which of the four strata a height belongs to. */
export function strataOf(y: number) {
  const t = (y + CORE_RADIUS) / (CORE_RADIUS * 2);
  return Math.min(STRATA_COUNT - 1, Math.max(0, Math.floor(t * STRATA_COUNT)));
}

/** Evenly distributed directions on a sphere, without polar clustering. */
function fibonacciSphere(count: number, out: THREE.Vector3[] = []) {
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = phi * i;
    out.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  point mass                                                         */
/* ------------------------------------------------------------------ */

export type PointData = {
  position: Float32Array;
  seed: Float32Array;
  layer: Float32Array;
  scale: Float32Array;
  count: number;
};

export function buildPoints(count: number): PointData {
  const rand = rng(20260902);
  const position = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const layer = new Float32Array(count);
  const scale = new Float32Array(count);

  // Four nested densities. The mass is not uniform: it is denser near the
  // shells and thins out between them, which is what makes it read as a built
  // object rather than a cloud.
  const bands = [0.34, 0.58, 0.79, 0.97];

  for (let i = 0; i < count; i++) {
    const band = bands[i % bands.length];
    const jitter = (rand() - 0.5) * 0.11;
    const r = CORE_RADIUS * (band + jitter);

    // Stratified sampling on the sphere keeps coverage even at low counts.
    const u = (i + rand()) / count;
    const y = 1 - u * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const th = Math.PI * (3 - Math.sqrt(5)) * i + rand() * 0.6;

    const x = Math.cos(th) * rad * r;
    const yy = y * r;
    const z = Math.sin(th) * rad * r;

    position[i * 3] = x;
    position[i * 3 + 1] = yy;
    position[i * 3 + 2] = z;

    seed[i] = rand();
    layer[i] = strataOf(yy);
    // A few grains are much larger, so the field has foreground and background
    // rather than one uniform sparkle.
    scale[i] = rand() < 0.045 ? 1.8 + rand() * 1.9 : 0.42 + rand() * 0.72;
  }

  return { position, seed, layer, scale, count };
}

/* ------------------------------------------------------------------ */
/*  struts                                                             */
/* ------------------------------------------------------------------ */

export type InstanceData = {
  matrices: THREE.Matrix4[];
  seed: Float32Array;
  layer: Float32Array;
  active: Float32Array;
  /** Which concentric shell an instance belongs to. Shells counter-rotate. */
  shell: Float32Array;
  count: number;
};

const UP = new THREE.Vector3(0, 1, 0);
const _q = new THREE.Quaternion();
const _dir = new THREE.Vector3();
const _mid = new THREE.Vector3();

function strutMatrix(a: THREE.Vector3, b: THREE.Vector3, thickness: number, fill = 0.84) {
  _dir.subVectors(b, a);
  const len = _dir.length();
  _mid.addVectors(a, b).multiplyScalar(0.5);
  _q.setFromUnitVectors(UP, _dir.normalize());
  // Struts stop short of each other. The gap is what makes the ring read as
  // machined segments rather than as a drawn circle.
  return new THREE.Matrix4().compose(
    _mid.clone(),
    _q.clone(),
    new THREE.Vector3(thickness, len * fill, thickness)
  );
}

/**
 * The armature.
 *
 * Three concentric shells, each built from latitude rings and meridian arcs,
 * with radial spokes tying them together. It is an armillary instrument rather
 * than a triangulated geodesic: rings hold a silhouette from every camera angle,
 * where a random triangulation reads as debris the moment it starts moving.
 *
 * Ring heights are quantised to the same step count the shader uses, so the
 * structure and the matter inside it settle onto the same levels. That is the
 * logo's staircase, expressed as architecture.
 */
export function buildStruts(budget: Budget): InstanceData {
  const rand = rng(7781);
  const matrices: THREE.Matrix4[] = [];
  const seeds: number[] = [];
  const layers: number[] = [];
  const actives: number[] = [];
  const shells: number[] = [];

  const push = (a: THREE.Vector3, b: THREE.Vector3, t: number, shell: number, fill?: number) => {
    matrices.push(strutMatrix(a, b, t, fill));
    seeds.push(rand());
    layers.push(strataOf((a.y + b.y) * 0.5));
    actives.push(0);
    shells.push(shell);
  };

  // Segment length is held roughly constant across every ring, so a strut near
  // the pole is the same physical size as one at the equator.
  const SEG = 0.42;

  const SHELLS = [
    { r: CORE_RADIUS, rings: 9, meridians: 8, t: 0.032, w: 0.46 },
    { r: CORE_RADIUS * 0.67, rings: 7, meridians: 6, t: 0.026, w: 0.32 },
    { r: CORE_RADIUS * 0.36, rings: 5, meridians: 5, t: 0.021, w: 0.22 },
  ];

  const cap = budget.struts;

  for (let si = 0; si < SHELLS.length; si++) {
    const sh = SHELLS[si];
    const quota = Math.round(cap * sh.w);
    let used = 0;

    // --- latitude rings ------------------------------------------------
    for (let i = 0; i < sh.rings; i++) {
      // Rings sit on quantised levels, skipping the poles where a ring would
      // collapse to a dot.
      const h = ((i + 0.5) / sh.rings) * 2 - 1;
      const y = h * sh.r * 0.94;
      const rad = Math.sqrt(Math.max(0.02, sh.r * sh.r - y * y));

      const segs = Math.max(6, Math.round((2 * Math.PI * rad) / SEG));
      const phase = rand() * Math.PI * 2;

      for (let k = 0; k < segs; k++) {
        if (used >= quota) break;
        const a0 = phase + (k / segs) * Math.PI * 2;
        const a1 = phase + ((k + 1) / segs) * Math.PI * 2;
        push(
          new THREE.Vector3(Math.cos(a0) * rad, y, Math.sin(a0) * rad),
          new THREE.Vector3(Math.cos(a1) * rad, y, Math.sin(a1) * rad),
          sh.t,
          si
        );
        used++;
      }
    }

    // --- meridian arcs --------------------------------------------------
    // Partial arcs, not full pole-to-pole circles: a complete meridian cage
    // looks like a wireframe globe, which is the cliche this has to avoid.
    for (let m = 0; m < sh.meridians; m++) {
      const az = (m / sh.meridians) * Math.PI * 2 + rand() * 0.4;
      const from = -0.62 + rand() * 0.3;
      const to = 0.62 - rand() * 0.3;
      const steps = Math.max(4, Math.round(((to - from) * Math.PI * sh.r) / SEG));

      for (let k = 0; k < steps; k++) {
        if (used >= quota) break;
        const p0 = from + ((to - from) * k) / steps;
        const p1 = from + ((to - from) * (k + 1)) / steps;
        const pt = (p: number) => {
          const el = p * Math.PI * 0.5;
          const rr = Math.cos(el) * sh.r;
          return new THREE.Vector3(Math.cos(az) * rr, Math.sin(el) * sh.r, Math.sin(az) * rr);
        };
        push(pt(p0), pt(p1), sh.t * 0.85, si);
        used++;
      }
    }

    // --- radial spokes ---------------------------------------------------
    // Short connectors that tie this shell to the one inside it, so the shells
    // read as one mechanism rather than three separate objects.
    if (si < SHELLS.length - 1) {
      const inner = SHELLS[si + 1];
      const spokes = 10;
      for (let k = 0; k < spokes; k++) {
        if (used >= quota) break;
        const az = (k / spokes) * Math.PI * 2 + si * 0.4;
        const el = (rand() - 0.5) * 1.1;
        const dir = new THREE.Vector3(
          Math.cos(az) * Math.cos(el),
          Math.sin(el),
          Math.sin(az) * Math.cos(el)
        );
        push(
          dir.clone().multiplyScalar(inner.r),
          dir.clone().multiplyScalar(sh.r),
          sh.t * 0.7,
          si,
          0.92
        );
        used++;
      }
    }
  }

  return {
    matrices,
    seed: new Float32Array(seeds),
    layer: new Float32Array(layers),
    active: new Float32Array(actives),
    shell: new Float32Array(shells),
    count: matrices.length,
  };
}

/* ------------------------------------------------------------------ */
/*  node modules                                                       */
/* ------------------------------------------------------------------ */

export type NodeData = InstanceData & {
  /** World position of each agent node, for camera targeting and hit tests. */
  agentPositions: THREE.Vector3[];
};

/**
 * Node modules are the working parts seated on the lattice. Seven of them are
 * the named agents and sit at authored positions; the rest are structural and
 * fill the shell so the agents do not read as seven lonely dots.
 */
export function buildNodes(budget: Budget): NodeData {
  const rand = rng(99117);
  const matrices: THREE.Matrix4[] = [];
  const seeds: number[] = [];
  const layers: number[] = [];
  const actives: number[] = [];
  const shellIdx: number[] = [];
  const agentPositions: THREE.Vector3[] = [];

  const place = (p: THREE.Vector3, size: number, isAgent: boolean) => {
    // Modules lie flat against the shell, facing outward.
    const q = new THREE.Quaternion().setFromUnitVectors(UP, p.clone().normalize());
    matrices.push(
      new THREE.Matrix4().compose(
        p.clone(),
        q,
        new THREE.Vector3(size, size * 0.34, size * (isAgent ? 1.35 : 0.82))
      )
    );
    seeds.push(rand());
    layers.push(strataOf(p.y));
    actives.push(0);
    // Modules ride the shell they are seated on, so they rotate with it.
    shellIdx.push(p.length() > CORE_RADIUS * 0.85 ? 0 : 1);
  };

  // The seven agents, at their authored coordinates on the outer shell.
  const agentR = CORE_RADIUS * 0.99;
  for (const a of AGENTS) {
    const y = a.h * agentR * 0.82;
    const ring = Math.sqrt(Math.max(0.04, agentR * agentR - y * y));
    const p = new THREE.Vector3(Math.cos(a.theta) * ring, y, Math.sin(a.theta) * ring);
    agentPositions.push(p.clone());
    place(p, 0.3, true);
  }

  // Structural modules across both outer shells.
  const filler = Math.max(0, budget.nodes - AGENTS.length);
  const dirs = fibonacciSphere(filler);
  for (let i = 0; i < filler; i++) {
    const r = agentR * (i % 3 === 0 ? 0.67 : 0.99);
    const p = dirs[i].multiplyScalar(r);
    // Keep structural modules clear of the agent seats.
    const tooClose = agentPositions.some((a) => a.distanceTo(p) < 0.72);
    if (tooClose) continue;
    place(p, 0.1 + rand() * 0.12, false);
  }

  return {
    matrices,
    seed: new Float32Array(seeds),
    layer: new Float32Array(layers),
    active: new Float32Array(actives),
    shell: new Float32Array(shellIdx),
    count: matrices.length,
    agentPositions,
  };
}

/* ------------------------------------------------------------------ */
/*  stepped pathways                                                   */
/* ------------------------------------------------------------------ */

export type PathData = {
  position: Float32Array;
  seed: Float32Array;
  layer: Float32Array;
  t: Float32Array;
  line: Float32Array;
  count: number;
};

/**
 * A pathway climbs from an inner point to an outer one in risers and runs,
 * echoing the staircase in the Tasklyn mark. Straight diagonals were tried and
 * read as a generic node graph; the steps are what make it look like Tasklyn.
 */
function steppedPath(a: THREE.Vector3, b: THREE.Vector3, steps: number) {
  const pts: THREE.Vector3[] = [a.clone()];
  const cur = a.clone();

  for (let i = 0; i < steps; i++) {
    const t = (i + 1) / steps;
    const target = a.clone().lerp(b, t);

    // Run: move across, holding height.
    const run = new THREE.Vector3(target.x, cur.y, target.z);
    pts.push(run);

    // Riser: move up, holding position.
    const riser = new THREE.Vector3(target.x, target.y, target.z);
    pts.push(riser);

    cur.copy(riser);
  }
  return pts;
}

export function buildPaths(budget: Budget): PathData {
  const rand = rng(31337);
  const inner = fibonacciSphere(budget.paths).map((v) =>
    v.clone().multiplyScalar(CORE_RADIUS * 0.3)
  );
  const outer = fibonacciSphere(budget.paths).map((v) =>
    v.clone().multiplyScalar(CORE_RADIUS * 0.96)
  );

  const pos: number[] = [];
  const seed: number[] = [];
  const layer: number[] = [];
  const tArr: number[] = [];
  const lineArr: number[] = [];

  for (let i = 0; i < budget.paths; i++) {
    // Pair inner to a rotated outer index so pathways cross the volume instead
    // of radiating straight out like a sea urchin.
    const j = (i * 7 + 3) % budget.paths;
    const steps = 3 + Math.floor(rand() * 3);
    const pts = steppedPath(inner[i], outer[j], steps);
    const s = rand();

    // Emit as segment pairs for LineSegments.
    for (let k = 0; k < pts.length - 1; k++) {
      const p0 = pts[k];
      const p1 = pts[k + 1];
      const t0 = k / (pts.length - 1);
      const t1 = (k + 1) / (pts.length - 1);

      pos.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      seed.push(s, s);
      layer.push(strataOf(p0.y), strataOf(p1.y));
      tArr.push(t0, t1);
      lineArr.push(i, i);
    }
  }

  return {
    position: new Float32Array(pos),
    seed: new Float32Array(seed),
    layer: new Float32Array(layer),
    t: new Float32Array(tArr),
    line: new Float32Array(lineArr),
    count: pos.length / 3,
  };
}
