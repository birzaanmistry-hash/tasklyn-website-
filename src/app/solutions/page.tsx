import { BOOKING_URL } from "@/lib/content";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { APPROACH, SOLUTIONS } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Enterprise AI Solutions | AI Engineering Services | Tasklyn",
  description:
    "Enterprise AI solutions from Tasklyn: AI engineering, agentic AI, intelligent automation, LLM applications, AI integration, data and ML, and AI consulting.",
  path: "/solutions",
};
export const metadata = pageMeta(META);

export default function SolutionsPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "CollectionPage" })} />
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Enterprise AI Solutions"
        title="One Partner. Across The AI Engineering Lifecycle."
        lead="Tasklyn designs, builds, integrates and deploys AI systems for organisations. Seven capabilities cover the lifecycle, from the first strategy conversation to a monitored system in production."
      >
        <Button href={BOOKING_URL} external>Talk To Our Team</Button>
      </PageHero>

      <Section labelledBy="all-solutions">
        <h2 id="all-solutions" className="text-h2 text-ink">
          Our Capabilities.
        </h2>
        <div className="mt-12">
          <Ledger items={SOLUTIONS.map((s) => ({ name: s.name, body: s.short, href: `/solutions/${s.slug}` }))} />
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="how-solutions">
        <h2 id="how-solutions" className="text-h2 text-ink">
          How An Engagement Runs.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-ink-soft">
          Every capability follows the same five stages, so the way we work is predictable even when the systems differ.
        </p>
        <div className="mt-12">
          <Ledger numbered as="ol" items={APPROACH.map((a) => ({ name: a.name, body: a.body, n: a.n }))} />
        </div>
      </Section>

      <CtaBand />
    </SiteShell>
  );
}
