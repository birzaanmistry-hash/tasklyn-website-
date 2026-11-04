import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PRODUCTS, STUDIO } from "@/lib/studio";

/**
 * What the company is, after the film has shown what it does.
 *
 * The cinematic journey above this is the custom-systems story. This block says
 * plainly that there are two complementary halves to the company and where the
 * second one stands. It sits in normal document flow, always visible, so it can
 * be read by anyone, and by anything, that never scrolls the film.
 *
 * Product status comes straight from the data. This block cannot say a product
 * is further along than the data does.
 */
export function HomeStudio() {
  return (
    <>
      <section
        aria-labelledby="studio"
        className="relative z-10 border-t border-[color:var(--color-line)] bg-[color:var(--color-abyss)]"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <h2 id="studio" className="t-display max-w-[16ch]">
            One studio.{" "}
            <span className="text-[color:var(--color-accent)]">Two ways we build.</span>
          </h2>
          <p className="t-lead mt-7 max-w-[54ch]">
            Client work keeps us close to how real businesses operate. Products come from the
            problems that prove repeatable.
          </p>

          <div className="mt-12 grid border-t border-[color:var(--color-line)] md:grid-cols-2">
            <div className="border-b border-[color:var(--color-line)] py-9 md:border-b-0 md:border-r md:pr-10">
              <p className="t-tech">Current work</p>
              <h3 className="mt-4 text-[1.5rem] font-medium tracking-[-0.03em]">
                Custom enterprise AI systems
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-[1.7] text-[color:var(--color-muted)]">
                We engineer bespoke AI-native systems around complex business requirements.
              </p>
              <Link
                href="/services"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
              >
                See the systems we build
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>

            <div className="py-9 md:pl-10">
              <p className="t-tech">What we are building toward</p>
              <h3 className="mt-4 text-[1.5rem] font-medium tracking-[-0.03em]">
                Proprietary products
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-[1.7] text-[color:var(--color-muted)]">
                We identify recurring enterprise problems and turn validated, repeatable
                solutions into specialised software products.
              </p>
              <Link
                href="/products"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-hot)]"
              >
                See the product portfolio
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="products-teaser"
        className="relative z-10 border-t border-[color:var(--color-line)] bg-[color:var(--color-abyss)]"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-4 md:px-10 md:pb-28 lg:px-14">
          <h2 id="products-teaser" className="t-section max-w-[16ch] pt-16 md:pt-20">
            Products we&rsquo;re building.
          </h2>
          <p className="t-lead mt-6 max-w-[54ch]">
            We identify high-impact enterprise problems and turn repeatable solutions into
            specialised AI-native products.
          </p>

          <ul className="mt-11 border-t border-[color:var(--color-line)]">
            {PRODUCTS.map((p) => (
              <li key={p.id} className="border-b border-[color:var(--color-line)]">
                <Link
                  href={`/products#${p.id}`}
                  className="group grid gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,22ch)_minmax(0,1fr)_auto] md:items-center"
                >
                  <div>
                    <h3 className="text-[1.25rem] font-medium tracking-[-0.03em]">{p.name}</h3>
                    <p className="t-tech mt-2">{p.category}</p>
                  </div>
                  <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                    {p.positioning}
                  </p>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={p.status} />
                    <span
                      aria-hidden="true"
                      className="text-[color:var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-[color:var(--color-line)] pt-10">
            <p className="max-w-[34ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.03em]">
              {STUDIO.vision}
            </p>
            <p className="t-data mt-6 text-[color:var(--color-accent)]">{STUDIO.statement}</p>
          </div>
        </div>
      </section>
    </>
  );
}
