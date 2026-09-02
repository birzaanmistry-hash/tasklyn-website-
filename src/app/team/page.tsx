import type { Metadata } from "next";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { FounderLine } from "@/components/ui/ContactBits";
import { CONTACT, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Tasklyn is Birzaan Mistry and Mustufa Kapadia, a two-person team in Mumbai building AI systems for operators.",
};

export default function TeamPage() {
  return (
    <SiteShell>
      {/* Intro */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <p className="t-tech">Team</p>
          <h1 className="t-display mt-6 max-w-[16ch]">
            Built by engineers,
            <br />
            <span className="text-[color:var(--color-accent)]">for operators.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">
            We are a two-person team in Mumbai. We build systems for the people who
            actually run the business, and we build against their real work rather than
            a demo. The people you meet on the first call are the people who build it.
          </p>
        </Wrap>
      </section>

      {/* Founders */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[12ch]">The founders.</h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-machined)] border border-[color:var(--color-line)] bg-[color:var(--color-line)] md:grid-cols-2">
            {CONTACT.founders.map((f) => (
              <div key={f.name} className="bg-[color:var(--color-abyss)] p-8 md:p-10">
                <FounderLine founder={f} showLine />
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Values */}
      <section className="pt-28 md:pt-36">
        <Wrap>
          <h2 className="t-section max-w-[14ch]">How we think.</h2>

          <ul className="mt-12 border-t border-[color:var(--color-line)]">
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
