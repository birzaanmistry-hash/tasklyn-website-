import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * Breadcrumbs: a visible trail plus the BreadcrumbList JSON-LD that mirrors
 * it. Both come from the same array, so what Google reads can never drift from
 * what a visitor sees. "Home" is prepended automatically.
 *
 * Props
 *  trail: { name: string; path: string }[]   from the first level below Home
 *                                             to the current page (last item)
 *  tone?: "light" | "dark"                   default "light"
 *  className?: string
 */
export function Breadcrumbs({
  trail,
  tone = "light",
  className = "",
}: {
  trail: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  const dark = tone === "dark";

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] ${dark ? "text-haze" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={dark ? "text-snow" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className={`inline-flex min-h-8 items-center transition-colors duration-200 ${
                        dark ? "hover:text-snow" : "hover:text-ink"
                      }`}
                    >
                      {c.name}
                    </Link>
                    <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden="true" className="opacity-60">
                      <path d="M1 1l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.2" />
                    </svg>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
