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
      className="relative rounded-full border px-4 py-2 text-sm text-white/80 hover:text-white"
      style={{ borderColor: "rgba(255,255,255,0.14)" }}
      aria-label="Open cart"
      type="button"
    >
      Cart

      {mounted && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-medium text-black">
          {count}
        </span>
      )}
    </button>
  );
}
