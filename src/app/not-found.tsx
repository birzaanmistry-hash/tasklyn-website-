import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Wrap } from "@/components/ui/Wrap";
import { NAV } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Tasklyn" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const links = NAV.filter((n) => n.label !== "Contact");

  return (
    <SiteShell>
      <Wrap className="py-(--space-section)">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="t-label text-muted">Error 404</p>
            <h1 className="mt-6 max-w-[11em] text-display text-ink">This Page Does Not Exist.</h1>
            <p className="mt-7 max-w-[48ch] text-lead text-ink-soft">
              The link may be out of date, or the address may have been mistyped. Everything on the site is
              reachable from here.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/" size="lg">
                Back To Home
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk To Our Team
              </Button>
            </div>
          </div>

          <nav aria-label="Site sections" className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <ul className="border-t border-line">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    className="group flex min-h-14 items-center justify-between text-h4 font-medium text-ink transition-colors hover:text-blue-ink"
                  >
                    {l.label}
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Wrap>
    </SiteShell>
  );
}
