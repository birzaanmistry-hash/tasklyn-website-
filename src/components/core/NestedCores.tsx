"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { buildStruts, buildPaths } from "@/lib/lattice";
import { frame } from "@/lib/store";
import type { Budget } from "@/lib/perf";

/**
 * Infinite computational depth, built from a fixed number of objects.
 *
 * Each shell is a copy of the lattice at scale RATIO^(i - depth). As `depth`
 * advances by one, shell i lands exactly where shell i-1 used to be, so the
 * set can be recycled forever: the visitor falls through endless nested systems
 * while the GPU draws five.
 *
 * The shells are struts and pathways only. Adding the full point mass to each
 * copy looked better in a still frame and cost six times the fill rate, which
 * is not a trade worth making for a moment the visitor is falling through.
 */

const RATIO = 0.27;

function NestedShell({
  index,
  budget,
}: {
  index: number;
  budget: Budget;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);

  // A cheaper lattice than the hero Core: these are seen in motion, at speed.
  const lean = useMemo<Budget>(
    () => ({ ...budget, struts: Math.round(budget.struts * 0.4), paths: Math.round(budget.paths * 0.35) }),
    [budget]
  );

  const struts = useMemo(() => buildStruts(lean), [lean]);
  const paths = useMemo(() => buildPaths(lean), [lean]);

  const strutGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(1, 1, 1, 4, 1, true);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return g;
  }, []);

  const strutMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#1c5c9e"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(paths.position, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return g;
  }, [paths]);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#0080ff"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < struts.count; i++) m.setMatrixAt(i, struts.matrices[i]);
    m.instanceMatrix.needsUpdate = true;
    m.frustumCulled = false;
  }, [struts]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const depth = frame.depth;
    // Recycle: keep the exponent inside a window around the camera instead of
    // letting shells run away to 1e-9 or 1e9.
    const span = 5;
    let e = index - depth;
    while (e < -1.6) e += span;
    while (e > span - 1.6) e -= span;

    const scale = Math.pow(RATIO, e);
    g.scale.setScalar(scale);
    g.rotation.y += delta * 0.05 * (index % 2 === 0 ? 1 : -1);
    g.rotation.x = index * 0.31;

    // Visible only while the visitor is actually inside the recursion, and only
    // in the size band where a shell reads as architecture rather than as a
    // speck or a wall.
    const active = Math.min(1, frame.depth * 1.6);
    const band =
      Math.min(1, Math.max(0, (scale - 0.012) / 0.06)) *
      Math.min(1, Math.max(0, (5.5 - scale) / 2.4));

    const a = active * band;
    strutMat.opacity = a * 0.5;
    lineMat.opacity = a * 0.4;
    g.visible = a > 0.004;
  });

  useEffect(
    () => () => {
      strutGeo.dispose();
      strutMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    },
    [strutGeo, strutMat, lineGeo, lineMat]
  );

  return (
    <group ref={group}>
      <instancedMesh
        ref={mesh}
        args={[strutGeo, strutMat, struts.count]}
        frustumCulled={false}
      />
      <lineSegments ref={lines} geometry={lineGeo} material={lineMat} frustumCulled={false} />
    </group>
  );
}

export function NestedCores({ budget }: { budget: Budget }) {
  const shells = Array.from({ length: budget.shells }, (_, i) => i);
  return (
    <group>
      {shells.map((i) => (
        <NestedShell key={i} index={i} budget={budget} />
      ))}
    </group>
  );
}
