// components/InvestorLayout.tsx
import React from "react";
import Link from "next/link";

type InvestorLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function InvestorLayout({
  title,
  subtitle,
  children,
}: InvestorLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-sm font-bold">
              PM
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">
                Pitch Market Strategies
              </span>
              <span className="text-[11px] text-slate-400">
                &amp; Public Relations, LLC
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/investors" className="text-slate-300 hover:text-white">
              Investors
            </Link>
            <Link href="/portfolio" className="text-slate-300 hover:text-white">
              Portfolio
            </Link>
            <Link
              href="/investors/why"
              className="text-slate-300 hover:text-white"
            >
              Why Invest
            </Link>
            <Link
              href="/legal"
              className="text-slate-300 hover:text-white"
            >
              Legal & Structure
            </Link>
            <Link
              href="/investors/founder-message"
              className="rounded-full border border-purple-400/60 px-3 py-1 text-slate-100 hover:bg-purple-500/10"
            >
              Founder's Message
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <section className="mb-10">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </section>

        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Pitch Market Strategies &amp; Public Relations, LLC.</span>
          <div className="flex gap-4">
            <Link href="/legal" className="hover:text-slate-300">
              Investor Terms (Summary)
            </Link>
            <Link
              href="https://sebi.market/invest/start"
              className="hover:text-slate-300"
            >
              SEBI.market Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
