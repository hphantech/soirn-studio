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
      {/* Size selection */}
      <div>
        <p className="text-sm text-white/80 font-light mb-3">Size: {size}</p>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-9 px-4 border text-xs transition-all font-light ${
                size === s
                  ? "bg-white text-black"
                  : "text-white/80 hover:text-white border-white/20 hover:border-white/30 bg-transparent"
              }`}
              disabled={disabled}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={() => addItem({ slug, name, price, image, size })}
        disabled={disabled}
        className="h-12 w-full bg-black border border-white/20 text-sm font-light text-white hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white transition-all"
      >
        Add to cart
      </button>
    </div>
  );
}
