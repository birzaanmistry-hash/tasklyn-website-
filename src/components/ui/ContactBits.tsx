"use client";

import { EnvelopeSimple, InstagramLogo, Phone } from "@phosphor-icons/react";
import { CONTACT } from "@/lib/content";

/**
 * The contact details, in one component so the same email, the same numbers and
 * the same Instagram handle appear on every page. Changing them means changing
 * CONTACT in lib/content and nothing else.
 *
 * Icons come from Phosphor rather than hand-drawn paths: one family, one stroke
 * weight, and they render as inline SVG so they inherit colour from the text.
 */

const ICON = { size: 16, weight: "regular" as const };

export function EmailLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${CONTACT.email}`}
      className={`group inline-flex items-center gap-2.5 text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-accent-hot)] ${className}`}
    >
      <EnvelopeSimple {...ICON} aria-hidden="true" className="shrink-0 text-[color:var(--color-accent)]" />
      <span className="underline decoration-[color:var(--color-line)] underline-offset-4 transition-colors group-hover:decoration-[color:var(--color-accent)]">
        {CONTACT.email}
      </span>
    </a>
  );
}

export function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={CONTACT.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-accent-hot)] ${className}`}
    >
      <InstagramLogo {...ICON} aria-hidden="true" className="shrink-0 text-[color:var(--color-accent)]" />
      <span>{CONTACT.instagram.handle}</span>
      <span className="sr-only"> on Instagram (opens in a new tab)</span>
    </a>
  );
}

/** A founder's name, role and direct line. Used on Team and Contact. */
export function FounderLine({
  founder,
  showLine = false,
}: {
  founder: (typeof CONTACT.founders)[number];
  showLine?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[1.0625rem] tracking-[-0.02em] text-[color:var(--color-ink)]">
          {founder.name}
        </span>
        <span className="t-tech">{founder.role}</span>
      </div>

      {showLine && (
        <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
          {founder.line}
        </p>
      )}

      <a
        href={`tel:${founder.tel}`}
        className="inline-flex w-fit items-center gap-2.5 text-[0.9375rem] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-hot)]"
      >
        <Phone {...ICON} aria-hidden="true" className="shrink-0 text-[color:var(--color-accent)]" />
        <span className="t-data">{founder.phone}</span>
        <span className="sr-only">Call {founder.name}</span>
      </a>
    </div>
  );
}
