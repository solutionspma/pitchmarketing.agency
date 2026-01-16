'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RETAINER_PACKAGES = [
  {
    id: 'smma-starter',
    name: 'SMMA Starter',
    price: 997,
    interval: 'month',
    description: 'Perfect for businesses just starting with social media marketing',
    features: [
      '2 Social Platforms Managed',
      '12 Posts Per Month',
      'Basic Analytics Report',
      'Monthly Strategy Call',
      'Email Support',
      'Content Calendar',
    ],
    popular: false,
  },
  {
    id: 'smma-growth',
    name: 'SMMA Growth',
    price: 1997,
    interval: 'month',
    description: 'Scale your social presence with comprehensive management',
    features: [
      '4 Social Platforms Managed',
      '20 Posts Per Month',
      'Advanced Analytics Dashboard',
      'Bi-Weekly Strategy Calls',
      'Paid Ad Management ($500 ad spend)',
      'Community Management',
      'Story & Reel Creation',
      'Priority Support',
    ],
    popular: true,
  },
  {
    id: 'smma-dominate',
    name: 'SMMA Dominate',
    price: 3997,
    interval: 'month',
    description: 'Full-service social media domination for serious growth',
    features: [
      'Unlimited Platforms',
      '30+ Posts Per Month',
      'Real-time Analytics & Reporting',
      'Weekly Strategy Calls',
      'Paid Ad Management ($2,000 ad spend)',
      'Influencer Outreach',
      'Video Content Production',
      'Dedicated Account Manager',
      '24/7 Priority Support',
    ],
    popular: false,
  },
];

const CONSULTING_PACKAGES = [
  {
    id: 'consult-session',
    name: 'Strategy Session',
    price: 497,
    interval: 'one-time',
    description: '90-minute deep-dive into your business challenges',
    features: [
      '90-Minute Video Call',
      'Pre-Session Questionnaire',
      'Recorded Session',
      'Action Plan Document',
      '7-Day Email Follow-up',
    ],
  },
  {
    id: 'consult-monthly',
    name: 'Monthly Advisory',
    price: 1497,
    interval: 'month',
    description: 'Ongoing strategic guidance for continuous growth',
    features: [
      '4 Strategy Calls Per Month',
      'Unlimited Email Access',
      'Business Review & Analysis',
      'Growth Roadmap Updates',
      'Resource Library Access',
      'Priority Booking',
    ],
  },
  {
    id: 'consult-vip',
    name: 'VIP Day',
    price: 2997,
    interval: 'one-time',
    description: 'Full-day intensive to transform your business',
    features: [
      'Full Day (6-8 Hours)',
      'Complete Business Audit',
      'Brand Strategy Session',
      'Marketing Plan Creation',
      'Implementation Roadmap',
      '30-Day Follow-up Support',
      'All Materials & Recordings',
    ],
  },
];

const WEB_SERVICES_PACKAGES = [
  {
    id: 'landing-starter',
    name: 'Landing Page Starter',
    price: 499,
    interval: 'one-time',
    description: 'Perfect for launches, promos, or one-off campaigns. A lightning-fast, single-page site with your brand, message, and lead form — built to convert and ready in just 3 days.',
    features: [
      'Single Landing Page',
      'Mobile-Responsive Design',
      'Contact/Lead Form',
      'Basic SEO Setup',
      '3-Day Turnaround',
      'Free Stock Images',
    ],
    cta: 'Start My Landing Page',
  },
  {
    id: 'essential-site',
    name: 'Essential Site',
    price: 1200,
    sub: '+$75/mo hosting',
    interval: 'one-time',
    description: 'Your always-on digital storefront. A 5-page modern site with CMS, contact forms, and chat integration — built for credibility, speed, and easy ongoing updates.',
    features: [
      '5 Pages + CMS',
      'Contact Form + Chat Widget',
      'SEO & Speed Optimization',
      'SSL Certificate',
      'Monthly Updates Included',
      'Analytics Integration',
      '🎯 Starter CRM - Contact Management',
      '📧 Basic Email Notifications',
    ],
    cta: 'Build My Website',
    popular: true,
  },
  {
    id: 'functional-site',
    name: 'Functional Site',
    price: 2400,
    sub: '+$125/mo hosting',
    interval: 'one-time',
    description: 'Go beyond brochureware. A fully interactive site with bookings, advanced forms, and API connectivity — your first step toward automation and CRM-level control.',
    features: [
      'Up to 10 Pages',
      'Booking/Scheduling System',
      'Advanced Forms & Workflows',
      'API Integrations',
      'Database Setup',
      'Priority Support',
      '🎯 Growth CRM - Client Pipeline',
      '📊 Analytics Dashboard',
      '📧 Automated Email Sequences',
      '📅 Booking Management',
    ],
    cta: 'Upgrade My Site',
  },
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    price: 3997,
    sub: '+$175/mo hosting',
    interval: 'one-time',
    description: 'Sell, scale, and sync with confidence. Complete online store with checkout, inventory, and CRM integration — designed for serious sellers who need data, automation, and results.',
    features: [
      'Full E-Commerce Store',
      'Payment Gateway Setup',
      'Inventory Management',
      'Order Tracking',
      'Marketing Automation',
      '🎯 Pro CRM - Sales Pipeline',
      '📊 Advanced Analytics & Reporting',
      '📧 Multi-Channel Automation',
      '🛒 Customer Order History',
      '💬 SMS Notifications',
    ],
    cta: 'Launch My Store',
  },
  {
    id: 'enterprise-build',
    name: 'Enterprise Build',
    price: 'From $7,997',
    interval: 'custom',
    description: 'Your entire digital ecosystem — unified. Custom-built CRM, e-commerce, automations, and team dashboards under one roof — engineered to grow with you and eliminate tech chaos.',
    features: [
      'Multi-Platform Integration',
      'Team Dashboards',
      'Workflow Automation',
      'Dedicated Project Manager',
      'White-Glove Support',
      '🎯 Enterprise CRM - Full Suite',
      '📊 Custom Reporting & BI',
      '📧 Advanced Marketing Automation',
      '👥 Team Collaboration Tools',
      '🔗 API & Webhook Integrations',
      '📱 Mobile App Access',
      '🎓 Staff Training Included',
    ],
    cta: 'Request a Quote',
  },
];

