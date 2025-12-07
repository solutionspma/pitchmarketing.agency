import Image from "next/image";
import Link from "next/link";
import { serviceImages } from "@/lib/pexels";

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={serviceImages.hero}
            alt="Services Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Full-Service <span className="text-pitch-gold">Creative</span> &{" "}
            <span className="text-pitch-gold">Technology</span> Agency
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From concept to execution, Pitch Market Strategies & Public
            Relations delivers everything you need to build, scale, and dominate
            your market.
          </p>
        </div>
      </section>

      {/* Web Development */}
      <section id="web" className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={serviceImages.webDevelopment}
                alt="Web Development"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Web Development
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Custom Websites & Platforms
              </h2>
              <p className="text-gray-400 mb-6">
                We build everything from simple landing pages to complex
                e-commerce platforms, SaaS applications, and custom web
                solutions. Our stack includes Next.js, React, Node.js, and more.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Landing Pages &
                  Marketing Sites
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> E-Commerce &
                  Online Stores
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Web Applications &
                  Portals
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> API Development &
                  Integrations
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Production */}
      <section id="video" className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Commercial Production
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Video, Audio & AI Production
              </h2>
              <p className="text-gray-400 mb-6">
                Professional video commercials, AI-generated avatars, voice
                cloning, podcast production, and studio-quality
                audio. We bring your vision to life with our proprietary
                production pipeline.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> TV & Social Media
                  Commercials
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> AI Avatar & Voice
                  Cloning
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Podcast &
                  Audiobook Production
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Motion Graphics &
                  Animation
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden order-1 md:order-2">
              <Image
                src={serviceImages.videoProduction}
                alt="Video Production"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music Production */}
      <section id="music" className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={serviceImages.musicProduction}
                alt="Music Production"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Music Production
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Beats, Jingles & Sound Design
              </h2>
              <p className="text-gray-400 mb-6">
                Custom music production for commercials, podcasts, YouTube
                channels, and more. From catchy jingles to full soundtracks.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Commercial Jingles
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Beat Production
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Sound Effects &
                  Foley
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Mixing & Mastering
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services */}
      <section id="ai" className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                AI Services
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                AI-Powered Solutions
              </h2>
              <p className="text-gray-400 mb-6">
                Leverage the power of artificial intelligence with custom
                chatbots, AI avatars, voice synthesis, image generation, and
                automated workflows powered by our proprietary AI infrastructure.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Custom AI Chatbots
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Voice Cloning &
                  Synthesis
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> AI Image &
                  Video Generation
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Workflow Automation
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden order-1 md:order-2">
              <Image
                src={serviceImages.aiServices}
                alt="AI Services"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marketing & Campaigns */}
      <section id="automation" className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={serviceImages.campaigns}
                alt="Marketing Campaigns"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Marketing & Campaigns
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Strategic Marketing Solutions
              </h2>
              <p className="text-gray-400 mb-6">
                Full-funnel marketing campaigns including social media
                management, email marketing, SMS campaigns, paid advertising,
                and marketing automation.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Social Media
                  Marketing
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Email & SMS
                  Campaigns
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Paid Advertising
                  (PPC)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Funnel & CRM Setup
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS & App Development */}
      <section id="apps" className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                SaaS & App Development
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Custom Software Solutions
              </h2>
              <p className="text-gray-400 mb-6">
                We build custom SaaS platforms, mobile apps, and enterprise
                software. From Level10 CRM to BeCovered.life insurance platform
                — we&apos;ve built it all.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Custom SaaS
                  Platforms
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Mobile Apps (iOS &
                  Android)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> CRM & Business
                  Tools
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> White-Label
                  Solutions
                </li>
              </ul>
              <Link
                href="/platforms"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                View Platforms
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden order-1 md:order-2">
              <Image
                src={serviceImages.appDevelopment}
                alt="App Development"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding */}
      <section id="branding" className="py-20 bg-pitch-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src={serviceImages.branding}
                alt="Branding"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Branding & Design
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Brand Identity & Graphics
              </h2>
              <p className="text-gray-400 mb-6">
                Complete brand identity packages including logo design, brand
                guidelines, marketing collateral, and visual design systems.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Logo Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Brand Guidelines
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Marketing
                  Collateral
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> UI/UX Design
                </li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Print Shop */}
      <section id="print" className="py-20 bg-pitch-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-pitch-gold text-sm font-semibold uppercase tracking-wider">
                Print Shop
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Professional Printing Services
              </h2>
              <p className="text-gray-400 mb-6">
                Full-service print shop with competitive pricing on business
                cards, banners, signs, stickers, apparel, and promotional
                products.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Business Cards &
                  Stationery
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Banners & Signs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Stickers & Labels
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pitch-gold">✓</span> Apparel &
                  Promotional Items
                </li>
              </ul>
              <Link
                href="/print"
                className="inline-block mt-8 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Browse Print Shop
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden order-1 md:order-2">
              <Image
                src={serviceImages.printing}
                alt="Print Shop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-pitch-dark to-pitch-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-pitch-gold">Get Started</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            Contact us today for a free consultation and custom quote for your
            project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:solutions@pitchmarketing.agency"
              className="px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Email Us
            </a>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
