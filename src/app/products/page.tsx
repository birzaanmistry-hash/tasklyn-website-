import { BOOKING_URL } from "@/lib/content";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Ledger } from "@/components/ui/Ledger";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PRODUCT_VISION } from "@/lib/site";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "AI Products & Platforms | What Tasklyn Is Building",
  description:
    "Alongside enterprise AI engineering, Tasklyn is developing AI-powered products and platforms. The directions we are exploring, and what we will publish and when.",
  path: "/products",
};
export const metadata = pageMeta(META);

export default function ProductsPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "CollectionPage" })} />
      <PageHero
        crumbs={[{ name: "Products", path: "/products" }]}
        eyebrow="AI Products & Platforms"
        title={PRODUCT_VISION.headline}
        lead={PRODUCT_VISION.body}
      >
        <Button href={BOOKING_URL} external>Talk To Our Team</Button>
      </PageHero>

      <Section labelledBy="dir-h">
        <h2 id="dir-h" className="text-h2 text-ink">
          Directions We Are Exploring.
        </h2>
        <div className="mt-12">
          <Ledger items={PRODUCT_VISION.directions} />
        </div>
        <p className="mt-8 max-w-prose text-small text-muted">{PRODUCT_VISION.note}</p>
      </Section>

      <Section labelledBy="crit-h">
        <h2 id="crit-h" className="text-h2 text-ink">
          How We Decide What To Build.
        </h2>
        <p className="mt-5 max-w-prose text-lead text-ink-soft">
          A product has to earn its place. These are the questions an idea must answer before we commit engineering time.
        </p>
        <div className="mt-12">
          <Ledger
            numbered
            as="ol"
            items={[
              { name: "Is The Problem Recurring?", body: "It must appear in many organisations, not only one. Recurrence is what makes a product better than a custom build." },
              { name: "Is It Expensive Today?", body: "The current cost in time, errors or lost revenue should be clear and large enough to matter to a buyer." },
              { name: "Can AI Genuinely Help?", body: "AI must change the economics of the problem, not decorate it. If a simpler tool solves it, we do not build." },
              { name: "Can We Build It Responsibly?", body: "Data, security and oversight requirements must be tractable, with people in control of consequential decisions." },
              { name: "Will Customers Tell Us It Matters?", body: "We validate with people who live the problem before we build, and again as we go." },
            ]}
          />
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="why-h">
        <h2 id="why-h" className="text-h2 text-ink">
          Why Build Products At All.
        </h2>
        <p className="mt-6 max-w-prose text-lead text-ink-soft">
          Client work shows us which problems recur across organisations. Where the same problem keeps appearing, a focused product can serve it better than a bespoke build each time. That is the logic behind what we choose to explore.
        </p>
      </Section>

      <CtaBand
        heading="Have A Problem Worth Solving?"
        body="Tell us about a recurring problem in your organisation. It may become a custom system today, and informs what we build tomorrow."
      />
    </SiteShell>
  );
}