const MEDIA_PRODUCTION_PACKAGES = [
  {
    id: 'content-starter',
    name: 'Content Starter',
    price: 797,
    interval: 'month',
    description: 'Essential content creation for consistent brand presence across your channels.',
    features: [
      '4 Short-Form Videos/Month',
      'Basic Editing & Graphics',
      'Social Media Optimized',
      'Music Licensing Included',
      'Weekly Delivery',
    ],
  },
  {
    id: 'video-production',
    name: 'Video Production',
    price: 1997,
    interval: 'month',
    description: 'Professional video production with cinematic quality for campaigns that convert.',
    features: [
      '2 Long-Form Videos/Month',
      '8 Short-Form Clips',
      'Cinematic Shooting',
      'Color Grading',
      'Motion Graphics',
      'Scriptwriting Support',
    ],
    popular: true,
  },
  {
    id: 'media-suite',
    name: 'Media Suite',
    price: 3497,
    interval: 'month',
    description: 'Complete media production including video, photography, and AI enhancements.',
    features: [
      '4 Long-Form Videos/Month',
      '16 Short-Form Clips',
      'Drone Footage (Aerial Cinematography)',
      'Steadycam & Gimbal Work',
      'AI Video Enhancements',
      '2 Photography Sessions/Month',
      'Music Production & Scoring',
      'Audio Engineering',
      'Podcast Production (Up to 4 Episodes/Month)',
      'Dedicated Production Team',
      '48-Hour Turnaround on Standard Projects',
    ],
  },
];

