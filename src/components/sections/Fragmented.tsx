"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { FRAGMENTS } from "@/lib/content";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * The fragmented business.
 *
 * The Core is coming apart behind this copy. The system names drift out with
 * it on their own vectors and at their own rates, so the section reads as ten
 * disconnected things rather than as a tidy list of ten things.
 */
export function Fragmented() {
  const layer = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let raf = 0;

    // Each label gets a fixed, unrelated direction. Deterministic so the layout
    // is identical on every load, uneven so it never looks arranged.
    const vectors = FRAGMENTS.map((_, i) => {
      const a = i * 2.399963;
      const r = 0.55 + ((i * 37) % 100) / 190;
      return { x: Math.cos(a) * r, y: Math.sin(a) * r, rot: (((i * 53) % 100) / 100 - 0.5) * 9 };
    });

    const loop = () => {
      const el = layer.current;
      if (el) {
        const apart = clamp01(progress(frame.scroll, "fragment") / 0.7);
        const back = clamp01(progress(frame.scroll, "rewire") / 0.62);
        const d = Math.max(0, apart - back);

        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          const k = kids[i] as HTMLElement;
          const v = vectors[i];
          k.style.transform = `translate3d(${v.x * d * 30}vmin, ${v.y * d * 22}vmin, 0) rotate(${v.rot * d}deg)`;
          // Disconnected systems dim. Nothing is being carried between them.
          k.style.opacity = String(0.28 + (1 - d) * 0.55);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene beatId="fragment" align="center" scrim="film-left">
      <div className="relative">
        {/* The scattering system names sit behind the headline, in the same
            space as the Core, not in a separate panel. */}
        <ul
          ref={layer}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 hidden place-items-center md:grid"
        >
          {FRAGMENTS.map((f) => (
            <li
              key={f}
              className="t-tech col-start-1 row-start-1 whitespace-nowrap text-[color:var(--color-muted)] will-change-transform"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="relative z-10">
          <h2 className="t-display max-w-[13ch]">
            Your business
            <br />
            is full of work.
          </h2>
          <p className="t-lead mt-7 max-w-[42ch]">
            Most of it is trapped between people, tools and repetitive processes.
          </p>
        </div>

        {/* On small screens the drift has nowhere to go, so the systems become a
            plain wrapped list instead. Same information, no pretend physics. */}
        <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-2 md:hidden">
          {FRAGMENTS.map((f) => (
            <li key={f} className="t-tech text-[color:var(--color-faint)]">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </ScrollScene>
  );
}
