/**
 * All page copy in one place.
 * Contact details and founder names are carried over from tasklyn.in unchanged.
 * There are no testimonials, client logos, case studies or performance numbers
 * here by design: the system itself is the proof.
 */

export const NAV = [
  { label: "Solutions", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

/** One label for one intent, everywhere: booking a conversation about a requirement. */
export const CTA_PRIMARY = "Discuss a requirement";

/**
 * The Google Calendar booking page for the Tasklyn discovery call.
 *
 * This is the canonical public URL the calendar.app.google short link resolves
 * to. It deliberately does NOT contain the /u/0/ account-index segment: that
 * form of the URL only resolves for whoever is signed into the owning Google
 * account, and would fail for most visitors.
 */
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ17Jevq0QKNWSBWPoE8hVw5XKa_lWSt9HSVvA2PGAPofY303rhof04xgj-NoRpfuHkQ5OIkMQTF";

export const BOOKING_DETAIL = "45 minutes, on Google Meet.";

/* ---------------- what Tasklyn actually does ----------------
   These are the five services the business already offers, stated in plain
   language: what the system does, in the words a customer would use, not the
   words the software would use. */

export type Capability = {
  id: string;
  label: string;
  name: string;
  body: string;
  runs: string;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "conversations",
    label: "Customer conversations",
    name: "It answers your customers",
    body:
      "An agent replies on WhatsApp, email and your website at any hour, knowing your pricing, your availability and this customer's history.",
    runs: "WhatsApp / Email / Website chat",
  },
  {
    id: "leads",
    label: "Sales and leads",
    name: "It qualifies and books",
    body:
      "Every enquiry is read, scored and answered. Serious ones get a meeting booked, and the CRM updates without anyone typing.",
    runs: "CRM / Calendar / Follow-ups",
  },
  {
    id: "operations",
    label: "Operations",
    name: "It runs the repeating work",
    body:
      "Scheduling, orders, reporting and reconciliation run on their own. Your team is pulled in only for the exceptions.",
    runs: "ERP / Sheets / Internal tools",
  },
  {
    id: "voice",
    label: "Phone",
    name: "It takes the call",
    body:
      "A voice agent answers, captures what was said, logs it against the right record and sends the follow-up.",
    runs: "Inbound calls / Call logs",
  },
  {
    id: "custom",
    label: "Everything else",
    name: "It is built around your process",
    body:
      "Where nothing off the shelf fits, we build around how you already work instead of asking you to change it.",
    runs: "Custom systems",
  },
];

/* ---------------- the fragmented business ---------------- */

export const FRAGMENTS = [
  "CRM",
  "EMAIL",
  "WHATSAPP",
  "WEBSITE",
  "SPREADSHEETS",
  "ERP",
  "CALENDAR",
  "SUPPORT",
  "SALES",
  "OPERATIONS",
] as const;

/* ---------------- the four strata ---------------- */

export type Layer = {
  id: string;
  name: string;
  y: number;
  items: string[];
  note: string;
};

export const LAYERS: Layer[] = [
  {
    id: "input",
    name: "Input",
    y: 3.05,
    items: ["Messages", "Calls", "Documents", "Forms", "Customer behaviour", "Business data"],
    note: "Everything your business already receives, in the format it arrives in.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    y: 1.0,
    items: ["Agents", "Reasoning", "Memory", "Context", "Decision-making"],
    note: "The layer that reads the situation and decides what should happen next.",
  },
  {
    id: "execution",
    name: "Execution",
    y: -1.05,
    items: ["CRM", "WhatsApp", "Email", "ERP", "Calendar", "Payments", "Internal systems"],
    note: "Decisions become writes, sends and updates in the tools you already run.",
  },
  {
    id: "outcome",
    name: "Outcome",
    y: -3.1,
    items: [
      "Qualified lead",
      "Booked meeting",
      "Resolved support",
      "Updated CRM",
      "Completed process",
      "Retained customer",
    ],
    note: "The part of the work a person would otherwise have done by hand.",
  },
];

/* ---------------- agents ---------------- */

export type Agent = {
  id: string;
  name: string;
  role: string;
  /** Position on the lattice shell, in radians and normalised height. */
  theta: number;
  h: number;
  steps: string[];
};

export const AGENTS: Agent[] = [
  {
    id: "sales",
    name: "Sales",
    role: "Reads intent, qualifies, books the meeting.",
    theta: 0.0,
    h: 0.55,
    steps: ["Lead arrives", "Intent scored", "Qualified", "Meeting booked", "CRM written"],
  },
  {
    id: "support",
    name: "Support",
    role: "Answers, resolves, and knows when to hand over.",
    theta: 0.9,
    h: -0.2,
    steps: ["Ticket opened", "History pulled", "Answer drafted", "Resolved", "Handed over"],
  },
  {
    id: "research",
    name: "Research",
    role: "Gathers context before anyone is asked to decide.",
    theta: 1.8,
    h: 0.75,
    steps: ["Question set", "Sources pulled", "Cross-checked", "Summarised", "Filed"],
  },
  {
    id: "operations",
    name: "Operations",
    role: "Runs the repeating processes end to end.",
    theta: 2.7,
    h: -0.62,
    steps: ["Trigger fires", "Rules applied", "Records updated", "Exceptions flagged", "Closed"],
  },
  {
    id: "voice",
    name: "Voice",
    role: "Takes the call, captures the detail, follows up.",
    theta: 3.6,
    h: 0.28,
    steps: ["Call answered", "Intent captured", "Details confirmed", "Logged", "Follow-up sent"],
  },
  {
    id: "crm",
    name: "CRM",
    role: "Keeps the record true without anyone typing.",
    theta: 4.5,
    h: -0.78,
    steps: ["Signal seen", "Record matched", "Fields filled", "Stage moved", "Owner notified"],
  },
  {
    id: "content",
    name: "Content",
    role: "Produces the recurring output on schedule.",
    theta: 5.4,
    h: 0.42,
    steps: ["Brief built", "Draft written", "Checked", "Approved", "Published"],
  },
];

/* ---------------- live execution ---------------- */

export type LiveEvent = { t: string; label: string; layer: string };

export const LIVE_RUN: LiveEvent[] = [
  { t: "09:42:18", label: "New lead detected", layer: "Input" },
  { t: "09:42:19", label: "Intent analysed", layer: "Intelligence" },
  { t: "09:42:20", label: "Lead qualified", layer: "Intelligence" },
  { t: "09:42:22", label: "CRM updated", layer: "Execution" },
  { t: "09:42:24", label: "Follow-up sent", layer: "Execution" },
  { t: "09:42:29", label: "Meeting booked", layer: "Outcome" },
];

/* ---------------- industries ---------------- */

export type Industry = {
  id: string;
  name: string;
  flow: string[];
  /** Structural bias applied to the Core when this industry is selected. */
  shape: { spread: number; twist: number; rings: number };
};

export const INDUSTRIES: Industry[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    flow: ["Visitor", "Intent", "Recommendation", "Purchase", "Retention"],
    shape: { spread: 1.0, twist: 0.35, rings: 5 },
  },
  {
    id: "realestate",
    name: "Real estate",
    flow: ["Lead", "Qualification", "Site visit", "Follow-up", "CRM"],
    shape: { spread: 1.22, twist: -0.2, rings: 4 },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    flow: ["Enquiry", "Qualification", "Appointment", "Reminder", "Follow-up"],
    shape: { spread: 0.86, twist: 0.55, rings: 6 },
  },
  {
    id: "education",
    name: "Education",
    flow: ["Enquiry", "Course match", "Counsellor", "Enrolment", "Onboarding"],
    shape: { spread: 1.08, twist: -0.42, rings: 5 },
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    flow: ["Inquiry", "Quote", "Approval", "Production", "Dispatch"],
    shape: { spread: 1.35, twist: 0.12, rings: 3 },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    flow: ["Enquiry", "Availability", "Booking", "Pre-arrival", "Return visit"],
    shape: { spread: 0.94, twist: 0.68, rings: 6 },
  },
  {
    id: "finance",
    name: "Finance",
    flow: ["Application", "Verification", "Underwriting", "Decision", "Servicing"],
    shape: { spread: 1.14, twist: -0.55, rings: 4 },
  },
  {
    id: "services",
    name: "Professional services",
    flow: ["Enquiry", "Scoping", "Proposal", "Delivery", "Renewal"],
    shape: { spread: 1.0, twist: 0.25, rings: 5 },
  },
  {
    id: "retail",
    name: "Retail",
    flow: ["Footfall", "Stock check", "Offer", "Sale", "Repeat"],
    shape: { spread: 1.28, twist: -0.32, rings: 4 },
  },
];

