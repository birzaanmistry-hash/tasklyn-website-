import { BOOKING_URL, CONTACT } from "@/lib/content";
import Link from "next/link";
import { HeroScenes } from "@/components/home/HeroScenes";
import { Intro } from "@/components/Intro";
import { IndustryTabs } from "@/components/home/IndustryTabs";
import { Plates, type PlatesVariant } from "@/components/home/Plates";
import { SiteShell } from "@/components/SiteShell";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ArrowIcon, Button, TextLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { pageMeta, webPageLd } from "@/lib/seo";
import {
  APPROACH,
  BRAND,
  INDUSTRIES,
  PROBLEM_TYPES,
  PRODUCT_VISION,
  RESOURCES,
  SOLUTIONS,
} from "@/lib/site";

const META = {
  title: "Tasklyn | Enterprise AI Engineering & Products from India",
  description:
    "Tasklyn is an India-based AI engineering company. We design, build, integrate and deploy enterprise AI systems, agents and LLM applications for organisations.",
  path: "/",
};

export const metadata = pageMeta(META);

/* The four questions + Tasklyn's own approach, answered in plain terms. */
const PLAIN_TERMS = [
  "what-is-enterprise-ai-engineering",
  "how-ai-agents-automate-business-processes",
  "how-to-integrate-ai-into-existing-systems",
  "ai-automation-vs-agentic-ai",
  "how-tasklyn-approaches-ai-implementation",
]
  .map((slug) => RESOURCES.find((r) => r.slug === slug))
  .filter((r): r is (typeof RESOURCES)[number] => !!r);

/* Split "We Don't Just Implement AI. We Build With It." into lead + dimmed tail. */
const [PRODUCT_LEAD, PRODUCT_TAIL] = (() => {
  const h = PRODUCT_VISION.headline;
  const cut = h.indexOf(". ") + 1;
  return [h.slice(0, cut), h.slice(cut + 1)];
})();

const CHAPTER_PAD = "py-[clamp(5.5rem,3rem+9vw,11rem)]";

/**
 * Centred chapter heading in the Scale rhythm: plates illustration, 12px
 * label, 34-56px semibold Title Case heading whose tail is dimmed (readable,
 * 7.5:1 on black).
 */
