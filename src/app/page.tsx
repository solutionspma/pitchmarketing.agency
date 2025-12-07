import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-pitch-dark to-pitch-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-pitch-gold">Dominate</span> Your
            Market?
          </h2>
          <p className="text-gray-400 mb-8">
            Join hundreds of businesses that trust Pitch Marketing Agency to
            build, scale, and automate their success.
          </p>
          <a
            href="/pricing"
            className="inline-block px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            View Pricing Plans
          </a>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our <span className="text-pitch-gold">Clients</span> Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                "Pitch Marketing completely transformed our online presence.
                Our conversions increased by 300% in just 3 months."
              </p>
              <p className="font-semibold">— Sarah M., CEO</p>
            </div>
            <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                "The Level10 CRM is incredible. It's like having a whole team
                working for you 24/7."
              </p>
              <p className="font-semibold">— Marcus T., Agency Owner</p>
            </div>
            <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">
                "Best print shop I've ever worked with. Fast turnaround,
                amazing quality, and great prices."
              </p>
              <p className="font-semibold">— Jennifer L., Event Planner</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
