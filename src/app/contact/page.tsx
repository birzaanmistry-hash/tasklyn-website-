import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/Button";
import { EmailLink, FounderLine, InstagramLink } from "@/components/ui/ContactBits";
import { ContactForm } from "@/components/ui/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Wrap } from "@/components/ui/Wrap";
import { BOOKING_DETAIL, BOOKING_URL, CONTACT } from "@/lib/content";
import { pageMeta, webPageLd } from "@/lib/seo";

const META = {
  title: "Contact Tasklyn | Talk to Our Enterprise AI Engineering Team",
  description:
    "Talk to Tasklyn about an AI initiative: send a message, book a 45-minute call on Google Meet, or reach the founders by email or phone. Based in Mumbai, India.",
  path: "/contact",
};

export const metadata = pageMeta(META);

export default function ContactPage() {
  return (
    <SiteShell>
      <JsonLd data={webPageLd({ ...META, type: "ContactPage" })} />

      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Talk To Our Team."
        lead="Tell us what you want to build or improve. Whether it is a first AI initiative or an existing system, you will hear back from the people who would engineer it."
      />

      <Wrap className="py-(--space-block)">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          {/* form */}
          <section aria-labelledby="form-h">
            <h2 id="form-h" className="text-h3 text-ink">
              Send Us A Message
            </h2>
            <p className="mt-3 max-w-[52ch] text-body text-muted">We reply within one working day.</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </section>

          {/* direct */}
          <aside aria-label="Other ways to reach us" className="flex flex-col gap-3">
            <div data-tone="dark" className="rounded-panel bg-navy p-7 text-snow md:p-9">
              <CalendarBlank size={28} weight="light" aria-hidden="true" className="text-cyan" />
              <h2 className="mt-6 text-h3 text-snow">Book A Call</h2>
              <p className="mt-3 text-body text-haze">
                Choose a time that suits you. {BOOKING_DETAIL}
              </p>
              <div className="mt-8">
                <Button href={BOOKING_URL} variant="onDark" external>
                  Book A Discovery Call
                </Button>
              </div>
            </div>

            <div className="rounded-panel border border-line p-7 md:p-9">
              <h2 className="text-h4 text-ink">Founders, Direct</h2>
              <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {CONTACT.founders.map((f) => (
                  <FounderLine key={f.name} founder={f} />
                ))}
              </div>

              <div className="mt-8 grid gap-1 border-t border-line pt-6">
                <EmailLink />
                <InstagramLink />
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <p className="text-body text-ink">{CONTACT.city}</p>
                <p className="mt-1 text-small text-muted">{CONTACT.reach}</p>
              </div>
            </div>
          </aside>
        </div>
      </Wrap>
    </SiteShell>
  );
}
