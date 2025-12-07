import Image from "next/image";
import Link from "next/link";
import { serviceImages } from "@/lib/pexels";

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={serviceImages.teamwork}
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Let&apos;s <span className="text-pitch-gold">Connect</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to build something amazing? Reach out to our team and let&apos;s
            discuss your project.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* General Inquiries */}
            <div className="bg-pitch-dark p-8 rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-pitch-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
              <p className="text-gray-400 mb-4">
                Questions about our services or want to say hello?
              </p>
              <a
                href="mailto:helloworld@pitchmarketing.agency"
                className="text-pitch-gold hover:underline"
              >
                helloworld@pitchmarketing.agency
              </a>
            </div>

            {/* Business Solutions */}
            <div className="bg-pitch-dark p-8 rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-pitch-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Business Solutions</h3>
              <p className="text-gray-400 mb-4">
                Enterprise projects, partnerships, and custom solutions.
              </p>
              <a
                href="mailto:solutions@pitchmarketing.agency"
                className="text-pitch-gold hover:underline"
              >
                solutions@pitchmarketing.agency
              </a>
            </div>

            {/* Support */}
            <div className="bg-pitch-dark p-8 rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-pitch-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎧</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Client Support</h3>
              <p className="text-gray-400 mb-4">
                Existing clients needing help with their projects.
              </p>
              <Link
                href="/dashboard/support"
                className="text-pitch-gold hover:underline"
              >
                Open Support Ticket
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-pitch-dark p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interested In
                  </label>
                  <select className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none">
                    <option value="">Select a service...</option>
                    <option value="web">Website Development</option>
                    <option value="video">Commercial Production</option>
                    <option value="music">Music Production</option>
                    <option value="ai">AI Services</option>
                    <option value="marketing">Marketing & Campaigns</option>
                    <option value="saas">SaaS Development</option>
                    <option value="branding">Branding & Design</option>
                    <option value="print">Print Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none">
                    <option value="">Select budget...</option>
                    <option value="1k">Under $1,000</option>
                    <option value="5k">$1,000 - $5,000</option>
                    <option value="10k">$5,000 - $10,000</option>
                    <option value="25k">$10,000 - $25,000</option>
                    <option value="50k">$25,000 - $50,000</option>
                    <option value="100k">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-pitch-black border border-white/20 rounded-lg focus:border-pitch-gold focus:outline-none resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pitch Market Strategies &{" "}
              <span className="text-pitch-gold">Public Relations, LLC</span>
            </h2>
            <p className="text-gray-400">Full-Service Creative & Technology Agency</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-pitch-black p-6 rounded-xl border border-white/10">
              <h4 className="font-semibold mb-4 text-pitch-gold">
                Service Hours
              </h4>
              <p className="text-gray-300">Monday - Friday: 9am - 6pm CST</p>
              <p className="text-gray-300">Saturday: 10am - 2pm CST</p>
              <p className="text-gray-300">Sunday: Closed</p>
              <p className="text-gray-400 text-sm mt-4">
                * Support tickets monitored 24/7
              </p>
            </div>

            <div className="bg-pitch-black p-6 rounded-xl border border-white/10">
              <h4 className="font-semibold mb-4 text-pitch-gold">
                Connect With Us
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pitch-gold hover:text-black transition"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pitch-gold hover:text-black transition"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pitch-gold hover:text-black transition"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pitch-gold hover:text-black transition"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
