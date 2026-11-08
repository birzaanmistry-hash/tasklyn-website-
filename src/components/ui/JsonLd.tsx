import { ldJson } from "@/lib/seo";

/**
 * JsonLd: renders one or more JSON-LD objects as <script type="application/ld+json">.
 *
 * Props
 *  data: object | object[]  -> output of the helpers in src/lib/seo.ts
 *
 * Usage: <JsonLd data={[webPageLd({...}), faqLd(items)]} />
 */
export function JsonLd({ data }: { data: unknown }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(d) }} />
      ))}
    </>
  );
}
