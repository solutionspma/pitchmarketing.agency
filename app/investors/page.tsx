// app/investors/page.tsx
import Link from "next/link";
import InvestorLayout from "@/components/InvestorLayout";
import PageSection from "@/components/PageSection";

const products = [
  { name: "ModPDF", tag: "SaaS · Document Editing" },
  { name: "PicPad Studio", tag: "AI Creative Studio" },
  { name: "ModOS Menus", tag: "Digital Signage" },
  { name: "MOSM Cloud", tag: "Content Delivery" },
  { name: "Level10 Financial", tag: "Financial Platform" },
  { name: "PayFlex Systems", tag: "Embedded Payments" },
  { name: "ModCellular", tag: "Telecom & DePIN" },
  { name: "YouCast Network", tag: "Streaming & Media" },
];

export default function InvestorsPage() {
  return (
    <InvestorLayout
      title="Invest in a multi-product, modular ecosystem."
      subtitle="Pitch Market Strategies owns a growing portfolio of telecom, fintech, media, and SaaS products. Investors participate in revenue now and equity upside later through a hybrid 2× / 3× model."
    >
      <PageSection title="How the hybrid model works" kicker="Investment Model">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">You invest in Pitch Market Strategies, LLC</span> – the parent company that owns 30+ products and brands.
          </li>
          <li>
            Your capital is <span className="font-semibold">allocated to one or more Business Units</span> (ModPDF, Level10, ModCellular, YouCast, etc.).
          </li>
          <li>
            You choose an <span className="font-semibold">investment tier</span>:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">Standard Tier (2×)</span> – higher revenue share, lower repayment multiple, faster recycle of capital.
              </li>
              <li>
                <span className="font-semibold">Growth Tier (3×)</span> – lower revenue share, higher upside, better fit for long-arc platforms like Level10 or ModCellular.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">You receive quarterly revenue share</span> from the products you back until your total payouts reach the selected cap (2× or 3×).
          </li>
          <li>
            If a Business Unit spins out into its own company,{" "}
            <span className="font-semibold">
              you may convert your position into equity
            </span>{" "}
            in that new entity under pre-defined terms.
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
          <Link
            href="/investors/why"
            className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 hover:border-purple-400 hover:text-purple-200"
          >
            Why this model works →
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 hover:border-purple-400 hover:text-purple-200"
          >
            View product portfolio →
          </Link>
          <Link
            href="https://sebi.market/invest/start"
            className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1.5 font-semibold text-slate-950 hover:bg-purple-400"
          >
            Start investor onboarding
          </Link>
        </div>
      </PageSection>

      <PageSection title="What you're actually investing in" kicker="Parent Company">
        <p className="mb-3">
          Investors are not buying into a single app. You are joining a{" "}
          <span className="font-semibold">
            modular studio that builds, owns, and operates multiple products
          </span>{" "}
          across media, telecom, fintech, and creative tools – all under the
          Pitch Market Strategies &amp; Public Relations, LLC umbrella.
        </p>
        <p>
          That structure gives you:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Diversified exposure across several verticals.</li>
          <li>Access to spin-offs and future brand exits.</li>
          <li>A founder who actually ships products – not just decks.</li>
        </ul>
      </PageSection>

      <PageSection title="Sample of our portfolio" kicker="Portfolio Snapshot">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-sm"
            >
              <div className="text-slate-100">{p.name}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {p.tag}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-400">
          This is a partial list. A full breakdown of Business Units and
          investment eligibility is available on the{" "}
          <Link href="/portfolio" className="text-purple-300 hover:text-purple-200">
            Portfolio
          </Link>{" "}
          page.
        </div>
      </PageSection>

      <PageSection title="Ready to talk numbers?" kicker="Next Step">
        <p className="mb-3">
          If you're serious about backing a builder and not just a slide deck,
          the next step is to review the{" "}
          <Link href="/legal" className="text-purple-300 hover:text-purple-200">
            Legal & Structure summary
          </Link>{" "}
          and then start onboarding through our investor portal.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <Link
            href="https://sebi.market/invest/start"
            className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1.5 font-semibold text-slate-950 hover:bg-purple-400"
          >
            Go to investor onboarding
          </Link>
          <Link
            href="/investors/founder-message"
            className="inline-flex items-center rounded-full border border-slate-700 px-4 py-1.5 hover:border-purple-300"
          >
            Read the Founder's message
          </Link>
        </div>
      </PageSection>
    </InvestorLayout>
  );
}
