"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { buildPaths } from "@/lib/lattice";
import { PATH_VERT, PATH_FRAG } from "@/lib/shaders";
import { U } from "./uniforms";
import { frame } from "@/lib/store";
import { progress } from "@/lib/choreography";
import type { Budget } from "@/lib/perf";

/**
 * The pathways, and the packets of work that travel them.
 *
 * `uActivity` is how much of the system is awake. It rises through the page:
 * almost nothing during the fragmented beat, everything during live execution
 * and at the final CTA. That is the argument the page is making, expressed as
 * light rather than as a claim.
 */
export function CoreConnections({ budget }: { budget: Budget }) {
  const ref = useRef<THREE.LineSegments>(null);
  const data = useMemo(() => buildPaths(budget), [budget]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.position, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.seed, 1));
    g.setAttribute("aLayer", new THREE.BufferAttribute(data.layer, 1));
    g.setAttribute("aT", new THREE.BufferAttribute(data.t, 1));
    g.setAttribute("aLine", new THREE.BufferAttribute(data.line, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 80);
    return g;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: PATH_VERT,
        fragmentShader: PATH_FRAG,
        uniforms: {
          ...U,
          uOpacity: { value: 1 },
          uFlow: { value: 0.16 },
          uActivity: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((_, delta) => {
    const s = frame.scroll;

    // How much of the system is executing, beat by beat.
    let activity = 0.12;
    activity = Math.max(activity, 0.06 + progress(s, "rewire") * 0.5);
    activity = Math.max(activity, 0.35 + progress(s, "layers") * 0.25);
    activity = Math.max(activity, 0.55 + progress(s, "agents") * 0.2);
    if (s >= 0.5) activity = Math.max(activity, 0.85);
    // The fragmented business is mostly dark: the wiring exists but carries
    // almost nothing.
    activity *= 1 - progress(s, "fragment") * 0.82 * (1 - progress(s, "rewire"));
    activity = Math.max(activity, frame.intro * 0.9);

    // Work stops travelling as the system comes to rest at the close.
    activity *= 1 - U.uStill.value;

    const u = material.uniforms;
    u.uActivity.value += (activity - u.uActivity.value) * Math.min(1, delta * 3);

    // Packets move faster the more of the system is awake, and faster again
    // while the visitor is scrolling. Execution should feel urgent.
    const targetFlow =
      (0.1 + u.uActivity.value * 0.34 + Math.abs(frame.velocity) * 0.5) *
      (1 - U.uStill.value * 0.9);
    u.uFlow.value += (targetFlow - u.uFlow.value) * Math.min(1, delta * 2.4);
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return <lineSegments ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
