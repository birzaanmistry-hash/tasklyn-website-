"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { buildNodes } from "@/lib/lattice";
import { SOLID_VERT, SOLID_FRAG } from "@/lib/shaders";
import { U } from "./uniforms";
import { AGENTS } from "@/lib/content";
import { readState, frame } from "@/lib/store";
import type { Budget } from "@/lib/perf";

/**
 * Node modules: the working parts seated on the lattice.
 *
 * Seven of them are the named agents. Selecting an agent raises that node's
 * activation, which the shared shader turns into heat, so the Core reorganises
 * its light around whichever agent the visitor is looking at.
 */
export function CoreNodes({
  budget,
  onPositions,
}: {
  budget: Budget;
  onPositions?: (p: THREE.Vector3[]) => void;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => buildNodes(budget), [budget]);
  const activation = useRef(new Float32Array(data.count));

  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 80);
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: SOLID_VERT,
        fragmentShader: SOLID_FRAG,
        uniforms: { ...U, uOpacity: { value: 1 }, uFresnelPow: { value: 1.35 } },
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
    m.geometry.setAttribute(
      "aActive",
      new THREE.InstancedBufferAttribute(activation.current, 1)
    );
    m.geometry.setAttribute("aShell", new THREE.InstancedBufferAttribute(data.shell, 1));
    m.frustumCulled = false;
    onPositions?.(data.agentPositions);
  }, [data, onPositions]);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const attr = m.geometry.getAttribute("aActive") as THREE.InstancedBufferAttribute;
    if (!attr) return;

    const selected = readState().agent;
    const selIndex = selected ? AGENTS.findIndex((a) => a.id === selected) : -1;
    const k = Math.min(1, delta * 4.5);
    let dirty = false;

    for (let i = 0; i < data.count; i++) {
      // Agents idle with a slow, offset shimmer so the shell is never static.
      const isAgent = i < AGENTS.length;
      const idle = isAgent ? 0.1 + Math.sin(frame.time * 0.7 + i * 1.7) * 0.06 : 0.02;
      const target = i === selIndex ? 1 : idle;
      const next = activation.current[i] + (target - activation.current[i]) * k;
      if (Math.abs(next - activation.current[i]) > 0.0004) dirty = true;
      activation.current[i] = next;
    }
    if (dirty) attr.needsUpdate = true;
  });

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
