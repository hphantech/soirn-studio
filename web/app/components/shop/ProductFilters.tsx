"use client";

import { useState } from "react";

type FilterProps = {
  onSortChange: (sort: "default" | "price-low" | "price-high" | "name") => void;
  currentSort: "default" | "price-low" | "price-high" | "name";
};

export default function ProductFilters({ onSortChange, currentSort }: FilterProps) {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { value: "default" as const, label: "Trend" },
    { value: "price-low" as const, label: "Price (Low to High)" },
    { value: "price-high" as const, label: "Price (High to Low)" },
    { value: "name" as const, label: "New" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowSortMenu(!showSortMenu)}
        className="rounded-full border px-4 py-1.5 text-xs tracking-[0.1em] uppercase transition-all font-light flex items-center gap-1 text-white/80 border-white/10 bg-transparent backdrop-blur-sm hover:border-white/20 hover:bg-white/5 hover:text-white"
      >
        Sort
        <svg
          className={`w-3 h-3 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Sort dropdown menu */}
      {showSortMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSortMenu(false)}
          />
          <div className="absolute right-0 top-10 z-20 bg-black border rounded-lg min-w-[200px]" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs tracking-[0.05em] uppercase font-light transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentSort === option.value
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
  );
}
