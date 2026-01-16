// app/portfolio/page.tsx
import InvestorLayout from "@/components/InvestorLayout";
import PageSection from "@/components/PageSection";

const groups = [
  {
    title: "Financial & Embedded Payments",
    items: [
      "Level10 Financial",
      "Level10 Bankability Engine",
      "Level10 Credit Engine",
      "Level10 CRM",
      "PayFlex Systems",
      "PayFlex Law",
      "PayFlex Health",
      "ParPay",
    ],
  },
  {
    title: "Telecom & Infrastructure",
    items: ["ModCellular", "ModCellular Mesh", "Modular Chain"],
  },
  {
    title: "Media, Streaming & Creative",
    items: [
      "YouCast Network",
      "YouCast Church",
      "ModTV / MNET",
      "SoulForge",
      "PicPad Studio",
      "BizBord",
    ],
  },
  {
    title: "SaaS & Tools",
    items: [
      "ModPDF",
      "ModOS Menus",
      "MOSM Cloud",
      "ModuRoute",
      "ModCommerce",
      "Express Wholesale Visual Engine",
    ],
  },
  {
    title: "Faith, Education & Community",
    items: ["AmenityChurch", "ReadingSpace", "Bandstand"],
  },
  {
    title: "Brands & Experimental",
    items: ["Metro Stroman Metaverse", "Cholo Chicken", "Al's Boil N Que"],
  },
];

export default function PortfolioPage() {
  return (
    <InvestorLayout
      title="Product & brand portfolio"
      subtitle="A snapshot of Business Units operated under Pitch Market Strategies & Public Relations, LLC."
    >
      <PageSection title="How to read this portfolio" kicker="Overview">
        <p>
          Each Business Unit can receive allocated investor capital and may have
          its own revenue share rate and eligibility for 2× / 3× tiers. Some
          products are optimized for fast revenue recycling, others for longer
          horizon equity events.
        </p>
      </PageSection>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <h2 className="text-sm font-semibold text-slate-100">
              {group.title}
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </InvestorLayout>
  );
}
