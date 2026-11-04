/**
 * Legal copy.
 *
 * Every factual claim in the privacy policy was checked against the code before
 * it was written: the site sets no cookies, uses no browser storage, loads no
 * analytics or advertising scripts, makes no outbound requests from its own
 * code, and self-hosts its fonts. The contact form composes a mailto and posts
 * nothing. If any of that changes, this file has to change with it.
 */

export const LEGAL = {
  name: "Tasklyn AI",
  site: "tasklyn.in",
  updated: "5 November 2026",
  rights: "All rights reserved.",
};

export type LegalBlock = { p: string } | { ul: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

/* ------------------------------------------------------------------ */
/*  privacy policy                                                     */
/* ------------------------------------------------------------------ */

export const PRIVACY_INTRO =
  "This page explains what information Tasklyn AI receives when you use this website or get in touch with us, what we do with it, and what you can ask us to do about it.";

export const PRIVACY: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      {
        p: "This website, tasklyn.in, is operated by Tasklyn AI (\"Tasklyn\", \"we\", \"us\"), based in Mumbai, India. For anything in this policy, write to tasklynai@gmail.com.",
      },
      {
        p: "This policy covers the website and the ways you can contact us through it. It does not cover the work we do for clients. That work is governed by the written agreement we sign with each client.",
      },
    ],
  },
  {
    id: "what-the-site-does-not-do",
    title: "What this website does not do",
    blocks: [
      {
        ul: [
          "It sets no cookies.",
          "It does not use browser storage to remember you between visits.",
          "It runs no analytics, advertising or tracking scripts.",
          "It has no accounts, passwords or payments.",
          "It loads its fonts from our own server, not from a third-party font service.",
        ],
      },
    ],
  },
  {
    id: "what-we-receive",
    title: "What we do receive",
    blocks: [
      {
        p: "Hosting records. When you load a page, our host, Vercel, automatically records technical details of the request: your IP address, browser and device type, the page you asked for, and the time. Every website does this to deliver its pages. We use these records to keep the site running and secure, and we do not combine them with other information to identify or profile you.",
      },
      {
        p: "The contact form. The form on the Contact page does not send anything to our servers. When you press Send message, it opens a draft email in your own mail app, addressed to us. Nothing reaches us until you send that email. If you do, we receive what you wrote, your email address, and the usual details your email provider attaches.",
      },
      {
        p: "Booking a call. The Discuss a requirement buttons open a Google Calendar booking page in a new tab. That page is run by Google. What you enter there, such as your name, email address and any note you add, is collected by Google and passed to us so we can hold the meeting. Google's own privacy policy applies on that page.",
      },
      {
        p: "Expressing interest in a product. The Express interest links on the Products page open a draft email in your own mail app, addressed to us. As with the contact form, nothing reaches us until you send that email.",
      },
      {
        p: "Email, phone and Instagram. If you email or call the founders, or message us on Instagram, we receive what you send and the contact details attached to it.",
      },
    ],
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    blocks: [
      {
        p: "We use your details only for the purpose you gave them: to reply to you, to hold the call you booked, and to follow up on what you asked about. We do not use them for anything unrelated, and we do not add you to a mailing list without asking.",
      },
      {
        p: "We process your information because you gave it to us for that purpose, which is your consent, and, for hosting records, because we need them to deliver and protect the site. You can withdraw your consent at any time, as described under Your rights.",
      },
    ],
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    blocks: [
      {
        p: "We do not sell your information and we do not share it for advertising.",
      },
      {
        p: "We use a small number of services to run the business, and your information passes through them. Vercel hosts the website. Google provides our email, calendar, meetings and booking page. Meta provides Instagram, if you contact us there. Each processes information on our behalf under its own terms.",
      },
      {
        p: "We may also disclose information where the law requires it, or where it is needed to establish or defend a legal claim.",
      },
    ],
  },
  {
    id: "outside-india",
    title: "Where it is processed",
    blocks: [
      {
        p: "Vercel, Google and Meta run infrastructure in several countries, so your information may be processed outside India. We use established providers and rely on their security commitments.",
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    blocks: [
      {
        p: "We keep enquiry emails and booking records for up to 24 months after our last contact with you, then delete them. If we go on to work together, the client agreement sets the period instead. We keep information for longer only where the law requires us to.",
      },
      {
        p: "Hosting records are kept by Vercel under its own retention practices.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    blocks: [
      {
        p: "Pages are served over HTTPS. Access to our email and calendar accounts is limited to the people who need it. No system is completely secure, so we cannot promise absolute security, but we take reasonable steps to protect what you send us.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      { p: "You can ask us to:" },
      {
        ul: [
          "tell you what information we hold about you,",
          "correct anything that is wrong or out of date,",
          "delete your information,",
          "stop using your information where you gave it by consent, and",
          "nominate someone to exercise these rights on your behalf.",
        ],
      },
      {
        p: "Write to tasklynai@gmail.com from the address you used with us. We will reply as soon as we can and within 30 days. We may ask you to confirm who you are before we act on a request.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        p: "This website is for businesses and is not directed at anyone under 18. We do not knowingly collect information from children. If you believe a child has sent us information, write to us and we will delete it.",
      },
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    blocks: [
      {
        p: "If you have a complaint about how we handle your information, write to the founders at tasklynai@gmail.com with Privacy complaint in the subject line. We will acknowledge it and respond within 30 days.",
      },
      {
        p: "If you are not satisfied with our response, you may complain to the Data Protection Board of India, or to any other authority that has jurisdiction over the matter.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        p: "When our practices change, we will update this page and revise the date at the top. We will note any significant change on this page.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  terms of use                                                       */
/* ------------------------------------------------------------------ */

export const TERMS_INTRO =
  "These terms govern your use of tasklyn.in. They are short on purpose. Please read them before you use the site.";

export const TERMS: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    blocks: [
      {
        p: "By using tasklyn.in you agree to these terms. If you do not agree, please do not use the site. The site is operated by Tasklyn AI, Mumbai, India.",
      },
    ],
  },
  {
    id: "about-the-site",
    title: "About this site",
    blocks: [
      {
        p: "The site describes what Tasklyn builds. It is for general information. Nothing on it is a binding offer, a quotation, or advice for your particular business.",
      },
      {
        p: "Descriptions of systems and how they work show what we build. They are not a promise of a specific result for you. What a system can do for a business depends on that business, and we scope it with you before we build anything.",
      },
      {
        p: "Products described on the site are at the stage shown beside them. Unless a product is marked Available, it is not for sale, and its description is not a commitment to build, release or deliver it, on any timeline.",
      },
    ],
  },
  {
    id: "booking-a-call",
    title: "Booking a call or contacting us",
    blocks: [
      {
        p: "Booking a discovery call, or sending us a message, does not create a client relationship and does not oblige either of us to work together.",
      },
      {
        p: "We only agree to do work in a written agreement signed by both sides. That agreement sets out the scope, price, timeline, ownership and confidentiality for that work. Where it conflicts with these terms, the agreement prevails for that work.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    blocks: [
      {
        p: "© Tasklyn AI. All rights reserved.",
      },
      {
        p: "The Tasklyn name, logo and mark, and the website's design, code, copy, graphics and animation, including the 3D Core, belong to Tasklyn AI or are used with permission.",
      },
      {
        p: "You may view the site and share a link to it. You may not copy, reproduce, scrape, republish, modify, sell or build on any part of it without our prior written permission. Any other names or marks mentioned on the site belong to their owners.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    blocks: [
      { p: "You agree not to:" },
      {
        ul: [
          "interfere with the site or try to gain unauthorised access to it or to our systems,",
          "use automated tools to collect content from the site in bulk,",
          "send us unlawful, abusive or misleading messages, or",
          "use the site to impersonate Tasklyn or anyone else.",
        ],
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Third-party services and links",
    blocks: [
      {
        p: "The site links to services we do not run, including the Google Calendar booking page and Instagram. They are governed by their own terms and privacy policies, and we are not responsible for them.",
      },
    ],
  },
  {
    id: "availability",
    title: "Availability",
    blocks: [
      {
        p: "We try to keep the site available, but we do not guarantee that it will be uninterrupted or error-free. We may change or withdraw any part of it without notice.",
      },
    ],
  },
  {
    id: "no-warranties",
    title: "No warranties",
    blocks: [
      {
        p: "The site is provided as is and as available. To the fullest extent permitted by law, we give no warranties, express or implied, about its accuracy, completeness or fitness for a particular purpose.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    blocks: [
      {
        p: "To the fullest extent permitted by law, Tasklyn AI is not liable for any indirect or consequential loss, or for loss of profit, revenue, data or goodwill, arising from your use of the site or your reliance on its content.",
      },
      {
        p: "Nothing in these terms excludes or limits liability that cannot be excluded or limited by law.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        p: "How we handle personal information is described in our Privacy Policy, which forms part of these terms.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    blocks: [
      {
        p: "These terms are governed by the laws of India. The courts at Mumbai have exclusive jurisdiction over any dispute arising from them or from your use of the site.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    blocks: [
      {
        p: "We may update these terms. The date at the top shows when they were last changed. If you keep using the site after a change, you accept the updated terms.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    blocks: [
      {
        p: "Questions about these terms can be sent to tasklynai@gmail.com.",
      },
    ],
  },
];
