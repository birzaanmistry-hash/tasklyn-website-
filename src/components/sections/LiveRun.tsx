"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { LIVE_RUN } from "@/lib/content";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * One run, executed.
 *
 * The camera is inside the Core for this beat, so packets of work are passing
 * the lens while this reads out. Each event resolves as the scroll reaches it,
 * which means the visitor is scrubbing a real execution rather than watching a
 * looping animation of one.
 *
 * The timestamps are an illustrative run of a lead-handling workflow, not a
 * measured result from a customer.
 */
export function LiveRun() {
  const list = useRef<HTMLOListElement>(null);
  const clock = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = progress(frame.scroll, "live");
      const el = list.current;

      if (el) {
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          const t = clamp01((p - 0.12 - i * 0.115) / 0.1);
          const k = kids[i] as HTMLElement;
          k.style.opacity = String(0.12 + t * 0.88);

          const dot = k.querySelector<HTMLElement>("[data-dot]");
          if (dot) {
            dot.style.transform = `scale(${0.4 + t * 0.6})`;
            dot.style.background =
              t > 0.7 ? "var(--color-accent-hot)" : "var(--color-accent-deep)";
          }
          const line = k.querySelector<HTMLElement>("[data-line]");
          if (line) line.style.transform = `scaleY(${t})`;
        }
      }

      if (clock.current) {
        const done = Math.round(clamp01((p - 0.12) / 0.7) * LIVE_RUN.length);
        clock.current.textContent = `${done} of ${LIVE_RUN.length} complete`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene beatId="live" align="center" scrim="read">
      <div className="mx-auto max-w-[62ch]">
        <h2 className="t-section max-w-[15ch]">Eleven seconds of work.</h2>
        <p className="t-lead mt-6 max-w-[44ch]">
          A lead arrives and is handled end to end. Nobody is asked to do anything.
        </p>

        <ol ref={list} className="mt-12">
          {LIVE_RUN.map((e, i) => (
            <li key={e.t} className="relative flex gap-6 pb-8 last:pb-0">
              {i < LIVE_RUN.length - 1 && (
                <span
                  aria-hidden="true"
                  data-line
                  className="absolute left-[5px] top-4 h-full w-px origin-top bg-[color:var(--color-accent)]/45"
                />
              )}

              <span
                aria-hidden="true"
                data-dot
                className="relative z-10 mt-[7px] h-[11px] w-[11px] shrink-0 rounded-full"
              />

              <div className="flex flex-1 flex-wrap items-baseline gap-x-5 gap-y-1">
                <time className="t-data w-[5.5rem] shrink-0 text-[color:var(--color-faint)]">
                  {e.t}
                </time>
                <span className="text-[1.0625rem] tracking-[-0.02em]">{e.label}</span>
                <span className="t-tech ml-auto">{e.layer}</span>
              </div>
            </li>
          ))}
        </ol>

        <p
          ref={clock}
          role="status"
          aria-live="polite"
          className="t-tech mt-10 text-[color:var(--color-muted)]"
        >
          0 of {LIVE_RUN.length} complete
        </p>
      </div>
    </ScrollScene>
  );
}
