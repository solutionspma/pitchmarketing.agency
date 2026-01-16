// app/legal/page.tsx
import InvestorLayout from "@/components/InvestorLayout";
import PageSection from "@/components/PageSection";
import Link from "next/link";

export default function LegalPage() {
  return (
    <InvestorLayout
      title="Investor terms & structure (summary)"
      subtitle="This page summarizes how investments into Pitch Market Strategies & Public Relations, LLC are structured. Full agreements are provided during onboarding."
    >
      <PageSection title="Parent entity" kicker="Company">
        <p className="mb-2">
          All investments are made into{" "}
          <span className="font-semibold">
            Pitch Market Strategies &amp; Public Relations, LLC
          </span>
          , which owns the intellectual property, brands, and revenue for each
          Business Unit until any formal spin-off.
        </p>
        <p className="text-sm text-slate-400">
          You are not investing in SEBI.market, or in a single app – you are
          investing in the parent company, with allocations directed toward
          specific Business Units.
        </p>
      </PageSection>

      <PageSection title="Hybrid model: revenue share + equity optionality" kicker="Structure">
        <ul className="mb-3 list-disc space-y-2 pl-5">
          <li>
            Investments are structured through{" "}
            <span className="font-semibold">Class B non-voting units</span> in
            Pitch Market.
          </li>
          <li>
            Investors choose a{" "}
            <span className="font-semibold">2× or 3× repayment cap</span> at the
            time of investment, subject to Business Unit eligibility.
          </li>
          <li>
            A portion of revenue from the selected Business Units is paid out
            quarterly until the total returned to the investor meets the chosen
            cap.
          </li>
          <li>
            If a Business Unit is spun out into its own company, investors may
            elect to convert into equity of that new entity under predefined
            terms.
          </li>
        </ul>
      </PageSection>

      <PageSection title="Control & governance" kicker="Founder Control">
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>
            Founder holds{" "}
            <span className="font-semibold">Class A voting control</span>.
          </li>
          <li>Class B units are economic only (no voting rights).</li>
          <li>
            Capital allocation within the overall Pitch Market ecosystem is
            managed by the founder and leadership team.
          </li>
        </ul>
      </PageSection>

      <PageSection title="Documents & next steps" kicker="Process">
        <p className="mb-3">
          During onboarding, you will be provided with:
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>Master Hybrid Investment Agreement (Pitch Market Strategies & Public Relations, LLC)</li>
          <li>
            Product-specific Business Unit Appendices for the areas you choose
            to back
          </li>
          <li>Risk disclosures and acknowledgements</li>
        </ul>
        <p className="mb-3">
          Those documents are generated and signed through our investor portal
          at{" "}
          <Link
            href="https://sebi.market"
            className="text-purple-300 hover:text-purple-200"
          >
            SEBI.market
          </Link>
          .
        </p>
        <Link
          href="https://sebi.market/invest/start"
          className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1.5 text-sm font-semibold text-slate-950 hover:bg-purple-400"
        >
          Begin onboarding
        </Link>
      </PageSection>
    </InvestorLayout>
  );
}
