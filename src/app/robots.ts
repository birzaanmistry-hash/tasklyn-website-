import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Everything public is crawlable, including AI search crawlers: the aim is for
 * Tasklyn to be understood accurately. The sitemap is declared.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
