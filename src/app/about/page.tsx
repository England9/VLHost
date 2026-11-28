import Link from "next/link";
import { SkipIntro } from "@/components/brand/skip-intro";
import { SiteNav } from "@/components/brand/site-nav";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "VULCIRA — global fashion made accessible. About the house.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SkipIntro />
      <div className="relative flex min-h-[100dvh] flex-col bg-[#ded8d1] text-[#1a1a1a]">
        <header className="relative z-20 border-b border-[#1a1a1a]/10 px-6 pt-6 pb-6 md:px-10 md:pt-8 lg:px-14">
          <Link
            href="/"
            className="font-landing inline-block py-2 text-sm tracking-[0.55em] text-[#1a1a1a] md:text-base"
          >
            V U L C I R A
          </Link>
          <SiteNav tone="dark" />
        </header>
        <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-20 md:px-10">
          <p className="text-[10px] tracking-[0.35em] text-[#1a1a1a]/70">
            ABOUT
          </p>
          <h1 className="font-editorial mt-6 text-3xl font-normal leading-tight text-[#1a1a1a] md:text-4xl">
            Global fashion, made accessible.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-[#1a1a1a]/75">
            VULCIRA is building a house for considered pieces and long-term
            partnerships. Full story coming soon.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex h-12 min-h-12 w-fit items-center bg-[#1a1a1a] px-8 text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-90"
          >
            CONTACT
          </Link>
        </main>
      </div>
    </>
  );
}