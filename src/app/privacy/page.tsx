import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { PRIVACY, PRIVACY_INTRO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information Tasklyn AI receives through tasklyn.in, what we do with it, and your rights over it.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy policy."
      intro={PRIVACY_INTRO}
      sections={PRIVACY}
      other={{ label: "Read the terms of use", href: "/terms" }}
    />
  );
}
