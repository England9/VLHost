import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="container-luxury text-center max-w-lg">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          404
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground">
          Page Not Found
        </h1>
        <p className="mt-4 text-foreground-muted leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
