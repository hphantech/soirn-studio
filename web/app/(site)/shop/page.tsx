"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "./products";
import ProductFilters from "../../components/shop/ProductFilters";
import type { Product } from "./products";

function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">
            Shop
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl text-white">
            Drop 001
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Limited pieces. No restocks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span>{filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="mt-8">
        <ProductFilters products={products} onFilterChange={setFilteredProducts} />
      </div>

      <div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProducts.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group rounded-2xl border bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
            style={{ borderColor: "rgba(255,255,255,0.10)" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 33vw"
                priority={false}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute left-3 top-3 flex gap-2">
                {p.badge && (
                  <span className="rounded-full bg-black/70 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                    {p.badge}
                  </span>
                )}
                {p.status === "sold_out" && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                    Sold out
                  </span>
                )}
                {p.status === "coming_soon" && (
                  <span className="rounded-full bg-black/70 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                    Coming soon
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-medium text-white group-hover:text-white/90 transition-colors">
                  {p.name}
                </h2>
                <span className="text-sm font-medium text-white/90">
                  {formatPrice(p.price)}
                </span>
              </div>

              <p className="mt-2 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                {p.status === "in_stock"
                  ? "Ready to ship"
                  : p.status === "sold_out"
                  ? "No restocks"
                  : "Join waitlist for access"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
