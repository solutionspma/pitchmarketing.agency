'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-pitch-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-pitch-dark">
                <Image
                  src="/jaFullSizeRender10.jpg"
                  alt="Jason Harris - Founder of Pitch Marketing Agency"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pitch-gold/20 rounded-2xl -z-10 hidden lg:block" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-pitch-gold/30 rounded-2xl -z-10 hidden lg:block" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-pitch-gold font-semibold tracking-wider mb-3">FOUNDER & CREATIVE DIRECTOR</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Jason Harris
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Award-winning producer, musician, and entrepreneur with over a decade of experience 
                in film, television, and digital media. Creator of Welcome Home Louisiana and 
                architect of multi-million dollar brand transformations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-pitch-gold text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-pitch-gold/90 transition text-sm md:text-base"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-xl font-medium hover:bg-white/5 transition text-sm md:text-base"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-pitch-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            The <span className="text-pitch-gold">Story</span>
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              I grew up in the hood in Greenville, South Carolina. Money was tight, opportunities were 
              scarce, but my parents gave me something more valuable than comfort—they gave me art. 
              My mother sang in the choir at our local Baptist church, leading "Oh Happy Day" with a 
              voice that could move mountains. She was also a gifted poet and writer, crafting verses 
              that deserved to be published but never were. My father was a recording artist and skilled 
              painter who taught me to see the world through creative eyes.
            </p>
            
            <p>
              Music wasn't just something I listened to—it was in my DNA. Growing up surrounded by my 
              parents' artistry planted seeds that would grow into my life's work. What started as 
              producing beats in a bedroom studio evolved into a full-scale production company, opening 
              doors I never imagined possible.
            </p>

            <p>
              The entertainment industry became my proving ground. I worked alongside comedians like 
              <strong className="text-white"> Lil Duval and Mike Epps</strong>, recording artists like 
              <strong className="text-white"> Boosie and Webbie</strong>, and even collaborated with 
              <strong className="text-white"> No Limit Records</strong>. I starred in an episode of 
              <strong className="text-white"> Mystery Diners on Food Network</strong> and appeared on the 
              silver screen in <strong className="text-white">Cody the Robosapien</strong>. Every experience 
              taught me something about storytelling, branding, and connecting with audiences.
            </p>

            <p>
              My work in television led to creating <strong className="text-white">Welcome Home Louisiana</strong>, 
              a program that showcased real estate and culture while helping families find their dream homes. 
              Through my production company, I elevated the marketing for <strong className="text-white">Rollin Homes</strong>, 
              implementing innovative strategies that increased their sales by millions of dollars and transformed 
              their market presence across multiple locations.
            </p>

            <p>
              Faith has been my anchor through every up and down. Growing up in church, watching my mother lead 
              worship, taught me that our gifts are meant to serve others. Every setback became a setup for 
              something greater. I've seen rock bottom and I've tasted success, but I'm still fighting, still 
              climbing, still believing that the best is yet to come.
            </p>

            <p>
              Today, Pitch Marketing Agency represents everything I've learned from the ground up—combining 
              creative excellence with strategic business acumen to help visionaries build their empires. 
              Whether you're a startup founder, an established business owner, or an artist ready to take 
              your career to the next level, I understand your struggle because I've lived it. Let's build 
              something extraordinary together.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Creative workspace"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Notable <span className="text-pitch-gold">Achievements</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementCard
              icon="🎬"
              title="Welcome Home Louisiana"
              description="Creator and Executive Producer of the hit television program showcasing Louisiana real estate and culture"
            />
            <AchievementCard
              icon="🏠"
              title="Rollin Homes Success"
              description="Architect of marketing systems that helped scale from single location to multi-site operation with millions in revenue"
            />
            <AchievementCard
              icon="🎵"
              title="Music Production"
              description="Produced tracks for independent artists and commercial projects, blending faith-inspired messages with contemporary sound"
            />
            <AchievementCard
              icon="💼"
              title="Business Consulting"
              description="Advised multi-millionaire entrepreneurs on brand strategy, digital presence, and growth acceleration"
            />
            <AchievementCard
              icon="🎥"
              title="Film & Television"
              description="Extensive experience in production, working with notable industry professionals and major networks"
            />
            <AchievementCard
              icon="🚀"
              title="Platform Development"
              description="Built multiple SaaS products including Level10 CRM, helping businesses automate and scale their operations"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-pitch-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What I <span className="text-pitch-gold">Stand For</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon="✝️"
              title="Faith First"
              description="Every decision, every project, every relationship is guided by my commitment to honor God in all I do."
            />
            <ValueCard
              icon="💯"
              title="Excellence Always"
              description="Good enough is never enough. I push for exceptional results that exceed expectations and stand the test of time."
            />
            <ValueCard
              icon="🤝"
              title="Relationships Matter"
              description="Business is personal. I invest in people, not just projects, building partnerships that last generations."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something <span className="text-pitch-gold">Extraordinary</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your vision and create a strategy that transforms your business.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-pitch-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-pitch-gold/90 transition group"
          >
            <span>Schedule Your Consultation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function AchievementCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-pitch-dark border border-white/10 rounded-2xl p-6 hover:border-pitch-gold/30 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pitch-gold/10 border border-pitch-gold/20 flex items-center justify-center text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
