import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { FounderLine } from "@/components/ui/ContactBits";
import { CONTACT, VALUES } from "@/lib/content";

export const metadata = pageMeta({
  title: "About Tasklyn AI | AI-Native Product Studio in Mumbai, India",
  description:
    "Tasklyn AI is an AI-native product studio in Mumbai, founded by engineers Birzaan Mistry and Mustufa Kapadia, building enterprise AI systems and software.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <SiteShell>
      {/* Intro */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: "About", path: "/team" }]} />
          <h1 className="t-display mt-6 max-w-[16ch]">
            Built by engineers,
            <br />
            <span className="text-[color:var(--color-accent)]">for operators.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">
            Tasklyn is a two-person engineering team in Mumbai building an AI-native
            product studio. We engineer custom enterprise systems for clients, and we are
            exploring specialised software products for problems that repeat. The people
            you meet on the first call are the people who build it.
          </p>
        </Wrap>
      </section>

      {/* Founders */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[12ch]">The founders.</h2>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {CONTACT.founders.map((f) => (
              <li key={f.name} className="border-b border-[color:var(--color-line)] py-8">
                <FounderLine founder={f} showLine />
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* Values */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[14ch]">How we think.</h2>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {VALUES.map((v) => (
              <li
                key={v.name}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[minmax(0,24ch)_minmax(0,1fr)] md:items-baseline md:gap-10"
              >
                <h3 className="text-[1.125rem] font-medium tracking-[-0.025em]">{v.name}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <div className="pt-28 md:pt-36">
        <CtaBand
          heading="Talk to the people who build it."
          body="No account manager, no handover. Bring the function that is costing you the most hours."
        />
      </div>
    </SiteShell>
  );
}
