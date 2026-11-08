import { BOOKING_URL } from "@/lib/content";
import { Button } from "./Button";
import { Wrap } from "./Wrap";

/**
 * CtaBand: the closing call to action. A large rounded deep-navy panel inset
 * 10px from the viewport edges, centred, small heading and generous space,
 * with a faint grid and the rising stepped line from the logo's geometry.
 *
 * Props
 *  heading?: string     default "Let's Engineer What's Next." (Title Case)
 *  body?: string        default: the approved homepage CTA body
 *  cta?: { label: string; href: string }   default "Talk To Our AI Team" -> /contact
 *  secondary?: { label: string; href: string }   optional second action
 *  id?: string          heading id (default "cta-heading"); must be unique per page
 */
export function CtaBand({
  heading = "Let's Engineer What's Next.",
  body = "Whether you're exploring your first AI initiative or transforming an existing enterprise system, Tasklyn can help turn your vision into reality.",
  cta = { label: "Talk To Our AI Team", href: BOOKING_URL },
  secondary,
  id = "cta-heading",
}: {
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="px-2.5">
      <div data-tone="dark" data-header-dark="" className="relative isolate overflow-hidden rounded-panel bg-navy text-snow">
        <CtaLines />
        <Wrap className="relative flex flex-col items-center py-(--space-section) text-center">
          <h2 id={id} className="max-w-[16em] text-title text-snow">
            {heading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-small text-haze md:text-body">{body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={cta.href} external={/^https?:/.test(cta.href)} variant="onDark" size="sm">
              {cta.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} external={/^https?:/.test(secondary.href)} variant="onDarkSecondary" size="sm">
                {secondary.label}
              </Button>
            )}
          </div>
        </Wrap>
      </div>
    </section>
  );
}

/** Background: a quiet grid, faded at the edges, and one stepped rising line (logo geometry). */
function CtaLines() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 1440 560"
    >
      <defs>
        <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <radialGradient id="cta-mask-g" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="cta-mask">
          <rect width="1440" height="560" fill="url(#cta-mask-g)" />
        </mask>
        <linearGradient id="cta-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--color-blue)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--color-blue)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--color-cyan)", stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      <rect width="1440" height="560" fill="url(#cta-grid)" mask="url(#cta-mask)" />
      <path d="M-20 540 H420 V510 H860 V480 L1180 210" fill="none" stroke="url(#cta-line)" strokeWidth="1.25" />
      <path d="M1124 210 H1180 V266" fill="none" className="stroke-cyan" strokeOpacity="0.85" strokeWidth="1.25" />
    </svg>
  );
}
