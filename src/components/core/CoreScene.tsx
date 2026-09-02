"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CoreParticles } from "./CoreParticles";
import { CoreLattice } from "./CoreLattice";
import { CoreNodes } from "./CoreNodes";
import { CoreConnections } from "./CoreConnections";
import { CoreStrata } from "./CoreStrata";
import { CoreSingularity } from "./CoreSingularity";
import { CoreCamera } from "./CoreCamera";
import { CoreDriver } from "./CoreDriver";
import { NestedCores } from "./NestedCores";
import { BUDGET, detectTier, prefersReducedMotion } from "@/lib/perf";
import { frame, setState, readState } from "@/lib/store";
import { progress } from "@/lib/choreography";

/**
 * Atmosphere.
 *
 * Fog is what sells the scale: it puts real distance between the near struts
 * and the far ones, so a four-unit object reads as something enormous seen from
 * far away rather than a model on a desk.
 */
function Atmosphere() {
  const { scene } = useThree();
  const fog = useMemo(() => new THREE.FogExp2(new THREE.Color("#05070c"), 0.028), []);

  useEffect(() => {
    scene.fog = fog;
    scene.background = null;
    return () => {
      scene.fog = null;
    };
  }, [scene, fog]);

  useFrame((_, delta) => {
    // The air thickens while we are inside the Core and clears when we pull
    // back out, which keeps the interior legible and the exteriors vast.
    const s = frame.scroll;
    const inside = Math.max(progress(s, "live"), progress(s, "infinite") * 0.8);
    const target = 0.021 + inside * 0.03;
    fog.density += (target - fog.density) * Math.min(1, delta * 2);
  });

  return null;
}

/**
 * The Core is drawn additively against near-black, so the "lighting" is the
 * emission in the materials themselves. These two lights exist only to give
 * the node modules a directional read; everything else is self-lit.
 */
function CoreLighting() {
  return (
    <>
      <ambientLight intensity={0.12} color="#0d2140" />
      <directionalLight position={[6, 8, 4]} intensity={0.5} color="#0080ff" />
      <directionalLight position={[-7, -3, -5]} intensity={0.22} color="#06d0f9" />
    </>
  );
}

/** Renders at a reduced rate when the tab is hidden or the page is idle. */
function FrameGovernor() {
  const { invalidate } = useThree();
  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [invalidate]);
  return null;
}

function CoreBody() {
  const tier = readState().tier;
  const budget = BUDGET[tier];

  return (
    <>
      <Atmosphere />
      <CoreLighting />
      <CoreCamera />
      <CoreDriver />

      <group>
        <CoreParticles budget={budget} />
        <CoreLattice budget={budget} />
        <CoreConnections budget={budget} />
        <CoreNodes budget={budget} />
        <CoreStrata />
        <CoreSingularity />
      </group>

      <NestedCores budget={budget} />
      <FrameGovernor />
    </>
  );
}

export default function CoreScene() {
  const [ready, setReady] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Tier and motion preference are decided once, before the scene mounts, so
  // no geometry has to be rebuilt after the first frame.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    setState({ tier: detectTier(), reduced });
    setReady(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setState({ reduced: mq.matches });
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const dpr = ready ? BUDGET[readState().tier].dpr : ([1, 1.25] as [number, number]);

  return (
    <div
      ref={wrap}
      className="fixed inset-0 z-0"
      aria-hidden="true"
      // The Core is decorative in the accessibility tree: every claim it makes
      // is also made in the text sitting on top of it.
    >
      {ready && (
        <Canvas
          dpr={dpr}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          camera={{ fov: 38, near: 0.1, far: 400, position: [0, 0, 132] }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#05070c"), 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.15;
          }}
        >
          <CoreBody />
        </Canvas>
      )}
    </div>
  );
}
