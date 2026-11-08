import Link from "next/link";
import { Plates } from "@/components/home/Plates";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BOOKING_URL } from "@/lib/content";
import { INDUSTRY_DETAIL, INDUSTRY_PRINCIPLES } from "@/lib/industry-detail";
import { INDUSTRIES } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Enterprise AI By Industry | Applications | Tasklyn",
  description:
    "Where enterprise AI applies in banking, healthcare, manufacturing, logistics, retail, real estate, education and professional services. Practical use cases.",
  path: "/industries",
};
export const metadata = pageMeta(META);

export default function IndustriesPage() {
  const rows = INDUSTRIES.map((ind) => ({ ind, d: INDUSTRY_DETAIL.find((x) => x.slug === ind.slug)! }));

  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "CollectionPage" })} />

      <PageHero
        tone="dark"
        crumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title="Intelligence For Every Industry."
        lead="Any industry with high-volume document, communication or decision work can benefit from enterprise AI. Below, for each of eight sectors: where the friction is, which AI workflows apply, what systems are involved, where people stay in control and where to start. These describe the opportunity, not work we have already delivered."
      >
        <Button href={BOOKING_URL} external variant="onDark">
          Talk To Our Team
        </Button>
      </PageHero>

      {/* index */}
      <Section spacing="compact" labelledBy="index-h">
        <h2 id="index-h" className="text-label text-muted">
          Jump To A Sector
        </h2>
        <ol className="mt-6 grid border-t border-line md:grid-cols-2 md:gap-x-16">
          {rows.map(({ ind }, i) => (
            <li key={ind.slug} className="border-b border-line">
              <a
                href={`#${ind.slug}`}
                className="group flex items-baseline gap-5 py-5 transition-colors hover:text-blue-ink"
              >
                <span className="text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-h4 text-ink group-hover:text-blue-ink">{ind.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {/* sectors */}
      {rows.map(({ ind, d }, i) => (
        <Section
          key={ind.slug}
          id={ind.slug}
          tone={i % 2 ? "offwhite" : "light"}
          labelledBy={`${ind.slug}-h`}
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            {/* identity column */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-label text-muted">
                {String(i + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
              </p>
              <h2 id={`${ind.slug}-h`} className="mt-4 text-h2 text-ink">
                {ind.name}
              </h2>
              <p className="mt-5 max-w-[34ch] text-body text-ink-soft">{d.summary}</p>
              <div
                data-tone="dark"
                aria-hidden="true"
                className="mt-8 hidden overflow-hidden rounded-panel bg-black px-6 py-8 lg:block"
              >
                <Plates variant={d.plate} className="mx-auto w-full max-w-[18rem]" />
              </div>
            </div>

            {/* detail column */}
            <div className="space-y-16">
              <div>
                <h3 className="text-label text-muted">Where The Friction Is</h3>
                <div className="mt-5">
                  <Ledger items={d.friction} />
                </div>
              </div>

              <div>
                <h3 className="text-label text-muted">What AI Does Here</h3>
                <div className="mt-5">
                  <Ledger numbered items={d.workflows} />
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-14">
                <div>
                  <h3 className="text-label text-muted">Systems Involved</h3>
                  <ul className="mt-5 border-t border-line">
                    {d.systems.map((s) => (
                      <li key={s} className="border-b border-line py-4 text-body text-ink-soft">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-label text-muted">Where People Stay In Control</h3>
                  <p className="mt-5 border-t border-line pt-5 text-body text-ink-soft">{d.oversight}</p>
                </div>
              </div>

              <div
                data-tone="dark"
                className="flex flex-col gap-6 rounded-panel bg-navy p-7 text-snow md:flex-row md:items-center md:justify-between md:p-9"
              >
                <div className="max-w-[52ch]">
                  <h3 className="text-label text-cyan">A Sensible First Project</h3>
                  <p className="mt-3 text-body text-haze">{d.start}</p>
                </div>
                <Button href={BOOKING_URL} external variant="onDark" size="sm">
                  Discuss This Sector
                </Button>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* principles */}
      <Section tone="dark" inset labelledBy="principles-h">
        <h2 id="principles-h" className="text-h2 text-snow">
          How We Approach Every Sector.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-haze">
          The sectors differ. The way we work does not.
        </p>
        <ol className="mt-14 border-t border-white/15">
          {INDUSTRY_PRINCIPLES.map((p, i) => (
            <li
              key={p.name}
              className="grid gap-2 border-b border-white/15 py-7 md:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)] md:items-baseline md:gap-8"
            >
              <span className="text-label text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-h4 text-snow">{p.name}</h3>
              <p className="max-w-[58ch] text-body text-haze">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-small text-haze">
          Not sure which process to start with? See{" "}
          <Link href="/solutions/ai-consulting" className="text-cyan underline underline-offset-4">
            AI Strategy &amp; Consulting
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        heading="Which Process Should Come First?"
        body="The right question is not whether your industry is suitable, but which process is costly enough, and well enough understood, to improve first. We can help you decide."
      />
    </SiteShell>
  );
}