/* ---------------- process ---------------- */

export const PROCESS = [
  { n: "01", name: "Discover", body: "We find where work gets stuck, and what it costs you." },
  { n: "02", name: "Architect", body: "We design the system before we build any part of it." },
  { n: "03", name: "Build", body: "We connect intelligence to the tools that execute." },
  { n: "04", name: "Deploy", body: "It goes into production against real work." },
  { n: "05", name: "Evolve", body: "It keeps improving as your business changes." },
] as const;

/* ---------------- contact ---------------- */

export const CONTACT = {
  email: "tasklynai@gmail.com",
  instagram: { handle: "@tasklyn.ai", url: "https://instagram.com/tasklyn.ai" },
  city: "Mumbai, India",
  reach: "Working with clients anywhere.",
  founders: [
    {
      name: "Birzaan Mistry",
      role: "Co-founder",
      line: "Runs discovery and system architecture.",
      phone: "+91 99302 26026",
      tel: "+919930226026",
    },
    {
      name: "Mustufa Kapadia",
      role: "Co-founder",
      line: "Runs delivery and client operations.",
      phone: "+91 89280 67693",
      tel: "+918928067693",
    },
  ],
};

/* ---------------- services page ---------------- */

export const SERVICE_STEPS = [
  {
    n: "01",
    name: "Identify",
    body:
      "We sit with the people doing the work and find the loop that eats the most hours. Not the one that is easiest to automate.",
  },
  {
    n: "02",
    name: "Engineer",
    body:
      "We build the system against your real data, your real tools and your real edge cases, then test it on work that has already happened.",
  },
  {
    n: "03",
    name: "Hand off",
    body:
      "It goes live, your team learns to steer it, and you own it. We stay on to tune it as the business changes.",
  },
] as const;

