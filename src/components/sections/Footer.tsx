"use client";

import { BOOKING_URL, CONTACT, CTA_PRIMARY } from "@/lib/content";
import { EmailLink, InstagramLink, FounderLine } from "../ui/ContactBits";
import { LogoMark } from "../ui/Logo";
import { MagneticButton } from "../ui/MagneticButton";

/**
 * About and contact.
 *
 * This is the one part of the page that stops being a film, so it gets an
 * opaque ground and an ordinary, legible layout.
 *
 * There is no contact form. The only thing this page asks anyone to do is book
 * the discovery call, and a form that produces an email a human then has to
 * answer is a slower path to the same meeting. The direct details sit underneath
 * for anyone who would rather write first.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className="safe-bottom relative z-10 border-t border-[color:var(--color-line)] bg-[color:var(--color-abyss)]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-24">
          {/* About */}
          <div id="about">
            <h2 className="t-section max-w-[14ch]">Two founders. One system.</h2>

            <p className="t-lead mt-6 max-w-[46ch]">
              Tasklyn is a small team in Mumbai. We work directly with the people who
              run the business, and we build against real work rather than a demo.
            </p>

            <ul className="mt-10 border-t border-[color:var(--color-line)]">
              {CONTACT.founders.map((f) => (
                <li key={f.name} className="border-b border-[color:var(--color-line)] py-5">
                  <FounderLine founder={f} />
                </li>
              ))}
            </ul>
          </div>

          {/* Book the call */}
          <div>
            <div className="panel p-7 sm:p-9">
              <p className="t-tech">Discovery call</p>

              <h2 className="mt-4 text-[1.625rem] font-medium leading-[1.15] tracking-[-0.03em]">
                Tell us what is taking the most time.
              </h2>

              <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                We look at where your team&rsquo;s hours actually go, and what a system
                would take off your plate. No preparation needed.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "45 minutes",
                  "On Google Meet",
                  "You pick the time",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] shrink-0 bg-[color:var(--color-accent)]"
                    />
                    <span className="t-data text-[color:var(--color-ink)]">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton href={BOOKING_URL}>{CTA_PRIMARY}</MagneticButton>
              </div>
            </div>

            {/* For anyone who would rather write than book. */}
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="t-tech">Email</dt>
                <dd className="mt-2.5 text-[0.9375rem]">
                  <EmailLink />
                </dd>
              </div>
              <div>
                <dt className="t-tech">Instagram</dt>
                <dd className="mt-2.5 text-[0.9375rem]">
                  <InstagramLink />
                </dd>
              </div>
              <div>
                <dt className="t-tech">Studio</dt>
                <dd className="mt-2.5 text-[0.9375rem] text-[color:var(--color-ink)]">
                  {CONTACT.city}
                  <span className="mt-1 block text-[color:var(--color-muted)]">
                    {CONTACT.reach}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" id="footer-mark" />
            <span className="text-[0.875rem] tracking-[0.14em]">TASKLYN</span>
          </div>

          <nav aria-label="Legal" className="flex items-center gap-7">
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center text-[0.8125rem] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="inline-flex min-h-11 items-center text-[0.8125rem] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              Terms
            </a>
          </nav>

          <p className="text-[0.8125rem] text-[color:var(--color-faint)]">
            &copy; {new Date().getFullYear()} Tasklyn AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
