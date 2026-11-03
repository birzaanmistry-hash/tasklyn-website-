"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, CTA_PRIMARY, BOOKING_URL } from "@/lib/content";
import { LogoMark } from "./ui/Logo";
import { frame, useAppState } from "@/lib/store";

/**
 * Navigation.
 *
 * Almost invisible over the hero, then it condenses into a translucent bar once
 * the visitor is inside the journey and might actually want to leave it. Fixed
 * height of 64px, one line at every breakpoint.
 */
export function Nav() {
  const { phase } = useAppState();
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let raf = 0;
    let last = false;
    const loop = () => {
      const c = frame.scroll > 0.012;
      if (c !== last) {
        last = c;
        setCondensed(c);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // The menu is a dialog on mobile, so Escape has to close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hidden = phase !== "live";

  return (
    <header
      ref={bar}
      className="fixed inset-x-0 top-0 z-50 transition-[opacity,transform] duration-700"
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(-12px)" : "none",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div
        className="safe-top transition-all duration-500"
        style={{
          background: condensed ? "rgba(8, 12, 22, 0.62)" : "transparent",
          backdropFilter: condensed ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: condensed ? "blur(14px) saturate(140%)" : "none",
          borderBottom: condensed
            ? "1px solid var(--color-line)"
            : "1px solid transparent",
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-14"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-[var(--radius-machined)]"
            aria-label="Tasklyn, home"
          >
            <LogoMark className="h-6 w-6" id="nav-mark" />
            <span className="text-[0.9375rem] font-medium tracking-[0.14em]">TASKLYN</span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => {
              const on = pathname === n.href;
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={on ? "page" : undefined}
                    className="relative text-[0.875rem] transition-colors duration-300 hover:text-[color:var(--color-ink)]"
                    style={{ color: on ? "var(--color-ink)" : "var(--color-muted)" }}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-[var(--radius-machined)] border border-[color:var(--color-line)] px-4 py-2 text-[0.8125rem] font-medium text-[color:var(--color-ink)] transition-colors duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hot)] sm:inline-flex"
            >
              {CTA_PRIMARY}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-machined)] border border-[color:var(--color-line)] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className="absolute left-0 block h-px w-4 bg-[color:var(--color-ink)] transition-transform duration-300"
                  style={{ top: open ? 6 : 2, transform: open ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 block h-px w-4 bg-[color:var(--color-ink)] transition-transform duration-300"
                  style={{ top: open ? 6 : 10, transform: open ? "rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-b border-[color:var(--color-line)] bg-[color:var(--color-abyss)]/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-4">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === n.href ? "page" : undefined}
                className="block py-3 text-lg text-[color:var(--color-ink)]"
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block rounded-[var(--radius-machined)] bg-[color:var(--color-accent)] px-5 py-3 text-center text-[0.9375rem] font-medium text-[#001120]"
            >
              {CTA_PRIMARY}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