function ChapterHead({
  id,
  art,
  label,
  lead,
  tail,
  tone = "black",
}: {
  id: string;
  art?: PlatesVariant;
  label?: string;
  lead: string;
  tail?: string;
  tone?: "black" | "light";
}) {
  const black = tone === "black";
  return (
    <div className="flex flex-col items-center text-center">
      {art && (
        <div className="mb-14 md:mb-20">
          <Plates variant={art} />
        </div>
      )}
      {label && (
        <p className={`t-micro mb-5 inline-flex items-center gap-2 ${black ? "text-label" : "text-muted"}`}>
          <span aria-hidden="true" className={`h-1 w-1 ${black ? "bg-cyan" : "bg-blue"}`} />
          {label}
        </p>
      )}
      <Reveal>
        <h2 id={id} className={`max-w-[19em] text-title ${black ? "text-white" : "text-ink"}`}>
          <span className="lit">{lead}</span>
          {tail && <span className={black ? "text-dim" : "text-muted"}> {tail}</span>}
        </h2>
      </Reveal>
    </div>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <Intro />
      <JsonLd data={webPageLd(META)} />

      {/* 01 HERO: rounded inset panel, fixed headline over a cut sequence of original scenes */}
      <section aria-labelledby="hero-title" className="px-2.5">
        <div
          data-tone="dark"
          data-header-dark=""
          className="relative isolate flex min-h-[max(36rem,calc(100svh-var(--header-h)-0.625rem))] flex-col overflow-hidden rounded-panel bg-black text-white lg:max-h-[64rem]"
        >
          <HeroScenes />

          <div className="flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-20 text-center md:px-8">
            <h1 id="hero-title" className="max-w-[13em] text-hero text-white">
              The Next Era Of Business Is Intelligent.
            </h1>
            <p className="mt-6 max-w-[24em] text-sub font-semibold text-white">
              We Engineer The AI Systems That Make It Possible.
            </p>
            <p className="mt-4 max-w-[34rem] text-copy text-ash md:text-small">
              From advanced AI engineering to intelligent enterprise platforms, Tasklyn transforms complex
              challenges into real-world AI capabilities.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/solutions" variant="onDark" size="sm" arrow={false}>
                Explore Solutions
              </Button>
              <Button href={BOOKING_URL} external variant="onDarkSecondary" size="sm">
                Talk To Our Team
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6 px-5 pb-5 md:px-8 md:pb-7">
            <p className="max-w-[24ch] text-copy text-white/80 sm:max-w-none">{BRAND.tagline}</p>
            <a href="#intro" className="group inline-flex min-h-11 shrink-0 items-center gap-3 text-copy font-medium text-white">
              <span className="hidden sm:inline">Scroll To Explore</span>
              <span className="sr-only sm:hidden">Scroll To Explore</span>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60 transition-colors duration-200 group-hover:bg-white group-hover:text-black"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="M8 3v9.5M4 8.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* BLACK CHAPTERS: introduction, solutions, products --------------- */}
      <div data-header-dark="" data-tone="dark" className="mt-2.5 bg-black text-white">
        {/* 02 INTRODUCTION */}
        <section id="intro" aria-labelledby="intro-h" className={CHAPTER_PAD}>
          <Wrap>
            <ChapterHead
              id="intro-h"
              art="documents"
              label="Tasklyn"
              lead="AI Is Changing What's Possible."
              tail="We Make It Practical."
            />
            <Reveal className="mx-auto mt-8 max-w-[44rem] text-center">
              <p className="text-body text-ash">
                The opportunity is no longer just about adopting AI. It is about engineering intelligent systems
                that understand your business, connect with your infrastructure and deliver meaningful outcomes.
              </p>
              <p className="mt-4 text-body text-ash">
                Tasklyn brings together AI engineering, software engineering and business understanding to turn
                that opportunity into reality.
              </p>
            </Reveal>
            <ul
              aria-label="What Tasklyn brings together"
              className="mx-auto mt-12 flex max-w-[47.5rem] flex-col items-center justify-center gap-2 text-item font-medium text-white sm:flex-row sm:gap-0"
            >
              {["AI Engineering", "Software Engineering", "Business Understanding"].map((d, i) => (
                <li key={d} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="px-5 text-cyan max-sm:hidden">
                      +
                    </span>
                  )}
                  {d}
                </li>
              ))}
            </ul>
          </Wrap>
        </section>

        {/* 03 ENTERPRISE SOLUTIONS */}
        <section aria-labelledby="solutions-h" className={`${CHAPTER_PAD} !pt-0`}>
          <Wrap>
            <ChapterHead
              id="solutions-h"
              art="agents"
              label="Solutions"
              lead="One Partner."
              tail="Across The AI Engineering Lifecycle."
            />
            <div className="mt-8 flex justify-center">
              <Button href="/solutions" variant="chip" size="sm">
                Explore All Solutions
              </Button>
            </div>

            <ul className="mx-auto mt-16 grid max-w-[60rem] md:mt-20 md:grid-cols-2 md:gap-x-12">
              {SOLUTIONS.map((s, i) => (
                <li key={s.slug} className="border-t border-white/12">
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group flex min-h-11 items-start justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="flex items-center gap-3 text-item font-semibold text-white transition-colors duration-200 group-hover:text-cyan">
                        {s.name}
                        {i === 0 && <span className="t-micro text-cyan">Start Here</span>}
                      </span>
                      <span className="mt-1.5 block text-copy text-label">{s.short}</span>
                    </span>
                    <ArrowIcon className="mt-1 text-label group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </Wrap>
        </section>

        {/* 04 PRODUCTS */}
        <section aria-labelledby="products-h" className="pb-2.5">
          <Wrap className={`${CHAPTER_PAD} !pt-0`}>
            <ChapterHead id="products-h" art="models" label="Products" lead={PRODUCT_LEAD} tail={PRODUCT_TAIL} />
            <p className="mt-6 text-center text-copy text-label">Product directions, in development</p>
            <ul className="mx-auto mt-12 grid max-w-[64rem] gap-x-10 gap-y-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_VISION.directions.map((d) => (
                <li key={d.name}>
                  <h3 className="text-item text-white">{d.name}</h3>
                  <p className="mt-2 text-copy text-label">{d.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Button href="/products" variant="chip" size="sm">
                See The Product Vision
              </Button>
            </div>
          </Wrap>

          {/* Statement panel: the tagline, a true statement, beside an original visual */}
          <div className="grid gap-2.5 px-2.5 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
            <div className="relative flex min-h-[16rem] items-center justify-center overflow-hidden rounded-panel bg-[radial-gradient(110%_90%_at_60%_100%,var(--color-navy)_0%,var(--color-night)_75%)] lg:min-h-[30rem]">
              <Plates variant="network" className="w-[min(62%,20rem)]" />
            </div>
            <div className="flex min-h-[26rem] flex-col rounded-panel bg-navy p-7 md:p-12 lg:min-h-[30rem]">
              <p className="max-w-[12em] text-statement font-semibold text-balance text-white">
                AI Is The Future And <span className="text-dim">We Are Building It.</span>
              </p>
              <div className="mt-auto max-w-[36rem] pt-14">
                <p className="text-copy text-haze md:text-[0.9375rem]">{PRODUCT_VISION.body}</p>
                <p className="mt-4 border-t border-white/12 pt-4 text-copy text-dim">{PRODUCT_VISION.note}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 05 INDUSTRIES: white, colour-varied word stack ------------------- */}
      <section aria-labelledby="industries-h" className={`bg-paper ${CHAPTER_PAD}`}>
        <Wrap>
          <ChapterHead id="industries-h" tone="light" lead="Intelligence For Every Industry." />
          <p className="mx-auto mt-6 max-w-[46ch] text-center text-small text-muted">
            Where AI can be applied in each sector. These describe the opportunity, not work we have already
            delivered.
          </p>
          <div className="mt-14 md:mt-20">
            <IndustryTabs industries={INDUSTRIES} />
          </div>
          <div className="mt-10 flex justify-center">
            <TextLink href="/industries">Explore Industries</TextLink>
          </div>
        </Wrap>
      </section>

      {/* BLACK CHAPTERS: technology, approach ---------------------------- */}
      <div data-header-dark="" data-tone="dark" className="bg-black text-white">
        {/* 06 TECHNOLOGY */}
        <section aria-labelledby="tech-h" className={CHAPTER_PAD}>
          <Wrap>
            <ChapterHead
              id="tech-h"
              art="integrations"
              label="Technology"
              lead="Built On Intelligence."
              tail="Engineered For Reality."
            />
            <p className="mx-auto mt-8 max-w-[40rem] text-center text-body text-ash">
              Every system we build is designed in five layers, from the data it works from to the checks that
              show it is working.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/technology" variant="chip" size="sm">
                Explore Our Technology
              </Button>
            </div>
            <Reveal className="mx-auto mt-16 max-w-[64rem] md:mt-20">
              <ArchitectureDiagram tone="dark" />
            </Reveal>
          </Wrap>
        </section>

        {/* 07 OUR APPROACH */}
        <section id="approach" aria-labelledby="approach-h" className={`${CHAPTER_PAD} !pt-0`}>
          <Wrap>
            <ChapterHead
              id="approach-h"
              art="monitoring"
              lead="From Business Challenge"
              tail="To Intelligent Execution."
            />
            <ol className="mx-auto mt-16 grid max-w-[72rem] md:mt-20 lg:grid-cols-5">
              {APPROACH.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.n}
                  delay={i * 60}
                  className="relative border-l border-white/14 pb-10 pl-7 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-7"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[4px] top-1 h-[7px] w-[7px] rounded-full lg:-top-[4px] lg:left-0 ${
                      i === APPROACH.length - 1 ? "bg-cyan" : "border border-white/60 bg-black"
                    }`}
                  />
                  <p className="t-micro text-label">{s.n}</p>
                  <h3 className="mt-3 text-item text-white">{s.name}</h3>
                  <p className="mt-2 max-w-[40ch] text-copy text-label">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </Wrap>
        </section>
      </div>

      {/* 08 CASE STUDIES: problem types, honest line retained ------------ */}
      <section aria-labelledby="cases-h" className={`bg-mist ${CHAPTER_PAD}`}>
        <Wrap>
          <ChapterHead
            id="cases-h"
            tone="light"
            label="The Types Of Problems We Engineer"
            lead="Engineering Outcomes"
            tail="That Matter."
          />
          <p className="mx-auto mt-6 max-w-[52ch] text-center text-small text-muted">
            These are problem types, not completed client engagements. We will publish case studies when there is
            verified work we can describe accurately.
          </p>
          <ul className="mx-auto mt-14 grid max-w-[72rem] gap-2.5 md:mt-16 md:grid-cols-6">
            {PROBLEM_TYPES.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={(i % 3) * 60}
                className={`flex flex-col rounded-tile border border-line bg-paper p-7 md:p-8 ${
                  i < 2 ? "md:col-span-3 lg:min-h-[15rem]" : "md:col-span-2"
                }`}
              >
                <h3 className="max-w-[22ch] text-[1.1875rem] leading-[1.25] tracking-[-0.018em] text-ink">{p.name}</h3>
                <p className="mt-3 text-copy text-muted lg:mt-auto lg:pt-8">{p.body}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <TextLink href="/case-studies">How We Approach These Problems</TextLink>
          </div>
        </Wrap>
      </section>

      {/* 09 COMPANY -------------------------------------------------------- */}
      <section aria-labelledby="company-h" className={`bg-paper ${CHAPTER_PAD}`}>
        <Wrap>
          <ChapterHead id="company-h" tone="light" lead="A New Generation" tail="Of AI Engineering." />
          <p className="mx-auto mt-6 max-w-[50ch] text-center text-body text-ink-soft">
            {BRAND.definition}
          </p>
          <div className="mx-auto mt-14 max-w-[56rem] border-t border-line pt-8 text-center">
            <p className="text-copy text-muted">Based in {BRAND.hq}. Building for organisations across:</p>
            <ol className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {BRAND.markets.map((m, i) => (
                <li key={m} className={`text-[1.1875rem] font-medium tracking-[-0.018em] ${i === 0 ? "text-blue-ink" : "text-ink"}`}>
                  {m}
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto mt-14 max-w-[56rem] border-t border-line pt-8">
            <p className="text-center text-label text-muted">Founders</p>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2">
              {CONTACT.founders.map((f) => (
                <li key={f.name} className="text-center">
                  <p className="text-h4 text-ink">{f.name}</p>
                  <p className="mt-1 text-small text-muted">{f.role}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-2 text-small text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-blue-ink hover:decoration-current"
                  >
                    LinkedIn
                    <span className="sr-only"> profile of {f.name} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex justify-center">
            <TextLink href="/company">About Tasklyn</TextLink>
          </div>
        </Wrap>
      </section>

      {/* PLAIN TERMS (AEO) ------------------------------------------------- */}
      <section aria-labelledby="plain-h" className={`bg-paper ${CHAPTER_PAD} !pt-0`}>
        <Wrap>
          <div className="mx-auto max-w-[47.5rem] border-t border-line pt-[clamp(4rem,2rem+6vw,8rem)]">
            <ChapterHead id="plain-h" tone="light" lead="Tasklyn In Plain Terms." />
            <p className="mx-auto mt-6 max-w-[46ch] text-center text-small text-muted">
              Direct answers to the questions we are asked most. Each links to a fuller explanation.
            </p>
            <div className="mt-12">
              <FaqList
                schema
                openFirst
                items={PLAIN_TERMS.map((r) => ({ q: r.question, a: r.answer, href: `/resources/${r.slug}` }))}
              />
            </div>
            <div className="mt-8 flex justify-center">
              <TextLink href="/resources">All Resources</TextLink>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 10 FINAL CTA ------------------------------------------------------ */}
      <CtaBand />
    </SiteShell>
  );
}
