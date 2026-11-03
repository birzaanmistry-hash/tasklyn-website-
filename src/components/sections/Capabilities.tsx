"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { CAPABILITIES } from "@/lib/content";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * What Tasklyn does, in plain words.
 *
 * This is the first thing after the hero, and it is deliberately the least
 * cinematic section on the page. Someone who lands here should be able to say
 * what this company sells after eight seconds, without scrolling further and
 * without decoding a metaphor. The Core is held to the right of frame and the
 * scrim sits behind the whole column, so nothing here is ever competing with
 * the object for legibility.
 */
export function Capabilities() {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = list.current;
      if (el) {
        const p = progress(frame.scroll, "capabilities");
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          // Items resolve in order, quickly. This section is for reading, so
          // the reveal gets out of the way rather than performing.
          const t = clamp01((p - 0.08 - i * 0.055) / 0.14);
          const k = kids[i] as HTMLElement;
          k.style.opacity = String(0.25 + t * 0.75);
          k.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene id="systems" beatId="capabilities" align="center" scrim="read-left">
      <div className="max-w-[76ch]">
        <h2 className="t-section max-w-[19ch]">
          We build the system that does the work.
        </h2>

        <p className="t-lead mt-5 max-w-[58ch]">
          Not a chatbot bolted onto your website. A system that reads what comes in,
          decides what to do, and does it in the tools you already run.
        </p>

        <ul ref={list} className="mt-9 grid gap-x-12 gap-y-0 border-t border-[color:var(--color-line)] md:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <li
              key={c.id}
              data-reveal
              className="border-b border-[color:var(--color-line)] py-[1.15rem] will-change-transform"
            >
              {/* Category and the systems it touches share one line: the row
                  reads as a heading with its own footnote instead of costing
                  four separate lines of vertical space. */}
              {/* flex-wrap, and no shrink-0: on a 360px phone this long mono string
                  sat beside the label, forced the row to ~392px wide, and widened
                  the whole document. It now drops to its own line instead. */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="t-tech">{c.label}</p>
                <p className="t-data text-[0.75rem] text-[color:var(--color-accent)]">
                  {c.runs}
                </p>
              </div>

              <h3 className="mt-2.5 text-[1.1875rem] font-medium tracking-[-0.025em] text-[color:var(--color-ink)]">
                {c.name}
              </h3>

              <p className="mt-1.5 max-w-[48ch] text-[0.9375rem] leading-[1.5] text-[color:var(--color-muted)]">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ScrollScene>
  );
}
