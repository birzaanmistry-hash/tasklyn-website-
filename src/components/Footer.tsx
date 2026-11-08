import Link from "next/link";
import { CONTACT, BOOKING_URL } from "@/lib/content";
import { BRAND, FOOTER_COLUMNS } from "@/lib/site";
import { Button } from "./ui/Button";
import { EmailLink, InstagramLink } from "./ui/ContactBits";
import { LogoTile } from "./ui/Logo";
import { Wrap } from "./ui/Wrap";

/**
 * Site footer: black, the official logo (unaltered PNG), the tagline,
 * every section of the site from FOOTER_COLUMNS, contact details and the
 * legal links. Server component.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" data-header-dark="" className="mt-2.5 bg-black text-snow">
      <Wrap className="pt-(--space-block)">
        {/* brand row */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <LogoTile size={48} />
              <div>
                <p className="text-[1.0625rem] font-medium tracking-[0.14em]">TASKLYN</p>
                <p className="mt-1 text-[0.8125rem] text-label">{BRAND.descriptor}</p>
              </div>
            </div>
            <p className="mt-10 text-title text-snow">{BRAND.taglineDisplay}</p>
          </div>
          <Button href={BOOKING_URL} external variant="onDark" size="sm" arrow={false}>
            Talk To Our Team
          </Button>
        </div>

        {/* columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.35fr_repeat(5,minmax(0,1fr))_1.35fr]">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="t-micro text-label">{col.title}</h2>
              <ul className="mt-4">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-10 items-center py-1 text-copy text-ash transition-colors duration-200 hover:text-cyan"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h2 className="t-micro text-label">Contact</h2>
            <ul className="mt-4 text-copy">
              <li>
                <EmailLink tone="dark" className="text-copy" />
              </li>
              <li>
                <InstagramLink tone="dark" className="text-copy" />
              </li>
              {CONTACT.founders.map((f) => (
                <li key={f.name} className="flex flex-wrap items-center gap-x-3">
                  <span className="py-2">{f.name}</span>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center text-ash underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-cyan"
                  >
                    LinkedIn
                    <span className="sr-only"> profile of {f.name} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="py-2 text-label">{CONTACT.city}</li>
              <li>
                <Link href="/contact" className="inline-flex min-h-10 items-center text-ash transition-colors duration-200 hover:text-cyan">
                  Contact Page
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* legal row */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8125rem] text-label md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {BRAND.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>{BRAND.hq}</li>
            <li>
              <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-snow">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-10 items-center hover:text-snow">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Wrap>
    </footer>
  );
}
