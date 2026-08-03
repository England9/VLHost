import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { Newsletter } from "@/components/sections/newsletter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMetadata, JsonLd, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with VULCIRA. Visit our Madison Avenue flagship, contact our concierge team, or explore our frequently asked questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="container-luxury pb-6">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          Concierge
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground">
          Contact
        </h1>
        <p className="mt-4 text-foreground-muted max-w-2xl leading-relaxed">
          Our concierge team is available to assist with orders, appointments,
          and any inquiries about the VULCIRA world.
        </p>
      </section>

      <section className="container-luxury section-padding pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ContactForm />

          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-6">
                Visit Us
              </h2>
              <address className="not-italic text-foreground-muted leading-relaxed space-y-1">
                <p className="text-foreground font-display text-lg">
                  VULCIRA Flagship
                </p>
                <p>{SITE_CONFIG.address.street}</p>
                <p>
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                  {SITE_CONFIG.address.zip}
                </p>
                <p className="pt-4">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </address>
              <p className="mt-4 text-sm text-foreground-muted">
                Monday – Saturday, 10am – 7pm
                <br />
                Sunday, 12pm – 6pm
              </p>
            </div>

            <div id="faq">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Newsletter variant="inline" />
    </>
  );
}
