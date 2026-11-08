import { EnvelopeSimple, InstagramLogo, LinkedinLogo, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CONTACT } from "@/lib/content";

/**
 * Contact details in one place so the same email, numbers and Instagram
 * handle appear everywhere. Change CONTACT in src/lib/content.ts only.
 * Server components (Phosphor's SSR build), no client JS.
 *
 * EmailLink     props: tone?: "light" | "dark", className?
 * InstagramLink props: tone?: "light" | "dark", className?
 * FounderLine   props: founder (CONTACT.founders[n]), showLine?: boolean, tone?
 */

const ICON = { size: 18, weight: "light" as const };

export function EmailLink({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <a
      href={`mailto:${CONTACT.email}`}
      className={`group inline-flex min-h-11 items-center gap-2.5 transition-colors duration-200 ${
        dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
      } ${className}`}
    >
      <EnvelopeSimple {...ICON} aria-hidden="true" className={`shrink-0 ${dark ? "text-cyan" : "text-blue-ink"}`} />
      <span className="underline decoration-current/25 underline-offset-[5px] group-hover:decoration-current">
        {CONTACT.email}
      </span>
    </a>
  );
}

export function InstagramLink({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <a
      href={CONTACT.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 items-center gap-2.5 transition-colors duration-200 ${
        dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
      } ${className}`}
    >
      <InstagramLogo {...ICON} aria-hidden="true" className={`shrink-0 ${dark ? "text-cyan" : "text-blue-ink"}`} />
      <span>{CONTACT.instagram.handle}</span>
      <span className="sr-only"> on Instagram (opens in a new tab)</span>
    </a>
  );
}

export function FounderLine({
  founder,
  showLine = false,
  tone = "light",
}: {
  founder: (typeof CONTACT.founders)[number];
  showLine?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-col gap-1">
      <p className={`text-h4 font-semibold ${dark ? "text-snow" : "text-ink"}`}>{founder.name}</p>
      <p className={`text-small ${dark ? "text-haze" : "text-muted"}`}>{founder.role}</p>
      {showLine && <p className={`mt-1 max-w-[38ch] text-small ${dark ? "text-haze" : "text-ink-soft"}`}>{founder.line}</p>}
      <a
        href={`tel:${founder.tel}`}
        className={`mt-1 inline-flex min-h-11 w-fit items-center gap-2.5 text-small transition-colors duration-200 ${
          dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
        }`}
      >
        <Phone {...ICON} aria-hidden="true" className={`shrink-0 ${dark ? "text-cyan" : "text-blue-ink"}`} />
        <span className="tabular-nums">{founder.phone}</span>
        <span className="sr-only">, call {founder.name}</span>
      </a>
      <div className="flex flex-wrap gap-x-5">
        <a
          href={`https://wa.me/${founder.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center gap-2 text-small transition-colors duration-200 ${
            dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
          }`}
        >
          <WhatsappLogo {...ICON} aria-hidden="true" className={`shrink-0 ${dark ? "text-cyan" : "text-blue-ink"}`} />
          <span>WhatsApp</span>
          <span className="sr-only"> {founder.name} (opens in a new tab)</span>
        </a>
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center gap-2 text-small transition-colors duration-200 ${
            dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
          }`}
        >
          <LinkedinLogo {...ICON} aria-hidden="true" className={`shrink-0 ${dark ? "text-cyan" : "text-blue-ink"}`} />
          <span>LinkedIn</span>
          <span className="sr-only"> profile of {founder.name} (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
