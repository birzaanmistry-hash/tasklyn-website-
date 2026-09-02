"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { frame, readState } from "@/lib/store";
import { progress, clamp01, smoothstep } from "@/lib/choreography";
import { INDUSTRIES } from "@/lib/content";
import { U } from "./uniforms";

/**
 * Translates scroll position into the Core's state.
 *
 * Everything the Core does is decided here and nowhere else, which is why the
 * object never contradicts the copy sitting on top of it: the same scroll value
 * that fades in the words "your business is full of work" is the value that
 * pulls the Core apart.
 */
export function CoreDriver() {
  const shape = useRef({ x: 1, y: 0.35, z: 5 });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const st = readState();
    const ambient = st.mode === "ambient";
    // In ambient mode the beats are not on the page, so scroll must not be
    // allowed to drive them. Pinning it at 0 keeps the Core whole and closed.
    const s = ambient ? 0 : frame.scroll;
    const reduced = st.reduced;

    frame.time += dt;

    // Once the page is live the opening is over, whatever frame.intro says.
    const intro = ambient || st.phase === "live" ? 1 : frame.intro;

    // Eased pointer. The Core lags the cursor by design; snapping to it makes
    // the object feel weightless.
    const follow = 1 - Math.pow(0.002, dt);
    frame.ex += (frame.px - frame.ex) * follow;
    frame.ey += (frame.py - frame.ey) * follow;

    U.uTime.value = frame.time;
    U.uScroll.value = s;
    U.uIntro.value = intro;
    U.uPresence.value = reduced ? 0 : frame.presence;

    // --- assembly ------------------------------------------------------
    // The Core builds itself during the opening and stays built afterwards.
    const assembled = intro >= 1 ? 1 : smoothstep(clamp01((intro - 0.015) / 0.34));
    U.uAssemble.value += (assembled - U.uAssemble.value) * Math.min(1, dt * 6);

    // --- fragmentation --------------------------------------------------
    // Rises as the business comes apart, falls as Tasklyn reconnects it.
    const apart = smoothstep(clamp01(progress(s, "fragment") / 0.62));
    const back = smoothstep(clamp01(progress(s, "rewire") / 0.7));
    const fragment = Math.max(0, apart - back) * (intro >= 1 ? 1 : 0);
    U.uFragment.value += (fragment - U.uFragment.value) * Math.min(1, dt * 3.4);

    // --- strata ---------------------------------------------------------
    // The Core opens for the layers beat and stays open while we are inside it,
    // then closes as we pull out for industries.
    const opening = smoothstep(clamp01(progress(s, "layers") / 0.55));
    const closing = smoothstep(clamp01((progress(s, "industries") - 0.05) / 0.4));
    const open = Math.max(0, opening - closing);
    U.uOpen.value += (open - U.uOpen.value) * Math.min(1, dt * 3.2);

    // --- collapse -------------------------------------------------------
    // Owned entirely by the opening sequence. Nothing in the scroll journey
    // repeats it, because the moment only lands once.
    let collapse = 0;
    if (intro > 0.72 && intro < 0.94) {
      const c = (intro - 0.72) / 0.22;
      // In fast, out faster, with the singularity held for a beat at the top.
      collapse = c < 0.55 ? smoothstep(c / 0.55) : 1 - Math.pow((c - 0.55) / 0.45, 0.55);
    }
    U.uCollapse.value = reduced ? 0 : clamp01(collapse);

    // --- recursion ------------------------------------------------------
    // The infinite beat drives depth forward, then reverses as the camera
    // climbs back out through every layer it fell through.
    const dive = progress(s, "infinite");
    const depth = dive < 0.66 ? (dive / 0.66) * 3.0 : (1 - (dive - 0.66) / 0.34) * 3.0;
    frame.depth += (depth - frame.depth) * Math.min(1, dt * 4);
    U.uDepth.value = frame.depth;

    // --- stillness ------------------------------------------------------
    // The brief for the close is that the system stops. Everything the Core is
    // doing winds down over the final beat, which gives the last question the
    // frame to itself and, incidentally, puts the copy on near-black ground.
    const still = smoothstep(clamp01((progress(s, "cta") - 0.3) / 0.45));
    U.uStill.value += (still - U.uStill.value) * Math.min(1, dt * 2.2);

    // --- charge ---------------------------------------------------------
    U.uCharge.value += (frame.charge - U.uCharge.value) * Math.min(1, dt * 5);

    // --- industry shape --------------------------------------------------
    const ind = INDUSTRIES.find((i) => i.id === st.industry) ?? INDUSTRIES[0];
    const k = Math.min(1, dt * 2.2);
    shape.current.x += (ind.shape.spread - shape.current.x) * k;
    shape.current.y += (ind.shape.twist - shape.current.y) * k;
    shape.current.z += (ind.shape.rings - shape.current.z) * k;
    U.uShape.value.set(shape.current.x, shape.current.y, shape.current.z);
  });

  return null;
}
