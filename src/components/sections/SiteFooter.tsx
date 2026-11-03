"use client";

import Link from "next/link";
import { CONTACT, NAV } from "@/lib/content";
import { LogoMark } from "../ui/Logo";
import { EmailLink, InstagramLink } from "../ui/ContactBits";

/**
 * The footer for sub-pages.
 *
 * Slimmer than the home page's, because every sub-page already ends on its own
 * call to action. Repeating the booking card here would be the third identical
 * ask in one screen.
 */
export function SiteFooter() {
  return (
    <footer className="safe-bottom relative z-10 border-t border-[color:var(--color-line)] bg-[color:var(--color-abyss)]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 lg:px-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <LogoMark className="h-5 w-5" id="sitefooter-mark" />
              <span className="text-[0.875rem] tracking-[0.14em]">TASKLYN</span>
            </Link>
            <p className="mt-4 max-w-[28ch] text-[0.875rem] leading-relaxed text-[color:var(--color-muted)]">
              AI systems that run the repetitive work inside your business.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="t-tech">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[0.9375rem] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-ink)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-tech">Contact</p>
            <div className="mt-4 space-y-3 text-[0.9375rem]">
              <EmailLink />
              <div>
                <InstagramLink />
              </div>
            </div>
          </div>

          <div>
            <p className="t-tech">Studio</p>
            <p className="mt-4 text-[0.9375rem] text-[color:var(--color-ink)]">{CONTACT.city}</p>
            <p className="mt-1 text-[0.875rem] text-[color:var(--color-muted)]">{CONTACT.reach}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--color-line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
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
