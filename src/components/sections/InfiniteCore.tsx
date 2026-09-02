"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * The dive.
 *
 * The camera falls through nested copies of the Core and then climbs back out
 * through every one of them. There is almost no copy here on purpose: the
 * moment is doing the talking, and words would only tell the visitor what they
 * are already looking at.
 */
export function InfiniteCore() {
  const down = useRef<HTMLParagraphElement>(null);
  const up = useRef<HTMLParagraphElement>(null);
  const readout = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = progress(frame.scroll, "infinite");

      // Down on the way in, up on the way back out.
      const a = clamp01((p - 0.08) / 0.14) * (1 - clamp01((p - 0.34) / 0.12));
      const b = clamp01((p - 0.72) / 0.13) * (1 - clamp01((p - 0.94) / 0.06));

      if (down.current) down.current.style.opacity = String(a);
      if (up.current) up.current.style.opacity = String(b);

      if (readout.current) {
        const d = frame.depth;
        readout.current.style.opacity = String(clamp01(d * 1.4) * (1 - clamp01((p - 0.9) / 0.1)));
        readout.current.textContent = `Depth ${d.toFixed(2)}`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene beatId="infinite" align="center" scrim="film">
      <div className="relative grid min-h-[40vh] place-items-center text-center">
        <p
          ref={down}
          className="t-display col-start-1 row-start-1 max-w-[14ch] opacity-0"
        >
          Every system
          <br />
          holds another.
        </p>

        <p
          ref={up}
          className="t-display col-start-1 row-start-1 max-w-[14ch] opacity-0"
        >
          All of it is
          <br />
          <span className="text-[color:var(--color-accent)]">one machine.</span>
        </p>

        {/* A quiet instrument readout, so the fall has a scale you can measure. */}
        <p
          ref={readout}
          aria-hidden="true"
          className="t-tech pointer-events-none absolute bottom-0 left-0 opacity-0"
        >
          Depth 0.00
        </p>
      </div>
    </ScrollScene>
  );
}
