"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { U } from "./uniforms";
import { frame } from "@/lib/store";

/**
 * The point at the centre of the Core.
 *
 * For most of the film it is a small, dense, almost-black object with a bright
 * rim. During the collapse it becomes the only thing on screen. It is the one
 * part of the Core that does not run coreTransform, because it is the point
 * everything else collapses toward.
 */
export function CoreSingularity() {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
  const haloGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 3), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: U.uTime,
          uCollapse: U.uCollapse,
          uHot: U.uHot,
          uCold: U.uCold,
        },
        vertexShader: /* glsl */ `
          varying vec3 vN;
          varying vec3 vV;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform float uTime;
          uniform float uCollapse;
          uniform vec3 uHot;
          uniform vec3 uCold;
          varying vec3 vN;
          varying vec3 vV;
          void main(){
            float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.6);
            // Dense and dark face-on, incandescent at the silhouette.
            vec3 col = mix(uCold * 0.35, uHot, fres + uCollapse * 0.8);
            float a = 0.1 + fres * 0.85 + uCollapse * 0.9;
            gl_FragColor = vec4(col, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#0080ff"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    []
  );

  useFrame((_, delta) => {
    const m = mesh.current;
    const h = halo.current;
    if (!m || !h) return;

    const c = U.uCollapse.value;

    // Small when the system is running, enormous for the instant it swallows
    // the object, then it releases the light back outward.
    const base = 0.16 + Math.sin(frame.time * 0.9) * 0.012;
    const s = base + c * c * 0.92;
    m.scale.setScalar(s);
    m.rotation.y += delta * 0.16;
    m.rotation.x += delta * 0.07;

    h.scale.setScalar(s * (2.6 + c * 5.5));
    haloMat.opacity = 0.035 + c * 0.32 + U.uCharge.value * 0.05;
  });

  useEffect(
    () => () => {
      geometry.dispose();
      haloGeo.dispose();
      material.dispose();
      haloMat.dispose();
    },
    [geometry, haloGeo, material, haloMat]
  );

  return (
    <group>
      <mesh ref={halo} geometry={haloGeo} material={haloMat} frustumCulled={false} />
      <mesh ref={mesh} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}
