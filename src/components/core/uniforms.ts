import * as THREE from "three";

/**
 * One uniform object, shared by reference across every Core material.
 *
 * This is deliberate: the points, the struts, the nodes and the pathways all
 * read the same numbers in the same frame, so the object can never tear into
 * parts that are mid-way through different animations.
 */

/**
 * The colour ramp. Tasklyn's accent (#0080FF) sits in the MIDDLE of this ramp,
 * which is where most of the Core's matter sits, so the accent stays the
 * dominant read of the page. The cyan end is the second stop of the existing
 * brand gradient and appears only where work is actively executing.
 */
export const COLD = new THREE.Color("#2f74c4");
export const HOT = new THREE.Color("#4fdcff");

export type CoreUniforms = {
  uTime: { value: number };
  uScroll: { value: number };
  uIntro: { value: number };
  uAssemble: { value: number };
  uFragment: { value: number };
  uOpen: { value: number };
  uCollapse: { value: number };
  uCharge: { value: number };
  uPresence: { value: number };
  uPointer: { value: THREE.Vector3 };
  uShape: { value: THREE.Vector3 };
  uDepth: { value: number };
  uStill: { value: number };
  uCold: { value: THREE.Color };
  uHot: { value: THREE.Color };
};

export function createCoreUniforms(): CoreUniforms {
  return {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uIntro: { value: 0 },
    uAssemble: { value: 0 },
    uFragment: { value: 0 },
    uOpen: { value: 0 },
    uCollapse: { value: 0 },
    uCharge: { value: 0 },
    uPresence: { value: 0 },
    uPointer: { value: new THREE.Vector3(0, 0, 0) },
    uShape: { value: new THREE.Vector3(1, 0.35, 5) },
    uDepth: { value: 0 },
    uStill: { value: 0 },
    uCold: { value: COLD.clone() },
    uHot: { value: HOT.clone() },
  };
}

/** The live instance, created once and imported by every Core part. */
export const U = createCoreUniforms();
