"use client";

import { ScrollScene } from "../ui/ScrollScene";
import { MagneticButton } from "../ui/MagneticButton";
import { BOOKING_DETAIL, BOOKING_URL, CTA_PRIMARY } from "@/lib/content";

/**
 * The close.
 *
 * The Core is fully connected and running by the time the camera arrives here,
 * and then everything stops. The question is the last thing moving, which is
 * the point: the visitor is meant to answer it, not read it.
 */
export function FinalCTA() {
  return (
    <ScrollScene id="build" beatId="cta" align="center" scrim="film" fadeOut={0.08}>
      <div>
        <h2 className="t-display max-w-[15ch]">
          What should
          <br />
          your business
          <br />
          <span className="text-[color:var(--color-accent)]">stop doing manually?</span>
        </h2>

        <div className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-3">
          <MagneticButton href={BOOKING_URL}>{CTA_PRIMARY}</MagneticButton>
          <p className="t-data text-[color:var(--color-muted)]">{BOOKING_DETAIL}</p>
        </div>
      </div>
    </ScrollScene>
  );
}
