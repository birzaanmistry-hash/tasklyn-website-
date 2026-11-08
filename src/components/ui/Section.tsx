import { Wrap } from "./Wrap";

/**
 * Section: one band of the page with consistent vertical rhythm.
 *
 * Props
 *  tone?: "light" | "offwhite" | "dark"   default "light"
 *      light    = white ground, ink text
 *      offwhite = #F7F8FA ground (use to separate adjacent light sections)
 *      dark     = deep navy ground, snow text; sets data-tone="dark" so focus
 *                 rings and children can adapt
 *  inset?: boolean   dark only. Renders the navy ground as a large rounded panel
 *                    inset from the viewport edges (the hero/CTA treatment)
 *                    instead of a full-bleed band. Default false.
 *  spacing?: "default" | "compact" | "none"
 *      default = clamp(80px -> 144px) top and bottom
 *      compact = clamp(40px -> 72px)
 *      none    = no vertical padding (you control it)
 *  wrap?: boolean    wrap children in <Wrap>. Default true.
 *  id?, className?, labelledBy? (id of the section heading -> aria-labelledby)
 *
 * Usage
 *  <Section tone="offwhite" labelledBy="faq-h"><h2 id="faq-h">...</h2></Section>
 */
export function Section({
  children,
  tone = "light",
  inset = false,
  spacing = "default",
  wrap = true,
  id,
  className = "",
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: "light" | "offwhite" | "dark";
  inset?: boolean;
  spacing?: "default" | "compact" | "none";
  wrap?: boolean;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  const pad =
    spacing === "default"
      ? "py-(--space-section)"
      : spacing === "compact"
        ? "py-(--space-block)"
        : "";

  const ground =
    tone === "dark" ? "bg-navy text-snow" : tone === "offwhite" ? "bg-mist text-ink" : "bg-paper text-ink";

  const body = wrap ? <Wrap>{children}</Wrap> : children;

  if (tone === "dark" && inset) {
    return (
      <section id={id} aria-labelledby={labelledBy} className="px-2 sm:px-3 lg:px-4">
        <div
          data-tone="dark"
          className={`relative isolate overflow-hidden rounded-panel ${ground} ${pad} ${className}`}
        >
          {body}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone === "dark" ? "dark" : undefined}
      className={`relative ${ground} ${pad} ${className}`}
    >
      {body}
    </section>
  );
}
