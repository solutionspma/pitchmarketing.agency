'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const brands = [
  {
    id: 'pitch-marketing',
    name: 'Pitch Marketing Agency',
    tagline: 'Full-Service Marketing & Creative Agency',
    description: 'Social media marketing, video production, web design, and print services for businesses that want to dominate their market.',
    website: 'https://pitchmarketing.agency',
    logo: '/logo.png',
    status: 'active',
    category: 'Marketing & Media'
  },
  {
    id: 'level10',
    name: 'LEVEL10 Financial',
    tagline: 'Become Bankable. No More Denials.',
    description: 'Financial coaching and bankability platform that analyzes real credit data and connects users to lenders who agree to approve or coach.',
    website: 'https://level10.financial',
    logo: null, // Add logo later
    status: 'active',
    category: 'Financial Technology'
  },
  {
    id: 'pitch-pay',
    name: 'Pitch Pay',
    tagline: 'Payment Processing Solutions',
    description: 'Streamlined payment processing and financial services for modern businesses.',
    website: null, // Add when available
    logo: null,
    status: 'launching',
    category: 'Payment Processing'
  },
  {
    id: 'becovered',
    name: 'BeCovered.life',
    tagline: 'Insurance Made Simple',
    description: 'Coverage consultation and insurance services designed for entrepreneurs and business owners.',
    website: null,
    logo: null,
    status: 'active',
    category: 'Insurance Services'
  },
  {
    id: 'saxtaxpro',
    name: 'SaxtaxPro',
    tagline: 'Professional Tax Services',
    description: 'Tax preparation and business tax services for individuals and growing companies.',
    website: null,
    logo: null,
    status: 'active',
    category: 'Tax Services'
  },
  {
    id: 'soulforge',
    name: 'SoulForge',
    tagline: 'AI-Powered Innovation',
    description: 'Advanced AI solutions and voice agent technology for next-generation business automation.',
    website: null,
    logo: null,
    status: 'launching',
    category: 'Artificial Intelligence'
  },
];

const categories = ['All', 'Marketing & Media', 'Financial Technology', 'Payment Processing', 'Insurance Services', 'Tax Services', 'Artificial Intelligence'];

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBrands = selectedCategory === 'All' 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  return (
    <main className="min-h-screen bg-pitch-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Our Brands"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-pitch-gold/20 text-pitch-gold text-sm font-semibold rounded-full mb-6">
            Pitch Market Strategies Ecosystem
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our <span className="text-pitch-gold">Brands</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A portfolio of innovative companies delivering cutting-edge solutions across marketing, 
            finance, technology, and business services.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-pitch-dark/50 border-y border-white/5 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-pitch-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="group bg-pitch-dark rounded-xl overflow-hidden border border-white/10 hover:border-pitch-gold/50 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Logo/Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-pitch-gold/10 to-transparent flex items-center justify-center border-b border-white/10">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <div className="text-4xl font-bold text-pitch-gold mb-2">
                        {brand.name.charAt(0)}
                      </div>
                      <p className="text-xs text-gray-500">Logo Coming Soon</p>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      brand.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {brand.status === 'active' ? '🟢 Active' : '🚀 Launching'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-pitch-gold font-semibold">
                      {brand.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-pitch-gold transition">
                    {brand.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-4 italic">
                    {brand.tagline}
                  </p>
                  
                  <p className="text-sm text-gray-300 mb-6">
                    {brand.description}
                  </p>

                  {/* Action Button */}
                  {brand.website ? (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
                    >
                      Visit Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
                      Website Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-b from-pitch-dark to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Building the Future of <span className="text-pitch-gold">Business Solutions</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Each brand under Pitch Market Strategies & Public Relations is designed to solve 
            real problems and deliver exceptional value to businesses and entrepreneurs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
