import Image from "next/image";
import Link from "next/link";
import { serviceImages } from "@/lib/pexels";

const platforms = [
  {
    name: "Level10 CRM",
    description:
      "All-in-one marketing automation, CRM, and business management platform. Funnels, email, SMS, scheduling, and more.",
    features: [
      "Unlimited Funnels & Landing Pages",
      "Email & SMS Marketing",
      "Appointment Scheduling",
      "Pipeline Management",
      "Reputation Management",
      "White-Label Ready",
    ],
    price: "Starting at $97/mo",
    link: "https://level10crm.com",
    color: "from-blue-600 to-purple-600",
  },
  {
    name: "BeCovered.life",
    description:
      "Modern life insurance platform connecting agents with customers. Automated quoting, e-applications, and commission tracking.",
    features: [
      "Multi-Carrier Quoting",
      "E-Application Processing",
      "Agent Dashboard",
      "Commission Tracking",
      "Lead Management",
      "Customer Portal",
    ],
    price: "Agent Access Free",
    link: "https://becovered.life",
    color: "from-green-600 to-teal-600",
  },
  {
    name: "SaxtaxPro",
    description:
      "Professional tax preparation platform with client management, document collection, and secure file sharing.",
    features: [
      "Client Portal",
      "Document Collection",
      "E-Signature Integration",
      "IRS Transcript Access",
      "Team Collaboration",
      "Automated Reminders",
    ],
    price: "Starting at $49/mo",
    link: "https://saxtaxpro.com",
    color: "from-orange-600 to-red-600",
  },
  {
    name: "Pitch Modular OS",
    description:
      "Modular operating system for building custom business applications. Connect services, automate workflows, and scale.",
    features: [
      "Modular Architecture",
      "API Integrations",
      "Workflow Automation",
      "Custom Dashboards",
      "Multi-Tenant Support",
      "White-Label Ready",
    ],
    price: "Enterprise Pricing",
    link: "/contact",
    color: "from-pitch-gold to-yellow-600",
  },
  {
    name: "YOcreator",
    description:
      "AI-powered content creation platform. Generate videos, images, voice-overs, and marketing content at scale.",
    features: [
      "AI Video Generation",
      "Voice Cloning",
      "Image Generation",
      "Script Writing",
      "Social Media Automation",
      "Brand Voice Training",
    ],
    price: "Starting at $29/mo",
    link: "https://yocreator.ai",
    color: "from-pink-600 to-purple-600",
  },
  {
    name: "Mod Cellular",
    description:
      "Complete telecom management platform. MVNO services, number porting, billing, and customer management.",
    features: [
      "MVNO Dashboard",
      "Number Porting",
      "Billing Management",
      "Customer Portal",
      "Usage Analytics",
      "Multi-Carrier Support",
    ],
    price: "Contact for Pricing",
    link: "/contact",
    color: "from-cyan-600 to-blue-600",
  },
];

export default function PlatformsPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={serviceImages.saas}
            alt="SaaS Platforms"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our <span className="text-pitch-gold">SaaS Platforms</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful software solutions built by Pitch Market Strategies. Each
            platform is designed to solve real business problems and scale with
            your growth.
          </p>
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-pitch-dark rounded-xl overflow-hidden border border-white/10 hover:border-pitch-gold/50 transition-all group"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${platform.color}`}
                ></div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{platform.name}</h3>
                  <p className="text-gray-400 mb-6 min-h-[72px]">
                    {platform.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {platform.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="text-pitch-gold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-pitch-gold font-semibold">
                      {platform.price}
                    </span>
                    <Link
                      href={platform.link}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-pitch-gold hover:text-black transition"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Seamlessly <span className="text-pitch-gold">Integrated</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            All Pitch platforms work together in the Pitch Modular Spaces
            ecosystem. Connect your tools, automate workflows, and manage
            everything from one dashboard.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-pitch-black rounded-xl border border-white/10">
              <div className="text-4xl mb-3">🔗</div>
              <h4 className="font-semibold">API Access</h4>
            </div>
            <div className="p-6 bg-pitch-black rounded-xl border border-white/10">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-semibold">Webhooks</h4>
            </div>
            <div className="p-6 bg-pitch-black rounded-xl border border-white/10">
              <div className="text-4xl mb-3">🔄</div>
              <h4 className="font-semibold">Sync</h4>
            </div>
            <div className="p-6 bg-pitch-black rounded-xl border border-white/10">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold">Analytics</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-pitch-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a <span className="text-pitch-gold">Custom Platform</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            We build custom SaaS solutions for businesses of all sizes. Let&apos;s
            discuss your project.
          </p>
          <a
            href="mailto:solutions@pitchmarketing.agency"
            className="inline-block px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Contact Solutions Team
          </a>
        </div>
      </section>
    </main>
  );
}
