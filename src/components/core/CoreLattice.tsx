"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildStruts } from "@/lib/lattice";
import { SOLID_VERT, SOLID_FRAG } from "@/lib/shaders";
import { U } from "./uniforms";
import type { Budget } from "@/lib/perf";

/**
 * The geodesic frame. Thin machined struts on three concentric shells.
 * This is the part that makes the Core read as built rather than grown.
 */
export function CoreLattice({ budget }: { budget: Budget }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => buildStruts(budget), [budget]);

  const geometry = useMemo(() => {
    // A four-sided prism, not a cylinder: fewer triangles and it catches the
    // rim light in flat facets, which looks machined instead of extruded.
    const g = new THREE.CylinderGeometry(1, 1, 1, 4, 1, true);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 80);
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: SOLID_VERT,
        fragmentShader: SOLID_FRAG,
        uniforms: { ...U, uOpacity: { value: 1 }, uFresnelPow: { value: 2.1 } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < data.count; i++) m.setMatrixAt(i, data.matrices[i]);
    m.instanceMatrix.needsUpdate = true;
    m.geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(data.seed, 1));
    m.geometry.setAttribute("aLayer", new THREE.InstancedBufferAttribute(data.layer, 1));
    m.geometry.setAttribute("aActive", new THREE.InstancedBufferAttribute(data.active, 1));
    m.geometry.setAttribute("aShell", new THREE.InstancedBufferAttribute(data.shell, 1));
    m.frustumCulled = false;
  }, [data]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, data.count]}
      frustumCulled={false}
    />
  );
}
