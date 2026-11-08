/**
 * Ledger: a hairline-ruled list of rows, each a Title Case name with a
 * sentence-case description. Used on inner pages instead of card grids.
 *
 * Props
 *  items: { name: string; body: string; href?: string; n?: string }[]
 *  numbered?: boolean   show 01, 02 ... in the left column
 *  as?: "ul" | "ol"
 */
import Link from "next/link";
import { ArrowIcon } from "./Button";

export function Ledger({
  items,
  numbered = false,
  as: Tag = "ul",
}: {
  items: readonly { name: string; body: string; href?: string; n?: string }[];
  numbered?: boolean;
  as?: "ul" | "ol";
}) {
  return (
    <Tag className="border-t border-line">
      {items.map((it, i) => {
        const inner = (
          <>
            {numbered && (
              <span className="text-label text-muted md:pt-1.5">{it.n ?? String(i + 1).padStart(2, "0")}</span>
            )}
            <h3 className="text-h4 text-ink">{it.name}</h3>
            <p className="max-w-[60ch] text-body text-muted">{it.body}</p>
            {it.href && <ArrowIcon className="hidden self-center text-ink md:block" />}
          </>
        );
        const cols = numbered
          ? "md:grid-cols-[3rem_minmax(0,20rem)_minmax(0,1fr)_auto]"
          : "md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto]";
        const cls = `grid gap-2 border-b border-line py-7 md:items-baseline md:gap-10 ${cols}`;
        return (
          <li key={it.name}>
            {it.href ? (
              <Link href={it.href} className={`${cls} transition-colors hover:bg-offwhite`}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </Tag>
  );
}
