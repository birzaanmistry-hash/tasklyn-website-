import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Button, TextLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BOOKING_URL } from "@/lib/content";
import { SOLUTION_DETAIL } from "@/lib/solution-detail";
import { SOLUTIONS, solutionBySlug } from "@/lib/site";
import { pageMeta, serviceLd, webPageLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.title, description: s.description, path: `/solutions/${s.slug}` });
}

const TOC = [
  ["overview", "Overview"],
  ["problems", "Problems We Solve"],
  ["builds", "What We Build"],
  ["process", "How It Works"],
  ["deliverables", "What You Receive"],
  ["governance", "Control And Risk"],
  ["fit", "Is It Right For You"],
  ["faq", "Questions"],
] as const;

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = solutionBySlug((await params).slug);
  const d = s ? SOLUTION_DETAIL[s.slug] : undefined;
  if (!s || !d) notFound();
  const path = `/solutions/${s.slug}`;
  const others = SOLUTIONS.filter((x) => x.slug !== s.slug);
  const faqs = [...s.faqs, ...d.faqs];

  return (
    <SiteShell>
      <JsonLd data={webPageLd({ title: s.title, description: s.description, path })} />
      <JsonLd data={serviceLd({ name: s.name, description: s.description, path })} />
      <PageHero
        crumbs={[
          { name: "Solutions", path: "/solutions" },
          { name: s.name, path },
        ]}
        eyebrow="Solutions"
        title={s.name}
        lead={s.definition}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={BOOKING_URL} external>
            Talk To Our Team
          </Button>
          <Button href="#process" variant="secondary" arrow={false}>
            See How It Works
          </Button>
        </div>
      </PageHero>

      <nav aria-label="On this page" className="border-b border-line bg-white">
        <ul className="mx-auto flex max-w-[84rem] gap-x-7 overflow-x-auto px-6 py-1 text-small whitespace-nowrap [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden">
          {TOC.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="inline-flex min-h-11 items-center whitespace-nowrap text-ink-soft transition-colors hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="overview" labelledBy="overview-h">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="overview-h" className="text-h2 text-ink">
            Overview.
          </h2>
          <div className="max-w-prose space-y-6 text-lead text-ink-soft">
            {d.overview.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="problems" tone="offwhite" labelledBy="problems-h">
        <h2 id="problems-h" className="text-h2 text-ink">
          The Problems This Solves.
        </h2>
        <div className="mt-12">
          <Ledger items={d.problems} />
        </div>
      </Section>

      <Section id="builds" labelledBy="builds-h">
        <h2 id="builds-h" className="text-h2 text-ink">
          What We Build.
        </h2>
        <div className="mt-12">
          <Ledger items={s.builds} />
        </div>
        <h3 className="mt-20 text-h3 text-ink">The Building Blocks.</h3>
        <p className="mt-4 max-w-prose text-body text-muted">
          The parts that typically make up a system of this kind. The exact set depends on your requirement.
        </p>
        <div className="mt-8">
          <Ledger items={d.building} />
        </div>
      </Section>

      <Section id="process" tone="dark" inset labelledBy="process-h">
        <h2 id="process-h" className="text-h2 text-snow">
          How It Works.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-haze">{s.delivery}</p>
        <ol className="mt-14 border-t border-white/15">
          {d.process.map((p, i) => (
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
      </Section>

      <Section id="deliverables" labelledBy="deliv-h">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="deliv-h" className="text-h2 text-ink">
              What You Receive.
            </h2>
            <p className="mt-5 max-w-[34ch] text-body text-muted">
              Every engagement ends with things you own, can run and can explain.
            </p>
          </div>
          <ul className="border-t border-line">
            {d.deliverables.map((x) => (
              <li key={x} className="border-b border-line py-5 text-body text-ink-soft">
                {x}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mt-20 text-h3 text-ink">Where It Applies.</h3>
        <ul className="mt-8 border-t border-line">
          {s.useCases.map((u) => (
            <li key={u} className="border-b border-line py-5 text-body text-ink-soft">
              {u}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-small text-muted">
          These describe what the capability can do for an organisation, not completed client projects.
        </p>
      </Section>

      <Section id="governance" tone="offwhite" labelledBy="gov-h">
        <h2 id="gov-h" className="text-h2 text-ink">
          Control, Risk And Oversight.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-ink-soft">
          Capability without control is a liability. These are the safeguards we build in.
        </p>
        <div className="mt-12">
          <Ledger items={d.governance} />
        </div>
      </Section>

      <Section id="fit" labelledBy="fit-h">
        <h2 id="fit-h" className="text-h2 text-ink">
          Is It Right For You.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-h4 text-ink">A Good Fit When</h3>
            <ul className="mt-5 border-t border-line">
              {d.fit.good.map((x) => (
                <li key={x} className="border-b border-line py-4 text-body text-ink-soft">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h4 text-ink">Not The Right Moment When</h3>
            <ul className="mt-5 border-t border-line">
              {d.fit.notYet.map((x) => (
                <li key={x} className="border-b border-line py-4 text-body text-ink-soft">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="faq" tone="offwhite" labelledBy="faq-h">
        <h2 id="faq-h" className="text-h2 text-ink">
          Common Questions.
        </h2>
        <FaqList className="mt-10" schema openFirst items={faqs} />
      </Section>

      <Section spacing="compact" labelledBy="more-h">
        <h2 id="more-h" className="text-h3 text-ink">
          Other Solutions.
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {others.map((o) => (
            <li key={o.slug}>
              <TextLink href={`/solutions/${o.slug}`}>{o.name}</TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </SiteShell>
  );
}
