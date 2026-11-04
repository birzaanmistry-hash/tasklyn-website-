import { StatusBadge } from "@/components/ui/StatusBadge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { interestHref, type Product } from "@/lib/studio";

/**
 * The shape of a product as a flow, drawn from its own capability list.
 *
 * It is a diagram of intent, not a screenshot, and it says so. No product
 * interface exists to show, and a convincing fake one would be a false claim.
 * The stepped nodes echo the staircase in the Tasklyn mark.
 */
function ConceptFlow({ steps }: { steps: string[] }) {
  return (
    <figure className="mt-10">
      <ol className="ml-[4px] border-l border-[color:var(--color-line)] pl-6 md:ml-0 md:flex md:border-l-0 md:pl-0">
        {steps.map((s, i) => (
          <li
            key={s}
            className="relative pb-5 last:pb-0 md:flex-1 md:pb-0 md:pr-4"
          >
            {/* node */}
            <span
              aria-hidden="true"
              className="absolute -left-[calc(1.5rem+4.5px)] top-[5px] h-[9px] w-[9px] border border-[color:var(--color-accent)] bg-[color:var(--color-abyss)] md:static md:block"
            />
            {/* rail between nodes, horizontal on wide screens */}
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(9px+0.5rem)] right-2 top-[4px] hidden h-px bg-[color:var(--color-line)] md:block"
              />
            )}
            <span className="t-data block text-[0.75rem] text-[color:var(--color-ink)] md:mt-3">
              {s}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="t-tech mt-5">Concept flow, not a product interface</figcaption>
    </figure>
  );
}

/**
 * One product, presented as a sheet rather than a card: the identity and the
 * ask on the left, the substance on the right.
 */
export function ProductSheet({ product: p }: { product: Product }) {
  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-name`}
      className="scroll-mt-24 border-b border-[color:var(--color-line)] py-14 md:py-20"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="t-tech">Product {p.index}</span>
            <StatusBadge status={p.status} />
          </div>

          <p className="t-tech mt-7">{p.category}</p>
          <h2 id={`${p.id}-name`} className="t-section mt-3">
            {p.name}
          </h2>

          <p className="mt-5 max-w-[34ch] text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] text-[color:var(--color-accent)]">
            {p.positioning}
          </p>
          <p className="t-lead mt-5 max-w-[46ch]">{p.description}</p>

          <div className="mt-9">
            <MagneticButton href={interestHref(p)} variant="ghost">
              Express interest
              <span className="sr-only"> in {p.name}, opens an email</span>
            </MagneticButton>
          </div>
        </div>

        <div>
          <p className="t-tech">The problem</p>
          <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-[1.7] text-[color:var(--color-muted)]">
            {p.problem}
          </p>

          <ConceptFlow steps={p.flow} />

          <p className="t-tech mt-12">Capability areas</p>
          <ul className="mt-4 grid gap-x-8 border-t border-[color:var(--color-line)] sm:grid-cols-2">
            {p.capabilities.map((c) => (
              <li
                key={c}
                className="border-b border-[color:var(--color-line)] py-3 text-[0.9375rem] leading-snug text-[color:var(--color-ink)]"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
