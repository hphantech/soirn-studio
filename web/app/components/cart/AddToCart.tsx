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
            className={`h-10 px-4 rounded-full border text-sm ${
              size === s
                ? "bg-white text-black"
                : "text-white/80 hover:text-white"
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
        className="h-12 w-full rounded-full bg-white text-black"
      >
        Add to cart
      </button>
    </div>
  );
}
