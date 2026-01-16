import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative text-center py-32 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Creative marketing and branding"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-pitch-dark/80 to-pitch-dark"></div>
      </div>

      <div className="relative z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1]">
        BUILD. SCALE.
        <span className="text-pitch-gold"> DOMINATE.</span>
      </h1>

      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
        Pitch Marketing Agency delivers elite creative services, custom
        software, and powerful automation tools — all under one unified
        platform.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/book"
          className="px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
        >
          Book a Consultation
        </Link>
        <Link
          href="/services"
          className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
        >
          Explore Services
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
        <div>
          <p className="text-3xl font-bold text-pitch-gold">500+</p>
          <p className="text-gray-400 text-sm">Projects Delivered</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pitch-gold">98%</p>
          <p className="text-gray-400 text-sm">Client Satisfaction</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pitch-gold">24/7</p>
          <p className="text-gray-400 text-sm">Support Available</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pitch-gold">10+</p>
          <p className="text-gray-400 text-sm">Years Experience</p>
        </div>
      </div>
      </div>
    </section>
  );
}
