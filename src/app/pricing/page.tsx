import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent <span className="text-pitch-gold">Pricing</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your business. All plans include full
          platform access, priority support, and no hidden fees.
        </p>
      </div>

      <PricingTable />

      {/* Features Comparison */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          All Plans Include
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Unlimited Projects",
            "Client Portal Access",
            "Stripe Integration",
            "Custom Branding",
            "Email Support",
            "Knowledge Base",
            "API Access",
            "Webhook Events",
            "SSL Security",
            "Daily Backups",
            "99.9% Uptime",
            "No Setup Fees",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <span className="text-pitch-gold">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-400">
              Yes, you can cancel your subscription at any time. No questions
              asked, no hidden fees.
            </p>
          </div>

          <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">
              Do you offer custom enterprise plans?
            </h3>
            <p className="text-gray-400">
              Absolutely. Contact us for custom pricing on large teams and
              special requirements.
            </p>
          </div>

          <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-400">
              We accept all major credit cards, Apple Pay, Google Pay, and ACH
              bank transfers through Stripe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
