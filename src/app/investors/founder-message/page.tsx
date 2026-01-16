// app/investors/founder-message/page.tsx
import InvestorLayout from "@/components/InvestorLayout";
import PageSection from "@/components/PageSection";
import Link from "next/link";

export default function FounderMessagePage() {
  return (
    <InvestorLayout
      title="A note from the founder"
      subtitle="This isn't theory. This is a builder who's been in the trenches, turning setbacks into infrastructure."
    >
      <PageSection title="Straight up." kicker="Tone">
        <p className="mb-3">
          I'm not a trust-fund founder and this is not a sanitized pitch from
          somebody who's never missed a bill. I'm Jason Harris, and I've been
          building media, marketing, and financial products out of real-world
          pressure – not venture-backed fantasy land.
        </p>
        <p className="mb-3">
          Pitch Market Strategies &amp; Public Relations, LLC is the container
          for everything I've been architecting: from insurance and financial
          systems to creative tools, telecom infrastructure, and streaming
          networks. It's messy, it's ambitious, and it's real.
        </p>
      </PageSection>

      <PageSection title="What I'm doing with your capital" kicker="Intent">
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>
            Deploying into products that already have motion, not ideas sitting
            in a notebook.
          </li>
          <li>
            Building systems that generate recurring revenue first,{" "}
            <span className="font-semibold">then</span> chasing moonshots.
          </li>
          <li>
            Using infrastructure like SEBI.market to keep reporting and
            investor visibility tight.
          </li>
        </ul>
        <p>
          I'm not promising perfection. I'm promising work, iteration, and
          transparency.
        </p>
      </PageSection>

      <PageSection title="How I want this relationship to feel" kicker="Relationship">
        <p className="mb-3">
          You are not just a check. You're buying into the modular engine that
          lets me and my team keep shipping. I want you to:
        </p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          <li>Know exactly how your capital is structured.</li>
          <li>See your progress without chasing me down.</li>
          <li>
            Have the option for upside when we spin something out or sell it.
          </li>
        </ul>
        <p>
          If that aligns with how you move, then let's get you onboarded and
          start doing actual work.
        </p>
      </PageSection>

      <PageSection title="Next move" kicker="Action">
        <p className="mb-3">
          If you've read this far, you're serious enough to at least review the
          deal structure.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/legal"
            className="inline-flex items-center rounded-full border border-slate-700 px-4 py-1.5 hover:border-purple-300"
          >
            Review terms & structure
          </Link>
          <Link
            href="https://sebi.market/invest/start"
            className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1.5 font-semibold text-slate-950 hover:bg-purple-400"
          >
            Begin investor onboarding
          </Link>
        </div>
      </PageSection>
    </InvestorLayout>
  );
}
