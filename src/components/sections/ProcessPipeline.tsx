"use client";

import { useEffect, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { PROCESS } from "@/lib/content";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * How we build.
 *
 * One spine that fills as you scroll, rather than five cards. The numbers are
 * kept because this genuinely is a sequence and the order carries information:
 * you cannot deploy before you architect.
 */
export function ProcessPipeline() {
  const spine = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = progress(frame.scroll, "process");
      const fill = clamp01((p - 0.1) / 0.72);

      if (spine.current) spine.current.style.transform = `scaleX(${fill})`;

      const el = rows.current;
      if (el) {
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          const t = clamp01((fill - i * 0.19) / 0.2);
          const k = kids[i] as HTMLElement;
          k.style.opacity = String(0.55 + t * 0.45);

          const mark = k.querySelector<HTMLElement>("[data-mark]");
          if (mark) {
            mark.style.color = t > 0.55 ? "var(--color-accent-hot)" : "var(--color-faint)";
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene id="process" beatId="process" align="center" scrim="read">
      <div>
        <h2 className="t-section max-w-[13ch]">How we build it.</h2>

        {/* The spine. It fills once, left to right, as the Core finishes
            assembling itself behind this section. */}
        <div className="relative mt-12 h-px w-full bg-[color:var(--color-line)]">
          <div
            ref={spine}
            className="absolute inset-0 origin-left bg-[color:var(--color-accent)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <ol
          ref={rows}
          className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-5"
        >
          {PROCESS.map((s) => (
            <li key={s.n} data-reveal>
              <span data-mark className="t-tech block transition-colors duration-500">
                {s.n}
              </span>
              <h3 className="mt-3 text-[1.25rem] font-medium tracking-[-0.025em]">
                {s.name}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </ScrollScene>
  );
}
