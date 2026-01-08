"use client";

import { useState } from "react";
import type { Product } from "../../(site)/shop/products";

type FilterProps = {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
};

export default function ProductFilters({ products, onFilterChange }: FilterProps) {
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default");
  const [statusFilter, setStatusFilter] = useState<"all" | "in_stock" | "coming_soon" | "sold_out">("all");

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    applyFilters(statusFilter, newSort);
  };

  const handleStatusChange = (newStatus: typeof statusFilter) => {
    setStatusFilter(newStatus);
    applyFilters(newStatus, sortBy);
  };

  const applyFilters = (status: typeof statusFilter, sort: typeof sortBy) => {
    let filtered = [...products];

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((p) => p.status === status);
    }

    // Sort
    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    onFilterChange(filtered);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-white/60">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
          className="rounded-full border bg-white/5 px-4 py-2 text-white/80 outline-none focus:border-white/30"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-white/60">Filter:</span>
        <div className="flex gap-2">
          {(["all", "in_stock", "coming_soon", "sold_out"] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`rounded-full border px-4 py-2 text-xs transition-all ${
                statusFilter === status
                  ? "bg-white text-black border-white"
                  : "text-white/70 hover:text-white border-white/14 hover:border-white/30"
              }`}
            >
              {status === "all"
                ? "All"
                : status === "in_stock"
                ? "In Stock"
                : status === "coming_soon"
                ? "Coming Soon"
                : "Sold Out"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
