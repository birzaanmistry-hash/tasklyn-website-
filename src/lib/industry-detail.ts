/**
 * Detail for the industries page. Every entry describes where AI can be applied
 * in a sector and how Tasklyn would approach it. None of it claims delivered
 * client work, results or statistics.
 */
import type { PlatesVariant } from "@/components/home/Plates";

export type IndustryDetail = {
  slug: string;
  plate: PlatesVariant;
  /** One sentence on why AI fits this sector. */
  summary: string;
  /** Where the friction is today. */
  friction: { name: string; body: string }[];
  /** The AI workflows that apply. */
  workflows: { name: string; body: string }[];
  /** The kinds of systems and data involved. */
  systems: string[];
  /** Where people stay in control. */
  oversight: string;
  /** A sensible first project. */
  start: string;
};

export const INDUSTRY_DETAIL: IndustryDetail[] = [
  {
    slug: "financial-services",
    plate: "documents",
    summary: "Heavy document flows, strict controls and constant reconciliation make financial services a natural home for carefully governed AI.",
    friction: [
      { name: "Document Volume", body: "Statements, identity documents, invoices and filings arrive in many formats and must be read, checked and entered." },
      { name: "Reconciliation Backlogs", body: "Records across ledgers, payment systems and partners rarely match first time, and the mismatches consume analyst hours." },
      { name: "Policy Complexity", body: "Staff must apply layered internal policy and external regulation, and finding the right clause takes time." },
    ],
    workflows: [
      { name: "Document Intake And Extraction", body: "Reading identity, financial and supporting documents, extracting fields and flagging inconsistencies for review." },
      { name: "Exception-Led Reconciliation", body: "Matching records across systems automatically and surfacing only the items that genuinely disagree, with the likely cause." },
      { name: "Policy And Compliance Assistant", body: "An assistant that answers staff questions from internal policy and regulation, citing the exact source passage." },
      { name: "Case Summaries", body: "Condensing long customer or case histories into a structured brief for an analyst to verify." },
    ],
    systems: ["Core banking or ledger systems", "Payment and settlement platforms", "Document stores and email", "Case management tools"],
    oversight: "Decisions with financial or regulatory consequence stay with qualified staff. AI prepares, checks and drafts; people approve, and every step is logged for audit.",
    start: "Exception-led reconciliation for one account type or document intake for one product, measured against current handling time and error rate.",
  },
  {
    slug: "healthcare",
    plate: "models",
    summary: "Administrative load and information overload take time from care, which makes support work the safest and most valuable place to begin.",
    friction: [
      { name: "Administrative Burden", body: "Scheduling, intake, coding and records handling take clinical and support time away from patients." },
      { name: "Information Overload", body: "Reports, notes and literature grow faster than professionals can read them." },
      { name: "Capacity Planning", body: "Demand for appointments, supplies and staff is hard to predict, causing waits or waste." },
    ],
    workflows: [
      { name: "Administrative Automation", body: "Handling routine scheduling, intake forms and record updates, with staff reviewing exceptions." },
      { name: "Document Summarisation", body: "Producing structured summaries of lengthy reports and literature, always for professional review." },
      { name: "Demand And Capacity Forecasting", body: "Predicting appointment volume, supply use and staffing needs from historical patterns." },
      { name: "Knowledge Assistant", body: "Answering staff questions about protocols and procedures from approved internal documents." },
    ],
    systems: ["Hospital or clinic management systems", "Scheduling platforms", "Document and records stores", "Inventory systems"],
    oversight: "Tasklyn builds support and administrative tools, not diagnostic decisions. Clinical judgement stays with clinicians, and sensitive data handling is agreed with your compliance team first.",
    start: "Appointment scheduling and intake automation, or summarisation of one report type, in a pilot with clinical and administrative review.",
  },
  {
    slug: "manufacturing",
    plate: "monitoring",
    summary: "Many linked schedules, suppliers and machines produce data that is rarely used well. AI can coordinate it and surface problems earlier.",
    friction: [
      { name: "Disconnected Plans", body: "Orders, production schedules and inventory sit in different systems and drift out of step." },
      { name: "Late Discovery Of Problems", body: "Quality and maintenance issues are found after they have caused scrap or downtime." },
      { name: "Supplier Communication", body: "Confirmations, delays and documents arrive by email and must be read and acted on by hand." },
    ],
    workflows: [
      { name: "Order And Schedule Coordination", body: "Keeping orders, schedules and inventory records consistent, and flagging conflicts before they bite." },
      { name: "Anomaly Detection", body: "Spotting unusual patterns in machine or process data that tend to precede defects or stoppages." },
      { name: "Supplier Message Handling", body: "Reading supplier emails and documents, updating records and routing issues to the right buyer." },
      { name: "Production Reporting", body: "Compiling shift and plant reports automatically from the underlying data." },
    ],
    systems: ["ERP and production planning", "Machine and sensor data", "Inventory and warehouse systems", "Supplier email and documents"],
    oversight: "Planners and engineers keep authority over schedules and safety-relevant changes. Systems recommend and alert; people decide.",
    start: "Supplier message handling or automated production reporting, where the data is already available and the value is easy to measure.",
  },
  {
    slug: "logistics",
    plate: "integrations",
    summary: "Logistics runs on documents and exceptions across many parties. AI that reads, checks and flags can remove much of the friction.",
    friction: [
      { name: "Document-Heavy Shipments", body: "Bills, invoices, packing lists and customs forms must be consistent with each other and with the order." },
      { name: "Late Exceptions", body: "Delays and mismatches are noticed after customers are affected." },
      { name: "Planning Under Uncertainty", body: "Volumes and capacity shift, and plans built on last month's pattern miss." },
    ],
    workflows: [
      { name: "Shipment Document Checking", body: "Reading shipping documents, comparing them with orders and flagging discrepancies before they cause holds." },
      { name: "Exception Monitoring", body: "Tracking shipments against plan and alerting the right person with context when something slips." },
      { name: "Demand And Capacity Forecasting", body: "Predicting volumes by lane or period to support planning." },
      { name: "Customer Status Assistant", body: "Answering routine status questions from tracking and order data, escalating the rest." },
    ],
    systems: ["Transport and warehouse management systems", "ERP and order systems", "Carrier and partner portals", "Email and document stores"],
    oversight: "Operations staff handle escalations and approve any change to commitments. Automated checks only flag and prepare.",
    start: "Document checking for one trade lane, or exception alerts for a defined set of shipments.",
  },
  {
    slug: "retail",
    plate: "agents",
    summary: "High enquiry volumes, large catalogues and thin margins reward systems that answer quickly and forecast well.",
    friction: [
      { name: "Always-On Customer Questions", body: "Product, order and returns questions arrive at all hours across several channels." },
      { name: "Catalogue Upkeep", body: "Descriptions, attributes and categories must stay accurate across thousands of items." },
      { name: "Stock Imbalance", body: "Stock-outs lose sales while overstock ties up cash." },
    ],
    workflows: [
      { name: "Customer Conversation Assistant", body: "Answering product, order and policy questions on messaging and web channels, handing complex cases to staff." },
      { name: "Catalogue And Content Drafting", body: "Drafting and standardising product information at scale, for merchandiser review." },
      { name: "Inventory Forecasting", body: "Anticipating demand by item and location to guide replenishment." },
      { name: "Returns And Order Triage", body: "Reading and routing returns and order issues to the right team with the facts attached." },
    ],
    systems: ["E-commerce and POS platforms", "Inventory and order systems", "Messaging channels", "Product information stores"],
    oversight: "Refunds, exceptions and sensitive customer cases route to staff. Published content is reviewed before it goes live.",
    start: "A conversation assistant for the most common order and product questions, with a clear hand-off to people.",
  },
  {
    slug: "real-estate",
    plate: "documents",
    summary: "Leads, listings and agreements all move through slow, manual steps where fast, accurate handling wins business.",
    friction: [
      { name: "Slow Lead Response", body: "Enquiries go cold while waiting for an agent to reply and qualify them." },
      { name: "Agreement Review", body: "Leases and contracts must be read for key terms, dates and obligations." },
      { name: "Listing Upkeep", body: "Property descriptions and details vary in quality and quickly go stale." },
    ],
    workflows: [
      { name: "Enquiry Qualification", body: "Responding immediately, understanding the requirement and booking viewings for suitable leads." },
      { name: "Agreement Term Extraction", body: "Reading agreements and extracting parties, dates, amounts and obligations for review." },
      { name: "Listing Content Drafting", body: "Drafting consistent property descriptions from structured details, for agent approval." },
      { name: "Portfolio Reminders", body: "Tracking renewal and compliance dates across a portfolio and prompting action." },
    ],
    systems: ["CRM and listing platforms", "Messaging and email", "Document stores", "Calendars"],
    oversight: "Agents and legal reviewers confirm terms, pricing and commitments. The system never agrees terms on its own.",
    start: "Instant enquiry response and qualification for one property type, with bookings made directly into agents' calendars.",
  },
  {
    slug: "education",
    plate: "network",
    summary: "Institutions answer the same questions repeatedly and process large volumes of forms, which assistants and automation handle well.",
    friction: [
      { name: "Repeated Applicant And Student Questions", body: "Admissions, fees, timetables and policies generate a constant stream of similar enquiries." },
      { name: "Form And Record Processing", body: "Applications, enrolment and records require manual checking and entry." },
      { name: "Materials Preparation", body: "Staff spend significant time adapting and preparing learning materials." },
    ],
    workflows: [
      { name: "Admissions And Student Assistant", body: "Answering questions from institutional information, citing the source and escalating what it cannot answer." },
      { name: "Application Processing", body: "Checking applications for completeness, extracting data and routing them to reviewers." },
      { name: "Materials Drafting Support", body: "Helping staff draft and adapt materials, always with academic review." },
      { name: "Enrolment Forecasting", body: "Projecting intake and demand to support planning." },
    ],
    systems: ["Student information systems", "Learning platforms", "Email and messaging", "Document stores"],
    oversight: "Academic and admissions decisions remain with staff. Assistants inform and prepare; people judge.",
    start: "An admissions assistant answering the most frequent applicant questions from published information.",
  },
  {
    slug: "professional-services",
    plate: "models",
    summary: "Knowledge is the product, and it sits in documents and past work that are hard to search. AI makes that knowledge retrievable and drafts faster.",
    friction: [
      { name: "Research And Reading Load", body: "Large document sets must be read and summarised before advice can be given." },
      { name: "Repetitive Drafting", body: "Routine documents are rebuilt from scratch again and again." },
      { name: "Buried Precedent", body: "Prior work exists but cannot be found when it would help." },
    ],
    workflows: [
      { name: "Research And Summarisation", body: "Condensing document sets into structured briefs with source references for the professional to verify." },
      { name: "Drafting Support", body: "Producing first drafts of routine documents in the firm's own format and tone." },
      { name: "Knowledge Retrieval", body: "Finding relevant precedent and prior work across internal archives." },
      { name: "Time And Matter Admin", body: "Handling routine admin around matters, such as filing, tagging and status updates." },
    ],
    systems: ["Document management systems", "Practice or matter management tools", "Email", "Internal knowledge bases"],
    oversight: "Professionals remain responsible for advice and review every draft. Confidential material stays inside agreed access boundaries.",
    start: "Knowledge retrieval over one body of internal work, giving staff cited answers and measuring time saved.",
  },
];

export const INDUSTRY_PRINCIPLES = [
  { name: "Start With One Process", body: "Every sector has dozens of candidate uses. We begin with one process that is costly, repetitive and well understood." },
  { name: "People Stay In Control", body: "AI prepares, checks and drafts. People approve anything that carries financial, legal, clinical or customer consequence." },
  { name: "Measured Against Your Baseline", body: "We record how the process performs today and measure the same things afterwards, so the result is evidence, not opinion." },
  { name: "Built Inside Your Systems", body: "We connect to the platforms you already use and respect your security and compliance rules." },
] as const;
