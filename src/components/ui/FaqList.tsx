import Link from "next/link";
import { faqLd } from "@/lib/seo";
import { ArrowIcon } from "./Button";
import { JsonLd } from "./JsonLd";

/**
 * FaqList: visible questions and answers using native <details>/<summary>
 * (keyboard and screen-reader accessible with no JS; answers are in the HTML
 * whether open or closed).
 *
 * Props
 *  items: { q: string; a: string; href?: string; linkLabel?: string }[]
 *      href adds a "Read The Full Answer" link under the answer
 *      q is shown as a heading: Title Case. The answer stays sentence case.
 *  schema?: boolean      also emit FAQPage JSON-LD for exactly these items.
 *                        Only set it where the Q&A is the page's own content,
 *                        and only once per page. Default false.
 *  openFirst?: boolean   first item starts open. Default false.
 *  tone?: "light" | "dark"   default "light"
 *  className?: string
 */
export function FaqList({
  items,
  schema = false,
  openFirst = false,
  tone = "light",
  className = "",
}: {
  items: { q: string; a: string; href?: string; linkLabel?: string }[];
  schema?: boolean;
  openFirst?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <>
      <div className={`border-t ${dark ? "border-navy-line" : "border-line"} ${className}`}>
        {items.map((f, i) => (
          <details
            key={f.q}
            open={openFirst && i === 0}
            className={`group/faq border-b ${dark ? "border-navy-line" : "border-line"}`}
          >
            <summary
              className={`flex min-h-11 items-start justify-between gap-6 py-5 text-item font-semibold transition-colors duration-200 ${
                dark ? "text-snow hover:text-cyan" : "text-ink hover:text-blue-ink"
              }`}
            >
              <span className="max-w-[44ch] text-balance">{f.q}</span>
              <span
                aria-hidden="true"
                className={`relative mt-1 h-5 w-5 shrink-0 rounded-full border ${dark ? "border-navy-line" : "border-line-strong"}`}
              >
                <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open/faq:scale-y-0" />
              </span>
            </summary>
            <div className="pb-6 pr-10">
              <p className={`max-w-prose text-copy ${dark ? "text-haze" : "text-ink-soft"}`}>{f.a}</p>
              {f.href && (
                <Link
                  href={f.href}
                  className={`group mt-2 inline-flex min-h-11 items-center gap-2 text-copy ${
                    dark ? "text-cyan" : "text-blue-ink"
                  }`}
                >
                  {f.linkLabel ?? "Read The Full Answer"}
                  <span className="sr-only">: {f.q}</span>
                  <ArrowIcon />
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqLd(items)} />}
    </>
  );
}
