"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * The turn.
 *
 * Two statements, and the second replaces the first as the Core finishes
 * reassembling. The swap is driven by the same scroll value that closes the
 * fragmentation, so the sentence lands on the exact frame the object becomes
 * whole again.
 */
export function Rewire() {
  const first = useRef<HTMLParagraphElement>(null);
  const second = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <ScrollScene beatId="rewire" align="center" scrim="film-left" fadeIn={0.1} fadeOut={0.1}>
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
    </ScrollScene>
  );
}
