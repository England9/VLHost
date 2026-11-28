import { ContactLanding } from "@/components/contact/contact-landing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Business inquiries, partnerships, and wholesale — contact VULCIRA.",
  path: "/contact",
  image: "/lighting/vulcira_layers/contact-clean.webp",
});

export default function ContactPage() {
  return <ContactLanding />;
}
