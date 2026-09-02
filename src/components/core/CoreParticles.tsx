"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { buildPoints } from "@/lib/lattice";
import { POINTS_VERT, POINTS_FRAG } from "@/lib/shaders";
import { U } from "./uniforms";
import type { Budget } from "@/lib/perf";

/**
 * The Core's mass. Additively blended, depth-tested but not depth-written, so
 * the volume reads as translucent rather than as a wall of dots.
 */
export function CoreParticles({ budget }: { budget: Budget }) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const data = useMemo(() => buildPoints(budget.points), [budget.points]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.position, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.seed, 1));
    g.setAttribute("aLayer", new THREE.BufferAttribute(data.layer, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(data.scale, 1));
    // The shader throws points far out during assembly, so the auto-computed
    // bounds would cull the whole cloud mid-sequence.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 80);
    return g;
  }, [data]);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader: POINTS_VERT,
      fragmentShader: POINTS_FRAG,
      uniforms: {
        ...U,
        uSize: { value: 0.92 },
        uPixelRatio: { value: 1 },
        uOpacity: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });
    return m;
  }, []);

  useFrame(() => {
    material.uniforms.uPixelRatio.value = Math.min(viewport.dpr ?? 1, 2);
  });

  // Geometry and material are owned here, so they are released here.
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
