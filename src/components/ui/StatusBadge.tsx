import { STATUS, type ProductStatus } from "@/lib/studio";

/**
 * A product's development status.
 *
 * The marker is hollow until a product is genuinely available to customers, so
 * the badge reads as "not live yet" before the word is even read. Colour is set
 * inline because the .t-tech type class is unlayered and would otherwise win
 * against a utility colour.
 */
export function StatusBadge({ status }: { status: ProductStatus }) {
  const s = STATUS[status];
  const live = status === "available";

  return (
    <span
      className="t-tech inline-flex items-center gap-2.5 rounded-[var(--radius-machined)] border border-[color:var(--color-line)] px-3 py-1.5"
      style={{ color: "var(--color-muted)" }}
    >
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] border border-[color:var(--color-accent)]"
        style={{ background: live ? "var(--color-accent)" : "transparent" }}
      />
      <span className="sr-only">Status: </span>
      {s.label}
    </span>
  );
}
