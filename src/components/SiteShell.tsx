"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { setState } from "@/lib/store";
import { CoreInteraction } from "./core/CoreInteraction";
import { Nav } from "./Nav";
import { CustomCursor } from "./ui/CustomCursor";
import { SiteFooter } from "./sections/SiteFooter";

const CoreScene = dynamic(() => import("./core/CoreScene"), { ssr: false });

/**
 * True once the page has finished loading and the browser is idle.
 *
 * On a text page the Core is decoration, so it must never compete with the
 * content for the main thread. It is not even downloaded until the page has
 * loaded, and not at all for anyone who has asked their browser to save data.
 */
function useAfterLoad() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let cancelled = false;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };

    const start = () => {
      const run = () => {
        if (!cancelled) setGo(true);
      };
      if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 2500 });
      else window.setTimeout(run, 1200);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  return go;
}

/**
 * The frame every page except the home page sits in.
 *
 * These pages are documents. The Core is still behind them, still alive and
 * still responding to the pointer, but it holds a slow wide orbit rather than
 * running the camera journey, and there is no opening film. Someone arriving on
 * /contact from a link wants the phone number, not eleven seconds of cinema.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const showCore = useAfterLoad();

  useEffect(() => {
    // No intro on these pages, and the Core must not read scroll as beats.
    setState({ mode: "ambient", phase: "live" });
    return () => {
      setState({ mode: "journey" });
    };
  }, []);

  return (
    <CoreInteraction>
      {showCore && <CoreScene variant="ambient" />}

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <CustomCursor />
      <Nav />

      <main id="main" className="relative z-10">
        {/* One reading ground for the whole document. These pages carry far
            more text than the home page, so the scrim is continuous rather than
            per-section, but it clears at the frame edges so the Core still reads
            at the margins the way it does on the home page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,7,12,0.70) 0%, rgba(5,7,12,0.93) 9%, rgba(5,7,12,0.93) 91%, rgba(5,7,12,0.70) 100%)",
          }}
        />
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
