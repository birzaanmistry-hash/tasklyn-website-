"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Industry } from "@/lib/site";

/**
 * Industries as a centred, colour-varied word stack (32-64px, semibold).
 * Hovering or focusing a word shows that industry's three applications in a
 * compact panel beneath the stack.
 *
 * Progressive enhancement: the server HTML contains every industry and all
 * of its applications, all visible (each panel stacked). After hydration the
 * component sets data-enhanced and becomes an ARIA tabs widget (roving
 * tabindex, arrow keys, Home/End), showing one panel at a time.
 */

/* Word colours, Scale-style variation: ink, Tasklyn blue (AA large text on
   white, 3.6:1 at >= 24px), deep navy. */
const TONES = ["text-ink", "text-blue", "text-navy", "text-ink", "text-blue", "text-ink", "text-navy", "text-blue"];

export function IndustryTabs({ industries }: { industries: Industry[] }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setEnhanced(true), []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = industries.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div data-tabs="" data-enhanced={enhanced ? "" : undefined}>
      <div
        role={enhanced ? "tablist" : undefined}
        aria-label={enhanced ? "Industries" : undefined}
        aria-orientation={enhanced ? "vertical" : undefined}
        className="flex flex-col items-center"
      >
        {industries.map((ind, i) => {
          const selected = active === i;
          return (
            <button
              key={ind.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role={enhanced ? "tab" : undefined}
              id={`${uid}-tab-${i}`}
              aria-selected={enhanced ? selected : undefined}
              aria-controls={enhanced ? `${uid}-panel-${i}` : undefined}
              tabIndex={enhanced && !selected ? -1 : 0}
              onClick={() => setActive(i)}
              onFocus={() => enhanced && setActive(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`word-tab max-w-full text-balance rounded-control px-2 text-center text-word font-semibold ${TONES[i % TONES.length]}`}
            >
              {ind.name}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-14 max-w-[56rem] md:mt-16">
        {industries.map((ind, i) => (
          <div
            key={ind.slug}
            id={`${uid}-panel-${i}`}
            data-tab-panel=""
            data-active={active === i ? "" : undefined}
            role={enhanced ? "tabpanel" : undefined}
            aria-labelledby={enhanced ? `${uid}-tab-${i}` : undefined}
            tabIndex={enhanced ? 0 : undefined}
            className="mb-6 border-t border-line pt-6 last:mb-0 focus-visible:outline-offset-4 [[data-enhanced]_&]:mb-0"
          >
            <h3 className="text-center text-[0.8125rem] font-medium text-muted">
              <span className="sr-only">Where AI applies in </span>
              {ind.name}
            </h3>
            <ul className="mt-6 grid gap-6 text-left md:grid-cols-3 md:gap-10">
              {ind.applications.map((a) => (
                <li key={a.name}>
                  <h4 className="text-item text-ink">{a.name}</h4>
                  <p className="mt-1.5 text-copy text-muted">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