export type SystemType = {
  id: string;
  name: string;
  body: string;
  ticks: string[];
};

export const SYSTEM_TYPES: SystemType[] = [
  {
    id: "operations",
    name: "Operations systems",
    body: "The recurring internal work that runs the business day to day.",
    ticks: [
      "Scheduling and dispatch handled end to end",
      "Orders and records updated without typing",
      "Exceptions escalated, everything else closed",
    ],
  },
  {
    id: "response",
    name: "Customer response systems",
    body: "Every inbound message answered, at any hour, in your voice.",
    ticks: [
      "WhatsApp, email and web chat on one brain",
      "Knows pricing, stock and past conversations",
      "Hands to a human when it should",
    ],
  },
  {
    id: "sales",
    name: "Sales and retention systems",
    body: "Enquiries qualified and followed up before they go cold.",
    ticks: [
      "Intent scored the moment a lead arrives",
      "Meetings booked straight into the calendar",
      "Lapsed customers re-approached on schedule",
    ],
  },
  {
    id: "reporting",
    name: "Reporting and insight systems",
    body: "The numbers you need, assembled before you ask for them.",
    ticks: [
      "Daily and weekly reports built automatically",
      "Data pulled from every tool you already run",
      "Anomalies flagged rather than buried",
    ],
  },
  {
    id: "custom",
    name: "Custom builds",
    body: "The process that is specific to how you work, and always has been.",
    ticks: [
      "Built around your workflow, not a template",
      "Connects to systems with no clean integration",
      "Scoped to one problem and shipped",
    ],
  },
];

export const TRUST = [
  {
    name: "Live in weeks, not quarters",
    body:
      "First system in production inside weeks. You see it working on real work before you commit further.",
  },
  {
    name: "Scoped before it is built",
    body:
      "One function at a time, so the cost is a number you can weigh against the hours it removes.",
  },
  {
    name: "Built around your business",
    body:
      "We start from your process. Nothing here is a template with your logo dropped into it.",
  },
  {
    name: "We do not hand off and vanish",
    body:
      "Systems drift as the business changes. We stay on to tune them rather than leaving you a manual.",
  },
  {
    name: "Founders on the build",
    body:
      "The people you meet in the first call are the people who build it. There is no layer in between.",
  },
] as const;

export const SERVICE_INDUSTRIES = [
  { name: "Manufacturing", loop: "Quote requests, order status, dispatch updates" },
  { name: "Exporters", loop: "Buyer enquiries, quotation follow-up, shipment status updates" },
  { name: "Finance and procurement", loop: "Invoice matching, quotation comparison, approval chasing" },
  { name: "E-commerce", loop: "Order questions, stock checks, refund requests" },
  { name: "Real estate", loop: "Enquiry chasing, site-visit scheduling, follow-up" },
  { name: "Healthcare", loop: "Appointment booking, reminders, no-show recovery" },
  { name: "Education", loop: "Course enquiries, counsellor routing, enrolment follow-up" },
  { name: "Hospitality", loop: "Availability checks, bookings, pre-arrival messages" },
  { name: "Professional services", loop: "Scoping calls, proposal chasing, renewals" },
  { name: "Retail", loop: "Stock queries, offer sends, repeat-purchase nudges" },
] as const;

/* ---------------- team page ---------------- */

export const VALUES = [
  {
    name: "Systems, not tools",
    body: "A tool needs someone to drive it. A system does the work and tells you when it could not.",
  },
  {
    name: "Engineering-grade",
    body: "Tested against real history, with failure states designed rather than discovered in production.",
  },
  {
    name: "Proven, not promised",
    body: "We show it running on your own work before you are asked to trust it.",
  },
  {
    name: "Custom, not templated",
    body: "Your process is the specification. We do not reshape your business to fit a product we already built.",
  },
  {
    name: "Outcome-literate",
    body: "We measure hours removed and work completed, not messages sent or tickets touched.",
  },
] as const;
