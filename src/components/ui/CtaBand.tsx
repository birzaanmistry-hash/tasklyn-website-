"use client";

import { BOOKING_DETAIL, BOOKING_URL, CTA_PRIMARY } from "@/lib/content";
import { MagneticButton } from "./MagneticButton";
import { EmailLink } from "./ContactBits";

/**
 * The closing ask, shared by every sub-page.
 *
 * One primary action (book the call) with the email underneath for people who
 * would rather write first. Two competing buttons would split the decision.
 */
export function CtaBand({
  heading = "What should your business stop doing manually?",
  body = "Bring the function that is costing you the most hours. We will tell you honestly whether a system can take it.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-[color:var(--color-line)]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="max-w-[46ch]">
          <h2 className="t-section">{heading}</h2>
          <p className="t-lead mt-6">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <MagneticButton href={BOOKING_URL}>{CTA_PRIMARY}</MagneticButton>
            <p className="t-data text-[color:var(--color-muted)]">{BOOKING_DETAIL}</p>
          </div>

          <div className="mt-8 text-[0.9375rem]">
            <EmailLink />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The narrow "prefer to talk" strip used on the contact page. */
export function BookBand() {
  return (
    <section className="border-y border-[color:var(--color-line)]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <div>
          <h2 className="text-[1.375rem] font-medium tracking-[-0.03em]">
            Prefer to talk it through?
          </h2>
          <p className="mt-1.5 text-[0.9375rem] text-[color:var(--color-muted)]">
            {BOOKING_DETAIL} Pick a time that suits you.
          </p>
        </div>
        <MagneticButton href={BOOKING_URL}>Book a slot</MagneticButton>
      </div>
    </section>
  );
}
