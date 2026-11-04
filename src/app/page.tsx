import { Experience } from "@/components/Experience";
import { ldJson, organizationLd, pageMeta, websiteLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tasklyn AI | AI-Native Product Studio for Enterprise Systems",
  description:
    "Tasklyn AI is an AI-native product studio. We engineer custom enterprise AI systems and build specialised software products for complex business problems.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(websiteLd()) }}
      />
      <Experience />
    </>
  );
}
