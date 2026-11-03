import type { Metadata } from "next";
import { CONTACT } from "./content";

/**
 * Everything search engines and AI assistants read about the site, in one
 * place. Every fact here is already published on the site itself; nothing is
 * claimed in structured data that a visitor could not also read on a page.
 */

export const SITE = {
  url: "https://tasklyn.in",
  name: "Tasklyn AI",
  /** The shorter form people use. Declared as an alternate name, not a rival. */
  shortName: "Tasklyn",
  description:
    "Tasklyn AI builds custom AI systems that handle the repetitive work inside your business, from customer replies to operations. Based in Mumbai, India.",
} as const;

type PageMeta = {
  /** Full <title>. Written to land between 55 and 60 characters. */
  title: string;
  /** Written to land between 150 and 160 characters. */
  description: string;
  /** Path beginning with a slash. "/" for the home page. */
  path: string;
};

/**
 * Next shallow-merges metadata: a page that sets `openGraph` replaces the
 * layout's whole object rather than extending it. So each page gets a complete
 * set from here, which also guarantees the canonical, Open Graph URL and
 * Twitter card can never disagree with one another.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Tasklyn AI: custom AI systems for your business operations",
};

export function pageMeta({ title, description, path }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      // Set explicitly: the file-based image in the app root is not inherited
      // by nested routes once a page defines its own openGraph object.
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/logo.png`,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    founder: CONTACT.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      availableLanguage: "English",
    },
    sameAs: [CONTACT.instagram.url],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}

/**
 * Serialise for inline <script>. JSON.stringify alone is not safe there: a
 * "</script>" inside any string would terminate the tag early, so "<" is
 * escaped to its unicode form.
 */
export function ldJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
