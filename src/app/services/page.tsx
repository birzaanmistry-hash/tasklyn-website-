import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tasklyn builds operations, customer response, sales, reporting and custom AI systems. We do not pick a niche. We replace the function.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <p className="t-tech">Services</p>
          <h1 className="t-display mt-6 max-w-[17ch]">
            We don&rsquo;t pick a niche.
            <br />
            <span className="text-[color:var(--color-accent)]">We replace the function.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">
            Most agencies sell you a tool and leave you to run it. We take one function
            that is eating your team&rsquo;s hours and build a system that does it, in the
            tools you already have.
          </p>
        </Wrap>
      </section>

      {/* How we work */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[14ch]">How we work.</h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-machined)] border border-[color:var(--color-line)] bg-[color:var(--color-line)] md:grid-cols-3">
            {SERVICE_STEPS.map((s) => (
              <li key={s.n} className="bg-[color:var(--color-abyss)] p-7 md:p-9">
                <span className="t-tech text-[color:var(--color-accent)]">{s.n}</span>
                <h3 className="mt-4 text-[1.375rem] font-medium tracking-[-0.03em]">
                  {s.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
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

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_TYPES.map((t) => (
              <article
                key={t.id}
                className="flex flex-col rounded-[var(--radius-machined)] border border-[color:var(--color-line)] bg-[color:var(--color-abyss)]/70 p-7 transition-colors duration-300 hover:border-[color:var(--color-accent-deep)]"
              >
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.03em]">
                  {t.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {t.body}
                </p>

                <ul className="mt-6 space-y-3 border-t border-[color:var(--color-line)] pt-6">
                  {t.ticks.map((tick) => (
                    <li key={tick} className="flex gap-3">
                      <Check
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                        className="mt-[3px] shrink-0 text-[color:var(--color-accent)]"
                      />
                      <span className="text-[0.9375rem] leading-snug text-[color:var(--color-ink)]">
                        {tick}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {/* The sixth cell is the honest one: the list above is not exhaustive. */}
            <article className="flex flex-col justify-between rounded-[var(--radius-machined)] border border-dashed border-[color:var(--color-line)] p-7">
              <div>
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.03em]">
                  Something else?
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  If the work is repetitive, has rules, and someone is doing it by hand,
                  it can probably be built. Tell us what it is.
                </p>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
              >
                Ask us
                <span aria-hidden="true">&rarr;</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          </div>
        </Wrap>
      </section>

      {/* Why businesses trust Tasklyn */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[18ch]">Why businesses trust Tasklyn.</h2>

          <ul className="mt-12 border-t border-[color:var(--color-line)]">
            {TRUST.map((r, i) => (
              <li
                key={r.name}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[auto_minmax(0,22ch)_minmax(0,1fr)] md:items-baseline md:gap-8"
              >
                <span className="t-tech">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.125rem] font-medium tracking-[-0.025em]">{r.name}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
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

          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-machined)] border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_INDUSTRIES.map((ind) => (
              <div key={ind.name} className="bg-[color:var(--color-abyss)] p-6">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.025em]">
                  {ind.name}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-[color:var(--color-muted)]">
                  {ind.loop}
                </p>
              </div>
            ))}
          </div>

          <p className="t-tech mt-8">Not listed? The shape is usually the same.</p>
        </Wrap>
      </section>

      <div className="pt-28 md:pt-36">
        <CtaBand />
      </div>
    </SiteShell>
  );
}
