"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sampleCamera, clamp01, easeCine, lerp, smoothstep, progress } from "@/lib/choreography";
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
 * The opening shot list.
 *
 * The film opens already in motion. An earlier cut held on an almost-empty
 * frame for the first second and a half, which reads as a site that has not
 * loaded rather than as a establishing shot, and it was the main reason people
 * reached for Skip.
 */
const INTRO_SHOTS: Shot[] = [
  { t: 0.0, z: 86, fov: 30, lookZ: 0, drift: 0.18 }, // already moving
  { t: 0.12, z: 62, fov: 34, lookZ: 0, drift: 0.4 }, // structure resolving
  { t: 0.3, z: 24, fov: 50, lookZ: 0, drift: 0.72 }, // hard approach
  { t: 0.42, z: 1.1, fov: 88, lookZ: -3, drift: 0.9 }, // through it
  { t: 0.5, z: -3.4, fov: 92, lookZ: -8, drift: 0.7 }, // out the far side
  { t: 0.58, z: 24.5, fov: 40, lookZ: 0, drift: 0.2 }, // pull back, reveal
  { t: 0.72, z: 21.5, fov: 38, lookZ: 0, drift: 0 }, // still, initialising
  { t: 0.8, z: 20.5, fov: 37, lookZ: 0, drift: 0 }, // collapse
  { t: 0.9, z: 18.8, fov: 38, lookZ: 0, drift: 0.02 }, // expansion, title
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
  const k = i === 2 || i === 3 ? raw * raw * raw : easeCine(raw);

  return {
    z: lerp(a.z, b.z, k),
    fov: lerp(a.fov, b.fov, k),
    lookZ: lerp(a.lookZ, b.lookZ, k),
    drift: lerp(a.drift, b.drift, k),
  };
}

const _target = new THREE.Vector3();
const _desired = new THREE.Vector3();
const _scrollPos = new THREE.Vector3();

/**
 * How portrait the screen is: 0 on a landscape or square screen, rising to 1 on
 * a tall phone.
 *
 * The whole camera path was authored for a landscape screen. On a 390x844 phone
 * the same distance leaves the Core wider than the screen, so what you see is a
 * cropped slab of dots rather than an object.
 */
const portraitness = (aspect: number) => (aspect >= 1 ? 0 : clamp01((1 - aspect) / 0.58));

/**
 * Pull the camera back, in proportion to how portrait the screen is, so the
 * whole Core fits across the narrow axis.
 *
 * Only while the camera is outside the shell. Inside it (the live-execution
 * beat) pulling back would put the camera outside the very object it is meant
 * to be inside, so those shots are left alone.
 */
function fitPortrait(pos: THREE.Vector3, p: number) {
  if (p <= 0) return;
  const outside = smoothstep((pos.length() - 4.6) / 4.4);
  pos.multiplyScalar(1 + p * 0.62 * outside);
}

export function CoreCamera() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const shake = useRef(0);

  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const dt = Math.min(delta, 0.05);
    const st = readState();
    const reduced = st.reduced;

    // --- ambient pages ------------------------------------------------
    // A slow, wide orbit. The Core is company for the copy, not the subject,
    // so it never comes close and never changes shape.
    if (st.mode === "ambient") {
      const t = frame.time * (reduced ? 0 : 0.055);
      const r = 19.5;
      _desired.set(
        Math.sin(t) * r + (reduced ? 0 : frame.ex * 0.9),
        1.4 + (reduced ? 0 : frame.ey * 0.7),
        Math.cos(t) * r
      );
      _target.set(0, 0, 0);

      const k = 1 - Math.pow(0.02, dt);
      cam.position.lerp(_desired, k);
      look.current.lerp(_target, k);
      cam.lookAt(look.current);
      cam.fov += (36 - cam.fov) * k;
      cam.updateProjectionMatrix();

      const d = cam.position.length();
      U.uPointer.value.set(frame.ex * d * 0.4, frame.ey * d * 0.3, 0);
      return;
    }

    const intro = st.phase === "live" ? 1 : frame.intro;
    const scrollCam = sampleCamera(frame.scroll);

    const port = portraitness(cam.aspect);
    // On a phone the hero copy sits in the lower half of the screen, so the
    // Core is framed in the upper half: the camera aims a little below it.
    // That bias dies away as the hero scrolls out of view.
    const heroBias = port * (1 - smoothstep(progress(frame.scroll, "hero") * 1.6)) * 3;

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
      fitPortrait(_desired, port);

      // Blend into the scroll path over the last 12% so the handover is soft.
      const handover = clamp01((intro - 0.93) / 0.07);
      if (handover > 0) {
        _scrollPos.set(scrollCam.px, scrollCam.py, scrollCam.pz);
        fitPortrait(_scrollPos, port);
        _desired.lerp(_scrollPos, handover);
        _target.set(scrollCam.lx, scrollCam.ly - heroBias, scrollCam.lz);
      }

      cam.position.copy(_desired);
      cam.fov = lerp(s.fov, scrollCam.fov * (1 + port * 0.2), handover);

      // A short kick as the camera punches out of the structure.
      shake.current = intro > 0.42 && intro < 0.55 && !reduced ? 0.05 : shake.current * 0.86;
    } else {
      // --- scroll-driven journey ---------------------------------------
      _desired.set(scrollCam.px, scrollCam.py, scrollCam.pz);
      fitPortrait(_desired, port);
      _target.set(scrollCam.lx, scrollCam.ly - heroBias, scrollCam.lz);

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
      cam.fov += (scrollCam.fov * (1 + port * 0.2) - cam.fov) * k;
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
