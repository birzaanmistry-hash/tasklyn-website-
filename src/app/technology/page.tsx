import { SiteShell } from "@/components/SiteShell";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Enterprise AI Architecture | Technology | Tasklyn",
  description:
    "How Tasklyn architects enterprise AI in five layers: data and context, intelligence, agent orchestration, integration, and evaluation and monitoring.",
  path: "/technology",
};
export const metadata = pageMeta(META);

const LAYERS = [
  { n: "01", name: "Data & Context", points: [
    { t: "Contains", d: "Databases, documents, messages and records, prepared, permissioned and kept current." },
    { t: "How We Build It", d: "Pipelines that ingest and clean data, with access rules and quality tests built in." },
    { t: "We Watch For", d: "Stale data, missing permissions and information the system should never see." } ] },
  { n: "02", name: "Intelligence Layer", points: [
    { t: "Contains", d: "The language, vision and predictive models, plus retrieval that finds the right evidence." },
    { t: "How We Build It", d: "Models chosen by testing on your cases, and designed so they can be swapped." },
    { t: "We Watch For", d: "Wrong answers stated confidently, cost at volume and drift over time." } ] },
  { n: "03", name: "Agent & Orchestration Layer", points: [
    { t: "Contains", d: "Logic that sequences steps, calls tools, coordinates agents and brings in people." },
    { t: "How We Build It", d: "Narrow roles, scoped permissions, approval gates and step and spending limits." },
    { t: "We Watch For", d: "Runaway loops, over-broad access and actions nobody approved." } ] },
  { n: "04", name: "Integration Layer", points: [
    { t: "Contains", d: "Secure connections to ERP, CRM, messaging and internal applications." },
    { t: "How We Build It", d: "Scoped credentials, retries, rollback and staged rollout from read-only to write." },
    { t: "We Watch For", d: "Brittle connections, silent failures and changes that cannot be reversed." } ] },
  { n: "05", name: "Evaluation & Monitoring", points: [
    { t: "Contains", d: "Test sets, traces, quality metrics and alerts across every other layer." },
    { t: "How We Build It", d: "Realistic test cases from your data, re-run on every change, with live dashboards." },
    { t: "We Watch For", d: "Quality that slips quietly and problems that appear only at scale." } ] },
] as const;

const FAQS = [
  {
    q: "Why Five Layers?",
    a: "Separating data, intelligence, orchestration, integration and monitoring lets each be tested, secured and improved on its own. It also means a model can be replaced without rebuilding the connections and controls around it.",
  },
  {
    q: "Do You Depend On One Model Provider?",
    a: "We choose the model that fits the job, and design the intelligence layer so that it can be changed. Which model suits a task is decided by evaluation on your data, not by habit.",
  },
];

export default function TechnologyPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd(META)} />
      <PageHero
        crumbs={[{ name: "Technology", path: "/technology" }]}
        eyebrow="Technology"
        title="Built On Intelligence. Engineered For Reality."
        lead="Every system we build is designed in five layers, from the data it works from to the checks that show it is working. The structure is the same whether the system answers questions, runs a workflow or coordinates agents."
      />

      <Section tone="dark" inset labelledBy="arch-h">
        <h2 id="arch-h" className="text-h2 text-snow">
          The Five-Layer Architecture.
        </h2>
        <div className="mt-12">
          <ArchitectureDiagram tone="dark" />
        </div>
      </Section>

      <Section labelledBy="layers-h">
        <h2 id="layers-h" className="text-h2 text-ink">
          Inside Each Layer.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-ink-soft">
          What each layer contains, how we build it, and what we watch for.
        </p>
        <div className="mt-12 space-y-14">
          {LAYERS.map((l) => (
            <div key={l.n} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div>
                <p className="text-label text-muted">{l.n}</p>
                <h3 className="mt-3 text-h3 text-ink">{l.name}</h3>
              </div>
              <dl className="grid gap-6 md:grid-cols-3">
                {l.points.map((p) => (
                  <div key={p.t}>
                    <dt className="text-label text-muted">{p.t}</dt>
                    <dd className="mt-3 text-body text-ink-soft">{p.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="faq-h">
        <h2 id="faq-h" className="text-h2 text-ink">
          Common Questions.
        </h2>
        <FaqList className="mt-10" schema openFirst items={FAQS} />
      </Section>

      <CtaBand
        heading="Want To See How This Applies To You?"
        body="Bring the requirement. We will tell you plainly what we would build, and what we would not."
      />
    </SiteShell>
  );
}
