// app/investors/why/page.tsx
import InvestorLayout from "@/components/InvestorLayout";
import PageSection from "@/components/PageSection";
import Link from "next/link";

export default function WhyInvestPage() {
  return (
    <InvestorLayout
      title="Why invest in Pitch Market Strategies?"
      subtitle="Because you're not betting on a single app. You're backing an operator with a modular engine that can keep launching and iterating."
    >
      <PageSection title="A modular, multi-vertical portfolio" kicker="Thesis">
        <p className="mb-3">
          Pitch Market Strategies is a holding company and studio that builds
          and operates products across:
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>Fintech &amp; embedded payments (Level10, PayFlex, ParPay)</li>
          <li>Telecom &amp; DePIN (ModCellular, Modular Chain)</li>
          <li>Media &amp; streaming (YouCast, ModTV / MNET)</li>
          <li>Creative tools (ModPDF, PicPad Studio, ModOS Menus)</li>
          <li>Faith, education, and community platforms (AmenityChurch, ReadingSpace)</li>
        </ul>
        <p>
          That spread is intentional. Instead of hoping one product hits, we are
          constantly building, testing, and scaling several – sharing
          infrastructure and brand power between them.
        </p>
      </PageSection>

      <PageSection title="The 2× / 3× hybrid return profile" kicker="Returns">
        <p className="mb-3">
          We blended the best of revenue-based financing and traditional equity.
        </p>
        <ul className="mb-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">Revenue share now:</span> you get
            paid a percentage of revenue from the Business Units you back.
          </li>
          <li>
            <span className="font-semibold">Repayment cap:</span> you choose a
            2× or 3× cap when you invest. Once you hit that cap in payouts,
            revenue share stops.
          </li>
          <li>
            <span className="font-semibold">Equity optionality:</span> if and
            when a Business Unit spins out into its own company, you can elect
            to convert into equity under pre-defined terms.
          </li>
        </ul>
        <p className="text-sm text-slate-400">
          Short version: you don't have to wait ten years for some hypothetical
          exit before seeing cash flow.
        </p>
      </PageSection>

      <PageSection title="Control where your capital goes" kicker="Choice">
        <p className="mb-3">
          You're not throwing money into a black box "fund." Within the Pitch
          Market structure, you can express preferences:
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>Fintech-heavy allocation</li>
          <li>Media/streaming tilt</li>
          <li>Creative tools exposure</li>
          <li>Faith- and community-focused projects</li>
        </ul>
        <p>
          Pitch Market steers the ship, but you get a say in which Business
          Units your capital supports.
        </p>
      </PageSection>

      <PageSection title="How to move forward" kicker="Next Step">
        <p className="mb-3">
          Step 1: Review the{" "}
          <Link href="/legal" className="text-purple-300 hover:text-purple-200">
            Legal & Structure summary
          </Link>
          .<br />
          Step 2: Read the{" "}
          <Link
            href="/investors/founder-message"
            className="text-purple-300 hover:text-purple-200"
          >
            Founder's message
          </Link>{" "}
          for tone and intent.<br />
          Step 3: Begin onboarding through our investor portal.
        </p>
        <Link
          href="https://sebi.market/invest/start"
          className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1.5 text-sm font-semibold text-slate-950 hover:bg-purple-400"
        >
          Open investor onboarding
        </Link>
      </PageSection>
    </InvestorLayout>
  );
}
