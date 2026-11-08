import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { Eyebrow } from "./Eyebrow";
import { Wrap } from "./Wrap";

/**
 * PageHero: the opening of every inner page. Breadcrumbs, the page's single
 * H1, an optional lead paragraph and an optional slot (CTAs, meta, a figure).
 *
 * Props
 *  crumbs: Crumb[]          trail below Home, last item = this page
 *  title: React.ReactNode   rendered as the page's only <h1>
 *  lead?: React.ReactNode   1-3 sentences; the direct, answer-ready definition
 *  eyebrow?: string         optional mono label above the H1
 *  tone?: "light" | "dark"  light = white page header with a bottom hairline;
 *                           dark = inset rounded navy panel (Scale-style)
 *  aside?: React.ReactNode  right column on lg+ (e.g. a diagram or key facts);
 *                           stacks under the lead below lg
 *  children?: React.ReactNode  rendered under the lead (CTAs, notes)
 *  id?: string              id for the <h1> (default "page-title")
 */
export function PageHero({
  crumbs,
  title,
  lead,
  eyebrow,
  tone = "light",
  aside,
  children,
  id = "page-title",
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  eyebrow?: string;
  tone?: "light" | "dark";
  aside?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}) {
  const dark = tone === "dark";

  const content = (
    <Wrap>
      <Breadcrumbs trail={crumbs} tone={tone} />
      <div
        className={`mt-10 grid gap-12 md:mt-14 ${aside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20" : ""}`}
      >
        <div>
          {eyebrow && (
            <Eyebrow tone={tone} accent className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}
          <h1
            id={id}
            className={`max-w-[16em] text-[clamp(2.5rem,1.6rem+3.3vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] ${
              dark ? "text-snow" : "text-ink"
            }`}
          >
            {title}
          </h1>
          {lead && (
            <div className={`mt-7 max-w-prose text-lead ${dark ? "text-haze" : "text-ink-soft"}`}>{lead}</div>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
        {aside && <div>{aside}</div>}
      </div>
    </Wrap>
  );

  if (dark) {
    return (
      <header aria-labelledby={id} className="px-2 pt-2 sm:px-3 sm:pt-3 lg:px-4">
        <div data-tone="dark" className="rounded-panel bg-navy pb-(--space-block) pt-8 text-snow md:pt-10">
          {content}
        </div>
      </header>
    );
  }

  return (
    <header aria-labelledby={id} className="border-b border-line pb-(--space-block) pt-8 md:pt-10">
      {content}
    </header>
  );
}
