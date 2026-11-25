import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#ded8d1] px-6 text-center text-[#1a1a1a]">
      <p className="text-[10px] tracking-[0.35em]">404</p>
      <h1 className="mt-4 font-landing text-3xl">Page not found</h1>
      <Link
        href="/"
        className="mt-8 inline-block min-h-11 px-6 py-3 text-[10px] tracking-[0.28em] bg-[#1a1a1a] text-white"
      >
        BACK TO HOME
      </Link>
    </main>
  );
}