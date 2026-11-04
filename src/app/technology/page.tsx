import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { PROCESS } from "@/lib/content";
import { TECHNOLOGY } from "@/lib/studio";

export const metadata = pageMeta({
  title: "Technology and Engineering Approach | Tasklyn AI Studio",
  description:
    "The engineering behind Tasklyn AI: orchestration, enterprise data integration, intelligent workflows and human-in-the-loop execution across all our systems.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <SiteShell>
      {/* Intro */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: "Technology", path: "/technology" }]} />
          <h1 className="t-display mt-6 max-w-[18ch]">
            One engineering philosophy.
            <br />
            <span className="text-[color:var(--color-accent)]">Multiple intelligent products.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">{TECHNOLOGY.intro}</p>
        </Wrap>
      </section>

      {/* Engineering capabilities */}
      <section aria-labelledby="capabilities" className="pt-28 md:pt-36">
        <Wrap>
          <h2 id="capabilities" className="t-section max-w-[16ch]">
            Engineering capabilities.
          </h2>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {TECHNOLOGY.areas.map((a) => (
              <li
                key={a.name}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[minmax(0,26ch)_minmax(0,1fr)] md:items-baseline md:gap-10"
              >
                <h3 className="text-[1.125rem] font-medium tracking-[-0.025em]">{a.name}</h3>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* Our approach: the existing "how we build" sequence, preserved */}
      <section aria-labelledby="approach" className="pt-28 md:pt-36">
        <Wrap>
          <h2 id="approach" className="t-section max-w-[14ch]">
            How we build it.
          </h2>

          <ol className="mt-11 border-t border-[color:var(--color-line)]">
            {PROCESS.map((s) => (
              <li
                key={s.n}
                className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[auto_minmax(0,20ch)_minmax(0,1fr)] md:items-baseline md:gap-10"
              >
                <span className="t-tech text-[color:var(--color-accent)]">{s.n}</span>
                <h3 className="text-[1.25rem] font-medium tracking-[-0.03em]">{s.name}</h3>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      <div className="pt-28 md:pt-36">
        <CtaBand
          heading="Want to see how this applies to your operations?"
          body="Bring the requirement. We will tell you honestly what we would build, and what we would not."
        />
      </div>
    </SiteShell>
  );
}
