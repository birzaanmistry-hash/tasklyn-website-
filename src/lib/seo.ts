import type { Metadata } from "next";
import { CONTACT } from "./content";
import { BRAND } from "./site";

/**
 * Everything search engines and AI assistants read about the site, in one
 * place. Every fact here is also published on a page; nothing is claimed in
 * structured data that a visitor could not read for themselves.
 *
 * API
 *  pageMeta({ title, description, path })  -> complete Metadata for a page
 *  organizationLd() / websiteLd()           -> emitted once, in the root layout
 *  webPageLd({ title, description, path })  -> WebPage for any page
 *  breadcrumbLd(trail)                      -> BreadcrumbList (Breadcrumbs emits it)
 *  serviceLd({ name, description, path, serviceType? })
 *  faqLd(items)                             -> only for Q&A that is visible on the page
 *  articleLd({ title, description, path })  -> resources; no invented dates/authors
 *  ldJson(data)                             -> safe serialisation for <script>
 */

export const SITE = {
  url: "https://tasklyn.in",
  name: BRAND.legalName,
  /** The shorter form people use. Declared as an alternate name, not a rival. */
  shortName: BRAND.name,
  description: BRAND.definition,
  slogan: BRAND.tagline,
  descriptor: BRAND.descriptor,
  logo: "/brand/tasklyn-logo.png",
} as const;

type PageMeta = {
  /** Full <title>. Aim for 50-60 characters. */
  title: string;
  /** Aim for 140-160 characters. */
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
  alt: `${BRAND.name}: ${BRAND.descriptor}`,
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

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;

const abs = (path: string) => `${SITE.url}${path === "/" ? "/" : path}`;

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
      url: `${SITE.url}${SITE.logo}`,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    slogan: SITE.slogan,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    areaServed: BRAND.markets.map((m) => ({ "@type": "Place", name: m })),
    founder: CONTACT.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
      sameAs: [f.linkedin],
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
    alternateName: SITE.shortName,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageLd({
  title,
  description,
  path,
  type = "WebPage",
}: PageMeta & { type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
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
      item: abs(c.path),
    })),
  };
}

/** A service Tasklyn offers. No prices, ratings or offers: none are published. */
export function serviceLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    description,
    url: abs(path),
    serviceType: serviceType ?? name,
    provider: { "@id": ORG_ID },
    areaServed: BRAND.markets.map((m) => ({ "@type": "Place", name: m })),
  };
}

/** FAQPage. Only emit for questions and answers that are visible on the page. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Article for an original explainer. Dates and a named author are only
 * included when they are real and supplied; nothing is invented.
 */
export function articleLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: PageMeta & { datePublished?: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline: title,
    description,
    url: abs(path),
    mainEntityOfPage: { "@id": `${abs(path)}#webpage` },
    inLanguage: "en",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
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
