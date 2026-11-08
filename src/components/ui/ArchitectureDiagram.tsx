import { ARCHITECTURE } from "@/lib/site";

/**
 * ArchitectureDiagram: the five-layer Tasklyn architecture from
 * ARCHITECTURE in site.ts, drawn as real HTML (crawlable, screen-reader
 * friendly, reflows on mobile).
 *
 * Composition: layers 01-04 stack upward from Data & Context at the
 * foundation, each stepping slightly right like the logo's ascending arrow.
 * Layer 05, Evaluation & Monitoring, is a vertical rail beside the stack with
 * a connector to every layer, because it observes all of them. Below lg the
 * rail becomes a final band. Reading order (DOM) is always 01 -> 05.
 *
 * Props
 *  tone?: "dark" | "light"      default "dark" (use "light" on white/mist)
 *  headingLevel?: "h3" | "h4"   heading element for layer names. Default "h3".
 *  compact?: boolean            hide layer descriptions (names only). Default false.
 *  className?: string
 */
export function ArchitectureDiagram({
  tone = "dark",
  headingLevel: H = "h3",
  compact = false,
  className = "",
}: {
  tone?: "dark" | "light";
  headingLevel?: "h3" | "h4";
  compact?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const stack = ARCHITECTURE.slice(0, 4);
  const rail = ARCHITECTURE[4];

  const c = dark
    ? {
        /* thin strokes on black: hairline bands, cyan only on the numbers */
        band: "border-white/14 bg-white/[0.015]",
        bandTop: "",
        name: "text-white",
        body: "text-ash",
        num: "text-cyan",
        spine: "bg-white/14",
        node: "border-cyan bg-black",
        rail: "border-white/20",
        dash: "border-white/16",
      }
    : {
        band: "border-line bg-paper",
        bandTop: "border-blue/40",
        name: "text-ink",
        body: "text-muted",
        num: "text-blue-ink",
        spine: "bg-line-strong",
        node: "border-blue bg-paper",
        rail: "border-line-strong",
        dash: "border-line-strong",
      };

  return (
    <figure className={`grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10 ${className}`}>
      <figcaption className="sr-only">
        Tasklyn&apos;s five-layer AI architecture: four layers stacked from data and context up to
        integration, with evaluation and monitoring running alongside all of them.
      </figcaption>

      <div className="relative pl-8 md:pl-10">
        {/* spine with an arrowhead: the stack reads upward */}
        <span aria-hidden="true" className={`absolute bottom-6 left-[11px] top-3 w-px md:left-[15px] ${c.spine}`} />
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className={`absolute left-[6px] top-0 h-2 w-3 md:left-[10px] ${dark ? "text-cyan" : "text-blue"}`}
        >
          <path d="M1 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>

        <ol className="flex flex-col-reverse gap-3">
          {stack.map((l, i) => (
            <li
              key={l.n}
              className="relative lg:[margin-left:calc(var(--step)*2.25rem)]"
              style={{ "--step": i } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[26px] top-7 h-[9px] w-[9px] rounded-full border md:-left-[30px] lg:[left:calc(-30px-var(--step)*2.25rem)] ${c.node}`}
              />
              <div className={`relative rounded-card border px-5 py-5 md:px-7 md:py-6 ${dark ? "" : "border-t-2"} ${c.band} ${c.bandTop}`}>
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                  <div className="flex shrink-0 items-baseline gap-4 md:w-[16rem]">
                    <span className={`t-label ${c.num}`}>{l.n}</span>
                    <H className={`${dark ? "text-item" : "text-h4"} ${c.name}`}>{l.name}</H>
                  </div>
                  {!compact && <p className={`max-w-[52ch] ${dark ? "text-copy" : "text-small"} ${c.body}`}>{l.body}</p>}
                </div>
                {/* connector to the evaluation rail (lg+) */}
                <span
                  aria-hidden="true"
                  className={`absolute -right-10 top-1/2 hidden w-10 border-t border-dashed lg:block ${c.dash}`}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={`relative rounded-card border border-dashed px-5 py-5 md:px-7 lg:flex lg:flex-col lg:justify-between lg:py-7 ${c.rail}`}>
        <div>
          <span className={`t-label ${c.num}`}>{rail.n}</span>
          <H className={`mt-3 ${dark ? "text-item" : "text-h4"} ${c.name}`}>{rail.name}</H>
        </div>
        {!compact && <p className={`mt-3 ${dark ? "text-copy" : "text-small"} ${c.body}`}>{rail.body}</p>}
        <p className={`t-label mt-5 hidden lg:block ${c.body}`}>Across Every Layer</p>
      </div>
    </figure>
  );
}
