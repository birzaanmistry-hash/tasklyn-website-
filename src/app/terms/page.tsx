import { pageMeta } from "@/lib/seo";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { TERMS, TERMS_INTRO } from "@/lib/legal";

export const metadata = pageMeta({
  title: "Terms of Use | Tasklyn AI: Rules for Using This Website",
  description:
    "The terms for using tasklyn.in, operated by Tasklyn AI in Mumbai, India: what the site is, intellectual property, acceptable use, liability and governing law.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDoc
      crumb="Terms of use"
      path="/terms"
      title="Terms of use."
      intro={TERMS_INTRO}
      sections={TERMS}
      other={{ label: "Read the privacy policy", href: "/privacy" }}
    />
  );
}
