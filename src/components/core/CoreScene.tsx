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
import { AMBIENT_BUDGET, BUDGET, detectTier, prefersReducedMotion } from "@/lib/perf";
import { frame, setState, readState, useAppState } from "@/lib/store";
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

export type CoreVariant = "journey" | "ambient";

/**
 * Ambient pages render on demand and are pushed a frame at a time at ~30fps.
 * The Core there is a backdrop; running it at 60fps against a reading scrim is
 * pure waste, and halving the frame rate halves the main-thread cost.
 */
function AmbientPacer() {
  const { invalidate } = useThree();
  useEffect(() => {
    const ms = readState().reduced ? 250 : 33;
    const id = window.setInterval(invalidate, ms);
    return () => window.clearInterval(id);
  }, [invalidate]);
  return null;
}

/**
 * Compile every shader before the first frame, and say when it is done.
 *
 * Compilation was happening inside the first render, so it landed as one long
 * task in the middle of the opening film. compileAsync uses the
 * KHR_parallel_shader_compile extension where it exists, which moves the work
 * off the main thread entirely. The timeout means a driver that never reports
 * back cannot strand the page on a blank screen.
 */
function WarmUp({ onWarm }: { onWarm: () => void }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onWarm();
    };
    const guard = window.setTimeout(finish, 2400);

    if (typeof gl.compileAsync === "function") {
      gl.compileAsync(scene, camera).then(finish, finish);
    } else {
      try {
        gl.compile(scene, camera);
      } catch {
        /* a failed warm-up just means the first frame pays for it, as before */
      }
      finish();
    }
    return () => window.clearTimeout(guard);
  }, [gl, scene, camera, onWarm]);

  return null;
}

/**
 * The recursion shells are only seen during one beat far down the page, so they
 * are built after the opening film has finished and the browser is idle, not
 * while the film is trying to run smoothly.
 */
function DeferredNested({ budget }: { budget: (typeof BUDGET)["high"] }) {
  const { phase } = useAppState();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (phase !== "live" || on) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setOn(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setOn(true), 800);
    return () => window.clearTimeout(id);
  }, [phase, on]);

  return on ? <NestedCores budget={budget} /> : null;
}

function CoreBody({ variant, onWarm }: { variant: CoreVariant; onWarm: () => void }) {
  const tier = readState().tier;
  const ambient = variant === "ambient";
  const budget = ambient && tier !== "low" ? AMBIENT_BUDGET[tier] : BUDGET[tier];

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
        {!ambient && <CoreStrata />}
        <CoreSingularity />
      </group>

      {!ambient && <DeferredNested budget={budget} />}
      {ambient && <AmbientPacer />}
      <FrameGovernor />
      <WarmUp onWarm={onWarm} />
    </>
  );
}

export default function CoreScene({ variant = "journey" }: { variant?: CoreVariant }) {
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const ambient = variant === "ambient";

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

  const onWarm = useRef(() => {
    setLive(true);
    // The opening sequence waits for this. Starting the film before shaders are
    // compiled just burns its first seconds on a stalled frame.
    setState({ coreReady: true });
  }).current;

  const tier = ready ? readState().tier : "mid";

  // On a low-tier device a text page skips the Core altogether.
  if (ready && ambient && tier === "low") return null;

  const dpr =
    ready && ambient && tier !== "low"
      ? AMBIENT_BUDGET[tier].dpr
      : ready
        ? BUDGET[tier].dpr
        : ([1, 1.25] as [number, number]);

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
          // Nothing draws until the shaders are compiled. After that, the
          // journey runs every frame and ambient pages are driven by the pacer.
          frameloop={live ? (ambient ? "demand" : "always") : "never"}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: ambient ? "default" : "high-performance",
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
          <CoreBody variant={variant} onWarm={onWarm} />
        </Canvas>
      )}
    </div>
  );
}
