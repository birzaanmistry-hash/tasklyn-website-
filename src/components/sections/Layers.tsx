"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { LAYERS } from "@/lib/content";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * Inside the machine.
 *
 * The Core has physically separated into four decks by the time this copy
 * arrives, and each deck's label resolves as the camera reaches its height.
 * The order on screen matches the order in space: input on top, outcome at the
 * bottom, which is also the direction work travels through the system.
 */
export function Layers() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = list.current;
      if (el) {
        const p = progress(frame.scroll, "layers");
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          // Each deck resolves in turn as the Core opens.
          const t = clamp01((p - 0.16 - i * 0.13) / 0.2);
          const k = kids[i] as HTMLElement;
          k.style.opacity = String(0.14 + t * 0.86);
          k.style.transform = `translate3d(${(1 - t) * 26}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene id="layers" beatId="layers" align="center" scrim="read-right">
      <div className="ml-auto w-full max-w-[56ch] lg:mr-[2vw]">
        <h2 className="t-section mb-8 max-w-[16ch]">
          Four layers,
          <br />
          one system.
        </h2>

        <ol ref={list} className="border-t border-[color:var(--color-line)]">
          {LAYERS.map((l) => (
            <li
              key={l.id}
              data-reveal
              className="border-b border-[color:var(--color-line)] py-[1.1rem] will-change-transform"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[1.25rem] font-medium tracking-[-0.025em]">{l.name}</h3>
                <span className="t-tech shrink-0">{l.items.length}</span>
              </div>

              <p className="mt-1.5 max-w-[48ch] text-[0.9375rem] leading-[1.5] text-[color:var(--color-muted)]">
                {l.note}
              </p>

              <p className="t-data mt-2 text-[color:var(--color-faint)]">
                {l.items.join("   /   ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </ScrollScene>
  );
}
