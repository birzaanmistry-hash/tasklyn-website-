import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SiteShell, Wrap } from "@/components/SiteShell";
import { BookBand } from "@/components/ui/CtaBand";
import { ContactForm } from "@/components/sections/ContactForm";
import { EmailLink, InstagramLink, FounderLine } from "@/components/ui/ContactBits";
import { CONTACT } from "@/lib/content";

export const metadata = pageMeta({
  title: "Contact Tasklyn AI | Book a 45-Minute AI Discovery Call",
  description:
    "Contact Tasklyn AI by email or phone, or book a 45-minute discovery call on Google Meet. Tell us which function costs your team the most hours. Mumbai, India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="pt-36 md:pt-44">
        <Wrap>
          <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
          <h1 className="t-display mt-6 max-w-[16ch]">
            Tell us what is
            <br />
            <span className="text-[color:var(--color-accent)]">taking the time.</span>
          </h1>
        </Wrap>
      </section>

      <section className="pt-16 md:pt-20">
        <Wrap>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
            {/* Left: how to reach us */}
            <div>
              <div className="border-t border-[color:var(--color-line)] pt-7">
                <p className="t-tech">Email</p>
                <div className="mt-3 text-[1rem]">
                  <EmailLink />
                </div>
              </div>

              <div className="mt-9 border-t border-[color:var(--color-line)] pt-7">
                <p className="t-tech">Founders, direct</p>
                <div className="mt-5 space-y-7">
                  {CONTACT.founders.map((f) => (
                    <FounderLine key={f.name} founder={f} />
                  ))}
                </div>
              </div>

              <div className="mt-9 border-t border-[color:var(--color-line)] pt-7">
                <p className="t-tech">Where we are</p>
                <p className="mt-3 text-[1rem] text-[color:var(--color-ink)]">{CONTACT.city}</p>
                <p className="mt-1 text-[0.9375rem] text-[color:var(--color-muted)]">
                  {CONTACT.reach}
                </p>
              </div>

              <div className="mt-9 border-t border-[color:var(--color-line)] pt-7">
                <p className="t-tech">Instagram</p>
                <div className="mt-3 text-[1rem]">
                  <InstagramLink />
                </div>
              </div>
            </div>

            {/* Right: the form. On a hairline, like everything else, rather
                than in a raised panel. */}
            <div className="border-t border-[color:var(--color-line)] pt-7">
              <p className="t-tech">Send us the problem</p>
              <h2 className="mt-3 text-[1.375rem] font-medium tracking-[-0.03em]">
                One function, in your own words.
              </h2>
              <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[color:var(--color-muted)]">
                We reply within one working day.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <div className="pt-24 md:pt-32">
        <BookBand />
      </div>
    </SiteShell>
  );
}
