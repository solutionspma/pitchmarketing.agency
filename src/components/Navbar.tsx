"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Pitch Marketing Agency"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-wide">
            PITCH<span className="text-pitch-gold">MARKETING</span>
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div
          className={`absolute md:relative top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent ${
            open ? "block" : "hidden"
          } md:flex gap-6 p-4 md:p-0 items-center`}
        >
          <Link
            href="/services"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Services
          </Link>
          <Link
            href="/platforms"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Platforms
          </Link>
          <Link
            href="/print"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Print Shop
          </Link>
          <Link
            href="/pricing"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="block py-2 md:py-0 hover:text-pitch-gold transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="block py-2 md:py-0 px-4 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
