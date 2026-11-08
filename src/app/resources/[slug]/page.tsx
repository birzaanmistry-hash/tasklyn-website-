import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { TextLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RESOURCES, resourceBySlug } from "@/lib/site";
import { articleLd, pageMeta, webPageLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = resourceBySlug((await params).slug);
  if (!r) return {};
  return pageMeta({ title: r.title, description: r.description, path: `/resources/${r.slug}` });
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const r = resourceBySlug((await params).slug);
  if (!r) notFound();
  const path = `/resources/${r.slug}`;
  const meta = { title: r.title, description: r.description, path };
  const more = RESOURCES.filter((x) => x.slug !== r.slug).slice(0, 4);

  return (
    <SiteShell>
      <JsonLd data={webPageLd(meta)} />
      <JsonLd data={articleLd(meta)} />
      <PageHero
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: r.question, path },
        ]}
        eyebrow="Resources"
        title={r.question}
        lead={r.answer}
      />
      <Section labelledBy="depth-h">
        <h2 id="depth-h" className="text-h3 text-ink">
          The Detail.
        </h2>
        <div className="mt-8 max-w-prose space-y-6 text-lead text-ink-soft">
          {r.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </Section>
      <Section tone="offwhite" spacing="compact" labelledBy="more-h">
        <h2 id="more-h" className="text-h3 text-ink">
          Keep Reading.
        </h2>
        <ul className="mt-6 space-y-3">
          {more.map((m) => (
            <li key={m.slug}>
              <TextLink href={`/resources/${m.slug}`}>{m.question}</TextLink>
            </li>
          ))}
          <li>
            <TextLink href="/solutions">Explore Our Solutions</TextLink>
          </li>
        </ul>
      </Section>
      <CtaBand />
    </SiteShell>
  );
}
