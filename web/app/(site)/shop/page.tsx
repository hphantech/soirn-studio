"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "./products";
import ProductFilters from "../../components/shop/ProductFilters";
import ProductCardHover from "../../components/ui/ProductCardHover";
import type { Product } from "./products";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function ShopPage() {
  const [allProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "in_stock" | "coming_soon" | "sold_out">("all");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default");
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [statusFilter, searchQuery, sortBy, allProducts]);

  // Image reveal animations on scroll
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    productRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const trigger = ScrollTrigger.create({
        trigger: ref,
        start: "top 85%",
        end: "top 50%",
        onEnter: () => {
          gsap.fromTo(ref,
            {
              opacity: 0,
              y: 60,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            }
          );
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [filteredProducts]);

  // Handle sort change from ProductFilters
  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
  };

  const [showAllMenu, setShowAllMenu] = useState(false);

  // Prevent scrolling on this page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <main className="bg-black h-screen overflow-hidden flex flex-col">
      <ProductCardHover />
      {/* Header with All, Search, Sort - PAF style */}
      <div className="mx-auto max-w-[95vw] px-4 sm:px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left: All and Search buttons */}
          <div className="flex items-center gap-3">
            {/* All button with dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAllMenu(!showAllMenu);
                  setShowSearch(false);
                }}
                className="rounded-full border px-4 py-1.5 text-xs tracking-[0.1em] uppercase transition-all font-light text-white/80 border-white/10 bg-transparent backdrop-blur-sm hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                All
                <svg
                  className={`inline-block w-3 h-3 ml-1 transition-transform ${showAllMenu ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* All dropdown menu */}
              {showAllMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowAllMenu(false)}
                  />
                  <div className="absolute left-0 top-10 z-20 bg-black border rounded-lg min-w-[160px]" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    {[
                      { value: "all" as const, label: "All" },
                      { value: "in_stock" as const, label: "In Stock" },
                      { value: "coming_soon" as const, label: "Coming Soon" },
                      { value: "sold_out" as const, label: "Sold Out" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setShowAllMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs tracking-[0.05em] uppercase font-light transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          statusFilter === option.value
                            ? "text-white bg-white/5"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search button */}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setShowAllMenu(false);
                if (!showSearch) setSearchQuery("");
              }}
              className={`rounded-full border px-4 py-1.5 text-xs tracking-[0.1em] uppercase transition-all font-light backdrop-blur-sm ${
                showSearch
                  ? "text-white border-white/30 bg-white/5"
                  : "text-white/80 border-white/10 bg-transparent hover:border-white/20 hover:bg-white/5 hover:text-white"
              }`}
            >
              Search
            </button>
          </div>

          {/* Right: Sort */}
          <ProductFilters onSortChange={handleSortChange} currentSort={sortBy} />
        </div>

        {/* Search input - appears when Search is clicked */}
        {showSearch && (
          <div className="mt-4 pt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border-b text-sm text-white/80 placeholder:text-white/30 outline-none pb-2 font-light"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Product count */}
      <div className="mx-auto max-w-[95vw] px-4 sm:px-6 py-2 flex-shrink-0">
        <p className="text-xs text-white/40">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Product Grid - Scrollable container */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-[95vw] px-4 sm:px-6 py-3 pb-6">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p, index) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              className="group"
            >
              <div 
                ref={(el) => {
                  productRefs.current[index] = el;
                }}
                className="relative aspect-[3/4] overflow-hidden bg-white/[0.02] mb-3 product-card"
                data-product-card
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={false}
                />

                {/* Status badges - minimal */}
                {p.status === "sold_out" && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-white px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-black font-medium">
                      Sold out
                    </span>
                  </div>
                )}
                {p.status === "coming_soon" && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 backdrop-blur-sm border px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-white/90 font-medium" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                      Coming soon
                    </span>
                  </div>
                )}
                {p.badge && p.status !== "sold_out" && p.status !== "coming_soon" && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 backdrop-blur-sm border px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-white/90 font-medium" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                      {p.badge}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xs tracking-[0.15em] uppercase text-white/80 mb-1 group-hover:text-white transition-colors font-light">
                  {p.name}
                </h2>
                <p className="text-xs text-white/60 font-light">
                  {formatPrice(p.price)}
                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </main>
  );
}
