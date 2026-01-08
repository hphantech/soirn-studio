"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { toggle, count } = useCart();

  // Prevent hydration mismatch: only show badge after client mount.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggle}
      className="relative text-sm text-white/80 hover:text-white transition-colors"
      aria-label="Open cart"
      type="button"
    >
      Cart
      {mounted && count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-medium text-black">
          {count}
        </span>
      )}
    </button>
  );
}
