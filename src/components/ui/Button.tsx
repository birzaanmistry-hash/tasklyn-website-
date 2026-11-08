import Link from "next/link";

/**
 * Button: a real link styled as a button (every CTA on the site navigates).
 *
 * Props
 *  href: string            internal paths render next/link; http(s)/mailto/tel
 *                          render a plain <a>
 *  children: label         keep to 1-4 words; never wraps at desktop
 *  variant?: "primary" | "secondary" | "ghost" | "onDark" | "onDarkSecondary"
 *      primary          ink fill, white text (light grounds)
 *      secondary        white fill, hairline border (light grounds)
 *      ghost            text + arrow, no box (light grounds)
 *      onDark           white fill, ink text (navy grounds)
 *      onDarkSecondary  transparent, light hairline (navy grounds)
 *      black            pure black fill, white text (home header)
 *      quiet            hairline border, grey text (home header "Contact")
 *      chip             small navy button with a chevron (black chapters)
 *  size?: "sm" | "md" | "lg"   sm = 40px / 15px, md = 44px / 15px, lg = 52px / 16px. Default "md".
 *  Labels are Title Case, weight 500.
 *  arrow?: boolean         trailing arrow that shifts on hover. Default true
 *                          for primary/ghost/onDark, false otherwise.
 *  external?: boolean      opens in a new tab with rel=noopener and an
 *                          sr-only "(opens in a new tab)"
 *  className?: string
 *  ariaLabel?: string
 *
 * Also exported: ArrowIcon (the 16px arrow used here and in text links).
 */

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  | "onDarkSecondary"
  | "black"
  | "quiet"
  | "chip";

const BASE =
  "group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium tracking-[-0.011em] transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink font-medium text-white hover:bg-ink-soft",
  secondary: "border border-line-strong bg-paper font-medium text-ink hover:border-ink/40 hover:bg-mist",
  ghost: "font-medium text-ink hover:text-blue-ink !px-0",
  onDark: "bg-snow font-medium text-ink hover:bg-white",
  onDarkSecondary: "border border-white/30 font-medium text-snow hover:border-white/70 hover:bg-white/5",
  /* Restrained set for the home language: 8px radius */
  black: "bg-black text-white hover:bg-ink-soft",
  quiet: "border border-line-strong text-muted hover:border-ink/40 hover:text-ink",
  chip: "border border-white/12 bg-navy text-white hover:border-white/30 hover:bg-navy-line/70",
};

const SIZES = {
  sm: "min-h-10 px-4 text-[0.9375rem]",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-base",
};

/** Small chevron used in the chip buttons on black chapters. */
export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" focusable="false" className={`arrow-shift shrink-0 ${className}`}>
      <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`arrow-shift shrink-0 ${className}`}
    >
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const showArrow = arrow ?? (variant === "primary" || variant === "ghost" || variant === "onDark" || variant === "chip");
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (variant === "chip" ? <ChevronIcon /> : <ArrowIcon />)}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  const isPlain = /^(https?:|mailto:|tel:)/.test(href);
  if (isPlain || external) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/**
 * TextLink: inline "label + arrow" link for section footers.
 *
 * Props: href, children, tone?: "light" | "dark", className?
 */
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-small font-medium transition-colors duration-200 ${
        tone === "dark" ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
      } ${className}`}
    >
      <span className="underline decoration-current/25 decoration-1 underline-offset-[5px] transition-[text-decoration-color] group-hover:decoration-current">
        {children}
      </span>
      <ArrowIcon />
    </Link>
  );
}
