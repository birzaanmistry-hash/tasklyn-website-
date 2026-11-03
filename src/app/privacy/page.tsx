import { pageMeta } from "@/lib/seo";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { PRIVACY, PRIVACY_INTRO } from "@/lib/legal";

export const metadata = pageMeta({
  title: "Privacy Policy | Tasklyn AI: How We Handle Your Information",
  description:
    "How Tasklyn AI handles personal information on tasklyn.in: no cookies, no analytics, what we receive, who processes it, how long we keep it and your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDoc
      crumb="Privacy policy"
      path="/privacy"
      title="Privacy policy."
      intro={PRIVACY_INTRO}
      sections={PRIVACY}
      other={{ label: "Read the terms of use", href: "/terms" }}
    />
  );
}
