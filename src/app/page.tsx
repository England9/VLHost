import { WaitlistLanding } from "@/components/home/waitlist-landing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: undefined,
  description:
    "Global fashion, made accessible. VULCIRA is coming soon — join the waitlist to be the first to know.",
  path: "/",
});

export default function HomePage() {
  return <WaitlistLanding />;
}