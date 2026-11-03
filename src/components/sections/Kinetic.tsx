"use client";

import { useEffect, useMemo, useRef } from "react";
import { ScrollScene } from "../ui/ScrollScene";
import { frame } from "@/lib/store";
import { progress, clamp01 } from "@/lib/choreography";
import { useCompact } from "@/lib/useCompact";

/**
 * Stop automating tasks. Start building systems.
 *
 * The letters of the first statement physically travel to become the second.
 * Each glyph gets its own vector and its own timing offset, so the sentence
 * comes apart as matter and reassembles, rather than glitching or crossfading.
 */

const FROM = ["Stop", "automating", "tasks."];
const TO = ["Start", "building", "systems."];

function useGlyphVectors(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = i * 2.3999632;
        return {
          x: Math.cos(a) * (0.5 + ((i * 29) % 60) / 90),
          y: Math.sin(a) * (0.5 + ((i * 41) % 60) / 110),
          r: (((i * 17) % 100) / 100 - 0.5) * 34,
          d: ((i * 13) % 100) / 100,
        };
      }),
    [count]
  );
}

function Line({
  words,
  phase,
  vectors,
  offset,
}: {
  words: string[];
  phase: "out" | "in";
  vectors: ReturnType<typeof useGlyphVectors>;
  offset: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = ref.current;
      if (el) {
        const p = progress(frame.scroll, "kinetic");
        const glyphs = el.querySelectorAll<HTMLElement>("[data-g]");

        glyphs.forEach((g, i) => {
          const v = vectors[(i + offset) % vectors.length];
          // Staggered by glyph, so the line disperses and re-forms in a wave.
          const t = clamp01((p - 0.26 - v.d * 0.12) / 0.3);
          const k = phase === "out" ? t : 1 - t;

          g.style.transform = `translate3d(${v.x * k * 11}vmin, ${v.y * k * 7}vmin, 0) rotate(${v.r * k * 0.5}deg)`;
          g.style.opacity = String(Math.max(0, 1 - k * 1.6));
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, vectors, offset]);

  return (
    <span ref={ref} className="col-start-1 row-start-1 block">
      {words.map((w, wi) => (
        <span key={w} className="mr-[0.28em] inline-block whitespace-nowrap">
          {Array.from(w).map((ch, ci) => (
            <span
              key={`${w}-${ci}`}
              data-g
              aria-hidden="true"
              className="inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className="sr-only"> </span>}
        </span>
      ))}
    </span>
  );
}

export function Kinetic() {
  const vectors = useGlyphVectors(40);
  const compact = useCompact();

  // The letters travelling from one sentence to the other needs a pinned scene
  // to play out in. On a phone the section scrolls normally, so it is a plain
  // before and after instead: the old sentence greyed back, the new one lit.
  if (compact) {
    return (
      <ScrollScene beatId="kinetic" align="center" scrim="film">
        <div className="py-10">
          <h2 className="sr-only">Stop automating tasks. Start building systems.</h2>
          <p aria-hidden="true" className="t-display max-w-[13ch] text-[color:var(--color-muted)]">
            Stop automating tasks.
          </p>
          <p
            aria-hidden="true"
            className="t-display mt-7 max-w-[13ch] text-[color:var(--color-accent)]"
          >
            Start building systems.
          </p>
        </div>
      </ScrollScene>
    );
  }

  return (
    <ScrollScene beatId="kinetic" align="center" scrim="film" fadeIn={0.08} fadeOut={0.08}>
      <div className="relative grid place-items-start">
        {/* The readable sentence for assistive technology and for anyone with
            reduced motion, since the animated glyphs are aria-hidden. */}
        <h2 className="sr-only">Stop automating tasks. Start building systems.</h2>

        <p
          aria-hidden="true"
          className="t-display col-start-1 row-start-1 max-w-[13ch]"
        >
          <Line words={FROM} phase="out" vectors={vectors} offset={0} />
        </p>

        <p
          aria-hidden="true"
          className="t-display col-start-1 row-start-1 max-w-[13ch] text-[color:var(--color-accent)]"
        >
          <Line words={TO} phase="in" vectors={vectors} offset={7} />
        </p>
      </div>
    </ScrollScene>
  );
}
