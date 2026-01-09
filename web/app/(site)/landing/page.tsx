"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function LandingPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling on this page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into characters
    const text = "soirn";
    const chars = text.split("").map((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(100%)";
      return span;
    });

    // Clear and add characters
    titleRef.current.innerHTML = "";
    chars.forEach(char => titleRef.current?.appendChild(char));

    // Create timeline for text reveal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate each character with stagger
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
    });

    // Animate description
    if (descriptionRef.current) {
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.4");
    }

    // Animate CTA
    if (ctaRef.current) {
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.3");
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main className="relative h-screen overflow-hidden bg-black flex flex-col">
      {/* Background with subtle animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Hero Section - Perfectly centered in one screen */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-8 -mt-12 sm:-mt-16">
        <div className="mx-auto max-w-5xl w-full text-center">
          {/* Large brand name with split text reveal */}
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-light text-white leading-none tracking-tight overflow-hidden"
          />

          {/* Description */}
          <p 
            ref={descriptionRef}
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed opacity-0 translate-y-4"
          >
            Soirn is an underground streetwear brand that creates limited drops with heavy materials and sculpted silhouettes. Built to last.
          </p>

          {/* Tagline with CTA - Freshman style */}
          <div 
            ref={ctaRef}
            className="mt-4 sm:mt-6 flex items-center justify-center gap-4 opacity-0 translate-y-4"
          >
            <span className="text-white/60 text-sm italic font-light">[</span>
            <Link
              href="/shop"
              className="text-white/80 hover:text-white text-sm tracking-[0.1em] uppercase font-light transition-colors"
            >
              Shop Collection
            </Link>
            <span className="text-white/60 text-sm italic font-light">]</span>
          </div>
        </div>
      </section>
    </main>
  );
}
