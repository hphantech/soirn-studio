"use client";

import Link from "next/link";
import { useState } from "react";
import CartButton from "../../components/cart/CartButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.65)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link 
            href="/landing" 
            className="text-xs tracking-[0.32em] uppercase text-white hover:opacity-80 transition-opacity"
          >
            SOIRN
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
              <Link href="/drop/drop-001" className="hover:text-white transition-colors">
                Drop 001
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/waitlist" className="hover:text-white transition-colors">
                Waitlist
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <CartButton />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <nav
            className="fixed top-[73px] left-0 right-0 z-50 border-b bg-black/95 backdrop-blur-md md:hidden"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="mx-auto max-w-6xl px-6 py-6 space-y-4">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-white/80 hover:text-white transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/drop/drop-001"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-white/80 hover:text-white transition-colors"
              >
                Drop 001
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-white/80 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-white/80 hover:text-white transition-colors"
              >
                Waitlist
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
