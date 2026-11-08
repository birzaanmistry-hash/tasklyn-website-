import { SiteShell } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RESOURCES } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Enterprise AI Explained | Resources | Tasklyn",
  description:
    "Plain answers to common enterprise AI questions: AI engineering, agents, LLM applications, integration, automation and how to start an AI project.",
  path: "/resources",
};
export const metadata = pageMeta(META);

export default function ResourcesPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "CollectionPage" })} />
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources"
        title="Enterprise AI, Explained."
        lead="Short, direct answers to the questions organisations ask before starting an AI project, each followed by the depth behind it."
      />
      <Section labelledBy="list-h">
        <h2 id="list-h" className="sr-only">
          All Resources
        </h2>
        <Ledger
          items={RESOURCES.map((r) => ({ name: r.question, body: r.answer, href: `/resources/${r.slug}` }))}
        />
      </Section>
      <CtaBand />
    </SiteShell>
  );
}
