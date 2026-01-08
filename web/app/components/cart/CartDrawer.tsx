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
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      {/* panel - minimal, slide from right with smooth animation */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[380px] max-w-[90vw] transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div
          className="h-full border-l bg-black p-6 flex flex-col"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Header - minimal */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div>
              <p className="text-sm font-medium text-white">
                {count === 0 ? "Your bag is empty" : `Your bag (${count})`}
              </p>
            </div>

            <button
              onClick={close}
              className="text-white/60 hover:text-white transition-colors text-xl leading-none"
              aria-label="Close cart"
            >
              ×
            </button>
          </div>

          {/* Items - scrollable */}
          <div className="flex-1 overflow-y-auto -mr-3 pr-3 space-y-6 cart-drawer-scroll">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <p className="text-white/60 text-sm">Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="mt-4 text-sm text-white/80 hover:text-white underline underline-offset-2"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              items.map((it, idx) => (
                <div
                  key={`${it.slug}-${it.size}`}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden border bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <Image src={it.image} alt={it.name} fill className="object-cover" sizes="64px" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{it.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">Size: {it.size}</p>
                      </div>

                      <button
                        onClick={() => removeItem(it.slug, it.size)}
                        className="text-white/40 hover:text-white transition-colors text-lg leading-none shrink-0"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                          className="h-7 w-7 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm text-white/80 min-w-[20px] text-center">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                          className="h-7 w-7 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-white">{formatEUR(it.price * it.qty)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - sticky */}
          {items.length > 0 && (
            <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between text-sm">
                <p className="text-white/70">Subtotal</p>
                <p className="text-white font-medium">{formatEUR(subtotalCents)}</p>
              </div>

              <p className="text-xs text-white/50">
                Taxes included. Shipping calculated at checkout.
              </p>

              <button
                disabled={items.length === 0}
                className="w-full h-11 bg-white text-black text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                Check out
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-white/50">
                <Link href="/shipping-returns" className="hover:text-white transition-colors underline underline-offset-2">
                  Shipping
                </Link>
                <button onClick={clear} className="hover:text-white transition-colors underline underline-offset-2">
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
