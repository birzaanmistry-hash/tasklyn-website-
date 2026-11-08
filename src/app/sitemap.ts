import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { SOLUTIONS, RESOURCES } from "@/lib/site";

/**
 * Every indexable, canonical URL on the site. Built from the content model so a
 * new solution or resource appears here automatically.
 *
 * lastmod is deliberately omitted. Stamping every entry with the build time
 * would claim every page changed on every deploy, and Google learns to ignore
 * lastmod from sites that do that. No date is better than a false one.
 */
const STATIC = [
  "/",
  "/solutions",
  "/products",
  "/industries",
  "/technology",
  "/case-studies",
  "/resources",
  "/company",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC,
    ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
    ...RESOURCES.map((r) => `/resources/${r.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE.url}${p === "/" ? "" : p}` }));
}
