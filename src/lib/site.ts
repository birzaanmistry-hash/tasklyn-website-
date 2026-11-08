/**
 * Single source of truth for the Tasklyn site: navigation, solutions,
 * industries, approach, architecture, resources and company copy.
 *
 * Rules for anything added here:
 *  - No invented clients, testimonials, statistics, partnerships, awards,
 *    certifications or revenue. If a fact is not known, leave it out.
 *  - No named products. The product section is a vision only.
 *  - Industry applications describe what AI can do in that industry, not
 *    work Tasklyn has already delivered.
 */

export const BRAND = {
  name: "Tasklyn",
  legalName: "Tasklyn AI",
  tagline: "AI is the future and we are building it.",
  /** The same tagline in Title Case, for display-size statements (headings). */
  taglineDisplay: "AI Is The Future And We Are Building It.",
  descriptor: "Enterprise AI Engineering & Products",
  /** One consistent sentence used in metadata, JSON-LD and llms.txt. */
  definition:
    "Tasklyn is an India-based AI engineering company. It designs, builds, integrates and deploys AI systems for organisations, and is developing AI-powered products of its own.",
  markets: ["India", "United States", "United Kingdom", "Europe", "Middle East"],
  hq: "Mumbai, India",
} as const;

/* ------------------------------------------------------------------ */
/*  Solutions                                                          */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export type Solution = {
  slug: string;
  name: string;
  /** One line used in menus and cards. */
  short: string;
  /** Page <title>, 50-60 characters. */
  title: string;
  /** Meta description, 140-160 characters. */
  description: string;
  /** Primary search intent this page owns. */
  intent: string;
  /** Direct, answer-ready definition (first paragraph of the page). */
  definition: string;
  /** What we build. */
  builds: { name: string; body: string }[];
  /** Where it applies. Describes the opportunity, not delivered work. */
  useCases: string[];
  /** How an engagement with this capability typically runs. */
  delivery: string;
  faqs: Faq[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    short: "Production-grade AI systems, designed and built end to end.",
    title: "AI Engineering Company | Enterprise AI | Tasklyn",
    description:
      "Tasklyn is an AI engineering company in India. We design, build and deploy production-grade AI systems that connect to your data, tools and workflows.",
    intent: "AI engineering company",
    definition:
      "AI engineering is the discipline of turning AI models into dependable software: systems with defined inputs and outputs, tested behaviour, monitoring and a clear owner. It is what sits between a promising demo and something a business can rely on every day.",
    builds: [
      { name: "AI System Design", body: "Architecture that fixes what the system decides, what it hands to people and how it is measured, before any code is written." },
      { name: "Model And Tool Selection", body: "Choosing the right model, retrieval approach and supporting services for the job, rather than defaulting to the largest or newest." },
      { name: "Production Build", body: "Services, APIs and interfaces engineered like any other critical software: versioned, tested and deployable." },
      { name: "Evaluation And Monitoring", body: "Test sets and live checks that show whether the system is behaving, and alert someone when it is not." },
    ],
    useCases: [
      "Replacing a manual, rule-heavy process with a system that handles the routine cases",
      "Adding AI capability to an existing product or internal platform",
      "Taking a proof of concept built by another team to production",
    ],
    delivery:
      "We start with a scoped discovery, agree the success measures with you, then build in short increments so you see working behaviour early. Handover includes documentation and an evaluation suite your team can keep running.",
    faqs: [
      { q: "What Is Enterprise AI Engineering?", a: "It is the practice of designing, building, integrating and operating AI systems inside an organisation, with the reliability, security and accountability that business-critical software requires." },
      { q: "How Is AI Engineering Different From Data Science?", a: "Data science explores what the data can tell you. AI engineering builds and operates the software that acts on it, including integration, testing, monitoring and maintenance." },
    ],
  },
  {
    slug: "agentic-ai",
    name: "Agentic AI Systems",
    short: "AI agents that plan, use tools and complete multi-step work.",
    title: "Agentic AI Development | AI Agent Company | Tasklyn",
    description:
      "Tasklyn builds agentic AI systems: AI agents that plan, call your tools and complete multi-step business work, with human approval where it matters.",
    intent: "agentic AI development",
    definition:
      "An agentic AI system is software in which an AI model decides which steps to take, calls tools and systems to take them, checks the result and continues until the task is done or a person is needed. Unlike a chatbot, it acts rather than only answers.",
    builds: [
      { name: "Single And Multi-Agent Workflows", body: "Agents with a clear role, scoped permissions and defined hand-offs, coordinated where a task needs more than one." },
      { name: "Tool And System Access", body: "Safe connections to your CRM, ERP, databases, documents and internal APIs, limited to what each task needs." },
      { name: "Human-In-The-Loop Controls", body: "Approval steps for consequential actions, with the agent's reasoning and proposed action shown to the reviewer." },
      { name: "Observability", body: "Full traces of what an agent did and why, so behaviour can be audited, debugged and improved." },
    ],
    useCases: [
      "Processing inbound requests that need information from several systems",
      "Preparing and routing documents for review and approval",
      "Monitoring operations and acting on exceptions",
    ],
    delivery:
      "We begin with one bounded workflow, define what the agent may and may not do, and run it with human approval first. Autonomy is widened only as the evaluation results justify it.",
    faqs: [
      { q: "What Is The Difference Between AI Automation And Agentic AI?", a: "Automation follows a fixed path you define in advance. An agentic system chooses its path at run time within limits you set, which lets it handle varied or unstructured work that fixed rules cannot." },
      { q: "How Can AI Agents Automate Business Processes?", a: "An agent receives a task, gathers the information it needs from your systems, takes the next step, checks the outcome and escalates to a person when a decision is outside its limits." },
    ],
  },
  {
    slug: "automation",
    name: "Intelligent Automation",
    short: "Workflows that read, decide and act on unstructured work.",
    title: "AI Automation Services for Enterprises | Tasklyn",
    description:
      "Tasklyn designs intelligent automation that reads documents, messages and data, makes routine decisions and updates your systems, with exceptions routed to people.",
    intent: "AI automation services",
    definition:
      "Intelligent automation combines workflow automation with AI so that processes involving documents, messages and judgement, which rules alone could not handle, can run without manual effort. People handle the exceptions.",
    builds: [
      { name: "Document And Message Understanding", body: "Extraction and classification of invoices, orders, emails, forms and conversations into structured data." },
      { name: "Workflow Orchestration", body: "Multi-step processes that move work between systems, apply business rules and track every step." },
      { name: "Exception Handling", body: "Clear queues for the cases the system is unsure about, with the context a person needs to resolve them quickly." },
      { name: "System Updates", body: "Writing results back into your ERP, CRM or spreadsheets so records stay current without re-keying." },
    ],
    useCases: [
      "Order, invoice and document processing",
      "Customer enquiry triage and routing",
      "Recurring reporting and reconciliation",
    ],
    delivery:
      "We map the process as it really runs, pick the steps where automation pays back, build them with checks at each stage and measure the result against the baseline you already have.",
    faqs: [
      { q: "Which Processes Are Good Candidates For AI Automation?", a: "High-volume, repeatable work that involves reading or writing unstructured information, follows broadly consistent rules, and where mistakes can be caught by a check or a reviewer." },
    ],
  },
  {
    slug: "llm",
    name: "LLM & Generative AI",
    short: "Language-model applications grounded in your own knowledge.",
    title: "Custom LLM & Generative AI Solutions | Tasklyn",
    description:
      "Tasklyn builds custom LLM and generative AI applications: assistants, search and content systems grounded in your documents, with evaluation and guardrails.",
    intent: "custom LLM development",
    definition:
      "An enterprise LLM application uses a large language model to read, write and reason over business information. To be useful it must be grounded in the organisation's own knowledge, tested for accuracy and governed so that it behaves predictably.",
    builds: [
      { name: "Knowledge Assistants", body: "Assistants that answer from your documents, policies and records and show where each answer came from." },
      { name: "Retrieval And Search", body: "Retrieval pipelines that find the right passage across large, messy document sets." },
      { name: "Generation Workflows", body: "Drafting of reports, responses and summaries in your structure and tone, with review before anything is sent." },
      { name: "Evaluation And Guardrails", body: "Test suites, output checks and access controls that keep the application accurate and within bounds." },
    ],
    useCases: [
      "Internal assistants over policies, manuals and contracts",
      "Drafting and summarising repetitive written work",
      "Search across years of unstructured documents",
    ],
    delivery:
      "We build against a test set drawn from your real questions and documents, so accuracy is measured rather than assumed, and we agree up front where the system must defer to a person.",
    faqs: [
      { q: "What Are Enterprise LLM Applications?", a: "They are applications that use large language models on an organisation's own information to answer questions, draft content, summarise documents or support decisions, under the organisation's security and governance rules." },
      { q: "Do We Need To Train Our Own Model?", a: "Usually not. Most business needs are met by an existing model combined with retrieval of your data and careful evaluation. Training or fine-tuning is considered only when that approach demonstrably falls short." },
    ],
  },
  {
    slug: "ai-integration",
    name: "Enterprise AI Integration",
    short: "AI connected to the systems your business already runs on.",
    title: "Enterprise AI Integration Services For Business | Tasklyn",
    description:
      "Tasklyn integrates AI into existing enterprise systems: ERP, CRM, data platforms and internal tools, without replacing what already works for your business.",
    intent: "enterprise AI integration",
    definition:
      "Enterprise AI integration is the work of connecting AI capabilities to the systems, data and processes an organisation already uses, so that AI improves existing workflows instead of sitting in a separate tool nobody opens.",
    builds: [
      { name: "System Connectors", body: "Secure connections to ERP, CRM, databases, document stores and internal APIs." },
      { name: "Data Access Layers", body: "Controlled, audited access so AI components see only the data they are permitted to." },
      { name: "Workflow Embedding", body: "AI steps placed inside the tools and screens your teams already use." },
      { name: "Legacy Bridging", body: "Practical approaches for older systems that lack modern APIs." },
    ],
    useCases: [
      "Adding an AI assistant inside an existing internal tool",
      "Letting AI read from and write to an ERP or CRM safely",
      "Connecting fragmented data sources for a single AI workflow",
    ],
    delivery:
      "We audit the systems and data involved, agree security and access requirements with your team, and integrate in stages so the live business is never put at risk.",
    faqs: [
      { q: "How Can Businesses Integrate AI Into Existing Systems?", a: "By connecting AI components to current systems through APIs or controlled data access, embedding them in existing workflows, and limiting what they can read and change. Replacing the underlying systems is rarely necessary." },
    ],
  },
  {
    slug: "data-ml",
    name: "Data & Machine Learning",
    short: "Data foundations and predictive models that AI depends on.",
    title: "Data Engineering & Machine Learning Services | Tasklyn",
    description:
      "Tasklyn provides data engineering and machine learning development: pipelines, data quality, forecasting and classification models built for production use.",
    intent: "machine learning development",
    definition:
      "Data engineering prepares reliable, accessible data; machine learning builds models that learn patterns from it. Together they are the foundation under most AI systems, and the part most often underestimated.",
    builds: [
      { name: "Data Pipelines", body: "Ingestion, cleaning and transformation that keep data current and consistent." },
      { name: "Data Quality And Governance", body: "Checks, lineage and access rules that make data trustworthy." },
      { name: "Predictive Models", body: "Forecasting, classification and anomaly detection built, validated and deployed for a defined decision." },
      { name: "Model Operations", body: "Retraining, drift checks and monitoring so models stay accurate over time." },
    ],
    useCases: [
      "Demand, cash-flow or capacity forecasting",
      "Classifying documents, transactions or enquiries",
      "Detecting unusual patterns in operational data",
    ],
    delivery:
      "We assess the data first and tell you plainly whether it can support the goal. Models are validated against held-out data and a simple baseline, so you can see what they add.",
    faqs: [
      { q: "Is Our Data Good Enough For AI?", a: "Often it is usable but needs work. A short data assessment shows what is available, what is missing and what must be fixed before a model or AI system can be trusted." },
    ],
  },
  {
    slug: "ai-consulting",
    name: "AI Strategy & Consulting",
    short: "A clear, honest route from AI ambition to a first working system.",
    title: "AI Consulting Services & Strategy | Tasklyn",
    description:
      "Tasklyn offers AI strategy and consulting: opportunity assessment, use-case prioritisation, feasibility and a practical roadmap from first idea to deployment.",
    intent: "AI consulting services",
    definition:
      "AI consulting helps an organisation decide where AI can create real value, what is feasible with its data and systems, and in what order to proceed. Good advice includes telling you what not to build.",
    builds: [
      { name: "Opportunity Assessment", body: "A structured review of processes and data to find where AI is likely to pay back." },
      { name: "Use-Case Prioritisation", body: "Candidate projects ranked by value, feasibility and risk." },
      { name: "Feasibility And Architecture", body: "A technical view of what can be built, with what, and what it would take." },
      { name: "Roadmap", body: "A phased plan from first pilot to wider rollout, with decision points." },
    ],
    useCases: [
      "Organisations starting their first AI initiative",
      "Teams with many ideas and no clear order of priority",
      "Leaders who need an independent view before committing budget",
    ],
    delivery:
      "Work typically begins with a conversation about your goals, followed by a time-boxed assessment that ends in written recommendations you can act on, with us or without us.",
    faqs: [
      { q: "How Do Organisations Begin An AI Transformation Project?", a: "Start with one well-defined business problem, confirm the data and systems needed, set a measurable goal, and build a small working system. Learn from it before widening scope." },
    ],
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/*  Industries                                                         */
/* ------------------------------------------------------------------ */

export type Industry = {
  slug: string;
  name: string;
  /** Where AI can be applied. Opportunities, not delivered work. */
  applications: { name: string; body: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "financial-services",
    name: "Banking And Financial Services",
    applications: [
      { name: "Document Processing", body: "Extracting data from statements, KYC documents and invoices for review." },
      { name: "Reconciliation And Exceptions", body: "Matching records across systems and surfacing only the mismatches." },
      { name: "Policy And Compliance Assistants", body: "Answering staff questions from regulations and internal policy, with sources." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare And Life Sciences",
    applications: [
      { name: "Administrative Automation", body: "Scheduling, intake and records handling that frees clinical staff." },
      { name: "Document Summarisation", body: "Condensing lengthy reports and literature for professional review." },
      { name: "Operational Forecasting", body: "Predicting demand for appointments, supplies or capacity." },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    applications: [
      { name: "Order And Schedule Coordination", body: "Keeping production schedules, orders and inventory records aligned." },
      { name: "Quality And Maintenance Signals", body: "Detecting anomalies in operational data that precede defects or downtime." },
      { name: "Supplier Communication", body: "Reading and routing supplier documents and messages." },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics And Supply Chain",
    applications: [
      { name: "Shipment Documentation", body: "Reading bills, invoices and customs documents and checking them against orders." },
      { name: "Demand And Route Planning", body: "Forecasting volumes and supporting planning decisions." },
      { name: "Exception Management", body: "Flagging delays and mismatches early, with the context to act." },
    ],
  },
  {
    slug: "retail",
    name: "Retail And Commerce",
    applications: [
      { name: "Customer Conversations", body: "Answering product and order questions across messaging channels." },
      { name: "Catalogue And Content", body: "Drafting and maintaining product information at scale." },
      { name: "Inventory Forecasting", body: "Anticipating demand to reduce stock-outs and overstock." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    applications: [
      { name: "Enquiry Qualification", body: "Responding to leads, understanding requirements and booking viewings." },
      { name: "Document Handling", body: "Reading agreements and records to extract key terms." },
      { name: "Listing Content", body: "Drafting consistent property descriptions for review." },
    ],
  },
  {
    slug: "education",
    name: "Education",
    applications: [
      { name: "Admissions And Support", body: "Answering applicant and student questions from institutional information." },
      { name: "Administrative Workflows", body: "Processing forms, records and routine communication." },
      { name: "Learning Content Assistance", body: "Helping staff prepare and adapt materials, with human review." },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    applications: [
      { name: "Research And Summarisation", body: "Condensing large document sets into structured briefs." },
      { name: "Drafting Support", body: "First drafts of routine documents in the firm's own format." },
      { name: "Knowledge Retrieval", body: "Finding precedent and prior work across internal archives." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Technology: five-layer architecture                                */
/* ------------------------------------------------------------------ */

export const ARCHITECTURE = [
  { n: "01", name: "Data & Context", body: "Your documents, databases and records, prepared and permissioned so AI works from accurate, current information." },
  { n: "02", name: "Intelligence Layer", body: "The models, retrieval and reasoning that interpret information and produce answers, predictions or decisions." },
  { n: "03", name: "Agent & Orchestration Layer", body: "The logic that sequences steps, calls tools, coordinates agents and brings people in at the right moments." },
  { n: "04", name: "Integration Layer", body: "Secure connections to the ERP, CRM, messaging and internal systems where work actually happens." },
  { n: "05", name: "Evaluation & Monitoring", body: "Tests, traces and alerts that show whether the system is accurate, safe and improving." },
] as const;

/* ------------------------------------------------------------------ */
/*  Approach                                                           */
/* ------------------------------------------------------------------ */

export const APPROACH = [
  { n: "01", name: "Discover", body: "We learn the business problem, the people involved and the data available, and agree what success looks like." },
  { n: "02", name: "Architect", body: "We design the system: what it decides, what it hands to people, how it connects and how it is measured." },
  { n: "03", name: "Engineer", body: "We build in short increments with tests, so working behaviour is visible early and risk is found early." },
  { n: "04", name: "Deploy", body: "We release in stages, integrate with live systems and hand over documentation and runbooks." },
  { n: "05", name: "Optimise", body: "We monitor real behaviour, measure it against the goals and keep improving what the evidence shows needs it." },
] as const;

/* ------------------------------------------------------------------ */
/*  Problems we engineer (case-study page: no client work is claimed)  */
/* ------------------------------------------------------------------ */

export const PROBLEM_TYPES = [
  { name: "Work That Waits On A Person To Read It", body: "Enquiries, orders, invoices and emails queue up because someone has to open, read and re-type them. Systems can read and route them, and people see only what needs judgement." },
  { name: "Records That Disagree Across Systems", body: "The ERP, the spreadsheet and the CRM hold different versions of the truth. Reconciliation can run continuously instead of at month end." },
  { name: "Knowledge Locked In Documents", body: "Policies, contracts and manuals exist, but nobody can find the answer quickly. Grounded assistants can answer with a source." },
  { name: "Repetitive Reporting", body: "The same report is assembled by hand from several tools every week. It can be produced from the underlying data on demand." },
  { name: "Proofs Of Concept That Never Shipped", body: "A promising demo exists but cannot be trusted in production. Engineering, evaluation and monitoring close that gap." },
] as const;

/* ------------------------------------------------------------------ */
/*  Products: vision only                                              */
/* ------------------------------------------------------------------ */

export const PRODUCT_VISION = {
  headline: "We Don't Just Implement AI. We Build With It.",
  body: "Alongside our work for clients, Tasklyn is developing AI-powered products and platforms of its own. The same engineering that serves our clients informs what we choose to build.",
  directions: [
    { name: "Enterprise AI Platforms", body: "Reusable foundations for deploying and governing AI across an organisation." },
    { name: "Industry-Specific AI Products", body: "Focused software for problems that recur within a particular sector." },
    { name: "AI-Powered SaaS", body: "Software delivered as a service, with intelligence built into the workflow." },
    { name: "Intelligent Productivity Tools", body: "Applications that remove routine work from knowledge workers' days." },
  ],
  note: "These are directions, not announced products. We will describe a product here when it exists and is ready to be described accurately.",
} as const;

/* ------------------------------------------------------------------ */
/*  Resources: original explainers (also the AEO answers)              */
/* ------------------------------------------------------------------ */

export type Resource = {
  slug: string;
  question: string;
  title: string;
  description: string;
  /** Direct answer, 1-2 sentences. */
  answer: string;
  /** Depth. Each string is one paragraph. */
  body: string[];
};

export const RESOURCES: Resource[] = [
  {
    slug: "what-is-enterprise-ai-engineering",
    question: "What Is Enterprise AI Engineering?",
    title: "What Is Enterprise AI Engineering? | Tasklyn Resources",
    description:
      "Enterprise AI engineering explained: what it covers, how it differs from experimenting with AI, and what a dependable AI system in a business actually requires.",
    answer:
      "Enterprise AI engineering is the practice of designing, building, integrating and operating AI systems inside an organisation, with the reliability, security and accountability that business-critical software requires.",
    body: [
      "Trying an AI model in a chat window is not engineering. Engineering begins when the output has to be right repeatedly, connect to real systems and be answerable to someone when it is wrong.",
      "In practice it covers four things: understanding the business process and data involved, designing a system around a model rather than relying on the model alone, integrating it with the tools the business already uses, and measuring and monitoring behaviour after launch.",
      "The difference between a demonstration and a dependable system is mostly the unglamorous work: test sets, access controls, error handling, logging and a plan for what happens when the system is unsure.",
    ],
  },
  {
    slug: "how-ai-agents-automate-business-processes",
    question: "How Can AI Agents Automate Business Processes?",
    title: "How AI Agents Automate Business Processes | Tasklyn",
    description:
      "How AI agents automate business processes: receiving a task, gathering information, acting through your systems and escalating to people when needed.",
    answer:
      "An AI agent receives a task, gathers the information it needs from business systems, takes the next step, checks the outcome and hands over to a person when a decision falls outside its limits.",
    body: [
      "The agent is given a goal, a set of tools it may use and rules about what it may not do. It works through the task step by step, deciding at each point which tool to call or whether to stop and ask.",
      "Good agent design is mostly about boundaries. Each agent gets only the access its task needs, consequential actions require approval, and every step is recorded so that behaviour can be reviewed.",
      "Agents suit processes with varied inputs and several systems involved. They are a poor fit for work that must follow an exact fixed sequence, where ordinary workflow automation is simpler and safer.",
    ],
  },
  {
    slug: "what-are-enterprise-llm-applications",
    question: "What Are Enterprise LLM Applications?",
    title: "What Are Enterprise LLM Applications? | Tasklyn",
    description:
      "Enterprise LLM applications explained: how large language models are grounded in company data, evaluated for accuracy and governed for business use.",
    answer:
      "Enterprise LLM applications use large language models on an organisation's own information to answer questions, draft content, summarise documents or support decisions, under the organisation's security and governance rules.",
    body: [
      "A general-purpose model knows nothing about your contracts, products or policies. Enterprise applications supply that knowledge at the moment of use, typically by retrieving the relevant passages and giving them to the model along with the question.",
      "Accuracy is then measured rather than assumed. A test set of real questions, with known good answers, shows how often the system is right and where it fails.",
      "Governance completes the picture: who can see which documents, what the system may say, how outputs are reviewed and how the organisation knows what was asked and answered.",
    ],
  },
  {
    slug: "how-to-integrate-ai-into-existing-systems",
    question: "How Can Businesses Integrate AI Into Existing Systems?",
    title: "How to Integrate AI Into Existing Systems | Tasklyn",
    description:
      "How businesses can integrate AI into existing ERP, CRM and internal systems: connection patterns, access control, staged rollout and legacy constraints.",
    answer:
      "Connect AI components to current systems through APIs or controlled data access, embed them in workflows people already use, and limit what they can read and change. Replacing the underlying systems is rarely necessary.",
    body: [
      "Most organisations have the data they need, spread across several systems. Integration means giving an AI component governed access to the right slice of it, and a safe way to write results back.",
      "Older systems without APIs can often be reached through database access, file exchange or a thin adapter. The aim is to leave stable systems untouched.",
      "Rollout should be staged: read-only first, then suggestions a person approves, then limited automatic action. Each stage is a checkpoint at which results can be reviewed.",
    ],
  },
  {
    slug: "ai-automation-vs-agentic-ai",
    question: "What Is The Difference Between AI Automation And Agentic AI?",
    title: "AI Automation vs Agentic AI: The Difference | Tasklyn",
    description:
      "AI automation versus agentic AI: fixed workflows against systems that choose their own steps, and how to decide which one a business process needs.",
    answer:
      "Automation follows a path you define in advance. An agentic AI system chooses its path at run time within limits you set, which lets it handle varied, unstructured work that fixed rules cannot.",
    body: [
      "Choose automation when the steps are known and stable. It is predictable, cheap to run and easy to audit.",
      "Choose an agentic approach when inputs vary, information must be gathered from several places, or the right next step depends on what was found. It is more flexible, and needs stronger evaluation and tighter limits.",
      "Many real systems combine both: a fixed workflow for the predictable parts, with an agent handling the steps that need judgement.",
    ],
  },
  {
    slug: "how-tasklyn-approaches-ai-implementation",
    question: "How Does Tasklyn Approach AI Implementation?",
    title: "How Tasklyn Approaches AI Implementation | Tasklyn",
    description:
      "Tasklyn's approach to AI implementation: discover, architect, engineer, deploy and optimise, with evaluation and human oversight designed in from the start.",
    answer:
      "Tasklyn works in five stages: discover the problem, architect the system, engineer it in increments, deploy in stages and optimise from real behaviour. Evaluation and human oversight are designed in from the start.",
    body: [
      "We begin with the business problem, not the technology. The first conversation is about what is costly or slow today, and what a good result would look like.",
      "We build in short increments, so you see working behaviour early, and we agree where the system must defer to a person before we write the first line of code.",
      "After launch we monitor behaviour against the goals set at the start and continue to improve what the evidence shows needs improving.",
    ],
  },
  {
    slug: "which-industries-benefit-from-enterprise-ai",
    question: "What Industries Can Benefit From Enterprise AI?",
    title: "Which Industries Benefit From Enterprise AI? | Tasklyn",
    description:
      "Industries that benefit from enterprise AI, and where: financial services, healthcare, manufacturing, logistics, retail, real estate, education and services.",
    answer:
      "Any industry with high-volume document, communication or decision work can benefit. Financial services, healthcare, manufacturing, logistics, retail, real estate, education and professional services all have clear applications.",
    body: [
      "The common thread is not the sector but the shape of the work: information arriving in unstructured form, repeated decisions and several systems that must be kept consistent.",
      "In financial services that may be document processing and reconciliation; in manufacturing, order and schedule coordination; in professional services, research and drafting support.",
      "The right question for any organisation is not whether its industry is suitable, but which specific process is costly enough, and well enough understood, to improve first.",
    ],
  },
  {
    slug: "how-to-start-an-ai-transformation-project",
    question: "How Do Organisations Begin An AI Transformation Project?",
    title: "How to Start an AI Transformation Project | Tasklyn",
    description:
      "How to begin an AI transformation project: choose one business problem, check the data, set a measurable goal, build small and learn before scaling.",
    answer:
      "Start with one well-defined business problem, confirm the data and systems it needs, set a measurable goal, and build a small working system. Learn from it before widening scope.",
    body: [
      "Broad ambitions stall. A narrow first project with a clear owner and a measurable outcome produces evidence that makes the next decision easier.",
      "Check the data early. Many projects fail not because of the model but because the information it needs is incomplete, scattered or unavailable.",
      "Plan for operation, not only launch: who monitors the system, who decides when it changes and what happens when it makes a mistake.",
    ],
  },
];

export const resourceBySlug = (slug: string) => RESOURCES.find((r) => r.slug === slug);

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  /** Mega-menu panel, if any. */
  panel?: {
    heading: string;
    blurb: string;
    links: { label: string; href: string; note?: string }[];
  };
};

export const NAV: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    panel: {
      heading: "Enterprise AI Solutions",
      blurb: "One partner across the AI engineering lifecycle.",
      links: SOLUTIONS.map((s) => ({ label: s.name, href: `/solutions/${s.slug}`, note: s.short })),
    },
  },
  {
    label: "Products",
    href: "/products",
    panel: {
      heading: "AI Products & Platforms",
      blurb: "What we are building toward.",
      links: PRODUCT_VISION.directions.map((d) => ({ label: d.name, href: "/products", note: d.body })),
    },
  },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technology" },
  {
    label: "Resources",
    href: "/resources",
    panel: {
      heading: "Resources",
      blurb: "Plain answers to common enterprise AI questions.",
      links: [
        ...RESOURCES.slice(0, 4).map((r) => ({ label: r.question, href: `/resources/${r.slug}` })),
        { label: "Case Studies", href: "/case-studies", note: "The problems we engineer." },
        { label: "All Resources", href: "/resources" },
      ],
    },
  },
  {
    label: "Company",
    href: "/company",
    panel: {
      heading: "Company",
      blurb: "A new generation of AI engineering, from India.",
      links: [
        { label: "About Tasklyn", href: "/company" },
        { label: "Our Approach", href: "/company#approach" },
        { label: "Contact", href: "/contact" },
      ],
    },
  },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS = [
  { title: "Solutions", links: SOLUTIONS.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })) },
  { title: "Products", links: [{ label: "Product Vision", href: "/products" }] },
  { title: "Industries", links: [{ label: "All Industries", href: "/industries" }] },
  { title: "Technology", links: [{ label: "Architecture", href: "/technology" }, { label: "Our Approach", href: "/company#approach" }] },
  { title: "Resources", links: [{ label: "All Resources", href: "/resources" }, { label: "Case Studies", href: "/case-studies" }] },
  { title: "Company", links: [{ label: "About", href: "/company" }, { label: "Contact", href: "/contact" }] },
] as const;
