"use client";

import { useEffect, useRef } from "react";
import { beat, window01 } from "@/lib/choreography";
import { frame } from "@/lib/store";
import { useCompact } from "@/lib/useCompact";

/**
 * "read" tiers hold the text zone near-opaque for sections you actually read.
 * "film" tiers keep the Core present for the big typographic beats.
 */
export type Scrim =
  | "read"
  | "read-left"
  | "read-right"
  | "film"
  | "film-left"
  | "bottom"
  | "none";

/**
 * One beat of the film.
 *
 * There are two compositions here, not one composition scaled down.
 *
 * On a wide screen the section reserves its scroll length and the copy is
 * `fixed`, held dead centre for the whole beat. Fixed rather than sticky,
 * because a sticky child can only stay pinned for (sectionHeight - childHeight),
 * so any beat longer than two viewport heights would quietly scroll its own
 * copy off the top of the screen halfway through.
 *
 * On a phone the copy sits in normal flow and scrolls the way a page should.
 * The Core stays behind it and still transforms as you scroll, so the object
 * still carries the story, but nothing is pinned and no section can be taller
 * than the screen it is trapped in. Pinning long copy on a 375px screen is how
 * a cinematic site becomes an unusable one.
 */
export function ScrollScene({
  id,
  beatId,
  children,
  className = "",
  align = "center",
  compactAlign,
  scrim = "film",
  fadeIn = 0.14,
  fadeOut = 0.14,
}: {
  id?: string;
  beatId: string;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
  /** Vertical alignment on phones, where it can differ from the pinned desktop beat. */
  compactAlign?: "center" | "start" | "end";
  scrim?: Scrim;
  fadeIn?: number;
  fadeOut?: number;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const compact = useCompact();
  const b = beat(beatId);

  useEffect(() => {
    // In the compact composition the copy is always fully opaque. Fading text
    // in and out of a normally scrolling page only makes it harder to read.
    if (compact) {
      const el = inner.current;
      if (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.visibility = "visible";
        el.style.pointerEvents = "auto";
      }
      return;
    }

    let raf = 0;
    let last = -1;

    const loop = () => {
      const o = window01(frame.scroll, b.from, b.to, fadeIn, fadeOut);
      if (Math.abs(o - last) > 0.004) {
        last = o;
        const el = inner.current;
        if (el) {
          el.style.opacity = String(o);
          // A small counter-move against the camera, so the copy sits in the
          // same space as the Core rather than on a pane of glass in front.
          el.style.transform = `translate3d(0, ${(1 - o) * 12}px, 0)`;
          el.style.visibility = o < 0.01 ? "hidden" : "visible";
          // Only the beat you are actually on can be clicked, or every beat's
          // controls would stack invisibly on top of each other.
          el.style.pointerEvents = o > 0.55 ? "auto" : "none";
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [b.from, b.to, fadeIn, fadeOut, compact]);

  const pick = (a: "center" | "start" | "end") =>
    a === "center" ? "items-center" : a === "end" ? "items-end" : "items-start";
  const items = pick(align);
  const compactItems = pick(compactAlign ?? "center");

  return (
    <section
      id={id}
      data-beat={beatId}
      className="relative"
      style={compact ? { minHeight: "100svh" } : { height: `${b.vh * 100}vh` }}
    >
      <div
        ref={inner}
        className={
          compact
            ? `compact-flow relative z-10 flex min-h-[100svh] w-full ${compactItems} ${className}`
            : `fixed inset-0 z-10 flex ${items} ${className}`
        }
        style={compact ? undefined : { opacity: 0, visibility: "hidden", pointerEvents: "none" }}
      >
        {scrim !== "none" && <div aria-hidden="true" className={`scrim scrim-${scrim}`} />}

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 pt-20 md:px-10 md:pb-10 lg:px-14">
          {children}
        </div>
      </div>
    </section>
  );
}
