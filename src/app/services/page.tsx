import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  SERVICE_STEPS,
  SYSTEM_TYPES,
  TRUST,
  SERVICE_INDUSTRIES,
  BOOKING_URL,
} from "@/lib/content";

export const metadata = pageMeta({
  title: "Custom Enterprise AI Systems | Solutions, Tasklyn AI Studio",
  description:
    "Tasklyn AI engineers custom enterprise AI systems for operations, customer response, sales and reporting, around manufacturers, exporters and complex workflows.",
  path: "/services",
});

/**
 * Services.
 *
 * Built in the home page's language: hairline rules, large type and whitespace
 * doing the structural work. An earlier version used bordered card grids, which
 * is the templated look the rest of this site is deliberately avoiding.
 */
export default function ServicesPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: "Solutions", path: "/services" }]} />
          <h1 className="t-display mt-6 max-w-[17ch]">
            Custom enterprise AI systems.
            <br />
            <span className="text-[color:var(--color-accent)]">We replace the function.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">
            This is the work we do for clients today. We don&rsquo;t pick a niche: we take one
            function that is consuming your team&rsquo;s hours and engineer a system that does
            it, inside the tools you already use. What we learn from this work shapes the
            products we explore.
          </p>
          <Link
            href="/products"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
          >
            See the products we&rsquo;re building
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Wrap>
      </section>

      {/* How we work */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[14ch]">How we work.</h2>

          <ol className="mt-11 border-t border-[color:var(--color-line)]">
            {SERVICE_STEPS.map((s) => (
              <li
                key={s.n}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[auto_minmax(0,20ch)_minmax(0,1fr)] md:items-baseline md:gap-10"
              >
                <span className="t-tech text-[color:var(--color-accent)]">{s.n}</span>
                <h3 className="text-[1.25rem] font-medium tracking-[-0.03em]">{s.name}</h3>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* What we build */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[16ch]">What we build.</h2>
          <p className="t-lead mt-6 max-w-[54ch]">
            Five kinds of system. Most businesses start with one and add the next once
            the first is running.
          </p>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {SYSTEM_TYPES.map((t) => (
              <li
                key={t.id}
                className="grid gap-5 border-b border-[color:var(--color-line)] py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
              >
                <div>
                  <h3 className="text-[1.375rem] font-medium tracking-[-0.03em]">{t.name}</h3>
                  <p className="mt-2.5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                    {t.body}
                  </p>
                </div>

                <ul className="grid gap-2.5 self-center sm:grid-cols-3 lg:gap-x-8">
                  {t.ticks.map((tick) => (
                    <li key={tick} className="flex gap-2.5">
                      <Check
                        size={14}
                        weight="bold"
                        aria-hidden="true"
                        className="mt-[4px] shrink-0 text-[color:var(--color-accent)]"
                      />
                      <span className="text-[0.875rem] leading-snug text-[color:var(--color-ink)]">
                        {tick}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {/* The list is not exhaustive, and says so in its own last row
                rather than in a separate box. */}
            <li className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[color:var(--color-line)] py-8">
              <div>
                <h3 className="text-[1.375rem] font-medium tracking-[-0.03em]">
                  Something else?
                </h3>
                <p className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  If the work repeats, has rules, and someone is doing it by hand, it can
                  probably be built. Tell us what it is.
                </p>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
              >
                Ask us
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Wrap>
      </section>

      {/* Why businesses trust Tasklyn */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[18ch]">Why businesses trust Tasklyn.</h2>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {TRUST.map((r, i) => (
              <li
                key={r.name}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[auto_minmax(0,24ch)_minmax(0,1fr)] md:items-baseline md:gap-10"
              >
                <span className="t-tech">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.125rem] font-medium tracking-[-0.025em]">{r.name}</h3>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* Industries */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[16ch]">The loops we replace.</h2>
          <p className="t-lead mt-6 max-w-[52ch]">
            Different industries, the same shape of problem: work that repeats, has rules,
            and is being done by a person.
          </p>

          <ul className="mt-11 grid border-t border-[color:var(--color-line)] md:grid-cols-2 md:gap-x-16">
            {SERVICE_INDUSTRIES.map((ind) => (
              <li
                key={ind.name}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-[color:var(--color-line)] py-5"
              >
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.025em]">
                  {ind.name}
                </h3>
                <p className="t-data max-w-[40ch] text-[color:var(--color-muted)]">
                  {ind.loop}
                </p>
              </li>
            ))}
          </ul>

          <p className="t-tech mt-8">Not listed? The shape is usually the same.</p>
        </Wrap>
      </section>

      <div className="pt-28 md:pt-36">
        <CtaBand />
      </div>
    </SiteShell>
  );
}
