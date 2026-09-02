"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { LAYERS } from "@/lib/content";
import { U } from "./uniforms";
import { frame } from "@/lib/store";

/**
 * The four strata.
 *
 * These rings only exist while the Core is open. They are the cut lines of the
 * machine: they tell you the object has four decks and that what you are seeing
 * between them is one system, not four products.
 */
export function CoreStrata() {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.RingGeometry(4.25, 4.34, 96, 1), []);

  const materials = useMemo(
    () =>
      LAYERS.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("#0080ff"),
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
      ),
    []
  );

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const open = U.uOpen.value;

    g.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const lane = i - 1.5;
      mesh.position.y = lane * open * 2.05;

      // Rings tilt very slightly out of plane so they read as machined discs
      // catching light, not as flat UI circles pasted into the scene.
      mesh.rotation.x = -Math.PI / 2 + Math.sin(frame.time * 0.22 + i) * 0.05 * open;
      mesh.rotation.z = frame.time * 0.03 * (i % 2 === 0 ? 1 : -1);
      mesh.scale.setScalar((1 + open * 0.14) * (0.62 + i * 0.13));

      materials[i].opacity = open * 0.3;
    });
  });

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials]
  );

  return (
    <group ref={group}>
      {LAYERS.map((l, i) => (
        <mesh key={l.id} geometry={geometry} material={materials[i]} frustumCulled={false} />
      ))}
    </group>
  );
}
