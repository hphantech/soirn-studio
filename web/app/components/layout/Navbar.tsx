"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../components/cart/CartProvider";
import { brandConfig } from "@/src/config/brand";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { toggle: toggleCart, count } = useCart();
  const [mounted, setMounted] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle menu open/close with scroll position management
  useEffect(() => {
    if (menuOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Prevent body scroll and fix body position
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      
      // Reset menu content scroll to top
      if (menuContentRef.current) {
        menuContentRef.current.scrollTop = 0;
      }
    } else {
      // Restore body scroll and position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      // Mount menu hidden, then animate it in
      setMenuVisible(true);
      setMenuOpen(false);
      setTimeout(() => {
        setMenuOpen(true);
      }, 0);
    } else {
      // Animate out, then unmount
      setMenuOpen(false);
      setTimeout(() => setMenuVisible(false), 300);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md ${
          transparent ? "bg-black/40" : "border-b bg-black/80"
        }`}
        style={
          transparent
            ? {}
            : {
                borderColor: "rgba(255,255,255,0.08)",
              }
        }
      >
        <div
          className={`mx-auto flex items-center justify-between ${
            transparent ? "px-6 sm:px-8 py-6" : "px-6 py-4"
          }`}
        >
          {/* Hamburger menu / Menu button - left */}
          {transparent ? (
            <button
              onClick={toggleMenu}
              className="text-white/60 text-xs tracking-[0.1em] uppercase font-light hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              + Menu
            </button>
          ) : (
            <button
              onClick={toggleMenu}
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
          )}

          {/* Brand name - center */}
          <Link
            href="/"
            className={`${
              transparent
                ? "text-white/60 text-xs tracking-[0.2em] uppercase font-light hover:text-white transition-colors"
                : "text-xs tracking-[0.3em] uppercase text-white hover:opacity-80 transition-opacity font-light"
            }`}
          >
            {brandConfig.brandName.toUpperCase()}
          </Link>

          {/* Cart icon - right */}
          <button
            onClick={toggleCart}
            className={`relative ${transparent ? 'text-white/60 hover:text-white' : 'text-white/80 hover:text-white'} transition-colors`}
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

      {/* Hamburger menu - slides from left with open/close animation */}
      {menuVisible && (
        <>
          {/* Backdrop - closes menu on click */}
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          
          {/* Menu panel - slides from left */}
          <nav
            className={`fixed left-0 top-0 h-screen w-[280px] max-w-[85vw] bg-black border-r z-[61] transform transition-transform duration-300 ease-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ 
              borderColor: "rgba(255,255,255,0.08)", 
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              willChange: "transform"
            }}
            onClick={(e) => {
              // Prevent closing when clicking inside menu
              e.stopPropagation();
            }}
          >
            <div
              ref={menuContentRef}
              className="flex flex-col h-full p-8 overflow-y-auto overscroll-contain" 
              style={{ 
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth"
              }}
            >
            {/* Close button */}
            <div className="flex justify-end mb-12">
              <button
                onClick={toggleMenu}
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
              {brandConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors font-light"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom section */}
            <div
              className="mt-auto pt-8 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs text-white/40 tracking-[0.1em] uppercase mb-4">
                Connect
              </p>
              <div className="flex flex-col gap-3 text-xs text-white/60">
                {brandConfig.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
        </>
      )}
    </>
  );
}
