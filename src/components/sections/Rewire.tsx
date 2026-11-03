"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";
import { useCompact } from "@/lib/useCompact";

/**
 * The turn.
 *
 * Two statements, and the second replaces the first as the Core finishes
 * reassembling. The swap is driven by the same scroll value that closes the
 * fragmentation, so the sentence lands on the exact frame the object becomes
 * whole again.
 *
 * On a phone the section scrolls like a normal page instead of being pinned, so
 * a swap that depends on holding still for a whole viewport has no room to
 * happen. There the two statements are stacked: the old way greyed back, the new
 * one in full colour. It still reads as a turn, and nobody can miss the point
 * by scrolling past at the wrong speed.
 */
export function Rewire() {
  const compact = useCompact();
  const first = useRef<HTMLParagraphElement>(null);
  const second = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (compact) return;

    let raf = 0;
    const loop = () => {
      const p = progress(frame.scroll, "rewire");
      // A cut, not a dissolve. The first line is fully gone before the second
      // arrives: overlapping them stacks two sentences in one place and reads
      // as a rendering fault rather than as a turn in the argument.
      const a = 1 - clamp01((p - 0.34) / 0.11);
      const b = clamp01((p - 0.52) / 0.11);

      if (first.current) {
        first.current.style.opacity = String(a);
        first.current.style.transform = `translate3d(0, ${(1 - a) * -18}px, 0)`;
      }
      if (second.current) {
        second.current.style.opacity = String(b);
        second.current.style.transform = `translate3d(0, ${(1 - b) * 22}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [compact]);

  return (
    <ScrollScene beatId="rewire" align="center" scrim="film-left" fadeIn={0.1} fadeOut={0.1}>
      {compact ? (
        <div className="py-10">
          <p className="t-display max-w-[16ch] text-[color:var(--color-muted)]">
            We don&rsquo;t just automate tasks.
          </p>
          <p className="t-display mt-7 max-w-[16ch]">
            We rewire{" "}
            <span className="text-[color:var(--color-accent)]">the system.</span>
          </p>
        </div>
      ) : (
        <div className="relative grid min-h-[46vh] place-items-start">
          <p ref={first} className="t-display col-start-1 row-start-1 max-w-[16ch]">
            We don&rsquo;t just
            <br />
            automate tasks.
          </p>
          <p
            ref={second}
            className="t-display col-start-1 row-start-1 max-w-[16ch] opacity-0"
          >
            We rewire
            <br />
            <span className="text-[color:var(--color-accent)]">the system.</span>
          </p>
        </div>
      )}
    </ScrollScene>
  );
}
