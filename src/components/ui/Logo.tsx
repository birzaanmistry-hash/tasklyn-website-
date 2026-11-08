import Image from "next/image";
import Link from "next/link";

/**
 * Tasklyn logo primitives.
 *
 * The official asset (public/brand/tasklyn-logo.png, unaltered copy of
 * public/logo.png) is the blue/cyan ascending arrow on an opaque near-black
 * square. It cannot sit on white, so:
 *  - Light surfaces: <BrandLockup /> = traced arrow mark + live-text wordmark.
 *  - Dark surfaces:  <LogoTile /> = the original PNG, untouched, shown as a
 *    rounded app-icon tile (the corner radius is CSS on the frame, not an edit).
 *
 * LogoMark props
 *  className?: string   size via width/height utilities
 *  id?: string          unique per instance on a page (gradient id)
 *  title?: string       accessible name; omit to make it decorative
 *
 * BrandLockup props
 *  href?: string        defaults to "/"; pass null for a non-link lockup
 *  tone?: "light"|"dark" wordmark colour
 *  className?: string
 *
 * LogoTile props
 *  size?: number        px, default 44
 *  className?: string
 */

/* Outline traced from the brand file: block bottom-left, two steps
   climbing right, arrowhead top-right. Proportions are the real ones. */
export const MARK_PATH =
  "M63.2 0 L99.3 0 L99.3 36.8 L85.7 23.5 L63.2 59 L39.7 59.9 L39.7 73.3 L27.7 85.3 L27.7 100 L0 100 L0 71 L23.8 70 L24.1 43 L55 42.7 L60.9 34.5 L73.6 13.4 Z";

export function LogoMark({
  className = "",
  id = "tl-mark",
  title,
}: {
  className?: string;
  id?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        {/* Sampled from the logo: #0196FD at the base, #04BDFA at the head. */}
        <linearGradient id={`${id}-g`} x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0196FD" />
          <stop offset="1" stopColor="#04BDFA" />
        </linearGradient>
      </defs>
      <path d={MARK_PATH} fill={`url(#${id}-g)`} />
    </svg>
  );
}

export function BrandLockup({
  href = "/",
  tone = "light",
  className = "",
  id = "tl-lockup",
}: {
  href?: string | null;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  const inner = (
    <>
      <LogoMark id={id} className="h-[22px] w-[22px] shrink-0" />
      <span
        className={`text-[1.0625rem] font-medium leading-none tracking-[0.14em] ${
          tone === "dark" ? "text-snow" : "text-ink"
        }`}
      >
        TASKLYN
      </span>
    </>
  );

  if (href === null) {
    return <span className={`inline-flex items-center gap-2.5 ${className}`}>{inner}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Tasklyn home"
      className={`inline-flex min-h-11 items-center gap-2.5 ${className}`}
    >
      {inner}
    </Link>
  );
}

export function LogoTile({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[22%] ring-1 ring-navy-line ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/tasklyn-logo.png"
        alt="Tasklyn logo"
        width={512}
        height={512}
        sizes={`${size}px`}
        className="h-full w-full"
      />
    </span>
  );
}
