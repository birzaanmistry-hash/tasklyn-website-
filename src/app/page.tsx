import { Experience } from "@/components/Experience";
import { ldJson, organizationLd, pageMeta, websiteLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tasklyn AI | Custom AI Systems for Your Business Operations",
  description:
    "Tasklyn AI builds custom AI systems that handle the repetitive work inside your business, from customer replies to operations. Based in Mumbai, India.",
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
