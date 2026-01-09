"use client";

import { useCart } from "./CartProvider";

/**
 * Cart button for navbar
 * Shows item count badge when cart has items
 */
export default function CartButton() {
  const { toggle, count } = useCart();

  return (
    <button
      onClick={toggle}
      className="relative text-sm text-white/60 hover:text-white transition-colors font-light"
      aria-label="Open cart"
      type="button"
    >
      Cart
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-light text-black">
          {count}
        </span>
      )}
    </button>
  );
}
