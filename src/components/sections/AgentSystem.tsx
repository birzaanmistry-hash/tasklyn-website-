"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { AGENTS } from "@/lib/content";
import { setState, useAppState, frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";

/**
 * The agents.
 *
 * Each of these is a real node on the Core's outer shell, not a card with an
 * icon. Selecting one raises that node's activation in the shared shader, so
 * the object visibly reorganises its light around whichever agent you are
 * reading about. The miniature workflow below is the same five steps the node
 * runs in the live execution beat.
 */
export function AgentSystem() {
  const { agent } = useAppState();
  const [hover, setHover] = useState<string | null>(null);
  const rail = useRef<HTMLUListElement>(null);

  const active = hover ?? agent ?? AGENTS[0].id;
  const current = AGENTS.find((a) => a.id === active) ?? AGENTS[0];

  // Keep the Core in step with whatever the visitor is pointing at.
  useEffect(() => {
    setState({ agent: active });
  }, [active]);

  // Release the Core's focus once this beat is behind us, so the object is not
  // left permanently lit around an agent nobody is reading.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = progress(frame.scroll, "agents");
      if ((p <= 0 || p >= 1) && agent !== null) setState({ agent: null });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [agent]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = rail.current;
      if (el) {
        const p = progress(frame.scroll, "agents");
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) {
          const t = clamp01((p - 0.1 - i * 0.045) / 0.16);
          (kids[i] as HTMLElement).style.transform = `translate3d(0, ${(1 - t) * 20}px, 0)`;
          (kids[i] as HTMLElement).style.opacity = String(t);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollScene beatId="agents" align="center" scrim="read">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <h2 className="t-section max-w-[13ch]">
            Seven working parts.
          </h2>
          <p className="t-lead mt-6 max-w-[40ch]">
            Each one is a component of the same Core, not a separate product you
            have to integrate.
          </p>

          <ul ref={rail} className="mt-9 border-t border-[color:var(--color-line)]">
            {AGENTS.map((a) => {
              const on = a.id === active;
              return (
                <li key={a.id} data-reveal className="border-b border-[color:var(--color-line)]">
                  <button
                    type="button"
                    onPointerEnter={() => setHover(a.id)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(a.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => setState({ agent: a.id })}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[6.25rem_minmax(0,1fr)] items-baseline gap-x-4 py-4 text-left transition-colors duration-300 md:flex md:gap-5"
                  >
                    <span
                      className="text-[1.0625rem] font-medium tracking-[-0.02em] transition-colors duration-300"
                      style={{ color: on ? "var(--color-accent-hot)" : "var(--color-ink)" }}
                    >
                      {a.name}
                    </span>
                    <span
                      className="text-[0.875rem] leading-snug transition-colors duration-300"
                      style={{ color: on ? "var(--color-muted)" : "var(--color-faint)" }}
                    >
                      {a.role}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The selected agent's run. Vertical, monospaced, quiet. */}
        <div className="lg:pt-[7.5rem]">
          <div className="panel p-6 sm:p-8">
            <p className="t-tech">{current.name} agent</p>

            <ol className="mt-6 space-y-0">
              {current.steps.map((s, i) => (
                <li key={s} className="relative flex items-center gap-4 py-3">
                  {/* The connector is the same stepped climb as the pathways
                      inside the Core. */}
                  {i < current.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[3px] top-[26px] h-[calc(100%-14px)] w-px bg-[color:var(--color-line)]"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative z-10 h-[7px] w-[7px] shrink-0 bg-[color:var(--color-accent)]"
                    style={{ opacity: 0.35 + (i / current.steps.length) * 0.65 }}
                  />
                  <span className="t-data text-[color:var(--color-ink)]">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
