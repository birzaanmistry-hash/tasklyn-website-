import Link from "next/link";
import { breadcrumbLd, ldJson, type Crumb } from "@/lib/seo";

/**
 * A visible breadcrumb trail and the BreadcrumbList schema that mirrors it.
 *
 * The visible trail replaces the small page-name label that used to sit above
 * each heading, so it costs no extra vertical space. The schema is generated
 * from the same array, so what Google reads can never drift from what a visitor
 * sees, which is the condition for breadcrumb rich results.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="t-tech flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2.5">
                {last ? (
                  <span aria-current="page" className="text-[color:var(--color-muted)]">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className="transition-colors hover:text-[color:var(--color-ink)]"
                    >
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbLd(all)) }}
      />
    </>
  );
}
