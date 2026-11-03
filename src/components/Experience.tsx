"use client";

import dynamic from "next/dynamic";
import { CoreInteraction } from "./core/CoreInteraction";
import { CinematicIntro } from "./CinematicIntro";
import { Nav } from "./Nav";
import { CustomCursor } from "./ui/CustomCursor";

import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Fragmented } from "./sections/Fragmented";
import { Rewire } from "./sections/Rewire";
import { Layers } from "./sections/Layers";
import { AgentSystem } from "./sections/AgentSystem";
import { LiveRun } from "./sections/LiveRun";
import { IndustrySystem } from "./sections/IndustrySystem";
import { InfiniteCore } from "./sections/InfiniteCore";
import { ProcessPipeline } from "./sections/ProcessPipeline";
import { Kinetic } from "./sections/Kinetic";
import { FinalCTA } from "./sections/FinalCTA";
import { HomeAnswers } from "./sections/HomeAnswers";
import { Footer } from "./sections/Footer";

/**
 * The whole experience.
 *
 * The 3D scene is loaded on the client only and outside the critical path: the
 * text, the navigation and the booking CTA are all usable before a single byte
 * of three.js arrives. If WebGL never initialises, the page is still a complete,
 * readable site rather than a black screen.
 */
const CoreScene = dynamic(() => import("./core/CoreScene"), {
  ssr: false,
});

export function Experience() {
  return (
    <CoreInteraction>
      {/* The Core sits behind everything, fixed, for the entire journey. */}
      <CoreScene />

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <CustomCursor />
      <CinematicIntro />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <Capabilities />
        <Fragmented />
        <Rewire />
        <Layers />
        <AgentSystem />
        <LiveRun />
        <IndustrySystem />
        <InfiniteCore />
        <ProcessPipeline />
        <Kinetic />
        <FinalCTA />
      </main>

      <HomeAnswers />
      <Footer />
    </CoreInteraction>
  );
}
