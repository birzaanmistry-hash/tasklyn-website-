import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { TERMS, TERMS_INTRO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using tasklyn.in, operated by Tasklyn AI. All rights reserved.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms of use."
      intro={TERMS_INTRO}
      sections={TERMS}
      other={{ label: "Read the privacy policy", href: "/privacy" }}
    />
  );
}
