import { SiteShell } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PROBLEM_TYPES } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Enterprise AI Case Studies | Problems We Engineer | Tasklyn",
  description:
    "The kinds of business problems Tasklyn engineers AI systems to solve. We publish case studies only when verified client work can be described accurately.",
  path: "/case-studies",
};
export const metadata = pageMeta(META);

export default function CaseStudiesPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "CollectionPage" })} />
      <PageHero
        crumbs={[{ name: "Case Studies", path: "/case-studies" }]}
        eyebrow="Case Studies"
        title="Engineering Outcomes That Matter."
        lead="Tasklyn is a new company, and we do not yet have client engagements we can describe publicly. Instead of inventing them, this page sets out the kinds of problems we engineer systems to solve."
      />

      <Section labelledBy="problems-h">
        <h2 id="problems-h" className="text-h2 text-ink">
          The Problems We Engineer.
        </h2>
        <p className="mt-5 max-w-prose text-small text-muted">
          These are problem types, not completed client engagements.
        </p>
        <div className="mt-10">
          <Ledger items={PROBLEM_TYPES} />
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="promise-h">
        <h2 id="promise-h" className="text-h2 text-ink">
          What You Will See Here Later.
        </h2>
        <p className="mt-6 max-w-prose text-lead text-ink-soft">
          When there is verified work we are permitted to describe, each case study will state the problem, the system we built, how it was measured and what changed, with the client&apos;s agreement. Until then, this page will not claim results we cannot show.
        </p>
      </Section>

      <CtaBand
        heading="Recognise One Of These Problems?"
        body="Tell us which one sounds like yours. We will say honestly whether AI is the right answer and what a first project would look like."
      />
    </SiteShell>
  );
}
