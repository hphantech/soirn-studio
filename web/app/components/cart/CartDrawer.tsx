"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";

function formatEUR(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function CartDrawer() {
  const {
    isOpen,
    close,
    items,
    subtotalCents,
    removeItem,
    setQty,
    clear,
    count,
  } = useCart();

  // prevent background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[420px] max-w-[92vw] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="h-full border-l p-6"
          style={{
            borderColor: "rgba(255,255,255,0.10)",
            background: "rgba(10,10,10,0.72)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">
                {count === 0 ? "Cart is empty" : `${count} item(s)`}
              </p>
              <p className="mt-1 text-xs text-white/50">
                Taxes included. Shipping at checkout.
              </p>
            </div>

            <button
              onClick={close}
              className="rounded-full border px-3 py-2 text-xs text-white/70 hover:text-white"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              Close
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {items.map((it) => (
              <div key={`${it.slug}-${it.size}`} className="flex gap-4">
                <div
                  className="relative h-24 w-20 overflow-hidden rounded-xl border bg-white/[0.03]"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <Image src={it.image} alt={it.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-white">{it.name}</p>
                      <p className="mt-1 text-xs text-white/60">Size: {it.size}</p>
                    </div>

                    <button
                      onClick={() => removeItem(it.slug, it.size)}
                      className="rounded-full border px-2 py-1 text-xs text-white/60 hover:text-white"
                      style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                        className="h-8 w-8 rounded-full border text-white/80 hover:text-white"
                        style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        –
                      </button>
                      <span className="min-w-6 text-center text-sm text-white/80">
                        {it.qty}
                      </span>
                      <button
                        onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                        className="h-8 w-8 rounded-full border text-white/80 hover:text-white"
                        style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-white/80">{formatEUR(it.price * it.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">Subtotal</p>
              <p className="text-sm text-white">{formatEUR(subtotalCents)}</p>
            </div>

            <button
              disabled={items.length === 0}
              className="mt-4 h-12 w-full rounded-full bg-white text-sm text-black hover:opacity-90 disabled:opacity-40"
            >
              Checkout (placeholder)
            </button>

            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
              <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-white">
                Shipping
              </Link>
              <button onClick={clear} className="hover:text-white underline underline-offset-4">
                Clear cart
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