export default function PricingPage() {
  const [tab, setTab] = useState<'smma' | 'consulting' | 'web' | 'media'>('smma');

  return (
    <main className="min-h-screen bg-pitch-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Business growth and strategy"
          fill
          className="object-cover"
        />
      </div>
      
      <Navbar />

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Retainer <span className="text-pitch-gold">Packages</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Ongoing partnerships that drive real results. Choose the level of support 
              that matches your growth ambitions.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-pitch-gold hover:underline"
            >
              Not sure which is right? Book a free 15-min call →
            </Link>
          </div>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-pitch-dark rounded-xl p-1.5 inline-flex flex-wrap gap-1">
              <button
                onClick={() => setTab('smma')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  tab === 'smma'
                    ? 'bg-pitch-gold text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Social Media Marketing
              </button>
              <button
                onClick={() => setTab('consulting')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  tab === 'consulting'
                    ? 'bg-pitch-gold text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Consulting
              </button>
              <button
                onClick={() => setTab('web')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  tab === 'web'
                    ? 'bg-pitch-gold text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PWS - Pitch Web Services
              </button>
              <button
                onClick={() => setTab('media')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  tab === 'media'
                    ? 'bg-pitch-gold text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Media Production
              </button>
            </div>
          </div>

          {/* Tab Subtitle */}
          <p className="text-center text-gray-400 text-sm mb-10 italic">
            {tab === 'smma' && 'Ongoing partnerships that drive real results'}
            {tab === 'consulting' && 'Strategic guidance when you need it most'}
            {tab === 'web' && 'From quick launches to full CRM-driven platforms — build what you need, when you need it'}
            {tab === 'media' && 'Video production, cinematic content, music scoring — everything you need to stand out'}
          </p>

          {/* SMMA Packages */}
          {tab === 'smma' && (
            <div className="grid md:grid-cols-3 gap-6">
              {RETAINER_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-pitch-dark rounded-2xl p-6 border transition hover:border-pitch-gold/50 ${
                    pkg.popular ? 'border-pitch-gold' : 'border-white/10'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-pitch-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${pkg.price.toLocaleString()}</span>
                    <span className="text-gray-400">/{pkg.interval}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-pitch-gold mt-0.5">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/book"
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                      pkg.popular
                        ? 'bg-pitch-gold text-black hover:bg-pitch-gold/90'
                        : 'border border-white/20 text-white hover:bg-white/5'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Consulting Packages */}
          {tab === 'consulting' && (
            <div className="grid md:grid-cols-3 gap-6">
              {CONSULTING_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-pitch-dark rounded-2xl p-6 border border-white/10 transition hover:border-pitch-gold/50"
                >
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${pkg.price.toLocaleString()}</span>
                    <span className="text-gray-400">
                      {pkg.interval === 'one-time' ? '' : `/${pkg.interval}`}
                    </span>
                    {pkg.interval === 'one-time' && (
                      <span className="ml-2 text-xs bg-white/10 px-2 py-1 rounded">ONE-TIME</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-pitch-gold mt-0.5">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/book"
                    className="block w-full text-center py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition"
                  >
                    Book Consultation
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Web Services Packages */}
          {tab === 'web' && (
            <>
              <div className="text-center mb-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-3 text-pitch-gold">
                  Modular Web Services
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Your website is your digital storefront, your salesperson, and your first impression — make it count. 
                  Our <strong>Modular Web Services</strong> model gives you flexible build tiers that match your growth stage and budget. 
                  Start lean, grow fast, and scale without ever starting over.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {WEB_SERVICES_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-pitch-dark rounded-2xl p-6 border transition hover:border-pitch-gold/50 ${
                      pkg.popular ? 'border-pitch-gold' : 'border-white/10'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-pitch-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                          🔥 MOST POPULAR
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        {typeof pkg.price === 'number' ? `$${pkg.price.toLocaleString()}` : pkg.price}
                      </span>
                      {pkg.sub && (
                        <div className="text-gray-400 text-sm mt-1">{pkg.sub}</div>
                      )}
                      {pkg.interval === 'one-time' && (
                        <span className="ml-2 text-xs bg-white/10 px-2 py-1 rounded">ONE-TIME</span>
                      )}
                      {pkg.interval === 'custom' && (
                        <span className="ml-2 text-xs bg-pitch-gold/20 text-pitch-gold px-2 py-1 rounded">CUSTOM QUOTE</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-pitch-gold mt-0.5">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/book"
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                        pkg.popular
                          ? 'bg-pitch-gold text-black hover:bg-pitch-gold/90'
                          : 'border border-white/20 text-white hover:bg-white/5'
                      }`}
                    >
                      {pkg.cta || 'Book a Call to Start My Build'}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Media Production Packages */}
          {tab === 'media' && (
            <>
              <div className="text-center mb-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-3 text-pitch-gold">
                  Media Production
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  From short-form social clips to cinematic brand films — we produce content that captures attention and drives action. 
                  Video production, photography, music scoring, and everything in between.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {MEDIA_PRODUCTION_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-pitch-dark rounded-2xl p-6 border transition hover:border-pitch-gold/50 ${
                      pkg.popular ? 'border-pitch-gold' : 'border-white/10'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-pitch-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                          🔥 MOST POPULAR
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${pkg.price.toLocaleString()}</span>
                      <span className="text-gray-400">/{pkg.interval}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-pitch-gold mt-0.5">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/book"
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                        pkg.popular
                          ? 'bg-pitch-gold text-black hover:bg-pitch-gold/90'
                          : 'border border-white/20 text-white hover:bg-white/5'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Custom Solutions */}
          <div className="mt-16 text-center">
            <div className="bg-pitch-dark border border-white/10 rounded-2xl p-10 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">
                Need Something <span className="text-pitch-gold">Custom</span>?
              </h2>
              <p className="text-gray-400 mb-6">
                Every business is unique. Let's build a custom package that fits your 
                specific needs, goals, and budget.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-pitch-gold text-black px-8 py-4 rounded-xl font-semibold hover:bg-pitch-gold/90 transition"
              >
                Schedule a Strategy Call
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold mb-2">How does billing work?</h3>
                <p className="text-gray-400 text-sm">
                  Retainer packages are billed monthly at the start of each period. 
                  One-time sessions are billed in full upon booking.
                </p>
              </div>

              <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade?</h3>
                <p className="text-gray-400 text-sm">
                  Absolutely. You can change your plan at any time. Changes take effect 
                  at the start of your next billing cycle.
                </p>
              </div>

              <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold mb-2">What's the commitment?</h3>
                <p className="text-gray-400 text-sm">
                  We recommend a 3-month minimum for best results, but there are no 
                  long-term contracts. Cancel anytime with 30 days notice.
                </p>
              </div>

              <div className="bg-pitch-dark p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold mb-2">What results can I expect?</h3>
                <p className="text-gray-400 text-sm">
                  Results vary by business, but our clients typically see 2-5x growth 
                  in engagement and 30-50% increase in qualified leads within 90 days.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
