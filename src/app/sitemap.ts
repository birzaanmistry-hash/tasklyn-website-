import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Every indexable URL on the site. Add a new page here when it ships.
 *
 * lastmod is deliberately omitted. Stamping every entry with the build time
 * would claim every page changed on every deploy, and Google learns to ignore
 * lastmod from sites that do that. No date is better than a false one.
 */
const PATHS = ["/", "/services", "/team", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${SITE.url}${p === "/" ? "" : p}` }));
}
