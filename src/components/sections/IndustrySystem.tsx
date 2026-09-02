"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { INDUSTRIES } from "@/lib/content";
import { setState, useAppState } from "@/lib/store";

/**
 * One Core, different systems.
 *
 * Changing industry does not swap in a different graphic. It writes a new shape
 * bias into the same shader the whole Core runs on, so the object re-proportions
 * itself: spread, twist and the number of rings all change while every strut,
 * node and pathway stays exactly where it was. That is the argument. The system
 * is the same; the workflow is yours.
 */
export function IndustrySystem() {
  const { industry } = useAppState();
  const [flowKey, setFlowKey] = useState(0);
  const current = INDUSTRIES.find((i) => i.id === industry) ?? INDUSTRIES[0];
  const flowRef = useRef<HTMLOListElement>(null);

  // Re-run the flow reveal whenever the selection changes.
  useEffect(() => {
    setFlowKey((k) => k + 1);
  }, [industry]);

  return (
    <ScrollScene id="industries" beatId="industries" align="center" scrim="read-left">
      <div>
        <div>
          <h2 className="t-section max-w-[15ch]">
            Your industry
            <br />
            isn&rsquo;t the limit.
          </h2>
          <p className="t-lead mt-6 max-w-[42ch]">
            Every business has different workflows. We build the system around yours.
          </p>
        </div>

        {/* Horizontal scroll-snap rail: nine options without nine cards. */}
        <div
          className="mt-11 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          <div
            role="tablist"
            aria-label="Industry"
            className="flex w-max gap-2"
          >
            {INDUSTRIES.map((i) => {
              const on = i.id === industry;
              return (
                <button
                  key={i.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="industry-flow"
                  type="button"
                  onClick={() => setState({ industry: i.id })}
                  className="whitespace-nowrap rounded-[var(--radius-machined)] border px-4 py-2.5 text-[0.875rem] transition-colors duration-300"
                  style={{
                    borderColor: on ? "var(--color-accent)" : "var(--color-line)",
                    // #0080FF at 14% over the near-black page keeps the label
                    // above 4.5:1 while still reading as selected.
                    background: on ? "rgba(0,128,255,0.14)" : "transparent",
                    color: on ? "var(--color-ink)" : "var(--color-muted)",
                  }}
                >
                  {i.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="industry-flow"
          role="tabpanel"
          aria-live="polite"
          className="mt-10 border-t border-[color:var(--color-line)] pt-9"
        >
          <ol
            key={flowKey}
            ref={flowRef}
            className="flex flex-col gap-y-5 md:flex-row md:flex-wrap md:items-center md:gap-x-3"
          >
            {current.flow.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3 md:gap-4"
                style={{
                  animation: `flowIn 620ms var(--ease-core) ${i * 85}ms both`,
                }}
              >
                <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-medium tracking-[-0.03em]">
                  {step}
                </span>
                {i < current.flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[color:var(--color-accent)]/60"
                  >
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p className="t-tech mt-10">One Core. Infinite systems.</p>
        </div>
      </div>
    </ScrollScene>
  );
}
