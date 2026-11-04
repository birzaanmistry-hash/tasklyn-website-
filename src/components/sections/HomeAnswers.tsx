import Link from "next/link";

/**
 * Tasklyn in plain terms.
 *
 * Every other section of the home page is a scroll-driven scene that starts
 * hidden and is revealed by JavaScript. That is right for the film and wrong
 * for anyone, human or machine, who just wants the answer, so this block sits in
 * normal document flow after the journey, always visible, and answers the five
 * questions a first-time visitor or an AI assistant asks.
 *
 * Every claim here is already made on the Services and Team pages. Nothing is
 * stated here that the site does not say elsewhere.
 */
const ANSWERS = [
  {
    q: "What Tasklyn does",
    a: "Tasklyn AI is an AI-native product studio. It engineers custom enterprise AI systems for clients, and builds specialised software products for business problems that recur across industries.",
  },
  {
    q: "Who it is for",
    a: "Mid-sized and large organisations with complex operational workflows, including manufacturers, exporters, and finance and procurement teams. Tasklyn is based in Mumbai and starts with India. The same kind of problem also appears in e-commerce, real estate, healthcare, education, hospitality, professional services and retail.",
  },
  {
    q: "What problems it solves",
    a: "Customer messages that wait for someone to answer. Enquiries that go cold before anyone follows up. Orders, schedules and records updated by hand. Reports pulled together from five different tools.",
  },
  {
    q: "How it works",
    a: "For client work, Tasklyn identifies the loop that costs the most hours, engineers a system against your real data and tools, then hands it off and stays on to tune it. For products, it starts with problems worth solving, validates them with prospective customers, then builds.",
  },
  {
    q: "How it is different",
    a: "It starts with the problem, not the technology. The two founders you meet on the first call are the people who build the work, and what client engagements teach feeds the products it explores.",
  },
] as const;

export function HomeAnswers() {
  return (
    <section
      aria-labelledby="plain-terms"
      className="relative z-10 border-t border-[color:var(--color-line)] bg-[color:var(--color-abyss)]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <h2 id="plain-terms" className="t-section max-w-[16ch]">
          Tasklyn in plain terms.
        </h2>

        <dl className="mt-11 border-t border-[color:var(--color-line)]">
          {ANSWERS.map((x) => (
            <div
              key={x.q}
              className="grid gap-2 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[minmax(0,24ch)_minmax(0,1fr)] md:gap-10"
            >
              <dt className="text-[1.125rem] font-medium tracking-[-0.025em]">{x.q}</dt>
              <dd className="max-w-[66ch] text-[0.9375rem] leading-[1.7] text-[color:var(--color-muted)]">
                {x.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[0.9375rem] font-medium">
          <Link
            href="/services"
            className="group inline-flex min-h-11 items-center gap-2 text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
          >
            Custom enterprise systems
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/team"
            className="group inline-flex min-h-11 items-center gap-2 text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
          >
            Meet the founders
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
