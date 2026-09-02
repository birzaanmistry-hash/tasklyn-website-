/**
 * All page copy in one place.
 * Contact details and founder names are carried over from tasklyn.in unchanged.
 * There are no testimonials, client logos, case studies or performance numbers
 * here by design: the system itself is the proof.
 */

export const NAV = [
  { label: "What we do", href: "#systems" },
  { label: "Industries", href: "#industries" },
  { label: "How we build", href: "#process" },
  { label: "About", href: "#about" },
] as const;

export const CTA_PRIMARY = "Build your system";

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
  email: "tasklyn.ai@gmail.com",
  phones: ["+91 89280 67693", "+91 99302 26026"],
  city: "Mumbai, India",
  founders: [
    { name: "Birzaan Mistry", role: "Co-founder" },
    { name: "Mustufa Kapadia", role: "Co-founder" },
  ],
};
