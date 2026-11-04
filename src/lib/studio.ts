import { CONTACT } from "./content";

/**
 * The product-studio layer: what Tasklyn is building, how it decides what to
 * build, and the engineering behind it.
 *
 * Every statement here describes intent or method, never a result. There are no
 * customers, metrics, screenshots or availability claims, because none have been
 * confirmed. If that changes, change it here and the site follows.
 */

export const STUDIO = {
  /** The brand statement. Used in footers and under the vision. */
  statement: "Built around problems. Engineered for scale.",
  vision:
    "Building a portfolio of intelligent software products designed to solve meaningful enterprise problems.",
  /** The one-sentence definition used everywhere a short description is needed. */
  definition:
    "Tasklyn AI is an AI-native product studio. We engineer custom enterprise AI systems and build specialised software products for complex business problems.",
} as const;

/* ------------------------------------------------------------------ */
/*  status                                                             */
/* ------------------------------------------------------------------ */

export type ProductStatus =
  | "exploring"
  | "research"
  | "development"
  | "early-access"
  | "available";

/**
 * The only five labels a product may carry. A status is a factual claim about
 * the product, so it is only changed when the real state has been confirmed.
 */
export const STATUS: Record<ProductStatus, { label: string; meaning: string }> = {
  exploring: {
    label: "Exploring",
    meaning: "The problem is being explored. This is a direction, not something you can use today.",
  },
  research: {
    label: "In research",
    meaning: "The direction is chosen and is being researched with prospective users.",
  },
  development: {
    label: "In development",
    meaning: "Software is being built.",
  },
  "early-access": {
    label: "Early access",
    meaning: "Available to a limited group of users.",
  },
  available: {
    label: "Available",
    meaning: "Available to customers.",
  },
};

/* ------------------------------------------------------------------ */
/*  products                                                           */
/* ------------------------------------------------------------------ */

export type Product = {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  positioning: string;
  problem: string;
  /** The shape of the product as a flow. Conceptual, derived from the capabilities. */
  flow: string[];
  capabilities: string[];
  status: ProductStatus;
};

export const PRODUCTS: Product[] = [
  {
    id: "export-intelligence",
    index: "01",
    name: "Export Intelligence",
    category: "International trade intelligence",
    description:
      "An AI-native platform to help exporters find international opportunities, discover and qualify buyers, and run export enquiries and sales in one place.",
    positioning: "Turn international market intelligence into actionable export opportunities.",
    problem:
      "Finding overseas buyers, judging which are genuine and following up on enquiries is slow work, spread across directories, email and spreadsheets.",
    flow: ["Market intelligence", "Buyer discovery", "Qualification", "Enquiry", "Quotation"],
    capabilities: [
      "International market intelligence",
      "Buyer discovery",
      "Buyer qualification",
      "Export enquiry management",
      "Quotation intelligence",
      "Sales pipeline management",
      "Export performance analytics",
    ],
    status: "exploring",
  },
  {
    id: "finance-intelligence",
    index: "02",
    name: "Finance Intelligence",
    category: "Financial operations",
    description:
      "An intelligent finance operations platform to bring accuracy and visibility to invoices, matching, receivables and approvals in growing businesses.",
    positioning: "Bring intelligence and visibility to complex financial operations.",
    problem:
      "Finance teams re-key invoice data, chase mismatches between documents, and find out about exceptions and cash position later than they should.",
    flow: ["Document intake", "Extraction", "Matching", "Exceptions", "Visibility"],
    capabilities: [
      "Invoice intelligence",
      "Document extraction",
      "Purchase order matching",
      "Receivables monitoring",
      "Financial exception detection",
      "Cash-flow visibility",
      "Approval workflows",
    ],
    status: "exploring",
  },
  {
    id: "procurement-intelligence",
    index: "03",
    name: "Procurement Intelligence",
    category: "Procurement technology",
    description:
      "An intelligent procurement platform to manage supplier quotations, sourcing decisions and procurement workflows.",
    positioning: "Make procurement decisions with greater intelligence and visibility.",
    problem:
      "Quotations arrive in different formats, specifications are compared by hand, and supplier history rarely shapes the next decision.",
    flow: ["RFQ", "Quotations", "Comparison", "Decision", "Supplier record"],
    capabilities: [
      "Supplier intelligence",
      "RFQ management",
      "Quotation comparison",
      "Specification analysis",
      "Supplier performance tracking",
      "Procurement analytics",
    ],
    status: "exploring",
  },
];

/**
 * "Express interest" opens a drafted email in the visitor's own mail app. There
 * is deliberately no form posting to a server: nothing is collected on the site,
 * which keeps the privacy policy true and means no enquiry can be silently lost.
 */
export function interestHref(p: Product) {
  const subject = `Interest in ${p.name}`;
  const body = [
    `I would like to know more about ${p.name}.`,
    "",
    "Name:",
    "Company:",
    "What I would want it to solve:",
  ].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ------------------------------------------------------------------ */
/*  product thesis                                                     */
/* ------------------------------------------------------------------ */

export const THESIS = {
  headline: "We don’t build products looking for problems. We start with problems worth solving.",
  stages: [
    {
      n: "01",
      name: "Identify",
      body: "Research industries and find the expensive, recurring and underserved business problems.",
    },
    {
      n: "02",
      name: "Validate",
      body: "Work with prospective customers, understand how the work is done today, and establish whether a real market exists.",
    },
    {
      n: "03",
      name: "Engineer",
      body: "Build specialised software with AI, data infrastructure, integrations and intelligent workflows.",
    },
    {
      n: "04",
      name: "Scale",
      body: "Turn validated solutions into independent products with recurring revenue and international reach.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  technology                                                         */
/* ------------------------------------------------------------------ */

export const TECHNOLOGY = {
  headline: "One engineering philosophy. Multiple intelligent products.",
  intro:
    "The same engineering principles sit under client systems and under the products we are exploring. These are the capabilities and design principles we build with.",
  areas: [
    {
      name: "AI intelligence and orchestration",
      body: "Models and tools coordinated so each step uses the right capability, with the logic visible and testable.",
    },
    {
      name: "Enterprise data integration",
      body: "Connections to the ERPs, CRMs, databases and documents where a business's data already lives.",
    },
    {
      name: "Intelligent workflow systems",
      body: "Multi-step work that runs end to end, with rules, branching and exceptions designed in.",
    },
    {
      name: "Knowledge and context engineering",
      body: "Grounding a system in your documents, history and terminology, so its answers rest on your facts.",
    },
    {
      name: "Business process intelligence",
      body: "Seeing how work actually moves through an organisation, to find where it stalls and what that costs.",
    },
    {
      name: "Human-in-the-loop execution",
      body: "People review and approve the decisions that matter, and the system handles the rest.",
    },
    {
      name: "Security and access controls",
      body: "Access scoped to what each job needs, with security requirements agreed with the client before anything is built.",
    },
    {
      name: "Enterprise analytics",
      body: "Operational data turned into measures leaders can act on, tied to outcomes rather than activity.",
    },
  ],
} as const;
