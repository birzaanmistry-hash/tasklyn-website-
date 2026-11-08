/**
 * Long-form detail for each solution page. Everything here describes what the
 * capability is and how Tasklyn approaches it. Nothing claims delivered
 * client work, results, statistics or partnerships.
 */

type Item = { name: string; body: string };
export type SolutionDetail = {
  /** Two to three paragraphs that explain the capability in depth. */
  overview: string[];
  /** The problems this capability exists to solve. */
  problems: Item[];
  /** How the work runs, in order. */
  process: Item[];
  /** What the client receives. */
  deliverables: string[];
  /** The practical building blocks involved, in plain language. */
  building: Item[];
  /** Controls, risks and how they are handled. */
  governance: Item[];
  fit: { good: string[]; notYet: string[] };
  faqs: { q: string; a: string }[];
};

export const SOLUTION_DETAIL: Record<string, SolutionDetail> = {
  "ai-engineering": {
    overview: [
      "Most organisations can get an AI model to produce an impressive answer. Far fewer can get a system to produce a correct answer every day, for years, while the data, the people and the business change around it. AI engineering is the work that closes that gap.",
      "It treats a model as one component inside a larger piece of software. Around the model sit data pipelines, business rules, interfaces, access controls, tests and monitoring. Each of those is designed on purpose, and each has an owner.",
      "Tasklyn approaches AI engineering the way a good software team approaches any critical system: define what the system must do, define how success is measured, build in small increments, and prove behaviour with tests before anything reaches a user.",
    ],
    problems: [
      { name: "Demos That Do Not Survive Contact With Real Data", body: "A prototype works on ten tidy examples and fails on the messy thousand that matter. Engineering builds for the real distribution of inputs, including the awkward ones." },
      { name: "No Way To Know If It Is Working", body: "Without a test set and live checks, quality is a matter of opinion. We define measurable acceptance criteria before building and keep measuring after launch." },
      { name: "Systems Nobody Owns", body: "AI built as a side project has no owner, no runbook and no plan for when it fails. We design for operation: logging, alerts, documentation and a named responsible team." },
      { name: "Cost And Latency Surprises", body: "A model call that is cheap in a demo can be expensive at volume. We size, cache and route work so the system stays affordable and responsive." },
    ],
    process: [
      { name: "Frame The Problem", body: "We agree the decision or task the system will own, who relies on it, what a wrong answer costs and how success will be measured." },
      { name: "Assess Data And Systems", body: "We inspect the data the system will use and the systems it must connect to, and tell you plainly what is ready and what must be fixed first." },
      { name: "Design The System", body: "We choose the architecture, the models and the points where a person reviews or approves, and document the reasoning." },
      { name: "Build In Increments", body: "We deliver working slices every few weeks, each tested against the agreed criteria, so risk surfaces early and you see real behaviour throughout." },
      { name: "Evaluate Before Release", body: "We run the system against a held-out test set drawn from your own cases and review failures with you before it goes live." },
      { name: "Release And Operate", body: "We deploy in stages, monitor real behaviour, and hand over documentation and runbooks so your team can operate the system confidently." },
    ],
    deliverables: [
      "A written system design covering architecture, data flows, models and review points",
      "Production-ready services and interfaces, version controlled and tested",
      "An evaluation suite of test cases you can keep running after we leave",
      "Monitoring and alerting configured for the live system",
      "Documentation and runbooks for your operations team",
    ],
    building: [
      { name: "Data Preparation", body: "Cleaning, structuring and permissioning the information the system reads from." },
      { name: "Model Layer", body: "The language, vision or predictive models doing the reasoning, chosen by testing against your cases." },
      { name: "Business Logic", body: "Rules and checks around the model so outputs stay within what the business allows." },
      { name: "Interfaces", body: "APIs, internal tools or messaging channels through which people and systems use the result." },
      { name: "Observability", body: "Logs, traces and quality metrics that make behaviour visible." },
    ],
    governance: [
      { name: "Human Review Where It Matters", body: "Consequential outputs go to a person first. Autonomy widens only as evaluation evidence supports it." },
      { name: "Access Control", body: "Each component sees only the data it needs, and every access is logged." },
      { name: "Change Control", body: "Model and prompt changes are versioned and re-tested so behaviour does not drift unnoticed." },
    ],
    fit: {
      good: ["A defined process or decision with measurable outcomes", "Data that exists, even if it is untidy", "A team willing to review early versions and give feedback"],
      notYet: ["No clear problem yet: start with AI consulting", "No access to the underlying data or systems", "An expectation of a finished system without iteration"],
    },
    faqs: [
      { q: "How Long Does An AI Engineering Project Take?", a: "It depends on scope and data readiness. A tightly scoped first system is typically built in weeks rather than months, delivered in increments so you see working behaviour early. We give a realistic estimate after discovery." },
      { q: "Will We Own The System You Build?", a: "Ownership of the deliverables, including code, documentation and evaluation suite, is set out in the written agreement we sign before work starts." },
      { q: "Can You Work With Our Existing Engineering Team?", a: "Yes. We often work alongside internal teams, agree interfaces and conventions up front, and hand over in a form your engineers can maintain." },
    ],
  },

  "agentic-ai": {
    overview: [
      "A conventional AI feature answers a question. An agentic system finishes a job. Given a goal, it decides what to look up, which tool to use, what to do next and when to stop, and it can pause to ask a person when the situation is outside its limits.",
      "That freedom is useful and risky in equal measure. The skill in building agents is not making them more autonomous, it is giving them exactly the autonomy a task deserves and nothing more: clear roles, scoped permissions, approval gates and a complete record of every step.",
      "Tasklyn builds agents the careful way. We start with one bounded workflow, run it with human approval, measure it, and extend its independence only as the evidence justifies.",
    ],
    problems: [
      { name: "Work That Spans Several Systems", body: "A single request needs information from the CRM, a document store and the ERP. An agent can gather, reconcile and act across them, where a person currently copies between screens." },
      { name: "Inputs That Vary Too Much For Fixed Rules", body: "Emails, forms and requests arrive in countless shapes. Rule-based automation breaks on the unexpected; an agent can interpret intent and choose a sensible path." },
      { name: "Exceptions That Swamp Staff", body: "Routine cases are handled, but the long tail of exceptions consumes the team. Agents can triage and resolve the simpler exceptions and escalate the rest with full context." },
      { name: "Fear Of Uncontrolled AI", body: "Leaders worry about an AI that acts without oversight. Agent design with approvals, limits and audit trails answers that concern directly." },
    ],
    process: [
      { name: "Pick One Bounded Workflow", body: "We choose a task with clear inputs, a clear finish and tolerable risk, rather than attempting a general-purpose agent." },
      { name: "Define Role, Tools And Limits", body: "We write down what the agent may do, which systems it may touch, what it must never do and when it must ask a person." },
      { name: "Build The Agent And Its Tools", body: "We implement the reasoning loop and safe connectors to your systems, each tool narrowly scoped and individually tested." },
      { name: "Run With Approval First", body: "The agent proposes actions and a person approves them. Every proposal, approval and correction is recorded." },
      { name: "Measure And Tighten", body: "We review accuracy, failure patterns and cost, fix the weak points and refine the instructions and tools." },
      { name: "Extend Autonomy Deliberately", body: "Where results justify it, we allow the agent to act alone on low-risk steps while keeping approvals on the rest." },
    ],
    deliverables: [
      "A working agent or set of coordinated agents for the agreed workflow",
      "Tool connectors to your systems with documented permissions",
      "An approval interface where a person reviews proposed actions",
      "Full execution traces for audit and debugging",
      "An evaluation suite that tests the agent on realistic scenarios",
    ],
    building: [
      { name: "Planning And Reasoning", body: "The model-driven loop that decides the next step toward the goal." },
      { name: "Tool Use", body: "Narrow, tested functions the agent can call to read or change a system." },
      { name: "Memory And Context", body: "The information an agent keeps about the task so it stays consistent across steps." },
      { name: "Multi-Agent Coordination", body: "Where a task warrants it, specialised agents with defined hand-offs." },
      { name: "Guardrails", body: "Checks on inputs, outputs and actions that keep behaviour inside policy." },
    ],
    governance: [
      { name: "Least Privilege", body: "An agent can use only the tools and data its task requires." },
      { name: "Approval Gates", body: "Actions with financial, legal or customer impact require human sign-off." },
      { name: "Complete Audit Trail", body: "Every observation, decision and action is logged so behaviour can be reviewed and explained." },
      { name: "Kill Switch And Limits", body: "Spending, step count and scope limits stop a misbehaving run, and the agent can be disabled instantly." },
    ],
    fit: {
      good: ["Multi-step work that currently involves several tools and people", "Variable inputs that defeat fixed rules", "Teams ready to review the agent's work during an initial period"],
      notYet: ["Processes that must follow an exact fixed sequence: use workflow automation", "Tasks where no error is tolerable and no review is possible", "No access to the systems the agent would need"],
    },
    faqs: [
      { q: "Are AI Agents Safe To Use In A Business?", a: "They are safe when designed with limits. That means scoped permissions, approval for consequential actions, spending and step limits, and a full audit trail. Safety is a design decision, not a property of the model." },
      { q: "What Is The Difference Between An Agent And A Chatbot?", a: "A chatbot converses. An agent acts: it uses tools, changes records and completes tasks across systems, usually within a conversation or in the background." },
      { q: "How Do You Stop An Agent Making Costly Mistakes?", a: "By limiting what it can do alone, requiring approval for high-impact steps, testing it on realistic scenarios before release and monitoring it afterwards. Autonomy is earned through evidence." },
    ],
  },

  automation: {
    overview: [
      "Much of the work inside a business is reading something, deciding what it means, and entering it somewhere else. Invoices, purchase orders, enquiries, forms, emails: each is a small task, and together they consume enormous time.",
      "Intelligent automation combines two things. Traditional workflow automation moves work between systems reliably and in a fixed order. AI adds the ability to understand unstructured content and handle variation. Together they automate processes that neither could automate alone.",
      "Our approach is to automate the routine and surface the exceptional. The system handles the cases it is confident about, and sends the uncertain ones to a person with everything they need to decide quickly.",
    ],
    problems: [
      { name: "Manual Data Entry And Re-Keying", body: "People read documents and type the contents into other systems. Extraction and validation can do this accurately and leave humans to check only what is doubtful." },
      { name: "Slow, Inconsistent Triage", body: "Enquiries and requests wait in an inbox until someone sorts them. Automated classification and routing puts each item in front of the right person immediately." },
      { name: "Errors That Surface Too Late", body: "Mismatches between orders, invoices and records are found at month end. Continuous checking flags them as they occur." },
      { name: "Processes Only One Person Understands", body: "Critical routines live in someone's head. Mapping and automating them makes the process explicit and resilient." },
    ],
    process: [
      { name: "Map The Real Process", body: "We observe how the work is actually done, including the workarounds, and record volumes, exceptions and the time each step takes." },
      { name: "Choose What To Automate", body: "We select the steps where automation pays back and leave alone the ones where human judgement is better value." },
      { name: "Design The Flow And Checks", body: "We define each step, the rules between them, the confidence thresholds and the exception queue." },
      { name: "Build And Connect", body: "We implement the extraction, decision and update steps and connect them to your ERP, CRM, email or spreadsheets." },
      { name: "Run In Shadow Mode", body: "The system runs alongside the manual process so results can be compared before anything is relied upon." },
      { name: "Go Live And Improve", body: "We switch over in stages, watch the exception queue and use what people correct to improve the system." },
    ],
    deliverables: [
      "A documented map of the process before and after automation",
      "The automated workflow, connected to your systems",
      "An exception queue and review screen for the cases that need people",
      "Measurement of volume, accuracy and time saved against your baseline",
      "Runbooks for operating and adjusting the workflow",
    ],
    building: [
      { name: "Document Understanding", body: "Extraction of fields and meaning from invoices, orders, contracts and forms." },
      { name: "Message Classification", body: "Reading emails and chats to determine intent, urgency and destination." },
      { name: "Business Rules", body: "Explicit rules for approvals, thresholds and routing so decisions are consistent." },
      { name: "Orchestration", body: "Sequencing steps, retrying failures and tracking each item through the process." },
      { name: "System Integration", body: "Reading from and writing to the tools your teams already use." },
    ],
    governance: [
      { name: "Confidence Thresholds", body: "Items below an agreed confidence level are never processed automatically." },
      { name: "Sampling And Audit", body: "A share of automated decisions is reviewed regularly to catch silent errors." },
      { name: "Traceability", body: "Every item carries a record of what was read, decided and written, and by which version of the system." },
    ],
    fit: {
      good: ["High-volume, repetitive work with a consistent shape", "Processes where the cost of delay or error is felt", "Teams who can describe the rules and exceptions"],
      notYet: ["Very low volume work, where automation will not pay back", "Processes that change every week with no stable pattern", "No access to the systems where results must be written"],
    },
    faqs: [
      { q: "How Is Intelligent Automation Different From RPA?", a: "Robotic process automation replays fixed screen actions. Intelligent automation adds AI to understand unstructured content and handle variation, and typically connects through APIs, which makes it sturdier." },
      { q: "What Happens When The System Is Unsure?", a: "Uncertain cases go to an exception queue for a person, along with the context needed to decide. Nothing below the agreed confidence level is processed automatically." },
      { q: "How Do We Measure The Return?", a: "We record the baseline before starting, such as volume, handling time and error rate, then measure the same things after launch. We report what the data shows." },
    ],
  },

  llm: {
    overview: [
      "Large language models can read, summarise, draft and answer questions in fluent natural language. On their own they know nothing about your business, and they will confidently say things that are wrong. Turning them into dependable business tools is an engineering job.",
      "The core technique is grounding. The application finds the relevant passages from your own documents and gives them to the model along with the question, so the answer rests on your facts and can cite its source. Around that sit evaluation, guardrails and access control.",
      "Tasklyn builds LLM applications that are measured, not assumed. We test them against real questions drawn from your organisation, and we agree in advance where the system must defer to a person.",
    ],
    problems: [
      { name: "Knowledge Nobody Can Find", body: "Policies, contracts and manuals exist but answers take too long to locate. A grounded assistant finds and cites the right passage in seconds." },
      { name: "Repetitive Writing", body: "Teams draft similar responses, reports and summaries over and over. Generation workflows produce a first draft in your structure and tone for a person to review." },
      { name: "Hallucination And Trust", body: "Ungrounded models invent plausible nonsense. Retrieval, citation and evaluation keep answers tied to source material and expose the cases where they are not." },
      { name: "Data Privacy Concerns", body: "Organisations worry about sending sensitive information to a model. We design access, redaction and deployment choices around your requirements." },
    ],
    process: [
      { name: "Define The Use And The Risk", body: "We agree who will use the application, what it may answer, what it must refuse and how a wrong answer would be caught." },
      { name: "Gather And Prepare Knowledge", body: "We collect the source documents, clean and structure them and set who may see what." },
      { name: "Build The Retrieval Layer", body: "We implement search that finds the right passages across large, messy document sets." },
      { name: "Build The Application", body: "We connect retrieval to a chosen model, shape the answers and citations, and build the interface people will use." },
      { name: "Create A Test Set", body: "We write a set of realistic questions with known good answers, drawn from your own staff and documents." },
      { name: "Evaluate, Tune, Release", body: "We measure accuracy, fix failure patterns and release to a pilot group before wider rollout." },
    ],
    deliverables: [
      "A working assistant, search or generation application on your knowledge",
      "A retrieval pipeline that can be refreshed as documents change",
      "A test set and accuracy report you can re-run",
      "Guardrails and access controls configured for your policies",
      "Documentation for maintaining and extending the system",
    ],
    building: [
      { name: "Document Ingestion", body: "Reading PDFs, office files, web pages and databases into a searchable form." },
      { name: "Retrieval", body: "Semantic and keyword search that returns the most relevant passages for a question." },
      { name: "Model Selection", body: "Choosing the model that gives the best accuracy, speed and cost for the task by testing." },
      { name: "Prompting And Output Control", body: "Instructions and structure that keep answers accurate, consistent and in the right format." },
      { name: "Citation And Evidence", body: "Linking each answer to the passages it came from." },
    ],
    governance: [
      { name: "Permission-Aware Retrieval", body: "People only receive answers drawn from documents they are allowed to see." },
      { name: "Refusal Behaviour", body: "The system declines or escalates questions outside its scope instead of guessing." },
      { name: "Ongoing Evaluation", body: "The test set is re-run when documents, prompts or models change, so quality does not quietly slip." },
    ],
    fit: {
      good: ["A body of documents or records people need to query", "Repetitive drafting or summarising work", "A willingness to define what good answers look like"],
      notYet: ["Documents that are not available digitally", "A requirement for guaranteed answers with no review", "No owner for keeping source knowledge current"],
    },
    faqs: [
      { q: "How Do You Stop An LLM From Making Things Up?", a: "By grounding it in your documents, requiring citations, instructing it to decline when evidence is missing, and testing it on realistic questions. This reduces errors substantially but cannot remove them entirely, so review remains important." },
      { q: "Can It Run On Our Own Infrastructure?", a: "Deployment choices include hosted models, models in your own cloud account and, where appropriate, models run on your infrastructure. The right choice depends on your data sensitivity, performance needs and budget." },
      { q: "How Do You Keep The Knowledge Current?", a: "The ingestion pipeline is designed to be re-run, so new and changed documents are picked up on a schedule or when they change, and removed documents stop appearing." },
    ],
  },

  "ai-integration": {
    overview: [
      "The most capable AI is of little use if it sits in a separate window that nobody opens. The value appears when AI is part of the systems where work already happens: the ERP, the CRM, the document store, the messaging tools and the internal applications.",
      "Integration is where many AI projects stall, because enterprise systems are varied, sometimes old, and rightly protected. It takes careful engineering to give AI the access it needs and no more, and to write results back without disturbing what works.",
      "Tasklyn integrates AI into the environment you have. We do not ask you to replace stable systems. We connect to them, respect their rules and add intelligence at the points where it helps most.",
    ],
    problems: [
      { name: "AI That Lives Outside The Workflow", body: "People must leave their tools to use AI, so they do not. Embedding AI in the existing screen and process puts it where it is used." },
      { name: "Fragmented Data Across Systems", body: "The facts needed for a task are spread over several applications. Integration assembles them so the AI sees the whole picture." },
      { name: "Legacy Systems Without Modern APIs", body: "Older platforms are hard to reach. We use database access, file exchange or thin adapters to connect without rewriting them." },
      { name: "Security And Governance Worries", body: "IT teams rightly fear uncontrolled access. We design permissions, logging and review with your security team from the start." },
    ],
    process: [
      { name: "Inventory Systems And Data", body: "We catalogue the systems, interfaces, data owners and constraints involved in the use case." },
      { name: "Agree Security Requirements", body: "We work with your IT and security teams on access, data residency, logging and approval rules before building." },
      { name: "Design The Integration Pattern", body: "We choose between APIs, events, database access or adapters for each system, and where AI sits in the flow." },
      { name: "Build Connectors And Controls", body: "We implement the connections with scoped credentials, rate limits, retries and full logging." },
      { name: "Integrate In Stages", body: "We start read-only, then move to suggestions a person approves, then to limited automatic action." },
      { name: "Hand Over And Monitor", body: "We document the integration, set up monitoring and train your team to operate it." },
    ],
    deliverables: [
      "Secure connectors to the agreed systems, with documented permissions",
      "An architecture document showing data flows and trust boundaries",
      "AI capabilities embedded in the tools your teams already use",
      "Logging and monitoring of every cross-system action",
      "Rollback and runbook procedures for your IT team",
    ],
    building: [
      { name: "API Connectors", body: "Authenticated, rate-limited connections to modern systems." },
      { name: "Legacy Adapters", body: "Practical bridges to systems without APIs, such as database views and file exchange." },
      { name: "Data Access Layer", body: "A controlled layer that decides what each AI component may read or change." },
      { name: "Workflow Embedding", body: "AI steps placed inside existing screens, emails or chat tools." },
      { name: "Event And Queue Handling", body: "Reliable processing of work as it arrives, with retries and dead-letter handling." },
    ],
    governance: [
      { name: "Scoped Credentials", body: "Each integration uses its own narrow credentials, never a shared administrator account." },
      { name: "Staged Rollout", body: "Read-only first, then approved suggestions, then limited automatic writes." },
      { name: "Audit Logging", body: "Every read and write across systems is recorded." },
      { name: "Rollback", body: "Changes can be reversed, and integrations can be switched off without affecting the host systems." },
    ],
    fit: {
      good: ["Stable core systems you do not want to replace", "A clear workflow where AI would help at a specific step", "IT and security teams willing to agree access rules"],
      notYet: ["No agreed owner for the systems involved", "A plan to replace the core systems within months", "No test environment and no tolerance for staged rollout"],
    },
    faqs: [
      { q: "Do We Have To Replace Our Existing Systems?", a: "No. The aim is to connect to your current ERP, CRM and tools, and add AI where it helps. Replacement is rarely needed and usually not worth the risk." },
      { q: "Is It Safe To Let AI Write To Our ERP?", a: "It can be, with the right design: narrow permissions, validation before every write, a staged rollout beginning with human approval, full logging and the ability to roll back." },
      { q: "Which Systems Can You Connect To?", a: "We work with systems that expose APIs, databases or file exchange. We assess each system during discovery and tell you honestly what is practical." },
    ],
  },

  "data-ml": {
    overview: [
      "Behind almost every successful AI system is unglamorous data work. Models can only be as good as the information they learn from or reason over, and in most organisations that information is scattered, inconsistent and incomplete.",
      "Data engineering builds the pipelines and structures that make data reliable, current and accessible. Machine learning then uses that foundation to forecast, classify and detect patterns that people cannot see by inspection.",
      "Tasklyn starts by assessing the data honestly. If it can support the goal, we build. If it cannot yet, we say so and set out what must change, because a model trained on poor data produces confident errors.",
    ],
    problems: [
      { name: "Data Trapped In Silos", body: "Each department keeps its own version of the truth. Pipelines consolidate and reconcile them into a single trustworthy source." },
      { name: "Poor Data Quality", body: "Duplicates, gaps and inconsistent formats undermine every analysis. Quality checks find and fix problems at the point of entry and in transit." },
      { name: "Decisions Made On Instinct", body: "Forecasts are guesses because the history was never organised. Predictive models turn history into calibrated forecasts." },
      { name: "Models That Decay", body: "A model that was accurate last year drifts as the world changes. Monitoring and retraining keep it honest." },
    ],
    process: [
      { name: "Define The Decision", body: "We agree the specific decision a model or dashboard must improve and how improvement will be measured." },
      { name: "Assess The Data", body: "We profile what exists, what is missing and what is wrong, and report whether it can support the goal." },
      { name: "Build The Pipelines", body: "We implement ingestion, cleaning and transformation with automated quality checks." },
      { name: "Develop And Validate Models", body: "We train candidate models, compare them with a simple baseline and validate on data held out from training." },
      { name: "Deploy Into Use", body: "We put the model where the decision is made, as a service, a report or a step in a workflow." },
      { name: "Monitor And Retrain", body: "We track accuracy and drift in production and retrain when performance slips." },
    ],
    deliverables: [
      "A data assessment report with findings and recommendations",
      "Production data pipelines with automated quality checks",
      "Validated models with documented performance against a baseline",
      "Deployment of the model into the agreed workflow or report",
      "Monitoring for accuracy and drift, with a retraining plan",
    ],
    building: [
      { name: "Ingestion And Integration", body: "Collecting data from databases, files, APIs and applications on a schedule or as it changes." },
      { name: "Transformation And Modelling", body: "Shaping raw data into clean, consistent structures designed for the use case." },
      { name: "Data Quality Controls", body: "Automated tests for completeness, validity and consistency." },
      { name: "Forecasting And Classification", body: "Statistical and machine learning models for prediction and categorisation." },
      { name: "Anomaly Detection", body: "Models that flag unusual behaviour in operations, transactions or sensors." },
    ],
    governance: [
      { name: "Lineage And Documentation", body: "Every dataset records where it came from and how it was changed." },
      { name: "Access Rules", body: "Sensitive data is permissioned, masked or excluded according to your policy." },
      { name: "Honest Validation", body: "Models are compared with a simple baseline on unseen data, and we report where they do not beat it." },
    ],
    fit: {
      good: ["Historical data covering the decision you want to improve", "A repeatable decision that happens often enough to learn from", "Willingness to fix data quality at the source"],
      notYet: ["Too little history to learn anything reliable", "No agreed definition of the outcome to predict", "Data that cannot legally or practically be used"],
    },
    faqs: [
      { q: "Is Our Data Good Enough For AI?", a: "Often it is usable but needs work. A data assessment reveals what is available, what is missing and what must be fixed, so you know before investing in a model." },
      { q: "How Much Data Do We Need?", a: "It depends on the problem. Some tasks need years of history, others only a few hundred good examples. We estimate this during the assessment rather than guessing." },
      { q: "How Do You Know The Model Is Any Good?", a: "We test it on data it has never seen and compare it with a simple baseline. If a simple rule does as well, we tell you." },
    ],
  },

  "ai-consulting": {
    overview: [
      "Most organisations do not lack AI ideas. They lack a clear view of which ideas are worth pursuing, what is feasible with their data and systems, and what order to proceed in. Without that, money goes into pilots that never become useful.",
      "AI consulting provides that clarity. It assesses where AI is likely to pay back, tests feasibility before commitment, ranks opportunities by value and risk, and produces a roadmap you can act on.",
      "Tasklyn's advice is deliberately independent of what we sell. If the best answer is a simpler tool, a data fix or doing nothing yet, we will say so. A consulting engagement ends in written recommendations you can use with us or with anyone else.",
    ],
    problems: [
      { name: "Too Many Ideas, No Priorities", body: "Every team has a wish list. A structured assessment ranks candidates so effort goes where return is likeliest." },
      { name: "Unclear Feasibility", body: "It is hard to know whether the data and systems can support an idea. A short feasibility review answers that before you spend heavily." },
      { name: "Hype And Vendor Pressure", body: "Leaders are pitched constantly. Independent analysis separates what is genuinely useful from what is fashionable." },
      { name: "Pilots That Never Scale", body: "A pilot succeeds in isolation and stalls. A roadmap plans for integration, ownership and operation from the beginning." },
    ],
    process: [
      { name: "Understand Goals And Constraints", body: "We start with a conversation about the business outcomes you want, your budget, timeline, risk appetite and existing technology." },
      { name: "Map Processes And Data", body: "We review key processes and data sources with the people who run them, looking for repetitive, high-cost or error-prone work." },
      { name: "Generate And Screen Opportunities", body: "We list candidate use cases and screen them for value, feasibility and risk." },
      { name: "Test Feasibility", body: "For the strongest candidates we examine the data and run small technical checks to confirm they can work." },
      { name: "Prioritise And Plan", body: "We rank the opportunities and build a phased roadmap with decision points, owners and estimated effort." },
      { name: "Present And Hand Over", body: "We walk your leadership through the findings and hand over the written report, with no obligation to continue with us." },
    ],
    deliverables: [
      "An opportunity assessment covering your key processes",
      "A ranked list of use cases with value, feasibility and risk for each",
      "A feasibility note on the data and systems behind the top candidates",
      "A phased roadmap with owners, effort estimates and decision points",
      "A leadership briefing and written report you can keep",
    ],
    building: [
      { name: "Process Review", body: "Structured conversations and observation of how work is done." },
      { name: "Use-Case Scoring", body: "A transparent method for rating value, feasibility and risk." },
      { name: "Data Assessment", body: "A practical review of what data exists and its readiness." },
      { name: "Architecture Options", body: "Outline designs showing what could be built and with which components." },
      { name: "Roadmapping", body: "A sequenced plan that links early wins to longer-term capability." },
    ],
    governance: [
      { name: "Independence", body: "Recommendations are not tied to any product we sell, and we say plainly when AI is not the right answer." },
      { name: "Evidence Over Enthusiasm", body: "Claims about benefit are tied to your data and processes, not to generic figures." },
      { name: "Responsible AI", body: "We cover privacy, bias, accountability and oversight as part of every recommendation." },
    ],
    fit: {
      good: ["Leaders deciding where to invest in AI", "Organisations with several ideas and no clear order", "Teams that want an independent view before committing budget"],
      notYet: ["A decision already made and only delivery needed: go to AI engineering", "No sponsor able to act on recommendations", "An expectation of guaranteed returns"],
    },
    faqs: [
      { q: "How Do We Start An AI Transformation?", a: "Start with one well-defined business problem, confirm the data and systems it needs, set a measurable goal and build a small working system. Learn from it before widening scope." },
      { q: "Will You Recommend Only Your Own Services?", a: "No. Recommendations are based on what serves your goals, which may be a simpler tool, a data fix or waiting. The report is yours to use with any provider." },
      { q: "How Long Does An Assessment Take?", a: "A focused assessment typically takes a few weeks, depending on how many processes and data sources are in scope. We agree the scope and timeline before starting." },
    ],
  },
};
