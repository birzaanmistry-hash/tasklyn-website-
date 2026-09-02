"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sampleCamera, clamp01, easeCine, lerp } from "@/lib/choreography";
import { frame, readState } from "@/lib/store";
import { U } from "./uniforms";

/**
 * The camera is the narrator.
 *
 * Two paths feed it. During the opening sequence it follows the authored shot
 * list below. After that, scroll position drives it along the journey defined
 * in lib/choreography. The handover is a blend, not a cut, so the film never
 * visibly changes hands.
 */

type Shot = { t: number; z: number; fov: number; lookZ: number; drift: number };

/**
 * The opening shot list. Distances are extreme on purpose: 130 units out is far
 * enough that a 4-unit object is a single pixel, which is the whole point of
 * the first shot.
 */
const INTRO_SHOTS: Shot[] = [
  { t: 0.0, z: 132, fov: 26, lookZ: 0, drift: 0 }, // the void
  { t: 0.14, z: 121, fov: 26, lookZ: 0, drift: 0.1 }, // one point, pulsing
  { t: 0.3, z: 74, fov: 32, lookZ: 0, drift: 0.35 }, // structure implied
  { t: 0.4, z: 26, fov: 48, lookZ: 0, drift: 0.6 }, // approach
  { t: 0.46, z: 1.1, fov: 88, lookZ: -3, drift: 0.9 }, // through it
  { t: 0.51, z: -3.4, fov: 92, lookZ: -8, drift: 0.7 }, // out the far side
  { t: 0.56, z: 24.5, fov: 40, lookZ: 0, drift: 0.2 }, // pull back, reveal
  { t: 0.73, z: 21.5, fov: 38, lookZ: 0, drift: 0 }, // frozen, initialising
  { t: 0.81, z: 20.5, fov: 37, lookZ: 0, drift: 0 }, // collapse
  { t: 0.91, z: 18.8, fov: 38, lookZ: 0, drift: 0.02 }, // expansion, title
  { t: 1.0, z: 17.5, fov: 38, lookZ: 0, drift: 0.05 }, // settle into the hero
];

function sampleIntro(t: number) {
  const p = clamp01(t);
  let i = 0;
  while (i < INTRO_SHOTS.length - 2 && p > INTRO_SHOTS[i + 1].t) i++;
  const a = INTRO_SHOTS[i];
  const b = INTRO_SHOTS[i + 1];
  const span = b.t - a.t || 1;

  // The pass through the Core is the one move that should feel violent, so it
  // gets a hard acceleration curve instead of the house ease.
  const raw = clamp01((p - a.t) / span);
  const k = i === 3 || i === 4 ? raw * raw * raw : easeCine(raw);

  return {
    z: lerp(a.z, b.z, k),
    fov: lerp(a.fov, b.fov, k),
    lookZ: lerp(a.lookZ, b.lookZ, k),
    drift: lerp(a.drift, b.drift, k),
  };
}

const _target = new THREE.Vector3();
const _desired = new THREE.Vector3();

export function CoreCamera() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const shake = useRef(0);

  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const dt = Math.min(delta, 0.05);
    const reduced = readState().reduced;

    const intro = readState().phase === "live" ? 1 : frame.intro;
    const scrollCam = sampleCamera(frame.scroll);

    if (intro < 1) {
      // --- opening sequence -------------------------------------------
      const s = sampleIntro(intro);

      // Drift gives the long approach a sense of travelling through a volume
      // rather than dollying down a rail.
      const wobble = reduced ? 0 : s.drift;
      _desired.set(
        Math.sin(intro * 5.1) * 1.35 * wobble,
        Math.cos(intro * 3.7) * 0.9 * wobble,
        s.z
      );
      _target.set(0, 0, s.lookZ);

      // Blend into the scroll path over the last 12% so the handover is soft.
      const handover = clamp01((intro - 0.93) / 0.07);
      if (handover > 0) {
        _desired.lerp(
          _target.set(scrollCam.px, scrollCam.py, scrollCam.pz).clone(),
          handover
        );
        _target.set(scrollCam.lx, scrollCam.ly, scrollCam.lz);
      }

      cam.position.copy(_desired);
      cam.fov = lerp(s.fov, scrollCam.fov, handover);

      // A short kick as the camera punches out of the structure.
      shake.current = intro > 0.46 && intro < 0.57 && !reduced ? 0.05 : shake.current * 0.86;
    } else {
      // --- scroll-driven journey ---------------------------------------
      _desired.set(scrollCam.px, scrollCam.py, scrollCam.pz);
      _target.set(scrollCam.lx, scrollCam.ly, scrollCam.lz);

      // Parallax. The camera leans with the pointer, which is what makes the
      // page feel like a space instead of a flat surface. Never enough to
      // fight the authored framing.
      if (!reduced) {
        const lean = 0.55 * frame.presence;
        _desired.x += frame.ex * lean;
        _desired.y += frame.ey * lean * 0.7;
      }

      // Fast scrolling pushes the camera back slightly, the way a operator
      // pulls out when the subject moves. Reads as momentum, not as lag.
      _desired.z += Math.min(2.4, Math.abs(frame.velocity) * 7);

      // Critically damped follow, so the camera has weight.
      const k = 1 - Math.pow(0.0015, dt);
      cam.position.lerp(_desired, k);
      cam.fov += (scrollCam.fov - cam.fov) * k;
      shake.current *= 0.9;
    }

    look.current.lerp(_target, 1 - Math.pow(0.004, dt));
    cam.lookAt(look.current);

    // Roll last, so lookAt does not undo it.
    const roll = intro < 1 ? 0 : scrollCam.roll;
    cam.rotateZ(roll + (shake.current ? (Math.random() - 0.5) * shake.current : 0));

    cam.updateProjectionMatrix();

    // The pointer target lives in front of the camera at roughly the Core's
    // distance, so the Core leans toward the cursor in screen space.
    const dist = cam.position.length();
    U.uPointer.value.set(
      frame.ex * dist * 0.42,
      frame.ey * dist * 0.32,
      0
    );
  });

  return null;
}
