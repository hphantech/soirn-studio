"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../components/cart/CartProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggle: toggleCart, count } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b bg-black"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          {/* Hamburger menu - left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>

          {/* Brand name - center */}
          <Link
            href="/landing"
            className="text-xs tracking-[0.3em] uppercase text-white hover:opacity-80 transition-opacity font-light"
          >
            SOIRN
          </Link>

          {/* Cart icon - right */}
          <button
            onClick={toggleCart}
            className="relative text-white/80 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {mounted && count > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-black text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hamburger menu - slides from left */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60]"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          {/* Menu panel - slides from left */}
          <nav
            className="fixed left-0 top-0 h-screen w-[280px] max-w-[85vw] bg-black border-r transform transition-transform duration-300 ease-out z-[61] translate-x-0"
            style={{ 
              borderColor: "rgba(255,255,255,0.08)", 
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh"
            }}
          >
            <div className="flex flex-col h-full p-8 overflow-y-auto">
            {/* Close button */}
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col gap-6">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
              >
                Shop
              </Link>
              <Link
                href="/lookbook"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
              >
                Lookbook
              </Link>
              <Link
                href="/drop/drop-001"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
              >
                Drop 001
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
              >
                About
              </Link>
              <Link
                href="/waitlist"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
              >
                Waitlist
              </Link>
            </div>

            {/* Bottom section */}
            <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-white/40 tracking-[0.1em] uppercase mb-4">
                Connect
              </p>
              <div className="flex flex-col gap-3 text-xs text-white/60">
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      )}
    </>
  );
}
