import { SiteShell } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FounderLine } from "@/components/ui/ContactBits";
import { CONTACT } from "@/lib/content";
import { APPROACH, BRAND } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "About Tasklyn | AI Development Company In India",
  description:
    "Tasklyn is an India-based AI engineering company building enterprise AI systems and AI products. Who we are, what we do, who we serve and how we work.",
  path: "/company",
};
export const metadata = pageMeta(META);

const BELIEFS = [
  { name: "AI Is The Future, And It Has To Be Engineered", body: "The technology is real and moving fast. Turning it into something a business can rely on is craft: testing, integration, monitoring and ownership." },
  { name: "Build Around Problems, Not Technology", body: "We start from what is costly, slow or error-prone in your operations, and choose the technology afterwards." },
  { name: "Ship Small, Learn Fast", body: "Short increments with real behaviour on screen beat long plans. Risk is cheapest to find early." },
  { name: "Tell The Truth About What Works", body: "We say what AI can do, what it cannot, and when the right answer is something simpler. No inflated claims." },
  { name: "Build For The Long Term", body: "We design systems your team can run, and products that compound from what client work teaches us." },
] as const;

const FACTS = [
  { name: "Who We Are", body: BRAND.definition },
  { name: "What We Do", body: "We design, build, integrate and deploy AI systems: AI engineering, agentic AI, intelligent automation, LLM applications, enterprise AI integration, data and machine learning, and AI consulting." },
  { name: "Who We Serve", body: `Organisations in ${BRAND.markets.join(", ")}, across banking, healthcare, manufacturing, logistics, retail, real estate, education and professional services.` },
  { name: "Where We Are", body: `Based in ${BRAND.hq}, working with organisations internationally.` },
  { name: "What Makes Us Different", body: "We start from the business problem, build in short increments with evaluation from day one, and keep people in the loop wherever a decision matters." },
];

export default function CompanyPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "AboutPage" })} />
      <PageHero
        crumbs={[{ name: "Company", path: "/company" }]}
        eyebrow="Company"
        title="A New Generation Of AI Engineering."
        lead={`${BRAND.tagline} Tasklyn is an AI engineering and products company from India, with a global ambition and a simple aim: to make AI practical for organisations that depend on it.`}
      />

      <Section tone="dark" inset labelledBy="belief-h">
        <h2 id="belief-h" className="text-h2 text-snow">
          What We Believe.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-haze">
          A company is a set of decisions made repeatedly. These are ours.
        </p>
        <ol className="mt-14 border-t border-white/15">
          {BELIEFS.map((b, i) => (
            <li
              key={b.name}
              className="grid gap-2 border-b border-white/15 py-7 md:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)] md:items-baseline md:gap-8"
            >
              <span className="text-label text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-h4 text-snow">{b.name}</h3>
              <p className="max-w-[58ch] text-body text-haze">{b.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="glance-h">
        <h2 id="glance-h" className="text-h2 text-ink">
          Tasklyn At A Glance.
        </h2>
        <div className="mt-12">
          <Ledger items={FACTS} />
        </div>
      </Section>

      <Section tone="offwhite" id="approach" labelledBy="approach-h">
        <h2 id="approach-h" className="text-h2 text-ink">
          Our Approach.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-ink-soft">From business challenge to intelligent execution, in five stages.</p>
        <div className="mt-12">
          <Ledger numbered as="ol" items={APPROACH.map((a) => ({ name: a.name, body: a.body, n: a.n }))} />
        </div>
      </Section>

      <Section labelledBy="founders-h">
        <h2 id="founders-h" className="text-h2 text-ink">
          Founders.
        </h2>
        <ul className="mt-10 grid border-t border-line md:grid-cols-2">
          {CONTACT.founders.map((f) => (
            <li key={f.name} className="border-b border-line py-8 md:pr-10">
              <FounderLine founder={f} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </SiteShell>
  );
}
