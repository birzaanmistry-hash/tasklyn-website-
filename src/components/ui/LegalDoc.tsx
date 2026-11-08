import { SiteShell } from "@/components/SiteShell";
import { LEGAL, type LegalSection } from "@/lib/legal";
import { TextLink } from "./Button";
import { EmailLink } from "./ContactBits";
import { PageHero } from "./PageHero";
import { Wrap } from "./Wrap";

/**
 * LegalDoc: a legal document (privacy policy, terms) in the site's editorial
 * style. Sticky contents on the left from lg, numbered sections on the right
 * at a readable measure. Sections are numbered because policies are cited by
 * section. Copy comes from src/lib/legal.ts.
 *
 * Props
 *  crumb: string          breadcrumb label for this page
 *  path: string           this page's path (e.g. "/privacy")
 *  title: string          the page H1
 *  intro: string          lead paragraph
 *  sections: LegalSection[]
 *  other: { label: string; href: string }   link to the sibling document
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
      <PageHero crumbs={[{ name: crumb, path }]} title={title} lead={intro}>
        <p className="text-small text-muted">Last updated {LEGAL.updated}</p>
      </PageHero>

      <Wrap className="py-(--space-block)">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="Contents" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <p className="t-label text-muted">Contents</p>
            <ol className="mt-4 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-10 items-center gap-3 border-l border-transparent py-1.5 pl-4 text-small text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                  >
                    <span className="t-label w-5 shrink-0 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className="border-t border-line py-10 first:border-t-0 first:pt-0"
              >
                <p className="t-label text-blue-ink">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-h`} className="mt-3 text-h3 text-ink">
                  {s.title}
                </h2>
                <div className="mt-5 max-w-prose space-y-4 text-body text-ink-soft">
                  {s.blocks.map((b, j) =>
                    "p" in b ? (
                      <p key={j}>{b.p}</p>
                    ) : (
                      <ul key={j} className="space-y-2.5">
                        {b.ul.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.72em] h-1 w-3 shrink-0 bg-blue" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}

            <div className="mt-6 flex flex-col gap-6 rounded-card border border-line bg-mist p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-small text-muted">Questions about this document?</p>
                <EmailLink className="text-body" />
              </div>
              <TextLink href={other.href}>{other.label}</TextLink>
            </div>
          </div>
        </div>
      </Wrap>
    </SiteShell>
  );
}
