"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { setState } from "@/lib/store";
import { CoreInteraction } from "./core/CoreInteraction";
import { Nav } from "./Nav";
import { CustomCursor } from "./ui/CustomCursor";
import { SiteFooter } from "./sections/SiteFooter";

const CoreScene = dynamic(() => import("./core/CoreScene"), { ssr: false });

/**
 * The frame every page except the home page sits in.
 *
 * These pages are documents. The Core is still behind them, still alive and
 * still responding to the pointer, but it holds a slow wide orbit rather than
 * running the camera journey, and there is no opening film. Someone arriving on
 * /contact from a link wants the phone number, not eleven seconds of cinema.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // No intro on these pages, and the Core must not read scroll as beats.
    setState({ mode: "ambient", phase: "live" });
    return () => {
      setState({ mode: "journey" });
    };
  }, []);

  return (
    <CoreInteraction>
      <CoreScene />

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <CustomCursor />
      <Nav />

      <main id="main" className="relative z-10">
        {/* One flat reading ground for the whole document. These pages carry
            far more text than the home page, and a per-section scrim would
            leave visible seams between them. */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[color:var(--color-void)]/[0.93]" />
        <div className="relative z-10">{children}</div>
      </main>

      <SiteFooter />
    </CoreInteraction>
  );
}

/** Standard page width and gutters, shared by every sub-page section. */
export function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
