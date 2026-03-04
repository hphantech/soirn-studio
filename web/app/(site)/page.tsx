"use client";

import Link from "next/link";
import { products } from "./shop/products";
import ProductSlider from "../components/ui/ProductSlider";
import { brandConfig } from "@/src/config/brand";

export default function HomePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Background with subtle animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Hero Section - Freshman style */}
      <section className="relative z-10 flex min-h-[calc(100svh-200px)] flex-col items-center justify-center px-6 sm:px-8">
        <div className="mx-auto max-w-5xl w-full text-center">
          {/* Large brand name */}
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-light text-white leading-none tracking-tight animate-fade-in">
            {brandConfig.brandName}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-light leading-relaxed animate-fade-in-delay">
            {brandConfig.description}
          </p>

          {/* Tagline with CTA */}
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-delay-2">
            <span className="text-white/60 text-sm italic font-light">[</span>
            <Link
              href={brandConfig.primaryCtaHref}
              className="text-white/80 hover:text-white text-sm tracking-[0.1em] uppercase font-light transition-colors"
            >
              {brandConfig.primaryCtaLabel}
            </Link>
            <span className="text-white/60 text-sm italic font-light">]</span>
          </div>
        </div>
      </section>

      {/* Product Slider */}
      <div
        className="relative z-10 border-t pt-6 pb-4"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="px-6 sm:px-8">
          <ProductSlider products={products} />
        </div>
      </div>
    </main>
  );
}
