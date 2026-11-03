import Link from "next/link";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { EmailLink } from "@/components/ui/ContactBits";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LEGAL, type LegalSection } from "@/lib/legal";

/**
 * A legal document in the site's own language: a hairline per section, the
 * heading on the left and the text on the right at a readable measure.
 *
 * Sections are numbered because a policy is cited by section ("see 9"), so here
 * the number carries real information.
 */
export function LegalDoc({
  crumb,
  path,
  title,
  intro,
  sections,
  other,
}: {
  crumb: string;
  path: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  other: { label: string; href: string };
}) {
  return (
    <SiteShell>
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: crumb, path }]} />
          <h1 className="t-display mt-6 max-w-[16ch]">{title}</h1>
          <p className="t-lead mt-8 max-w-[60ch]">{intro}</p>
          <p className="t-data mt-6 text-[color:var(--color-faint)]">
            Last updated {LEGAL.updated}
          </p>
        </Wrap>
      </section>

      {/* Contents */}
      <section className="pt-16 md:pt-20">
        <Wrap>
          <nav aria-label="Contents" className="border-t border-[color:var(--color-line)] pt-7">
            <p className="t-tech">Contents</p>
            <ol className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3 text-[0.9375rem]">
                  <span className="t-data w-6 shrink-0 text-[color:var(--color-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-ink)]"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Wrap>
      </section>

      {/* Sections */}
      <section className="pt-16 md:pt-20">
        <Wrap>
          <div className="border-t border-[color:var(--color-line)]">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className="grid scroll-mt-24 gap-4 border-b border-[color:var(--color-line)] py-9 md:grid-cols-[auto_minmax(0,22ch)_minmax(0,1fr)] md:gap-10"
              >
                <span className="t-tech pt-1.5 text-[color:var(--color-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h2
                  id={`${s.id}-h`}
                  className="text-[1.25rem] font-medium leading-snug tracking-[-0.03em]"
                >
                  {s.title}
                </h2>

                <div className="max-w-[68ch] space-y-4 text-[0.9375rem] leading-[1.7] text-[color:var(--color-muted)]">
                  {s.blocks.map((b, j) =>
                    "p" in b ? (
                      <p key={j}>{b.p}</p>
                    ) : (
                      <ul key={j} className="space-y-2.5">
                        {b.ul.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-[5px] w-[5px] shrink-0 bg-[color:var(--color-accent)]"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Close */}
      <section className="pb-28 pt-14 md:pb-36">
        <Wrap>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-[0.9375rem]">
              <p className="text-[color:var(--color-muted)]">Questions about this document?</p>
              <EmailLink />
            </div>

            <Link
              href={other.href}
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
            >
              {other.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>

          <p className="mt-12 text-[0.8125rem] text-[color:var(--color-faint)]">
            &copy; {new Date().getFullYear()} {LEGAL.name}. {LEGAL.rights}
          </p>
        </Wrap>
      </section>
    </SiteShell>
  );
}
