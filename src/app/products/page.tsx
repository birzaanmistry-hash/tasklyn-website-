import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { CtaBand } from "@/components/ui/CtaBand";
import { ProductSheet } from "@/components/sections/ProductSheet";
import { PRODUCTS, STATUS, STUDIO, THESIS } from "@/lib/studio";

export const metadata = pageMeta({
  title: "AI Product Studio | Products We Are Building | Tasklyn AI",
  description:
    "Tasklyn AI is exploring specialised AI software for export intelligence, finance operations and procurement. See each product's status and express interest.",
  path: "/products",
});

export default function ProductsPage() {
  // The honest summary line follows the data: if a product moves past Exploring,
  // this stops claiming that nothing is available.
  const allExploring = PRODUCTS.every((p) => p.status === "exploring");

  return (
    <SiteShell>
      {/* Intro */}
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: "Products", path: "/products" }]} />
          <h1 className="t-display mt-6 max-w-[16ch]">
            Products
            <br />
            <span className="text-[color:var(--color-accent)]">we&rsquo;re building.</span>
          </h1>
          <p className="t-lead mt-8 max-w-[58ch]">
            We identify high-impact enterprise problems and turn repeatable solutions into
            specialised AI-native products.
          </p>
        </Wrap>
      </section>

      {/* Status key */}
      <section className="pt-16 md:pt-20">
        <Wrap>
          <div className="border-t border-[color:var(--color-line)] pt-7">
            <p className="t-tech">How we label status</p>
            <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-ink)]">
              {allExploring
                ? "Every product below is at the Exploring stage. None of them is available to use yet."
                : "Each product below carries its real status."}
            </p>

            <dl className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(STATUS).map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.9375rem] font-medium tracking-[-0.02em]">{s.label}</dt>
                  <dd className="mt-1 max-w-[34ch] text-[0.875rem] leading-relaxed text-[color:var(--color-muted)]">
                    {s.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Wrap>
      </section>

      {/* The portfolio */}
      <section aria-label="Product portfolio" className="pt-12 md:pt-16">
        <Wrap>
          <div className="border-t border-[color:var(--color-line)]">
            {PRODUCTS.map((p) => (
              <ProductSheet key={p.id} product={p} />
            ))}
          </div>
        </Wrap>
      </section>

      {/* Product thesis */}
      <section aria-labelledby="thesis" className="pt-24 md:pt-32">
        <Wrap>
          <h2 id="thesis" className="t-section max-w-[24ch]">
            {THESIS.headline}
          </h2>

          <ol className="mt-12 grid border-t border-[color:var(--color-line)] md:grid-cols-2 lg:grid-cols-4">
            {THESIS.stages.map((s) => (
              <li
                key={s.n}
                className="border-b border-[color:var(--color-line)] py-8 md:pr-8 lg:border-b-0 lg:border-r lg:py-9 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="t-tech text-[color:var(--color-accent)]">{s.n}</span>
                <h3 className="mt-4 text-[1.375rem] font-medium tracking-[-0.03em]">{s.name}</h3>
                <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* Vision */}
      <section aria-labelledby="vision" className="pt-24 md:pt-32">
        <Wrap>
          <div className="border-t border-[color:var(--color-line)] pt-12">
            <p className="t-tech">Where this is heading</p>
            <h2 id="vision" className="t-section mt-5 max-w-[26ch]">
              {STUDIO.vision}
            </h2>
            <p className="t-lead mt-6 max-w-[50ch]">
              Client work keeps us close to how real businesses operate. The products come
              from the problems that turn out to repeat.
            </p>
            <p className="t-data mt-8 text-[color:var(--color-accent)]">{STUDIO.statement}</p>
          </div>
        </Wrap>
      </section>

      <div className="pt-24 md:pt-32">
        <CtaBand
          heading="Have a requirement, or a problem worth a product?"
          body="Bring an enterprise requirement for a custom system, or tell us which of these problems you live with."
        />
      </div>
    </SiteShell>
  );
}
