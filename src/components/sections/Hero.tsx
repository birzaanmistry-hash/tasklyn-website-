"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppState } from "@/lib/store";
import { ScrollScene } from "../ui/ScrollScene";
import { MagneticButton } from "../ui/MagneticButton";
import { BOOKING_URL, CTA_PRIMARY } from "@/lib/content";
import { STUDIO } from "@/lib/studio";

/**
 * The hero.
 *
 * Left-aligned and sitting low in the frame, which leaves the upper two thirds
 * to the Core. A centred hero would put the type on top of the object and waste
 * the only asset on the page that no competitor has.
 */
export function Hero() {
  const { phase } = useAppState();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "live") return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(".hero-line span, .hero-sub, .hero-cta", { opacity: 1, y: 0 });
        return;
      }

      // The words rise out of the Core rather than fading in over it, which is
      // why they are clipped and translated instead of tweened on opacity only.
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          ".hero-line span",
          { yPercent: 108 },
          { yPercent: 0, duration: 1.25, stagger: 0.09 },
          0.05
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.55
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          0.72
        );
    }, root);

    return () => ctx.revert();
  }, [phase]);

  return (
    <ScrollScene id="top" beatId="hero" align="end" compactAlign="end" scrim="bottom" fadeIn={0}>
      <div
        ref={root}
        className="pb-[9vh] pt-24 transition-opacity duration-500"
        // The hero stays out of the frame until the opening title has handed
        // over. The film opens on the company, not on the positioning line.
        style={{
          opacity: phase === "live" ? 1 : 0,
          pointerEvents: phase === "live" ? "auto" : "none",
        }}
        aria-hidden={phase !== "live"}
      >
        <h1 className="t-hero max-w-[24ch]">
          <span className="hero-line block overflow-hidden pb-[0.08em]">
            <span className="block will-change-transform">Engineering intelligence.</span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.08em]">
            <span className="block will-change-transform text-[color:var(--color-accent)]">
              Building what comes next.
            </span>
          </span>
        </h1>

        <div className="mt-9 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-sub t-lead max-w-[52ch] opacity-0">{STUDIO.definition}</p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href={BOOKING_URL} className="hero-cta opacity-0">
              {CTA_PRIMARY}
            </MagneticButton>
            <MagneticButton href="/products" variant="ghost" className="hero-cta opacity-0">
              See our products
            </MagneticButton>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
