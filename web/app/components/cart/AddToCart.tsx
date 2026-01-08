"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({
  slug,
  name,
  price,
  image,
  sizes,
  disabled,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  disabled?: boolean;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(sizes[0]);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex gap-2 flex-wrap">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`h-10 px-4 rounded-full border text-sm transition-all ${
              size === s
                ? "bg-white text-black font-medium"
                : "text-white/80 hover:text-white border-white/20 hover:border-white/30"
            }`}
            disabled={disabled}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={() => addItem({ slug, name, price, image, size })}
        disabled={disabled}
        className="h-12 w-full rounded-full bg-white text-sm font-medium text-black hover:opacity-90 disabled:opacity-40 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Add to cart
      </button>
    </div>
  );
}
