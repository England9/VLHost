import { WaitlistLanding } from "@/components/home/waitlist-landing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: undefined,
  path: "/",
});

export default function HomePage() {
  return <WaitlistLanding />;
}