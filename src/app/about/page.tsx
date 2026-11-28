import { AboutLanding } from "@/components/about/about-landing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "VULCIRA is a Hawaii-based company sourcing quality Japanese apparel for international markets.",
  path: "/about",
  image: "/lighting/vulcira_layers/about-clean.webp",
});

export default function AboutPage() {
  return <AboutLanding />;
}
