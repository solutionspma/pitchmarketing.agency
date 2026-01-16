import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/10 bg-pitch-black mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Pitch Marketing Agency"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold">
                PITCH<span className="text-pitch-gold">MARKETING</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Pitch Market Strategies & Public Relations, LLC — Full-service creative agency delivering elite websites, commercial production, AI services, SaaS platforms, and professional printing.
            </p>
            <div className="space-y-1 text-sm text-gray-400">
              <p>📧 <a href="mailto:helloworld@pitchmarketing.agency" className="hover:text-pitch-gold">helloworld@pitchmarketing.agency</a></p>
              <p>💼 <a href="mailto:solutions@pitchmarketing.agency" className="hover:text-pitch-gold">solutions@pitchmarketing.agency</a></p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-pitch-gold">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/services#web" className="hover:text-pitch-gold">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#video" className="hover:text-pitch-gold">
                  Commercial Production
                </Link>
              </li>
              <li>
                <Link href="/services#music" className="hover:text-pitch-gold">
                  Music Production
                </Link>
              </li>
              <li>
                <Link href="/services#ai" className="hover:text-pitch-gold">
                  AI Services
                </Link>
              </li>
              <li>
                <Link href="/services#branding" className="hover:text-pitch-gold">
                  Branding & Design
                </Link>
              </li>
              <li>
                <Link href="/print" className="hover:text-pitch-gold">
                  Print Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-pitch-gold">Platforms</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="https://level10.financial" target="_blank" rel="noopener noreferrer" className="hover:text-pitch-gold">
                  Level10 Financial
                </a>
              </li>
              <li>
                <a href="https://payflexsystems.com" target="_blank" rel="noopener noreferrer" className="hover:text-pitch-gold">
                  PayFlex Systems
                </a>
              </li>
              <li>
                <a href="https://sebi.market" target="_blank" rel="noopener noreferrer" className="hover:text-pitch-gold">
                  SEBI Markets
                </a>
              </li>
              <li>
                <a href="https://youcast.network" target="_blank" rel="noopener noreferrer" className="hover:text-pitch-gold">
                  YouCast Network
                </a>
              </li>
              <li>
                <a href="https://godrive.academy" target="_blank" rel="noopener noreferrer" className="hover:text-pitch-gold">
                  GoDrive Academy
                </a>
              </li>
              <li>
                <Link href="/platforms" className="hover:text-pitch-gold">
                  View All Platforms →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-pitch-gold">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-pitch-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-pitch-gold">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-pitch-gold">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pitch-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-pitch-gold">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-pitch-gold">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-pitch-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-pitch-gold">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Pitch Market Strategies & Public Relations, LLC — All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pitch-gold transition">𝕏</a>
            <a href="#" className="hover:text-pitch-gold transition">LinkedIn</a>
            <a href="#" className="hover:text-pitch-gold transition">Instagram</a>
            <a href="#" className="hover:text-pitch-gold transition">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
